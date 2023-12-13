var axios = require('axios');
var data = `@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
    @prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
    @prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
    @prefix bot: <https://w3id.org/bot#> .
    @prefix fso: <https://w3id.org/fso#> .
    @prefix inst: <https://example.com/inst#> .
    @prefix ex: <https://example.com/ex#> .
    @prefix fpo:<https://example.com/fpo#> .
    inst:Pipe-34-Port-1 a fso:Port ; 
    fpo:massflow "0.03"^^xsd:double ;
    fpo:temperature "70"^^xsd:double ;
    fpo:pressure "50"^^xsd:double ;
    fpo:velocity "0.0471"^^xsd:double ; 
    fpo:connectorType "inlet"^^xsd:double;
    fpo:shape "round"^^xsd:double ;
    fpo:outerDiameter "0.0162"^^xsd:double ;
    fpo:crossSectionalArea "0.0002"^^xsd:double .
    inst:Pipe-34-Port-2 a fso:Port ; 
    fpo:temperature "45"^^xsd:double ;
    fpo:pressure "50"^^xsd:double ;
    fpo:velocity "0.0471"^^xsd:double ; 
    fpo:connectorType "outlet"^^xsd:double;
    fpo:shape "round"^^xsd:double ;
    fpo:outerDiameter "0.0162"^^xsd:double ;
    fpo:crossSectionalArea "0.0002"^^xsd:double .`;

var config = {
    method: 'post',
    url: 'http://127.0.0.1:3030/test-db/data?graph=https://w3id.org/fso%23data',
    headers: {
        'Content-Type': 'text/turtle',
    },
    data: data,
};

axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
    });
