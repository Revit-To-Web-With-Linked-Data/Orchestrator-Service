var axios = require('axios');

var config = {
    method: 'get',
    url: 'http://127.0.0.1:3030/test-db/query?query=prefix fso: <https://w3id.org/fso%23> \nSELECT * from fso:data\nWHERE { ?p ?a ?n } ',
    headers: {},
};

axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
    });
