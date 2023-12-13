var axios = require('axios');
var data = `@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
    @prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
    @prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
    @prefix bot: <https://w3id.org/bot#> .
    @prefix fso: <https://w3id.org/fso#> .
    @prefix inst: <https://example.com/inst#> .
    @prefix ex: <https://example.com/ex#> .
    @prefix fpo:<https://example.com/fpo#> .
    @prefix sh: <http://www.w3.org/ns/shacl#> .
    ex:PersonShape
    a sh:NodeShape ;
    sh:targetClass fso:Port ;    
    sh:property [                 
      sh:path fpo:massflow ;       
    sh:minCount 1 ;
            sh:maxCount 1 ;
    sh:datatype xsd:double ;
    ] ;
        sh:property [                 
      sh:path fpo:temperature ;
            sh:minCount 1 ;
            sh:maxCount 1 ;
            sh:datatype xsd:double ;
    ];
        sh:property [                 
      sh:path fpo:pressure ;
    sh:minCount 1 ;
            sh:maxCount 1 ;
    sh:datatype xsd:double ;
    ];
        sh:property [                 
      sh:path fpo:velocity ;
    sh:minCount 1 ;
            sh:maxCount 1 ;
    sh:datatype xsd:double ;
    ];
        sh:property [                 
      sh:path fpo:connectorType ;
    sh:minCount 1 ;
            sh:maxCount 1 ;
    sh:datatype xsd:string ;
    ];
        sh:property [                 
      sh:path fpo:shape ;
    sh:minCount 1 ;
            sh:maxCount 1 ;
    sh:datatype xsd:string ;
    ];
        sh:property [                 
      sh:path fpo:outerDiameter ;
    sh:minCount 1 ;
            sh:maxCount 1 ;
    sh:datatype xsd:double ;
    ];
        sh:property [                 
      sh:path fpo:crossSectionalArea ;
    sh:minCount 1 ;
            sh:maxCount 1 ;
    sh:datatype xsd:double ;
    ] .
    `;

var config = {
    method: 'post',
    url: 'http://127.0.0.1:3030/ny-db/shacl?graph=default',
    headers: {
        'Content-Type': 'text/turtle',
        Accept: 'application/ld+json',
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
