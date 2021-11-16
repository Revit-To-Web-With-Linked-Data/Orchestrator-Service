var axios = require('axios');

function buildConfig(dsName, dbLocation) {
    return `@prefix :      <http://base/#> .
    @prefix rdf:   <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
    @prefix tdb2:  <http://jena.apache.org/2016/tdb#> .
    @prefix ja:    <http://jena.hpl.hp.com/2005/11/Assembler#> .
    @prefix rdfs:  <http://www.w3.org/2000/01/rdf-schema#> .
    @prefix fuseki: <http://jena.apache.org/fuseki#> .
    tdb2:DatasetTDB  rdfs:subClassOf  ja:RDFDataset .
    ja:DatasetTxnMem  rdfs:subClassOf  ja:RDFDataset .
    <http://jena.hpl.hp.com/2008/tdb#DatasetTDB>
            rdfs:subClassOf  ja:RDFDataset .
    ja:ViewGraph  rdfs:subClassOf  ja:Model .
    <http://jena.hpl.hp.com/2008/tdb#GraphTDB>
            rdfs:subClassOf  ja:Model .
    tdb2:GraphTDB2  rdfs:subClassOf  ja:Model .
    ja:MemoryDataset  rdfs:subClassOf  ja:RDFDataset .
    ja:RDFDatasetZero  rdfs:subClassOf  ja:RDFDataset .
    <http://jena.apache.org/text#TextDataset>
            rdfs:subClassOf  ja:RDFDataset .
    :service_tdb_all  a                   fuseki:Service ;
            rdfs:label                    "TDB2 ${dsName}" ;
            fuseki:dataset                :tdb_dataset_readwrite ;
            fuseki:name                   "${dsName}" ;
            fuseki:endpoint [
                  fuseki:operation fuseki:query ;
                fuseki:name "sparql"
          ] , [
                  fuseki:operation fuseki:query ;
                fuseki:name "query"
          ] , [
                  fuseki:operation fuseki:shacl ;
                fuseki:name "shacl"
          ] , [
                  fuseki:operation fuseki:update ;
                fuseki:name "update"
          ] , [
                  fuseki:operation fuseki:gsp-r ;
                fuseki:name "get"
          ] , [
                  fuseki:operation fuseki:gsp-rw ;
                fuseki:name "data"
          ] , [
                  fuseki:operation fuseki:upload ;
                fuseki:name "upload"
          ] .
    :tdb_dataset_readwrite
            a              tdb2:DatasetTDB2 ;
            tdb2:location  "${dbLocation}${dsName}" .
    tdb2:GraphTDB  rdfs:subClassOf  ja:Model .
    ja:RDFDatasetOne  rdfs:subClassOf  ja:RDFDataset .
    ja:RDFDatasetSink  rdfs:subClassOf  ja:RDFDataset .
    tdb2:DatasetTDB2  rdfs:subClassOf  ja:RDFDataset .`;
}
let database = buildConfig(
    'myTest',
    'C:UsersalikucDesktopcodingProjects/revitToWebWithLinkedDataexpress-server/fusekiapache-jena-fuseki-4.2.0/run/configuration/'
);

var config = {
    method: 'post',
    url: 'http://localhost:3030/$/datasets',
    headers: {
        'Content-Type': 'text/turtle',
    },
    data: database,
};

axios(config)
    .then(function (response) {
        console.log('createdDatabase');
    })
    .catch(function (error) {
        console.log(error);
    });
