const express = require('express');
const router = express.Router();
const axios = require('axios');
const fs = require('fs');
var qs = require('qs');
const { clear } = require('console');

function runAsyncWrapper(callback) {
    return function (req, res, next) {
        callback(req, res, next).catch(next);
    };
}

let AllShapes = fs.readFileSync('./public/ShaclShapes/AllShapes.ttl', 'utf8');
let HydraulicShapes = fs.readFileSync('./public/ShaclShapes/HydraulicShapes.ttl', 'utf8');

let BOT = fs.readFileSync('./public/Ontologies/BOT.ttl', 'utf8');
let FSO = fs.readFileSync('./public/Ontologies/FSO.ttl', 'utf8');
let FPO = fs.readFileSync('./public/Ontologies/FPO.ttl', 'utf8');

let baseUrl = 'http://localhost:3030/ny-db/query?query=';
let baseUpdateURL = 'http://localhost:3030/ny-db/update?update=';
let baseDataURL = 'http://localhost:3030/ny-db/data';

// Clear graph
let clearData = qs.stringify({
    update: 'clear default',
});

let FlowMovingDeviceFlowRateQuery =
    baseUrl + encodeURIComponent(fs.readFileSync('./public/Queries/FlowMovingDeviceFlowRate.ttl'));

let FanPressureDrop = baseUrl + encodeURIComponent(fs.readFileSync('./public/Queries/FanPressureDrop.ttl'));
let PumpPressureDrop = baseUrl + encodeURIComponent(fs.readFileSync('./public/Queries/PumpPressureDrop.ttl'));

let TeeConstruct = baseUrl + encodeURIComponent(fs.readFileSync('./public/ManuallySolvingQueries/TeeConstruct.ttl'));
let RestConstruct =
    baseUrl + encodeURIComponent(fs.readFileSync('./public/ManuallySolvingQueries/PipesAndFittingsConstruct.ttl'));

let TeeDistributionComponents =
    baseDataURL + encodeURIComponent(fs.readFileSync('./public/jsonld/distributionComponents.json'));

//Queries to solve violations to in the first validation
let deleteSystems =
    baseUpdateURL +
    encodeURIComponent(fs.readFileSync('./public/ManuallySolvingQueries/deleteSystemsWithoutComponents.ttl'));

let insertEndCap =
    baseUpdateURL + encodeURIComponent(fs.readFileSync('./public/ManuallySolvingQueries/insertEndCap.ttl'));

let insertSpaceHeaterConnection =
    baseUpdateURL +
    encodeURIComponent(
        fs.readFileSync('./public/ManuallySolvingQueries/insertMissingConnectionBetweenSpaceheaterAndSpace.ttl')
    );

let insertDiameter =
    baseUpdateURL +
    encodeURIComponent(fs.readFileSync('./public/ManuallySolvingQueries/insertMissingDiameterAirTerminals.ttl'));

let insertKV = baseUpdateURL + encodeURIComponent(fs.readFileSync('./public/ManuallySolvingQueries/insertKV.ttl'));

let insertRoughness =
    baseUpdateURL +
    encodeURIComponent(fs.readFileSync('./public/ManuallySolvingQueries/insertRoughnessWaterbasedElbows.ttl'));

let insertVelocity =
    baseUpdateURL + encodeURIComponent(fs.readFileSync('./public/ManuallySolvingQueries/insertVelocityAll.ttl'));

let autoSizePipes = baseUpdateURL + encodeURIComponent(fs.readFileSync('./public/ManuallySolvingQueries/autoSize.ttl'));

router.post('/solveSecondValidation', (req, res, next) => {
    axios
        .all([axios.post(autoSizePipes)])
        .then(axios.spread((response1) => {}))
        .catch((err) => {
            console.log(err);
        });
});

router.post('/solveFirstValidation', (req, res, next) => {
    axios
        .all([
            axios.post(deleteSystems),
            axios.post(insertEndCap),
            axios.post(insertSpaceHeaterConnection),
            axios.post(insertDiameter),
            axios.post(insertKV),
            axios.post(insertRoughness),
            axios.post(insertVelocity),
        ])
        .then(
            axios.spread((response1) => {
                //console.log(JSON.stringify(response1.data));
            })
        )
        .catch((err) => {
            console.log(err);
        });
});

let sendTeesToDatabase = async () => {
    return await axios
        .get(TeeConstruct, {
            headers: {
                Accept: 'application/ld+json',
            },
        })
        .then((response) => {
            //Send tee components to hydraulic service. Perform hydraulic calculation and get the pressure drop as result.
            axios
                .post('http://localhost:8000/pressureDropTees', response.data)
                .then((response) => {
                    //Send hydraulic results to database
                    let data = JSON.parse(response.data);
                    axios
                        .post('http://localhost:3030/ny-db/data', data, {
                            headers: {
                                'Content-Type': 'application/ld+json',
                            },
                        })
                        .then((response) => {
                            console.log(JSON.stringify(response.data));
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                })
                .catch((error) => {
                    console.log(error);
                });
        })
        .catch((error) => {
            console.log(error);
        });
};

let sendRestToDatabase = async (res) => {
    return await axios
        .get(RestConstruct, {
            headers: {
                Accept: 'application/ld+json',
            },
        })
        .then((response) => {
            //Send tee components to hydraulic service. Perform hydraulic calculation and get the pressure drop as result.
            axios
                .post('http://localhost:8000/pressureDropRest', response.data)
                .then((response) => {
                    //Send hydraulic results to database
                    let data = JSON.parse(response.data);
                    axios
                        .post('http://localhost:3030/ny-db/data', data, {
                            headers: {
                                'Content-Type': 'application/ld+json',
                            },
                        })
                        .then((response) => {
                            console.log(JSON.stringify(response.data));

                            axios.get('http://localhost:8080/hydraulicShapes').then((reponse) => {
                                axios
                                    .post('http://localhost:3030/ny-db/shacl?graph=default', reponse.data, {
                                        headers: {
                                            'Content-Type': 'text/turtle',
                                            Accept: 'application/ld+json',
                                        },
                                    })
                                    .then((response) => {
                                        //res.send(response.data)
                                        let total = 0;
                                        let HeatExchanger = 0;
                                        let Tee = 0;
                                        let Transition = 0;
                                        let Pipe = 0;
                                        let Duct = 0;
                                        let Elbow = 0;
                                        let Pump = 0;
                                        let Fan = 0;
                                        let Port = 0;
                                        let Flow = 0;
                                        let Property = 0;
                                        let System = 0;
                                        let SpaceHeater = 0;
                                        let Valve = 0;
                                        let Damper = 0;
                                        let AirTerminal = 0;

                                        for (let index in response.data['@graph']) {
                                            if (response.data['@graph'][index].resultMessage != null) {
                                                if (
                                                    response.data['@graph'][index].resultMessage[0] == 'HeatExchanger'
                                                ) {
                                                    HeatExchangerCounter++;
                                                }
                                                if (response.data['@graph'][index].resultMessage[0] == 'Transition') {
                                                    Transition++;
                                                }
                                                if (response.data['@graph'][index].resultMessage[0] == 'Pipe') {
                                                    Pipe++;
                                                }
                                                if (response.data['@graph'][index].resultMessage[0] == 'Duct') {
                                                    Duct++;
                                                }
                                                if (response.data['@graph'][index].resultMessage[0] == 'Elbow') {
                                                    Elbow++;
                                                }
                                                if (response.data['@graph'][index].resultMessage[0] == 'Pump') {
                                                    Pump++;
                                                }
                                                if (response.data['@graph'][index].resultMessage[0] == 'Fan') {
                                                    Fan++;
                                                }
                                                if (response.data['@graph'][index].resultMessage[0] == 'Port') {
                                                    Port++;
                                                }
                                                if (response.data['@graph'][index].resultMessage[0] == 'Flow') {
                                                    Flow++;
                                                }
                                                if (response.data['@graph'][index].resultMessage[0] == 'Property') {
                                                    Property++;
                                                }
                                                if (response.data['@graph'][index].resultMessage[0] == 'System') {
                                                    System++;
                                                }
                                                if (response.data['@graph'][index].resultMessage[0] == 'SpaceHeater') {
                                                    SpaceHeater++;
                                                }
                                                if (
                                                    response.data['@graph'][index].resultMessage[0] ==
                                                        'BalancingValve' ||
                                                    response.data['@graph'][index].resultMessage[0] == 'MotorizedValve'
                                                ) {
                                                    Valve++;
                                                }
                                                if (
                                                    response.data['@graph'][index].resultMessage[0] ==
                                                        'BalancingDamper' ||
                                                    response.data['@graph'][index].resultMessage[0] == 'MotorizedDamper'
                                                ) {
                                                    Damper++;
                                                }
                                                if (response.data['@graph'][index].resultMessage[0] == 'Tee') {
                                                    Tee++;
                                                }
                                                if (response.data['@graph'][index].resultMessage[0] == 'AirTerminal') {
                                                    AirTerminal++;
                                                }
                                                total++;
                                            }
                                        }

                                        let shaclObjects = {
                                            result: [
                                                { type: 'HeatExchanger', amount: HeatExchanger },
                                                { type: 'Transition', amount: Transition },
                                                { type: 'Tee', amount: Tee },
                                                { type: 'Elbow', amount: Elbow },
                                                { type: 'Pipe', amount: Pipe },
                                                { type: 'Duct', amount: Duct },
                                                { type: 'Pump', amount: Pump },
                                                { type: 'Fan', amount: Fan },
                                                { type: 'SpaceHeater', amount: SpaceHeater },
                                                { type: 'AirTerminal', amount: AirTerminal },
                                                { type: 'Valve', amount: Valve },
                                                { type: 'Damper', amount: Damper },
                                                { type: 'Port', amount: Port },
                                                { type: 'Flow', amount: Flow },
                                                { type: 'Property', amount: Property },
                                                { type: 'System', amount: System },
                                                { type: 'Total', amount: total },
                                            ],
                                        };
                                        res.send(shaclObjects);
                                    })
                                    .catch((error) => {
                                        console.log(error);
                                    });
                            });
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                })
                .catch((error) => {
                    console.log(error);
                });
        })
        .catch((error) => {
            console.log(error);
        });
};

let secondValidation = (res) => {
    axios
        .post('http://localhost:3030/ny-db/shacl?graph=default', HydraulicShapes, {
            headers: {
                'Content-Type': 'text/turtle',
                Accept: 'application/ld+json',
            },
        })
        .then((response) => {
            let shaclObject = {
                HeatExchanger: [],
                Tee: [],
                Transition: [],
                Pipe: [],
                Duct: [],
                Elbow: [],
                Pump: [],
                Fan: [],
                Port: [],
                Flow: [],
                Property: [],
                System: [],
                SpaceHeater: [],
                AirTerminal: [],
                Valve: [],
                Damper: [],
                Total: [],
            }; //
            console.log(response.data['@graph']);
            let counter = Object.keys(response.data['@graph']).length;
            for (let index in response.data['@graph']) {
                if (response.data['@graph'][index].resultMessage != null) {
                    if (response.data['@graph'][index].resultMessage[0] == 'HeatExchanger')
                        shaclObject.HeatExchanger.push({
                            id: `${response.data['@graph'][index].focusNode}`,
                            constrainType: `${response.data['@graph'][index].sourceConstraintComponent}`,
                            description: `${response.data['@graph'][index].resultMessage[1]}`,
                        });
                }
                if (response.data['@graph'][index].resultMessage != null) {
                    if (response.data['@graph'][index].resultMessage[0] == 'Transition')
                        shaclObject.Transition.push({
                            id: `${response.data['@graph'][index].focusNode}`,
                            constrainType: `${response.data['@graph'][index].sourceConstraintComponent}`,
                            description: `${response.data['@graph'][index].resultMessage[1]}`,
                        });
                }
                if (response.data['@graph'][index].resultMessage != null) {
                    if (response.data['@graph'][index].resultMessage[0] == 'Tee')
                        shaclObject.Tee.push({
                            id: `${response.data['@graph'][index].focusNode}`,
                            constrainType: `${response.data['@graph'][index].sourceConstraintComponent}`,
                            description: `${response.data['@graph'][index].resultMessage[1]}`,
                        });
                }
                if (response.data['@graph'][index].resultMessage != null) {
                    if (response.data['@graph'][index].resultMessage[0] == 'Pipe')
                        shaclObject.Pipe.push({
                            id: `${response.data['@graph'][index].focusNode}`,
                            constrainType: `${response.data['@graph'][index].sourceConstraintComponent}`,
                            description: `${response.data['@graph'][index].resultMessage[1]}`,
                        });
                }
                if (response.data['@graph'][index].resultMessage != null) {
                    if (response.data['@graph'][index].resultMessage[0] == 'Duct')
                        shaclObject.Duct.push({
                            id: `${response.data['@graph'][index].focusNode}`,
                            constrainType: `${response.data['@graph'][index].sourceConstraintComponent}`,
                            description: `${response.data['@graph'][index].resultMessage[1]}`,
                        });
                }
                if (response.data['@graph'][index].resultMessage != null) {
                    if (response.data['@graph'][index].resultMessage[0] == 'Elbow')
                        shaclObject.Elbow.push({
                            id: `${response.data['@graph'][index].focusNode}`,
                            constrainType: `${response.data['@graph'][index].sourceConstraintComponent}`,
                            description: `${response.data['@graph'][index].resultMessage[1]}`,
                        });
                }
                if (response.data['@graph'][index].resultMessage != null) {
                    if (response.data['@graph'][index].resultMessage[0] == 'Pump')
                        shaclObject.Pump.push({
                            id: `${response.data['@graph'][index].focusNode}`,
                            constrainType: `${response.data['@graph'][index].sourceConstraintComponent}`,
                            description: `${response.data['@graph'][index].resultMessage[1]}`,
                        });
                }
                if (response.data['@graph'][index].resultMessage != null) {
                    if (response.data['@graph'][index].resultMessage[0] == 'Fan')
                        shaclObject.Fan.push({
                            id: `${response.data['@graph'][index].focusNode}`,
                            constrainType: `${response.data['@graph'][index].sourceConstraintComponent}`,
                            description: `${response.data['@graph'][index].resultMessage[1]}`,
                        });
                }
                if (response.data['@graph'][index].resultMessage != null) {
                    if (response.data['@graph'][index].resultMessage[0] == 'Port')
                        shaclObject.Port.push({
                            id: `${response.data['@graph'][index].focusNode}`,
                            constrainType: `${response.data['@graph'][index].sourceConstraintComponent}`,
                            description: `${response.data['@graph'][index].resultMessage[1]}`,
                        });
                }
                if (response.data['@graph'][index].resultMessage != null) {
                    if (response.data['@graph'][index].resultMessage[0] == 'Flow')
                        shaclObject.Flow.push({
                            id: `${response.data['@graph'][index].focusNode}`,
                            constrainType: `${response.data['@graph'][index].sourceConstraintComponent}`,
                            description: `${response.data['@graph'][index].resultMessage[1]}`,
                        });
                }
                if (response.data['@graph'][index].resultMessage != null) {
                    if (response.data['@graph'][index].resultMessage[0] == 'Property')
                        shaclObject.Property.push({
                            id: `${response.data['@graph'][index].focusNode}`,
                            constrainType: `${response.data['@graph'][index].sourceConstraintComponent}`,
                            description: `${response.data['@graph'][index].resultMessage[1]}`,
                        });
                }
                if (response.data['@graph'][index].resultMessage != null) {
                    if (response.data['@graph'][index].resultMessage[0] == 'System')
                        shaclObject.System.push({
                            id: `${response.data['@graph'][index].focusNode}`,
                            constrainType: `${response.data['@graph'][index].sourceConstraintComponent}`,
                            description: `${response.data['@graph'][index].resultMessage[1]}`,
                        });
                }
                if (response.data['@graph'][index].resultMessage != null) {
                    if (response.data['@graph'][index].resultMessage[0] == 'SpaceHeater')
                        shaclObject.SpaceHeater.push({
                            id: `${response.data['@graph'][index].focusNode}`,
                            constrainType: `${response.data['@graph'][index].sourceConstraintComponent}`,
                            description: `${response.data['@graph'][index].resultMessage[1]}`,
                        });
                }
                if (response.data['@graph'][index].resultMessage != null) {
                    if (
                        response.data['@graph'][index].resultMessage[0] == 'MotorizedValve' ||
                        response.data['@graph'][index].resultMessage[0] == 'BalancingValve'
                    )
                        shaclObject.Valve.push({
                            id: `${response.data['@graph'][index].focusNode}`,
                            constrainType: `${response.data['@graph'][index].sourceConstraintComponent}`,
                            description: `${response.data['@graph'][index].resultMessage[1]}`,
                        });
                }
                if (response.data['@graph'][index].resultMessage != null) {
                    if (
                        response.data['@graph'][index].resultMessage[0] == 'MotorizedDamper' ||
                        response.data['@graph'][index].resultMessage[0] == 'BalancingDamper'
                    )
                        shaclObject.Damper.push({
                            id: `${response.data['@graph'][index].focusNode}`,
                            constrainType: `${response.data['@graph'][index].sourceConstraintComponent}`,
                            description: `${response.data['@graph'][index].resultMessage[1]}`,
                        });
                }
                if (response.data['@graph'][index].resultMessage != null) {
                    if (response.data['@graph'][index].resultMessage[0] == 'AirTerminal')
                        shaclObject.AirTerminal.push({
                            id: `${response.data['@graph'][index].focusNode}`,
                            constrainType: `${response.data['@graph'][index].sourceConstraintComponent}`,
                            description: `${response.data['@graph'][index].resultMessage[1]}`,
                        });
                    if (response.data['@graph'][index].resultMessage != null) {
                        shaclObject.Total.push({
                            id: `${response.data['@graph'][index].focusNode}`,
                            constrainType: `${response.data['@graph'][index].sourceConstraintComponent}`,
                            description: `${response.data['@graph'][index].resultMessage[1]}`,
                        });
                    }
                }
            }
            shaclObjects = { shaclObject };
            res.send(shaclObjects);
        })
        .catch((error) => {
            console.log(error);
        });
};

router.get('/hydraulicValidation', (req, res) => {
    secondValidation(res);
});

router.get('/hydraulicCalculation', async (req, res) => {
    //Get all Tee components and their meta-data from the database
    try {
        await sendTeesToDatabase();
        await sendRestToDatabase(res);
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
});
router.get('/flowHeadTable', (req, res, next) => {
    axios
        .all([
            // Get the type, ID and flow rate of each flow moving device
            axios.get(FlowMovingDeviceFlowRateQuery),
            //Get the total pressure drop of each fan
            axios.get(FanPressureDrop),
            //Get the total pressure drop of each pump

            axios.get(PumpPressureDrop),
        ])
        .then(
            axios.spread((response1, response2, response3) => {
                flowMovingDeviceFlow = [];
                for (let index in response1.data.results.bindings) {
                    flowMovingDeviceFlow.push([
                        response1.data.results.bindings[index].flowMovingDeviceType.value.replace(
                            'https://w3id.org/fpo#',
                            ''
                        ),
                        response1.data.results.bindings[index].flowMovingDevice.value.replace(
                            'https://example.com/inst#',
                            ''
                        ),
                        parseFloat(response1.data.results.bindings[index].totalFlow.value).toFixed(2),
                    ]);
                }

                flowMovingDevicePressure = [];
                for (let item in response2.data.results.bindings) {
                    flowMovingDevicePressure.push([
                        response2.data.results.bindings[item].fan.value.replace('https://example.com/inst#', ''),
                        parseFloat(response2.data.results.bindings[item].pressure.value).toFixed(7),
                    ]);
                }

                for (let index in response3.data.results.bindings) {
                    flowMovingDevicePressure.push([
                        response3.data.results.bindings[index].pump.value.replace('https://example.com/inst#', ''),
                        parseFloat(response3.data.results.bindings[index].pressure.value).toFixed(2),
                    ]);
                }

                for (let itemA in flowMovingDevicePressure) {
                    for (let itemB in flowMovingDeviceFlow) {
                        if (flowMovingDevicePressure[itemA][0] == flowMovingDeviceFlow[itemB][1]) {
                            flowMovingDeviceFlow[itemB].push(flowMovingDevicePressure[itemA][1]);
                        }
                    }
                }
                res.send(flowMovingDeviceFlow);
            })
        )
        .catch((err) => {
            console.log(err);
        });
});

router.get('/validationGraph', (req, res) => {
    axios
        .post('http://localhost:3030/ny-db/shacl?graph=default', AllShapes, {
            headers: {
                'Content-Type': 'text/turtle',
                Accept: 'application/ld+json',
            },
        })
        .then((response) => {
            let shaclObject = {
                HeatExchanger: [],
                Tee: [],
                Transition: [],
                Pipe: [],
                Duct: [],
                Elbow: [],
                Pump: [],
                Fan: [],
                Port: [],
                Flow: [],
                Property: [],
                System: [],
                SpaceHeater: [],
                AirTerminal: [],
                Valve: [],
                Damper: [],
                Total: [],
            }; //
            console.log(response.data['@graph']);
            let counter = Object.keys(response.data['@graph']).length;
            for (let index in response.data['@graph']) {
                if (response.data['@graph'][index].resultMessage != null) {
                    if (response.data['@graph'][index].resultMessage[0] == 'HeatExchanger')
                        shaclObject.HeatExchanger.push({
                            id: `${response.data['@graph'][index].focusNode}`,
                            constrainType: `${response.data['@graph'][index].sourceConstraintComponent}`,
                            description: `${response.data['@graph'][index].resultMessage[1]}`,
                        });
                }
                if (response.data['@graph'][index].resultMessage != null) {
                    if (response.data['@graph'][index].resultMessage[0] == 'Transition')
                        shaclObject.Transition.push({
                            id: `${response.data['@graph'][index].focusNode}`,
                            constrainType: `${response.data['@graph'][index].sourceConstraintComponent}`,
                            description: `${response.data['@graph'][index].resultMessage[1]}`,
                        });
                }
                if (response.data['@graph'][index].resultMessage != null) {
                    if (response.data['@graph'][index].resultMessage[0] == 'Tee')
                        shaclObject.Tee.push({
                            id: `${response.data['@graph'][index].focusNode}`,
                            constrainType: `${response.data['@graph'][index].sourceConstraintComponent}`,
                            description: `${response.data['@graph'][index].resultMessage[1]}`,
                        });
                }
                if (response.data['@graph'][index].resultMessage != null) {
                    if (response.data['@graph'][index].resultMessage[0] == 'Pipe')
                        shaclObject.Pipe.push({
                            id: `${response.data['@graph'][index].focusNode}`,
                            constrainType: `${response.data['@graph'][index].sourceConstraintComponent}`,
                            description: `${response.data['@graph'][index].resultMessage[1]}`,
                        });
                }
                if (response.data['@graph'][index].resultMessage != null) {
                    if (response.data['@graph'][index].resultMessage[0] == 'Duct')
                        shaclObject.Duct.push({
                            id: `${response.data['@graph'][index].focusNode}`,
                            constrainType: `${response.data['@graph'][index].sourceConstraintComponent}`,
                            description: `${response.data['@graph'][index].resultMessage[1]}`,
                        });
                }
                if (response.data['@graph'][index].resultMessage != null) {
                    if (response.data['@graph'][index].resultMessage[0] == 'Elbow')
                        shaclObject.Elbow.push({
                            id: `${response.data['@graph'][index].focusNode}`,
                            constrainType: `${response.data['@graph'][index].sourceConstraintComponent}`,
                            description: `${response.data['@graph'][index].resultMessage[1]}`,
                        });
                }
                if (response.data['@graph'][index].resultMessage != null) {
                    if (response.data['@graph'][index].resultMessage[0] == 'Pump')
                        shaclObject.Pump.push({
                            id: `${response.data['@graph'][index].focusNode}`,
                            constrainType: `${response.data['@graph'][index].sourceConstraintComponent}`,
                            description: `${response.data['@graph'][index].resultMessage[1]}`,
                        });
                }
                if (response.data['@graph'][index].resultMessage != null) {
                    if (response.data['@graph'][index].resultMessage[0] == 'Fan')
                        shaclObject.Fan.push({
                            id: `${response.data['@graph'][index].focusNode}`,
                            constrainType: `${response.data['@graph'][index].sourceConstraintComponent}`,
                            description: `${response.data['@graph'][index].resultMessage[1]}`,
                        });
                }
                if (response.data['@graph'][index].resultMessage != null) {
                    if (response.data['@graph'][index].resultMessage[0] == 'Port')
                        shaclObject.Port.push({
                            id: `${response.data['@graph'][index].focusNode}`,
                            constrainType: `${response.data['@graph'][index].sourceConstraintComponent}`,
                            description: `${response.data['@graph'][index].resultMessage[1]}`,
                        });
                }
                if (response.data['@graph'][index].resultMessage != null) {
                    if (response.data['@graph'][index].resultMessage[0] == 'Flow')
                        shaclObject.Flow.push({
                            id: `${response.data['@graph'][index].focusNode}`,
                            constrainType: `${response.data['@graph'][index].sourceConstraintComponent}`,
                            description: `${response.data['@graph'][index].resultMessage[1]}`,
                        });
                }
                if (response.data['@graph'][index].resultMessage != null) {
                    if (response.data['@graph'][index].resultMessage[0] == 'Property')
                        shaclObject.Property.push({
                            id: `${response.data['@graph'][index].focusNode}`,
                            constrainType: `${response.data['@graph'][index].sourceConstraintComponent}`,
                            description: `${response.data['@graph'][index].resultMessage[1]}`,
                        });
                }
                if (response.data['@graph'][index].resultMessage != null) {
                    if (response.data['@graph'][index].resultMessage[0] == 'System')
                        shaclObject.System.push({
                            id: `${response.data['@graph'][index].focusNode}`,
                            constrainType: `${response.data['@graph'][index].sourceConstraintComponent}`,
                            description: `${response.data['@graph'][index].resultMessage[1]}`,
                        });
                }
                if (response.data['@graph'][index].resultMessage != null) {
                    if (response.data['@graph'][index].resultMessage[0] == 'SpaceHeater')
                        shaclObject.SpaceHeater.push({
                            id: `${response.data['@graph'][index].focusNode}`,
                            constrainType: `${response.data['@graph'][index].sourceConstraintComponent}`,
                            description: `${response.data['@graph'][index].resultMessage[1]}`,
                        });
                }
                if (response.data['@graph'][index].resultMessage != null) {
                    if (
                        response.data['@graph'][index].resultMessage[0] == 'MotorizedValve' ||
                        response.data['@graph'][index].resultMessage[0] == 'BalancingValve'
                    )
                        shaclObject.Valve.push({
                            id: `${response.data['@graph'][index].focusNode}`,
                            constrainType: `${response.data['@graph'][index].sourceConstraintComponent}`,
                            description: `${response.data['@graph'][index].resultMessage[1]}`,
                        });
                }
                if (response.data['@graph'][index].resultMessage != null) {
                    if (
                        response.data['@graph'][index].resultMessage[0] == 'MotorizedDamper' ||
                        response.data['@graph'][index].resultMessage[0] == 'BalancingDamper'
                    )
                        shaclObject.Damper.push({
                            id: `${response.data['@graph'][index].focusNode}`,
                            constrainType: `${response.data['@graph'][index].sourceConstraintComponent}`,
                            description: `${response.data['@graph'][index].resultMessage[1]}`,
                        });
                }
                if (response.data['@graph'][index].resultMessage != null) {
                    if (response.data['@graph'][index].resultMessage[0] == 'AirTerminal')
                        shaclObject.AirTerminal.push({
                            id: `${response.data['@graph'][index].focusNode}`,
                            constrainType: `${response.data['@graph'][index].sourceConstraintComponent}`,
                            description: `${response.data['@graph'][index].resultMessage[1]}`,
                        });
                    if (response.data['@graph'][index].resultMessage != null) {
                        shaclObject.Total.push({
                            id: `${response.data['@graph'][index].focusNode}`,
                            constrainType: `${response.data['@graph'][index].sourceConstraintComponent}`,
                            description: `${response.data['@graph'][index].resultMessage[1]}`,
                        });
                    }
                }
            }
            shaclObjects = { shaclObject };
            res.send(shaclObjects);
        })
        .catch((error) => {
            console.log(error);
        });
});

router.get('/validationOverviewGraph', (req, res) => {
    axios
        .get('http://localhost:8080/allShapes', (req, res))
        .then((response) => {
            axios
                .post('http://localhost:3030/ny-db/shacl?graph=default', response.data, {
                    headers: {
                        'Content-Type': 'text/turtle',
                        Accept: 'application/ld+json',
                    },
                })
                .then((response) => {
                    //res.send(response.data)
                    let total = 0;
                    let HeatExchanger = 0;
                    let Tee = 0;
                    let Transition = 0;
                    let Pipe = 0;
                    let Duct = 0;
                    let Elbow = 0;
                    let Pump = 0;
                    let Fan = 0;
                    let Port = 0;
                    let Flow = 0;
                    let Property = 0;
                    let System = 0;
                    let SpaceHeater = 0;
                    let Valve = 0;
                    let Damper = 0;
                    let AirTerminal = 0;
                    for (let index in response.data['@graph']) {
                        if (response.data['@graph'][index].resultMessage != null) {
                            if (response.data['@graph'][index].resultMessage[0] == 'HeatExchanger') {
                                HeatExchangerCounter++;
                            }
                            if (response.data['@graph'][index].resultMessage[0] == 'Transition') {
                                Transition++;
                            }
                            if (response.data['@graph'][index].resultMessage[0] == 'Pipe') {
                                Pipe++;
                            }
                            if (response.data['@graph'][index].resultMessage[0] == 'Duct') {
                                Duct++;
                            }
                            if (response.data['@graph'][index].resultMessage[0] == 'Elbow') {
                                Elbow++;
                            }
                            if (response.data['@graph'][index].resultMessage[0] == 'Pump') {
                                Pump++;
                            }
                            if (response.data['@graph'][index].resultMessage[0] == 'Fan') {
                                Fan++;
                            }
                            if (response.data['@graph'][index].resultMessage[0] == 'Port') {
                                Port++;
                            }
                            if (response.data['@graph'][index].resultMessage[0] == 'Flow') {
                                Flow++;
                            }
                            if (response.data['@graph'][index].resultMessage[0] == 'Property') {
                                Property++;
                            }
                            if (response.data['@graph'][index].resultMessage[0] == 'System') {
                                System++;
                            }
                            if (response.data['@graph'][index].resultMessage[0] == 'SpaceHeater') {
                                SpaceHeater++;
                            }
                            if (
                                response.data['@graph'][index].resultMessage[0] == 'BalancingValve' ||
                                response.data['@graph'][index].resultMessage[0] == 'MotorizedValve'
                            ) {
                                Valve++;
                            }
                            if (
                                response.data['@graph'][index].resultMessage[0] == 'BalancingDamper' ||
                                response.data['@graph'][index].resultMessage[0] == 'MotorizedDamper'
                            ) {
                                Damper++;
                            }
                            if (response.data['@graph'][index].resultMessage[0] == 'Tee') {
                                Tee++;
                            }
                            if (response.data['@graph'][index].resultMessage[0] == 'AirTerminal') {
                                AirTerminal++;
                            }
                            total++;
                        }
                    }
                    let shaclObjects = {
                        result: [
                            { type: 'HeatExchanger', amount: HeatExchanger },
                            { type: 'Transition', amount: Transition },
                            { type: 'Tee', amount: Tee },
                            { type: 'Elbow', amount: Elbow },
                            { type: 'Pipe', amount: Pipe },
                            { type: 'Duct', amount: Duct },
                            { type: 'Pump', amount: Pump },
                            { type: 'Fan', amount: Fan },
                            { type: 'SpaceHeater', amount: SpaceHeater },
                            { type: 'AirTerminal', amount: AirTerminal },
                            { type: 'Valve', amount: Valve },
                            { type: 'Damper', amount: Damper },
                            { type: 'Port', amount: Port },
                            { type: 'Flow', amount: Flow },
                            { type: 'Property', amount: Property },
                            { type: 'System', amount: System },
                            { type: 'Total', amount: total },
                        ],
                    };
                    res.send(shaclObjects);
                })
                .catch((error) => {
                    console.log(error);
                });
        })
        .catch((err) => {
            console.log(err);
        });
});

router.post('/Bot', (req, res, next) => {
    console.log(typeof req.body);
    const Bot = req.body;
    axios
        .post('http://localhost:3030/ny-db/data', Bot, {
            headers: {
                'Content-Type': 'text/turtle',
            },
            maxContentLength: Infinity,
            maxBodyLength: Infinity,
        })
        .then(function (response) {
            console.log(JSON.stringify(response.data));

            axios
                .post('http://localhost:3030/ny-db/data', BOT, {
                    headers: {
                        'Content-Type': 'text/turtle',
                    },
                    maxContentLength: Infinity,
                    maxBodyLength: Infinity,
                })
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                })
                .catch(function (error) {
                    console.log(error);
                });

            axios
                .post('http://localhost:3030/ny-db/data', FSO, {
                    headers: {
                        'Content-Type': 'text/turtle',
                    },
                    maxContentLength: Infinity,
                    maxBodyLength: Infinity,
                })
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                })
                .catch(function (error) {
                    console.log(error);
                });

            axios
                .post('http://localhost:3030/ny-db/data', FPO, {
                    headers: {
                        'Content-Type': 'text/turtle',
                    },
                    maxContentLength: Infinity,
                    maxBodyLength: Infinity,
                })
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                })
                .catch(function (error) {
                    console.log(error);
                });
        })
        .catch(function (error) {
            console.log(error);
        });
});

router.post('/clearGraph', (req, res) => {
    axios
        .post('http://localhost:3030/ny-db/update', clearData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
});

router.post('/solveFirstValidation', (req, res, next) => {
    axios
        .all([
            axios.post(deleteSystems),
            axios.post(insertEndCap),
            axios.post(insertSpaceHeaterConnection),
            axios.post(insertDiameter),
            axios.post(insertKV),
            axios.post(insertRoughness),
            axios.post(insertVelocity),
        ])
        .then(
            axios.spread((response1) => {
                //console.log(JSON.stringify(response1.data));
            })
        )
        .catch((err) => {
            console.log(err);
        });
});

let sendTeesToDatabase = async () => {
    return await axios
        .get(TeeConstruct, {
            headers: {
                Accept: 'application/ld+json',
            },
        })
        .then((response) => {
            //Send tee components to hydraulic service. Perform hydraulic calculation and get the pressure drop as result.
            axios
                .post('http://localhost:8000/pressureDropTees', response.data)
                .then((response) => {
                    //Send hydraulic results to database
                    let data = JSON.parse(response.data);
                    axios
                        .post('http://localhost:3030/ny-db/data', data, {
                            headers: {
                                'Content-Type': 'application/ld+json',
                            },
                        })
                        .then((response) => {
                            console.log(JSON.stringify(response.data));
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                })
                .catch((error) => {
                    console.log(error);
                });
        })
        .catch((error) => {
            console.log(error);
        });
};

let sendRestToDatabase = async (res) => {
    return await axios
        .get(RestConstruct, {
            headers: {
                Accept: 'application/ld+json',
            },
        })
        .then((response) => {
            //Send tee components to hydraulic service. Perform hydraulic calculation and get the pressure drop as result.
            axios
                .post('http://localhost:8000/pressureDropRest', response.data)
                .then((response) => {
                    //Send hydraulic results to database
                    let data = JSON.parse(response.data);
                    axios
                        .post('http://localhost:3030/ny-db/data', data, {
                            headers: {
                                'Content-Type': 'application/ld+json',
                            },
                        })
                        .then((response) => {
                            console.log(JSON.stringify(response.data));
                            axios
                                .post('http://localhost:3030/ny-db/shacl?graph=default', HydraulicShapes, {
                                    headers: {
                                        'Content-Type': 'text/turtle',
                                        Accept: 'application/ld+json',
                                    },
                                })
                                .then((response) => {
                                    //res.send(response.data)
                                    let total = 0;
                                    let HeatExchanger = 0;
                                    let Tee = 0;
                                    let Transition = 0;
                                    let Pipe = 0;
                                    let Duct = 0;
                                    let Elbow = 0;
                                    let Pump = 0;
                                    let Fan = 0;
                                    let Port = 0;
                                    let Flow = 0;
                                    let Property = 0;
                                    let System = 0;
                                    let SpaceHeater = 0;
                                    let Valve = 0;
                                    let Damper = 0;
                                    let AirTerminal = 0;

                                    for (let index in response.data['@graph']) {
                                        if (response.data['@graph'][index].resultMessage != null) {
                                            if (response.data['@graph'][index].resultMessage[0] == 'HeatExchanger') {
                                                HeatExchangerCounter++;
                                            }
                                            if (response.data['@graph'][index].resultMessage[0] == 'Transition') {
                                                Transition++;
                                            }
                                            if (response.data['@graph'][index].resultMessage[0] == 'Pipe') {
                                                Pipe++;
                                            }
                                            if (response.data['@graph'][index].resultMessage[0] == 'Duct') {
                                                Duct++;
                                            }
                                            if (response.data['@graph'][index].resultMessage[0] == 'Elbow') {
                                                Elbow++;
                                            }
                                            if (response.data['@graph'][index].resultMessage[0] == 'Pump') {
                                                Pump++;
                                            }
                                            if (response.data['@graph'][index].resultMessage[0] == 'Fan') {
                                                Fan++;
                                            }
                                            if (response.data['@graph'][index].resultMessage[0] == 'Port') {
                                                Port++;
                                            }
                                            if (response.data['@graph'][index].resultMessage[0] == 'Flow') {
                                                Flow++;
                                            }
                                            if (response.data['@graph'][index].resultMessage[0] == 'Property') {
                                                Property++;
                                            }
                                            if (response.data['@graph'][index].resultMessage[0] == 'System') {
                                                System++;
                                            }
                                            if (response.data['@graph'][index].resultMessage[0] == 'SpaceHeater') {
                                                SpaceHeater++;
                                            }
                                            if (
                                                response.data['@graph'][index].resultMessage[0] == 'BalancingValve' ||
                                                response.data['@graph'][index].resultMessage[0] == 'MotorizedValve'
                                            ) {
                                                Valve++;
                                            }
                                            if (
                                                response.data['@graph'][index].resultMessage[0] == 'BalancingDamper' ||
                                                response.data['@graph'][index].resultMessage[0] == 'MotorizedDamper'
                                            ) {
                                                Damper++;
                                            }
                                            if (response.data['@graph'][index].resultMessage[0] == 'Tee') {
                                                Tee++;
                                            }
                                            if (response.data['@graph'][index].resultMessage[0] == 'AirTerminal') {
                                                AirTerminal++;
                                            }
                                            total++;
                                        }
                                    }

                                    let shaclObjects = {
                                        result: [
                                            { type: 'HeatExchanger', amount: HeatExchanger },
                                            { type: 'Transition', amount: Transition },
                                            { type: 'Tee', amount: Tee },
                                            { type: 'Elbow', amount: Elbow },
                                            { type: 'Pipe', amount: Pipe },
                                            { type: 'Duct', amount: Duct },
                                            { type: 'Pump', amount: Pump },
                                            { type: 'Fan', amount: Fan },
                                            { type: 'SpaceHeater', amount: SpaceHeater },
                                            { type: 'AirTerminal', amount: AirTerminal },
                                            { type: 'Valve', amount: Valve },
                                            { type: 'Damper', amount: Damper },
                                            { type: 'Port', amount: Port },
                                            { type: 'Flow', amount: Flow },
                                            { type: 'Property', amount: Property },
                                            { type: 'System', amount: System },
                                            { type: 'Total', amount: total },
                                        ],
                                    };
                                    res.send(shaclObjects);
                                })
                                .catch((error) => {
                                    console.log(error);
                                });
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                })
                .catch((error) => {
                    console.log(error);
                });
        })
        .catch((error) => {
            console.log(error);
        });
};

let secondValidation = (res) => {
    axios
        .post('http://localhost:3030/ny-db/shacl?graph=default', HydraulicShapes, {
            headers: {
                'Content-Type': 'text/turtle',
                Accept: 'application/ld+json',
            },
        })
        .then((response) => {
            let shaclObject = {
                HeatExchanger: [],
                Tee: [],
                Transition: [],
                Pipe: [],
                Duct: [],
                Elbow: [],
                Pump: [],
                Fan: [],
                Port: [],
                Flow: [],
                Property: [],
                System: [],
                SpaceHeater: [],
                AirTerminal: [],
                Valve: [],
                Damper: [],
                Total: [],
            }; //
            console.log(response.data['@graph']);
            let counter = Object.keys(response.data['@graph']).length;
            for (let index in response.data['@graph']) {
                if (response.data['@graph'][index].resultMessage != null) {
                    if (response.data['@graph'][index].resultMessage[0] == 'HeatExchanger')
                        shaclObject.HeatExchanger.push({
                            id: `${response.data['@graph'][index].focusNode}`,
                            constrainType: `${response.data['@graph'][index].sourceConstraintComponent}`,
                            description: `${response.data['@graph'][index].resultMessage[1]}`,
                        });
                }
                if (response.data['@graph'][index].resultMessage != null) {
                    if (response.data['@graph'][index].resultMessage[0] == 'Transition')
                        shaclObject.Transition.push({
                            id: `${response.data['@graph'][index].focusNode}`,
                            constrainType: `${response.data['@graph'][index].sourceConstraintComponent}`,
                            description: `${response.data['@graph'][index].resultMessage[1]}`,
                        });
                }
                if (response.data['@graph'][index].resultMessage != null) {
                    if (response.data['@graph'][index].resultMessage[0] == 'Tee')
                        shaclObject.Tee.push({
                            id: `${response.data['@graph'][index].focusNode}`,
                            constrainType: `${response.data['@graph'][index].sourceConstraintComponent}`,
                            description: `${response.data['@graph'][index].resultMessage[1]}`,
                        });
                }
                if (response.data['@graph'][index].resultMessage != null) {
                    if (response.data['@graph'][index].resultMessage[0] == 'Pipe')
                        shaclObject.Pipe.push({
                            id: `${response.data['@graph'][index].focusNode}`,
                            constrainType: `${response.data['@graph'][index].sourceConstraintComponent}`,
                            description: `${response.data['@graph'][index].resultMessage[1]}`,
                        });
                }
                if (response.data['@graph'][index].resultMessage != null) {
                    if (response.data['@graph'][index].resultMessage[0] == 'Duct')
                        shaclObject.Duct.push({
                            id: `${response.data['@graph'][index].focusNode}`,
                            constrainType: `${response.data['@graph'][index].sourceConstraintComponent}`,
                            description: `${response.data['@graph'][index].resultMessage[1]}`,
                        });
                }
                if (response.data['@graph'][index].resultMessage != null) {
                    if (response.data['@graph'][index].resultMessage[0] == 'Elbow')
                        shaclObject.Elbow.push({
                            id: `${response.data['@graph'][index].focusNode}`,
                            constrainType: `${response.data['@graph'][index].sourceConstraintComponent}`,
                            description: `${response.data['@graph'][index].resultMessage[1]}`,
                        });
                }
                if (response.data['@graph'][index].resultMessage != null) {
                    if (response.data['@graph'][index].resultMessage[0] == 'Pump')
                        shaclObject.Pump.push({
                            id: `${response.data['@graph'][index].focusNode}`,
                            constrainType: `${response.data['@graph'][index].sourceConstraintComponent}`,
                            description: `${response.data['@graph'][index].resultMessage[1]}`,
                        });
                }
                if (response.data['@graph'][index].resultMessage != null) {
                    if (response.data['@graph'][index].resultMessage[0] == 'Fan')
                        shaclObject.Fan.push({
                            id: `${response.data['@graph'][index].focusNode}`,
                            constrainType: `${response.data['@graph'][index].sourceConstraintComponent}`,
                            description: `${response.data['@graph'][index].resultMessage[1]}`,
                        });
                }
                if (response.data['@graph'][index].resultMessage != null) {
                    if (response.data['@graph'][index].resultMessage[0] == 'Port')
                        shaclObject.Port.push({
                            id: `${response.data['@graph'][index].focusNode}`,
                            constrainType: `${response.data['@graph'][index].sourceConstraintComponent}`,
                            description: `${response.data['@graph'][index].resultMessage[1]}`,
                        });
                }
                if (response.data['@graph'][index].resultMessage != null) {
                    if (response.data['@graph'][index].resultMessage[0] == 'Flow')
                        shaclObject.Flow.push({
                            id: `${response.data['@graph'][index].focusNode}`,
                            constrainType: `${response.data['@graph'][index].sourceConstraintComponent}`,
                            description: `${response.data['@graph'][index].resultMessage[1]}`,
                        });
                }
                if (response.data['@graph'][index].resultMessage != null) {
                    if (response.data['@graph'][index].resultMessage[0] == 'Property')
                        shaclObject.Property.push({
                            id: `${response.data['@graph'][index].focusNode}`,
                            constrainType: `${response.data['@graph'][index].sourceConstraintComponent}`,
                            description: `${response.data['@graph'][index].resultMessage[1]}`,
                        });
                }
                if (response.data['@graph'][index].resultMessage != null) {
                    if (response.data['@graph'][index].resultMessage[0] == 'System')
                        shaclObject.System.push({
                            id: `${response.data['@graph'][index].focusNode}`,
                            constrainType: `${response.data['@graph'][index].sourceConstraintComponent}`,
                            description: `${response.data['@graph'][index].resultMessage[1]}`,
                        });
                }
                if (response.data['@graph'][index].resultMessage != null) {
                    if (response.data['@graph'][index].resultMessage[0] == 'SpaceHeater')
                        shaclObject.SpaceHeater.push({
                            id: `${response.data['@graph'][index].focusNode}`,
                            constrainType: `${response.data['@graph'][index].sourceConstraintComponent}`,
                            description: `${response.data['@graph'][index].resultMessage[1]}`,
                        });
                }
                if (response.data['@graph'][index].resultMessage != null) {
                    if (
                        response.data['@graph'][index].resultMessage[0] == 'MotorizedValve' ||
                        response.data['@graph'][index].resultMessage[0] == 'BalancingValve'
                    )
                        shaclObject.Valve.push({
                            id: `${response.data['@graph'][index].focusNode}`,
                            constrainType: `${response.data['@graph'][index].sourceConstraintComponent}`,
                            description: `${response.data['@graph'][index].resultMessage[1]}`,
                        });
                }
                if (response.data['@graph'][index].resultMessage != null) {
                    if (
                        response.data['@graph'][index].resultMessage[0] == 'MotorizedDamper' ||
                        response.data['@graph'][index].resultMessage[0] == 'BalancingDamper'
                    )
                        shaclObject.Damper.push({
                            id: `${response.data['@graph'][index].focusNode}`,
                            constrainType: `${response.data['@graph'][index].sourceConstraintComponent}`,
                            description: `${response.data['@graph'][index].resultMessage[1]}`,
                        });
                }
                if (response.data['@graph'][index].resultMessage != null) {
                    if (response.data['@graph'][index].resultMessage[0] == 'AirTerminal')
                        shaclObject.AirTerminal.push({
                            id: `${response.data['@graph'][index].focusNode}`,
                            constrainType: `${response.data['@graph'][index].sourceConstraintComponent}`,
                            description: `${response.data['@graph'][index].resultMessage[1]}`,
                        });
                    if (response.data['@graph'][index].resultMessage != null) {
                        shaclObject.Total.push({
                            id: `${response.data['@graph'][index].focusNode}`,
                            constrainType: `${response.data['@graph'][index].sourceConstraintComponent}`,
                            description: `${response.data['@graph'][index].resultMessage[1]}`,
                        });
                    }
                }
            }
            shaclObjects = { shaclObject };
            res.send(shaclObjects);
        })
        .catch((error) => {
            console.log(error);
        });
};

router.get('/hydraulicValidation', (req, res) => {
    secondValidation(res);
});

router.get('/hydraulicCalculation', async (req, res) => {
    //Get all Tee components and their meta-data from the database
    try {
        await sendTeesToDatabase();
        await sendRestToDatabase(res);
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
});
router.get('/flowHeadTable', (req, res, next) => {
    axios
        .all([
            // Get the type, ID and flow rate of each flow moving device
            axios.get(FlowMovingDeviceFlowRateQuery),
            //Get the total pressure drop of each fan
            axios.get(FanPressureDrop),
            //Get the total pressure drop of each pump

            axios.get(PumpPressureDrop),
        ])
        .then(
            axios.spread((response1, response2, response3) => {
                flowMovingDeviceFlow = [];
                for (let index in response1.data.results.bindings) {
                    flowMovingDeviceFlow.push([
                        response1.data.results.bindings[index].flowMovingDeviceType.value.replace(
                            'https://w3id.org/fpo#',
                            ''
                        ),
                        response1.data.results.bindings[index].flowMovingDevice.value.replace(
                            'https://example.com/inst#',
                            ''
                        ),
                        parseFloat(response1.data.results.bindings[index].totalFlow.value).toFixed(2),
                    ]);
                }

                flowMovingDevicePressure = [];
                for (let item in response2.data.results.bindings) {
                    flowMovingDevicePressure.push([
                        response2.data.results.bindings[item].fan.value.replace('https://example.com/inst#', ''),
                        parseFloat(response2.data.results.bindings[item].head.value).toFixed(7),
                    ]);
                }

                for (let index in response3.data.results.bindings) {
                    flowMovingDevicePressure.push([
                        response3.data.results.bindings[index].pump.value.replace('https://example.com/inst#', ''),
                        parseFloat(response3.data.results.bindings[index].head.value).toFixed(2),
                    ]);
                }

                for (let itemA in flowMovingDevicePressure) {
                    for (let itemB in flowMovingDeviceFlow) {
                        if (flowMovingDevicePressure[itemA][0] == flowMovingDeviceFlow[itemB][1]) {
                            flowMovingDeviceFlow[itemB].push(flowMovingDevicePressure[itemA][1]);
                        }
                    }
                }
                res.send(flowMovingDeviceFlow);
            })
        )
        .catch((err) => {
            console.log(err);
        });
});

router.get('/validationGraph', (req, res) => {
    axios
        .post('http://localhost:3030/ny-db/shacl?graph=default', AllShapes, {
            headers: {
                'Content-Type': 'text/turtle',
                Accept: 'application/ld+json',
            },
        })
        .then((response) => {
            let shaclObject = {
                HeatExchanger: [],
                Tee: [],
                Transition: [],
                Pipe: [],
                Duct: [],
                Elbow: [],
                Pump: [],
                Fan: [],
                Port: [],
                Flow: [],
                Property: [],
                System: [],
                SpaceHeater: [],
                AirTerminal: [],
                Valve: [],
                Damper: [],
                Total: [],
            }; //
            console.log(response.data['@graph']);
            let counter = Object.keys(response.data['@graph']).length;
            for (let index in response.data['@graph']) {
                if (response.data['@graph'][index].resultMessage != null) {
                    if (response.data['@graph'][index].resultMessage[0] == 'HeatExchanger')
                        shaclObject.HeatExchanger.push({
                            id: `${response.data['@graph'][index].focusNode}`,
                            constrainType: `${response.data['@graph'][index].sourceConstraintComponent}`,
                            description: `${response.data['@graph'][index].resultMessage[1]}`,
                        });
                }
                if (response.data['@graph'][index].resultMessage != null) {
                    if (response.data['@graph'][index].resultMessage[0] == 'Transition')
                        shaclObject.Transition.push({
                            id: `${response.data['@graph'][index].focusNode}`,
                            constrainType: `${response.data['@graph'][index].sourceConstraintComponent}`,
                            description: `${response.data['@graph'][index].resultMessage[1]}`,
                        });
                }
                if (response.data['@graph'][index].resultMessage != null) {
                    if (response.data['@graph'][index].resultMessage[0] == 'Tee')
                        shaclObject.Tee.push({
                            id: `${response.data['@graph'][index].focusNode}`,
                            constrainType: `${response.data['@graph'][index].sourceConstraintComponent}`,
                            description: `${response.data['@graph'][index].resultMessage[1]}`,
                        });
                }
                if (response.data['@graph'][index].resultMessage != null) {
                    if (response.data['@graph'][index].resultMessage[0] == 'Pipe')
                        shaclObject.Pipe.push({
                            id: `${response.data['@graph'][index].focusNode}`,
                            constrainType: `${response.data['@graph'][index].sourceConstraintComponent}`,
                            description: `${response.data['@graph'][index].resultMessage[1]}`,
                        });
                }
                if (response.data['@graph'][index].resultMessage != null) {
                    if (response.data['@graph'][index].resultMessage[0] == 'Duct')
                        shaclObject.Duct.push({
                            id: `${response.data['@graph'][index].focusNode}`,
                            constrainType: `${response.data['@graph'][index].sourceConstraintComponent}`,
                            description: `${response.data['@graph'][index].resultMessage[1]}`,
                        });
                }
                if (response.data['@graph'][index].resultMessage != null) {
                    if (response.data['@graph'][index].resultMessage[0] == 'Elbow')
                        shaclObject.Elbow.push({
                            id: `${response.data['@graph'][index].focusNode}`,
                            constrainType: `${response.data['@graph'][index].sourceConstraintComponent}`,
                            description: `${response.data['@graph'][index].resultMessage[1]}`,
                        });
                }
                if (response.data['@graph'][index].resultMessage != null) {
                    if (response.data['@graph'][index].resultMessage[0] == 'Pump')
                        shaclObject.Pump.push({
                            id: `${response.data['@graph'][index].focusNode}`,
                            constrainType: `${response.data['@graph'][index].sourceConstraintComponent}`,
                            description: `${response.data['@graph'][index].resultMessage[1]}`,
                        });
                }
                if (response.data['@graph'][index].resultMessage != null) {
                    if (response.data['@graph'][index].resultMessage[0] == 'Fan')
                        shaclObject.Fan.push({
                            id: `${response.data['@graph'][index].focusNode}`,
                            constrainType: `${response.data['@graph'][index].sourceConstraintComponent}`,
                            description: `${response.data['@graph'][index].resultMessage[1]}`,
                        });
                }
                if (response.data['@graph'][index].resultMessage != null) {
                    if (response.data['@graph'][index].resultMessage[0] == 'Port')
                        shaclObject.Port.push({
                            id: `${response.data['@graph'][index].focusNode}`,
                            constrainType: `${response.data['@graph'][index].sourceConstraintComponent}`,
                            description: `${response.data['@graph'][index].resultMessage[1]}`,
                        });
                }
                if (response.data['@graph'][index].resultMessage != null) {
                    if (response.data['@graph'][index].resultMessage[0] == 'Flow')
                        shaclObject.Flow.push({
                            id: `${response.data['@graph'][index].focusNode}`,
                            constrainType: `${response.data['@graph'][index].sourceConstraintComponent}`,
                            description: `${response.data['@graph'][index].resultMessage[1]}`,
                        });
                }
                if (response.data['@graph'][index].resultMessage != null) {
                    if (response.data['@graph'][index].resultMessage[0] == 'Property')
                        shaclObject.Property.push({
                            id: `${response.data['@graph'][index].focusNode}`,
                            constrainType: `${response.data['@graph'][index].sourceConstraintComponent}`,
                            description: `${response.data['@graph'][index].resultMessage[1]}`,
                        });
                }
                if (response.data['@graph'][index].resultMessage != null) {
                    if (response.data['@graph'][index].resultMessage[0] == 'System')
                        shaclObject.System.push({
                            id: `${response.data['@graph'][index].focusNode}`,
                            constrainType: `${response.data['@graph'][index].sourceConstraintComponent}`,
                            description: `${response.data['@graph'][index].resultMessage[1]}`,
                        });
                }
                if (response.data['@graph'][index].resultMessage != null) {
                    if (response.data['@graph'][index].resultMessage[0] == 'SpaceHeater')
                        shaclObject.SpaceHeater.push({
                            id: `${response.data['@graph'][index].focusNode}`,
                            constrainType: `${response.data['@graph'][index].sourceConstraintComponent}`,
                            description: `${response.data['@graph'][index].resultMessage[1]}`,
                        });
                }
                if (response.data['@graph'][index].resultMessage != null) {
                    if (
                        response.data['@graph'][index].resultMessage[0] == 'MotorizedValve' ||
                        response.data['@graph'][index].resultMessage[0] == 'BalancingValve'
                    )
                        shaclObject.Valve.push({
                            id: `${response.data['@graph'][index].focusNode}`,
                            constrainType: `${response.data['@graph'][index].sourceConstraintComponent}`,
                            description: `${response.data['@graph'][index].resultMessage[1]}`,
                        });
                }
                if (response.data['@graph'][index].resultMessage != null) {
                    if (
                        response.data['@graph'][index].resultMessage[0] == 'MotorizedDamper' ||
                        response.data['@graph'][index].resultMessage[0] == 'BalancingDamper'
                    )
                        shaclObject.Damper.push({
                            id: `${response.data['@graph'][index].focusNode}`,
                            constrainType: `${response.data['@graph'][index].sourceConstraintComponent}`,
                            description: `${response.data['@graph'][index].resultMessage[1]}`,
                        });
                }
                if (response.data['@graph'][index].resultMessage != null) {
                    if (response.data['@graph'][index].resultMessage[0] == 'AirTerminal')
                        shaclObject.AirTerminal.push({
                            id: `${response.data['@graph'][index].focusNode}`,
                            constrainType: `${response.data['@graph'][index].sourceConstraintComponent}`,
                            description: `${response.data['@graph'][index].resultMessage[1]}`,
                        });
                    if (response.data['@graph'][index].resultMessage != null) {
                        shaclObject.Total.push({
                            id: `${response.data['@graph'][index].focusNode}`,
                            constrainType: `${response.data['@graph'][index].sourceConstraintComponent}`,
                            description: `${response.data['@graph'][index].resultMessage[1]}`,
                        });
                    }
                }
            }
            shaclObjects = { shaclObject };
            res.send(shaclObjects);
        })
        .catch((error) => {
            console.log(error);
        });
});

router.get('/validationOverviewGraph', (req, res) => {
    axios
        .post('http://localhost:3030/ny-db/shacl?graph=default', AllShapes, {
            headers: {
                'Content-Type': 'text/turtle',
                Accept: 'application/ld+json',
            },
        })
        .then((response) => {
            //res.send(response.data)
            let total = 0;
            let HeatExchanger = 0;
            let Tee = 0;
            let Transition = 0;
            let Pipe = 0;
            let Duct = 0;
            let Elbow = 0;
            let Pump = 0;
            let Fan = 0;
            let Port = 0;
            let Flow = 0;
            let Property = 0;
            let System = 0;
            let SpaceHeater = 0;
            let Valve = 0;
            let Damper = 0;
            let AirTerminal = 0;

            for (let index in response.data['@graph']) {
                if (response.data['@graph'][index].resultMessage != null) {
                    if (response.data['@graph'][index].resultMessage[0] == 'HeatExchanger') {
                        HeatExchangerCounter++;
                    }
                    if (response.data['@graph'][index].resultMessage[0] == 'Transition') {
                        Transition++;
                    }
                    if (response.data['@graph'][index].resultMessage[0] == 'Pipe') {
                        Pipe++;
                    }
                    if (response.data['@graph'][index].resultMessage[0] == 'Duct') {
                        Duct++;
                    }
                    if (response.data['@graph'][index].resultMessage[0] == 'Elbow') {
                        Elbow++;
                    }
                    if (response.data['@graph'][index].resultMessage[0] == 'Pump') {
                        Pump++;
                    }
                    if (response.data['@graph'][index].resultMessage[0] == 'Fan') {
                        Fan++;
                    }
                    if (response.data['@graph'][index].resultMessage[0] == 'Port') {
                        Port++;
                    }
                    if (response.data['@graph'][index].resultMessage[0] == 'Flow') {
                        Flow++;
                    }
                    if (response.data['@graph'][index].resultMessage[0] == 'Property') {
                        Property++;
                    }
                    if (response.data['@graph'][index].resultMessage[0] == 'System') {
                        System++;
                    }
                    if (response.data['@graph'][index].resultMessage[0] == 'SpaceHeater') {
                        SpaceHeater++;
                    }
                    if (
                        response.data['@graph'][index].resultMessage[0] == 'BalancingValve' ||
                        response.data['@graph'][index].resultMessage[0] == 'MotorizedValve'
                    ) {
                        Valve++;
                    }
                    if (
                        response.data['@graph'][index].resultMessage[0] == 'BalancingDamper' ||
                        response.data['@graph'][index].resultMessage[0] == 'MotorizedDamper'
                    ) {
                        Damper++;
                    }
                    if (response.data['@graph'][index].resultMessage[0] == 'Tee') {
                        Tee++;
                    }
                    if (response.data['@graph'][index].resultMessage[0] == 'AirTerminal') {
                        AirTerminal++;
                    }
                    total++;
                }
            }

            let shaclObjects = {
                result: [
                    { type: 'HeatExchanger', amount: HeatExchanger },
                    { type: 'Transition', amount: Transition },
                    { type: 'Tee', amount: Tee },
                    { type: 'Elbow', amount: Elbow },
                    { type: 'Pipe', amount: Pipe },
                    { type: 'Duct', amount: Duct },
                    { type: 'Pump', amount: Pump },
                    { type: 'Fan', amount: Fan },
                    { type: 'SpaceHeater', amount: SpaceHeater },
                    { type: 'AirTerminal', amount: AirTerminal },
                    { type: 'Valve', amount: Valve },
                    { type: 'Damper', amount: Damper },
                    { type: 'Port', amount: Port },
                    { type: 'Flow', amount: Flow },
                    { type: 'Property', amount: Property },
                    { type: 'System', amount: System },
                    { type: 'Total', amount: total },
                ],
            };
            res.send(shaclObjects);
        })
        .catch((error) => {
            console.log(error);
        });
});

// // Add Data from Revit to Database
// router.post('/Bot', (req, res, next) => {
//     console.log(req.body);
//     // axios
//     //     .post('http://localhost:3030/ny-db/data', {
//     //         headers: {
//     //             'Content-Type': 'text/turtle',
//     //         },data:res.body
//     //     })
//     //     .catch((err) => {
//     //         console.log(err.response.data);
//     //     });
// });

router.post('/Bot', (req, res, next) => {
    console.log(typeof req.body);
    const Bot = req.body;
    axios
        .post('http://localhost:3030/ny-db/data', Bot, {
            headers: {
                'Content-Type': 'text/turtle',
            },
            maxContentLength: Infinity,
            maxBodyLength: Infinity,
        })
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
});

// router.post('/clearGraph', (req, res) => {
//     axios
//         .post('http://localhost:3030/ny-db/update', clearData, {
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded',
//             },
//         })
//         .then(function (response) {
//             console.log(JSON.stringify(response.data));
//         })
//         .catch(function (error) {
//             console.log(error);
//         });
// });

module.exports = router;
