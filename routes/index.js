const express = require('express');
const router = express.Router();
const axios = require('axios');

/* GET home page */
router.get('/', (req, res, next) => {
    axios
        .get(
            'http://localhost:3030/test-db/query?query=prefix fso: <https://w3id.org/fso%23> \nconstruct from fso:data\nWHERE { ?p ?a ?n } ',
            {
                headers: {
                    Accept: 'application/ld+json',
                },
            }
        )
        .then((response) => {
            res.send(response.data);
        })
        .catch((err) => {
            console.log(err.response.data);
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
            }
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
