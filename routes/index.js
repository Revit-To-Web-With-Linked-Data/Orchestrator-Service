const express = require('express');
const router = express.Router();
const axios = require('axios');
const fs = require('fs');

let AllShapes = fs.readFileSync('./public/ShaclShapes/AllShapes.ttl', 'utf8');

let baseUrl = 'http://localhost:3030/ny-db/query?query=';

let FlowMovingDeviceFlowRateQuery =
    baseUrl + encodeURIComponent(fs.readFileSync('./public/Queries/FlowMovingDeviceFlowRate.ttl'));

let FanPressureDrop = baseUrl + encodeURIComponent(fs.readFileSync('./public/Queries/FanPressureDrop.ttl'));
let PumpPressureDrop = baseUrl + encodeURIComponent(fs.readFileSync('./public/Queries/PumpPressureDrop.ttl'));

//Get all rooms at /
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
                            'http://w3id.org/fpo#',
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
            let shaclObject = []; // console.log(typeof response.data);
            //res.send(response.data)
            let counter = Object.keys(response.data['@graph']).length;
            for (let index in response.data['@graph']) {
                if (response.data['@graph'][index].resultMessage != null) {
                    shaclObject.push({
                        id: `${response.data['@graph'][index].focusNode}`,
                        constrainType: `${response.data['@graph'][index].sourceConstraintComponent}`,
                        description: `${response.data['@graph'][index].resultMessage[1]}`,
                    });
                }
            }
            console.log(counter);
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
            let total =0;
            let HeatExchangerCounter = 0;
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
            let BalancingValve = 0;
            let BalancingDamper = 0;
            let MotorizedValve = 0;
            let MotorizedDamper = 0;
            let Tee = 0;
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
                    if (response.data['@graph'][index].resultMessage[0] == 'BalancingValve') {
                        BalancingValve++;
                    }
                    if (response.data['@graph'][index].resultMessage[0] == 'BalancingDamper') {
                        BalancingDamper++;
                    }
                    if (response.data['@graph'][index].resultMessage[0] == 'MotorizedValve') {
                        MotorizedValve++;
                    }
                    if (response.data['@graph'][index].resultMessage[0] == 'MotorizedDamper') {
                        MotorizedDamper++;
                    }
                    if (response.data['@graph'][index].resultMessage[0] == 'Tee') {
                        Tee++;
                    }
                    if (response.data['@graph'][index].resultMessage[0] == 'AirTerminal') {
                        AirTerminal++;
                    }
                    total++
                }
            }

            let shaclObjects = {
                result: [
                    { type: 'HeatExchangerCounter', amount: HeatExchangerCounter },
                    { type: 'Transition', amount: Transition },
                    { type: 'Pipe', amount: Pipe },
                    { type: 'Duct', amount: Duct },
                    { type: 'Elbow', amount: Elbow },
                    { type: 'Pump', amount: Pump },
                    { type: 'Fan', amount: Fan },
                    { type: 'Port', amount: Port },
                    { type: 'Flow', amount: Flow },
                    { type: 'Property', amount: Property },
                    { type: 'System', amount: System },
                    { type: 'SpaceHeater', amount: SpaceHeater },
                    { type: 'BalancingValve', amount: BalancingValve },
                    { type: 'BalancingDamper', amount: BalancingDamper },
                    { type: 'MotorizedValve', amount: MotorizedValve },
                    { type: 'MotorizedDamper', amount: MotorizedDamper },
                    { type: 'Tee', amount: Tee },
                    { type: 'AirTerminal', amount: AirTerminal },
                    { type: 'Total', amount: total },
                ],
            };
            res.send(shaclObjects);
        })
        .catch((error) => {
            console.log(error);
        });
});

//Add Data from Revit to Database
// router.post('/Bot', (req, res, next) => {
//     console.log(typeof req.body);
//   const Bot = JSON.stringify(req.body);
//   const test ="@prefix ex: <https://example.com/ex#> ."
//     axios
//         .post('http://localhost:3030/ny-db/data', {
//             headers: {
//                 'Content-Type': 'text/turtle',
//             },data:test
//         })
//         .catch((err) => {
//             console.log(err.response.data);
//         });
// });

router.post('/Bot', (req, res, next) => {
    console.log(typeof req.body);
    const Bot = req.body;
    // var data ='@prefix ex: <https://example.com/ex#> .\r\n@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .\r\n\r\n\r\nex:Alice\r\n\ta ex:Person ;\r\n\tex:ssn "987-65-432A" .\r\n  \r\nex:Bob\r\n\ta ex:Person ;\r\n\tex:ssn "123-45-6789" ;\r\n\tex:ssn "124-35-6789" .\r\n  \r\nex:Calvin\r\n\ta ex:Person ;\r\n\tex:birthDate "1971-07-07"^^xsd:date ;\r\n\tex:worksFor ex:UntypedCompany .';
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
    // var data =
    //     '@prefix ex: <https://example.com/ex#> .\r\n@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .\r\n\r\n\r\nex:Alice\r\n\ta ex:Person ;\r\n\tex:ssn "987-65-432A" .\r\n  \r\nex:Bob\r\n\ta ex:Person ;\r\n\tex:ssn "123-45-6789" ;\r\n\tex:ssn "124-35-6789" .\r\n  \r\nex:Calvin\r\n\ta ex:Person ;\r\n\tex:birthDate "1971-07-07"^^xsd:date ;\r\n\tex:worksFor ex:UntypedCompany .';

    // var config = {
    //     method: 'post',
    //     url: 'http://localhost:3030/ny-db/data',
    //     headers: {
    //         'Content-Type': 'text/turtle',
    //     },
    //     data: data,
    // };

    // axios(config)
    //     .then(function (response) {
    //         console.log(JSON.stringify(response.data));
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     });
});

module.exports = router;
