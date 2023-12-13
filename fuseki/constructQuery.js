const axios = require('axios');
const jsonld = require('jsonld');

var config = {
    method: 'get',
    url: 'http://127.0.0.1:3030/test-db/query?query=prefix bot:  <https://w3id.org/bot%23> \nprefix ex:   <https://example.com/ex%23> \nprefix fpo:  <https://example.com/fpo%23> \nprefix fso:  <https://w3id.org/fso%23> \nprefix inst: <https://example.com/inst%23> \nprefix rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns%23> \nprefix rdfs: <http://www.w3.org/2000/01/rdf-schema%23> \nprefix xsd:  <http://www.w3.org/2001/XMLSchema%23> \n\nSelect ?port\nWHERE {{\n  Graph fso:data\n{\n?port a fso:Port .}\n}}',
    headers: {},
};

axios(config)
    .then(function (response) {
        newData = response.data;
        console.log(JSON.stringify(newData));
    })
    .catch(function (error) {
        console.log(error);
    });
