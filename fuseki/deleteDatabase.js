var axios = require('axios');

var config = {
    method: 'delete',
    url: 'http://localhost:3030/$/datasets/myTest',
    headers: {},
};

axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
    });
