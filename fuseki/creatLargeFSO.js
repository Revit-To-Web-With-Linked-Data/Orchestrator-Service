var axios = require('axios');
var data = `@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
@prefix bot: <https://w3id.org/bot#> .
@prefix fso: <https://w3id.org/fso#> .
@prefix inst: <https://example.com/inst#> .
@prefix ex: <https://example.com/ex#> .
@prefix fpo:<https://example.com/fpo#> .
#How supply system is connected
##A-S components
inst:HeatExchanger-1 fso:suppliesFluidTo inst:Pipe-1 .
inst:Pipe-1 fso:suppliesFluidTo inst:Pump-1 .
inst:Pump-1 fso:suppliesFluidTo inst:Pipe-2 .
inst:Pipe-2 fso:suppliesFluidTo inst:Fitting-1 .
inst:Fitting-1 fso:suppliesFluidTo inst:Pipe-3 .
inst:Pipe-3 fso:suppliesFluidTo inst:Fitting-2 .
inst:Fitting-2 fso:suppliesFluidTo inst:Pipe-4 .
inst:Pipe-4 fso:suppliesFluidTo inst:Fitting-3 .
##A-S ports
inst:HeatExchanger-1-Port-4 fso:suppliesFluidTo inst:Pipe-1-Port-1 .
inst:Pipe-1-Port-2 fso:suppliesFluidTo inst:Pump-1-Port-1 .
inst:Pump-1-Port-2 fso:suppliesFluidTo inst:Pipe-2-Port-1 .
inst:Pipe-2-Port-2 fso:suppliesFluidTo inst:Fitting-1-Port-1 .
inst:Fitting-1-Port-2 fso:suppliesFluidTo inst:Pipe-3-Port-1 .
inst:Pipe-3-Port-2 fso:suppliesFluidTo inst:Fitting-2-Port-1 .
inst:Fitting-2-Port-2 fso:suppliesFluidTo inst:Pipe-4-Port-1 .
inst:Pipe-4-Port-2 fso:suppliesFluidTo inst:Fitting-3-Port-1 .
##A.1-S components
inst:Fitting-2 fso:suppliesFluidTo inst:Pipe-11 .
inst:Pipe-11 fso:suppliesFluidTo inst:Fitting-7 .
inst:Fitting-7 fso:suppliesFluidTo inst:Pipe-12 .
inst:Pipe-12 fso:suppliesFluidTo inst:Terminal-1 .
inst:Fitting-7 fso:suppliesFluidTo inst:Pipe-13 .
inst:Pipe-13 fso:suppliesFluidTo inst:Fitting-8 .
inst:Fitting-8 fso:suppliesFluidTo inst:Pipe-14 .
inst:Pipe-14 fso:suppliesFluidTo inst:Terminal-2 .
inst:Fitting-8 fso:suppliesFluidTo inst:Pipe-15 .
inst:Pipe-15 fso:suppliesFluidTo inst:Fitting-9 .
inst:Fitting-9 fso:suppliesFluidTo inst:Pipe-16 .
inst:Pipe-16 fso:suppliesFluidTo inst:Terminal-3 .
##A.1-S ports
inst:Fitting-2-Port-3 fso:suppliesFluidTo inst:Pipe-11-Port-1 .
inst:Pipe-11-Port-2 fso:suppliesFluidTo inst:Fitting-7-Port-1 .
inst:Fitting-7-Port-3 fso:suppliesFluidTo inst:Pipe-12-Port-1 .
inst:Pipe-12-Port-2 fso:suppliesFluidTo inst:Terminal-1-Port-1 .
inst:Fitting-7-Port-2 fso:suppliesFluidTo inst:Pipe-13-Port-1 .
inst:Pipe-13-Port-2 fso:suppliesFluidTo inst:Fitting-8-Port-1 .
inst:Fitting-8-Port-3 fso:suppliesFluidTo inst:Pipe-14-Port-1 .
inst:Pipe-14-Port-2 fso:suppliesFluidTo inst:Terminal-2-Port-1 .
inst:Fitting-8-Port-2 fso:suppliesFluidTo inst:Pipe-15-Port-1 .
inst:Pipe-15-Port-2 fso:suppliesFluidTo inst:Fitting-9-Port-1 .
inst:Fitting-9-Port-2 fso:suppliesFluidTo inst:Pipe-16-Port-1 .
inst:Pipe-16-Port-2 fso:suppliesFluidTo inst:Terminal-3-Port-1 .
##A.2-S components
inst:Fitting-3 fso:suppliesFluidTo inst:Pipe-5 .
inst:Pipe-5 fso:suppliesFluidTo inst:Fitting-4 .
inst:Fitting-4 fso:suppliesFluidTo inst:Pipe-6 .
inst:Pipe-6 fso:suppliesFluidTo inst:Terminal-4 .
inst:Fitting-4 fso:suppliesFluidTo inst:Pipe-7 .
inst:Pipe-7 fso:suppliesFluidTo inst:Fitting-5 .
inst:Fitting-5 fso:suppliesFluidTo inst:Pipe-8 .
inst:Pipe-8 fso:suppliesFluidTo inst:Terminal-5 .
inst:Fitting-5 fso:suppliesFluidTo inst:Pipe-9 .
inst:Pipe-9 fso:suppliesFluidTo inst:Fitting-6 .
inst:Fitting-6 fso:suppliesFluidTo inst:Pipe-10 .
inst:Pipe-10 fso:suppliesFluidTo inst:Terminal-6 .
##A.2-S ports
inst:Fitting-3-Port-2 fso:suppliesFluidTo inst:Pipe-5-Port-1 .
inst:Pipe-5-Port-2 fso:suppliesFluidTo inst:Fitting-4-Port-1 .
inst:Fitting-4-Port-3 fso:suppliesFluidTo inst:Pipe-6-Port-1 .
inst:Pipe-6-Port-2 fso:suppliesFluidTo inst:Terminal-4-Port-1 .
inst:Fitting-4-Port-2 fso:suppliesFluidTo inst:Pipe-7-Port-1 .
inst:Pipe-7-Port-2 fso:suppliesFluidTo inst:Fitting-5-Port-1 .
inst:Fitting-5-Port-3 fso:suppliesFluidTo inst:Pipe-8-Port-1 .
inst:Pipe-8-Port-2 fso:suppliesFluidTo inst:Terminal-5-Port-1 .
inst:Fitting-5-Port-2 fso:suppliesFluidTo inst:Pipe-9-Port-1 .
inst:Pipe-9-Port-2 fso:suppliesFluidTo inst:Fitting-6-Port-1 .
inst:Fitting-6-Port-2 fso:suppliesFluidTo inst:Pipe-10-Port-1 .
inst:Pipe-10-Port-2 fso:suppliesFluidTo inst:Terminal-6-Port-1 .
#How return system is connected
##A-R components
inst:Fitting-12 fso:returnsFluidTo inst:Pipe-20 .
inst:Pipe-20 fso:returnsFluidTo inst:Fitting-11 .
inst:Fitting-11 fso:returnsFluidTo inst:Pipe-19 .
inst:Pipe-19 fso:returnsFluidTo inst:Fitting-10 .
inst:Fitting-10 fso:returnsFluidTo inst:Pipe-18 .
inst:Pipe-18 fso:returnsFluidTo inst:RegulationValve-1 .
inst:RegulationValve-1 fso:returnsFluidTo inst:Pipe-17 .
inst:Pipe-17 fso:returnsFluidTo inst:HeatExchanger-1 .
##A-R ports
inst:Fitting-12-Port-2 fso:returnsFluidTo inst:Pipe-20-Port-1 .
inst:Pipe-20-Port-2 fso:returnsFluidTo inst:Fitting-11-Port-1 .
inst:Fitting-11-Port-2 fso:returnsFluidTo inst:Pipe-19-Port-1 .
inst:Pipe-19-Port-2 fso:returnsFluidTo inst:Fitting-10-Port-1 .
inst:Fitting-10-Port-2 fso:returnsFluidTo inst:Pipe-18-Port-1 .
inst:Pipe-18-Port-2 fso:returnsFluidTo inst:RegulationValve-1-Port-1 .
inst:RegulationValve-1-Port-2 fso:returnsFluidTo inst:Pipe-17-Port-1 .
inst:Pipe-17-Port-2 fso:returnsFluidTo inst:HeatExchanger-1-Port-4 .
##A.1-R components
inst:Terminal-3 fso:returnsFluidTo inst:Pipe-40 .
inst:Pipe-40 fso:returnsFluidTo inst:RegulationValve-5 .
inst:RegulationValve-5 fso:returnsFluidTo inst:Pipe-39 .
inst:Pipe-39 fso:returnsFluidTo inst:Fitting-18 .
inst:Fitting-18 fso:returnsFluidTo inst:Pipe-38 .
inst:Pipe-38 fso:returnsFluidTo inst:Fitting-17 .
inst:Terminal-2 fso:returnsFluidTo inst:Pipe-37 .
inst:Pipe-37 fso:returnsFluidTo inst:RegulationValve-4 .
inst:RegulationValve-4 fso:returnsFluidTo inst:Pipe-36 .
inst:Pipe-36 fso:returnsFluidTo inst:Fitting-17 .
inst:Fitting-17 fso:returnsFluidTo inst:Pipe-35 .
inst:Pipe-35 fso:returnsFluidTo inst:Fitting-16 .
inst:Terminal-1 fso:returnsFluidTo inst:Pipe-34 .
inst:Pipe-34 fso:returnsFluidTo inst:RegulationValve-3 .
inst:RegulationValve-3 fso:returnsFluidTo inst:Pipe-33 .
inst:Pipe-33 fso:returnsFluidTo inst:Fitting-16 .
inst:Fitting-16 fso:returnsFluidTo inst:Pipe-32 .
inst:Pipe-32 fso:returnsFluidTo inst:RegulationValve-2 .
inst:RegulationValve-2 fso:returnsFluidTo inst:Pipe-31 .
inst:Pipe-31 fso:returnsFluidTo inst:Fitting-11 .
##A.1-R components
inst:Terminal-3-Port-2 fso:returnsFluidTo inst:Pipe-40-Port-1 .
inst:Pipe-40-Port-2 fso:returnsFluidTo inst:RegulationValve-5-Port-1 .
inst:RegulationValve-5-Port-2 fso:returnsFluidTo inst:Pipe-39-Port-1 .
inst:Pipe-39-Port-2 fso:returnsFluidTo inst:Fitting-18-Port-1 .
inst:Fitting-18-Port-2 fso:returnsFluidTo inst:Pipe-38-Port-1 .
inst:Pipe-38-Port-2 fso:returnsFluidTo inst:Fitting-17-Port-1 .
inst:Terminal-2-Port-2 fso:returnsFluidTo inst:Pipe-37-Port-1 .
inst:Pipe-37-Port-2 fso:returnsFluidTo inst:RegulationValve-4-Port-1 .
inst:RegulationValve-4-Port-2 fso:returnsFluidTo inst:Pipe-36-Port-1 .
inst:Pipe-36-Port-2 fso:returnsFluidTo inst:Fitting-17-Port-3 .
inst:Fitting-17-Port-2 fso:returnsFluidTo inst:Pipe-35-Port-1 .
inst:Pipe-35-Port-2 fso:returnsFluidTo inst:Fitting-16-Port-1 .
inst:Terminal-1-Port-2 fso:returnsFluidTo inst:Pipe-34-Port-1 .
inst:Pipe-34-Port-2 fso:returnsFluidTo inst:RegulationValve-3-Port-1 .
inst:RegulationValve-3-Port-2 fso:returnsFluidTo inst:Pipe-33-Port-1 .
inst:Pipe-33-Port-2 fso:returnsFluidTo inst:Fitting-16-Port-3 .
inst:Fitting-16-Port-2 fso:returnsFluidTo inst:Pipe-32-Port-1 .
inst:Pipe-32-Port-2 fso:returnsFluidTo inst:RegulationValve-2-Port-1 .
inst:RegulationValve-2-Port-2 fso:returnsFluidTo inst:Pipe-31-Port-1 .
inst:Pipe-31-Port-2 fso:returnsFluidTo inst:Fitting-11-Port-3 .
##A.2-R components
inst:Terminal-6 fso:returnsFluidTo inst:Pipe-30 .
inst:Pipe-30 fso:returnsFluidTo inst:RegulationValve-9 .
inst:RegulationValve-9 fso:returnsFluidTo inst:Pipe-29 .
inst:Pipe-29 fso:returnsFluidTo inst:Fitting-15 .
inst:Fitting-15 fso:returnsFluidTo inst:Pipe-28 .
inst:Pipe-28 fso:returnsFluidTo inst:Fitting-14 .
inst:Terminal-5 fso:returnsFluidTo inst:Pipe-27 .
inst:Pipe-27 fso:returnsFluidTo inst:RegulationValve-8 .
inst:RegulationValve-8 fso:returnsFluidTo inst:Pipe-26 .
inst:Pipe-26 fso:returnsFluidTo inst:Fitting-14 .
inst:Fitting-14 fso:returnsFluidTo inst:Pipe-25 .
inst:Pipe-25 fso:returnsFluidTo inst:Fitting-13 .
inst:Terminal-4 fso:returnsFluidTo inst:Pipe-24 .
inst:Pipe-24 fso:returnsFluidTo inst:RegulationValve-7 .
inst:RegulationValve-7 fso:returnsFluidTo inst:Pipe-23 .
inst:Pipe-23 fso:returnsFluidTo inst:Fitting-13 .
inst:Fitting-13 fso:returnsFluidTo inst:Pipe-22 .
inst:Pipe-22 fso:returnsFluidTo inst:RegulationValve-6 .
inst:RegulationValve-6 fso:returnsFluidTo inst:Pipe-21 .
inst:Pipe-21 fso:returnsFluidTo inst:Fitting-12 .
##A.2-R ports
inst:Terminal-6-Port-2 fso:returnsFluidTo inst:Pipe-30-Port-1 .
inst:Pipe-30-Port-2 fso:returnsFluidTo inst:RegulationValve-9-Port-1 .
inst:RegulationValve-9-Port-2 fso:returnsFluidTo inst:Pipe-29-Port-1 .
inst:Pipe-29-Port-2 fso:returnsFluidTo inst:Fitting-15-Port-1 .
inst:Fitting-15-Port-2 fso:returnsFluidTo inst:Pipe-28-Port-1 .
inst:Pipe-28-Port-2 fso:returnsFluidTo inst:Fitting-14-Port-1 .
inst:Terminal-5-Port-2 fso:returnsFluidTo inst:Pipe-27-Port-1 .
inst:Pipe-27-Port-2 fso:returnsFluidTo inst:RegulationValve-8-Port-1 .
inst:RegulationValve-8-Port-2 fso:returnsFluidTo inst:Pipe-26-Port-1 .
inst:Pipe-26-Port-2 fso:returnsFluidTo inst:Fitting-14-Port-3 .
inst:Fitting-14-Port-2 fso:returnsFluidTo inst:Pipe-25-Port-1 .
inst:Pipe-25-Port-2 fso:returnsFluidTo inst:Fitting-13-Port-1 .
inst:Terminal-4-Port-2 fso:returnsFluidTo inst:Pipe-24-Port-1 .
inst:Pipe-24-Port-2 fso:returnsFluidTo inst:RegulationValve-7-Port-1 .
inst:RegulationValve-7-Port-2 fso:returnsFluidTo inst:Pipe-23-Port-1 .
inst:Pipe-23-Port-2 fso:returnsFluidTo inst:Fitting-13-Port-3 .
inst:Fitting-13-Port-2 fso:returnsFluidTo inst:Pipe-22-Port-1 .
inst:Pipe-22-Port-2 fso:returnsFluidTo inst:RegulationValve-6-Port-1 .
inst:RegulationValve-6-Port-2 fso:returnsFluidTo inst:Pipe-21-Port-1 .
inst:Pipe-21-Port-2 fso:returnsFluidTo inst:Fitting-12-Port-1 .
#Components
##HeatExchangers
inst:HeatExchanger-1 a fpo:HeatExchanger ;
fpo:hasPort inst:HeatExchanger-1-Port-1,
inst:HeatExchanger-1-Port-2,
inst:HeatExchanger-1-Port-3,
inst:HeatExchanger-1-Port-4;
fpo:UAvalue "42"^^xsd:double; 
fpo:heatloss "42"^^xsd:double .
inst:HeatExchanger-1-Port-1 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double . 
inst:HeatExchanger-1-Port-2 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "40"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "outlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double . 
inst:HeatExchanger-1-Port-3 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "60"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double . 
inst:HeatExchanger-1-Port-4 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "45"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "outlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double . 
fpo:HeatExchanger rdfs:subClassOf fso:EnergyConversionDevice.
#Terminals
inst:Terminal-1 a fpo:SpaceHeater ;
fpo:hasPort inst:Terminal-1-Port-1,
inst:Terminal-1-Port-2;
fpo:designRoomTemperature "20"^^xsd:double ; 
fpo:designPower "500"^^xsd:double ; 
fpo:height "0.5"^^xsd:double ; 
fpo:length "1"^^xsd:double ; 
fpo:depth "0.03"^^xsd:double . 
inst:Terminal-1-Port-1 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double . 
inst:Terminal-1-Port-2 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "45"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double . 
inst:Terminal-2 a fpo:SpaceHeater ;
fpo:hasPort inst:Terminal-2-Port-1,
inst:Terminal-2-Port-2;
fpo:designRoomTemperature "20"^^xsd:double ; 
fpo:designPower "500"^^xsd:double ; 
fpo:height "0.5"^^xsd:double ; 
fpo:length "1"^^xsd:double ; 
fpo:depth "0.03"^^xsd:double . 
inst:Terminal-2-Port-1 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double . 
inst:Terminal-2-Port-2 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "45"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double . 
inst:Terminal-3 a fpo:SpaceHeater ;
fpo:hasPort inst:Terminal-3-Port-1,
inst:Terminal-3-Port-2;
fpo:designRoomTemperature "20"^^xsd:double ; 
fpo:designPower "500"^^xsd:double ; 
fpo:height "0.5"^^xsd:double ; 
fpo:length "1"^^xsd:double ; 
fpo:depth "0.03"^^xsd:double . 
inst:Terminal-3-Port-1 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double . 
inst:Terminal-3-Port-2 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "45"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double . 
inst:Terminal-4 a fpo:SpaceHeater ;
fpo:hasPort inst:Terminal-4-Port-1,
inst:Terminal-4-Port-2;
fpo:designRoomTemperature "20"^^xsd:double ; 
fpo:designPower "500"^^xsd:double ; 
fpo:height "0.5"^^xsd:double ; 
fpo:length "1"^^xsd:double ; 
fpo:depth "0.03"^^xsd:double . 
inst:Terminal-4-Port-1 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double . 
inst:Terminal-4-Port-2 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "45"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double . 
inst:Terminal-5 a fpo:SpaceHeater ;
fpo:hasPort inst:Terminal-5-Port-1,
inst:Terminal-5-Port-2;
fpo:designRoomTemperature "20"^^xsd:double ; 
fpo:designPower "500"^^xsd:double ; 
fpo:height "0.5"^^xsd:double ; 
fpo:length "1"^^xsd:double ; 
fpo:depth "0.03"^^xsd:double . 
inst:Terminal-5-Port-1 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double . 
inst:Terminal-5-Port-2 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "45"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double . 
inst:Terminal-6 a fpo:SpaceHeater ;
fpo:hasPort inst:Terminal-6-Port-1,
inst:Terminal-6-Port-2;
fpo:designRoomTemperature "20"^^xsd:double ; 
fpo:designPower "500"^^xsd:double ; 
fpo:height "0.5"^^xsd:double ; 
fpo:length "1"^^xsd:double ; 
fpo:depth "0.03"^^xsd:double . 
inst:Terminal-6-Port-1 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double . 
inst:Terminal-6-Port-2 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "45"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double . 
fpo:SpaceHeater rdfs:subClassOf fso:Terminal .
##FlowController
inst:RegulationValve-1 a fpo:BalancingValve ; 
fpo:hasPort inst:RegulationValve-1-Port-1,
inst:RegulationValve-1-Port-2;
fpo:kv "0.03"^^xsd:double ; 
fpo:kvs "0.063"^^xsd:double ; #Når den står helt åben
fpo:materialClass "VMA-ventil"^^xsd:string .
inst:RegulationValve-1-Port-1 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double . 
inst:RegulationValve-1-Port-2 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "45"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "outlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double . 
inst:RegulationValve-2 a fpo:BalancingValve ; 
fpo:hasPort inst:RegulationValve-2-Port-1,
inst:RegulationValve-2-Port-2;
fpo:kv "0.03"^^xsd:double ; 
fpo:kvs "0.063"^^xsd:double ; 
fpo:materialClass "VMA-ventil"^^xsd:string .
inst:RegulationValve-2-Port-1 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double . 
inst:RegulationValve-2-Port-2 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "45"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "outlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double . 
inst:RegulationValve-3 a fpo:BalancingValve ; 
fpo:hasPort inst:RegulationValve-3-Port-1,
inst:RegulationValve-3-Port-2;
fpo:kv "0.03"^^xsd:double ; 
fpo:kvs "0.063"^^xsd:double ; 
fpo:materialClass "VMA-ventil"^^xsd:string .
inst:RegulationValve-3-Port-1 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double . 
inst:RegulationValve-3-Port-2 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "45"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "outlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double . 
inst:RegulationValve-4 a fpo:BalancingValve ; 
fpo:hasPort inst:RegulationValve-4-Port-1,
inst:RegulationValve-4-Port-2;
fpo:kv "0.03"^^xsd:double ; 
fpo:kvs "0.063"^^xsd:double ; 
fpo:materialClass "VMA-ventil"^^xsd:string .
inst:RegulationValve-4-Port-1 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double . 
inst:RegulationValve-4-Port-2 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "45"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "outlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double . 
inst:RegulationValve-5 a fpo:BalancingValve ; 
fpo:hasPort inst:RegulationValve-5-Port-1,
inst:RegulationValve-5-Port-2;
fpo:kv "0.03"^^xsd:double ; 
fpo:kvs "0.063"^^xsd:double ; 
fpo:materialClass "VMA-ventil"^^xsd:string .
inst:RegulationValve-5-Port-1 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double . 
inst:RegulationValve-5-Port-2 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "45"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "outlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double . 
inst:RegulationValve-6 a fpo:BalancingValve ; 
fpo:hasPort inst:RegulationValve-6-Port-1,
inst:RegulationValve-6-Port-2;
fpo:kv "0.03"^^xsd:double ; 
fpo:kvs "0.063"^^xsd:double ; 
fpo:materialClass "VMA-ventil"^^xsd:string .
inst:RegulationValve-6-Port-1 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double . 
inst:RegulationValve-6-Port-2 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "45"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "outlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double . 
inst:RegulationValve-7 a fpo:BalancingValve ; 
fpo:hasPort inst:RegulationValve-7-Port-1,
inst:RegulationValve-7-Port-2;
fpo:kv "0.03"^^xsd:double ; 
fpo:kvs "0.063"^^xsd:double ; 
fpo:materialClass "VMA-ventil"^^xsd:string .
inst:RegulationValve-7-Port-1 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double . 
inst:RegulationValve-7-Port-2 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "45"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "outlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double . 
inst:RegulationValve-8 a fpo:BalancingValve ;
fpo:hasPort inst:RegulationValve-8-Port-1,
inst:RegulationValve-8-Port-2; 
fpo:kv "0.03"^^xsd:double ; 
fpo:kvs "0.063"^^xsd:double ; 
fpo:materialClass "VMA-ventil"^^xsd:string .
inst:RegulationValve-8-Port-1 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double . 
inst:RegulationValve-8-Port-2 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "45"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "outlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double . 
inst:RegulationValve-9 a fpo:BalancingValve ; 
fpo:hasPort inst:RegulationValve-9-Port-1,
inst:RegulationValve-9-Port-2;
fpo:kv "0.03"^^xsd:double ; 
fpo:kvs "0.063"^^xsd:double ; 
fpo:materialClass "VMA-ventil"^^xsd:string .
inst:RegulationValve-9-Port-1 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double . 
inst:RegulationValve-9-Port-2 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "45"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "outlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double . 
fpo:BalancingValve rdfs:subClassOf fso:FlowController .
##FlowMovingDevice
inst:Pump-1 a fpo:Pump ; 
fpo:hasPort inst:Pump-1-Port-1,
inst:Pump-1-Port-2;
ex:hasName "ALPHA2 15-80 130"^^xsd:string ; 
fpo:head "4"^^xsd:integer ; 
fpo:controlMode "ConstantSpeed"^^xsd:string ; 
fpo:powerCurve "[[0.1 m3/h, 10 W],[0.3 m3/h, 30 W]]"^^xsd:string ;
fpo:pressureCurve "[[0.1 m3/h, 5 Pa],[0.3 m3/h, 40 Pa]]"^^xsd:string .
inst:Pump-1-Port-1 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double . 
inst:Pump-1-Port-2 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "45"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "outlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double . 
fpo:Pump rdfs:subClassOf fso:FlowMovingDevice .
##Pipes
inst:Pipe-1 a fpo:Pipe ;
fpo:hasPort inst:Pipe-1-Port-1,
inst:Pipe-1-Port-1;
fpo:thermalConductivity "15"^^xsd:double ; 
fpo:roughness "0.001"^^xsd:double ; 
fpo:length "15"^^xsd:double ;
fpo:wallThickness "0.0049"^^xsd:double ; 
fpo:materialType ex:copper ;
fpo:materialClass "M 1/2 RG"^^xsd:string .
inst:Pipe-1-Port-1 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double . 
inst:Pipe-1-Port-2 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "45"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "outlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double . 
inst:Pipe-2 a fpo:Pipe ;
fpo:hasPort inst:Pipe-2-Port-1,
inst:Pipe-2-Port-2 ;
fpo:thermalConductivity "15"^^xsd:double ; 
fpo:roughness "0.001"^^xsd:double ; 
fpo:length "15"^^xsd:double ;
fpo:wallThickness "0.0049"^^xsd:double ; 
fpo:materialType ex:copper ;
fpo:materialClass "M 1/2 RG"^^xsd:string .
inst:Pipe-2-Port-1 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double . 
inst:Pipe-2-Port-2 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "45"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "outlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double . 
inst:Pipe-3 a fpo:Pipe ;
fpo:hasPort inst:Pipe-3-Port-1,
inst:Pipe-3-Port-2;
fpo:thermalConductivity "15"^^xsd:double ; 
fpo:roughness "0.001"^^xsd:double ; 
fpo:length "15"^^xsd:double ;
fpo:wallThickness "0.0049"^^xsd:double ; 
fpo:materialType ex:copper ;
fpo:materialClass "M 1/2 RG"^^xsd:string .
inst:Pipe-3-Port-1 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double . 
inst:Pipe-3-Port-2 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "45"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "outlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double . 
inst:Pipe-4 a fpo:Pipe ;
fpo:hasPort inst:Pipe-4-Port-1,
inst:Pipe-4-Port-2;
fpo:thermalConductivity "15"^^xsd:double ; 
fpo:roughness "0.001"^^xsd:double ; 
fpo:length "15"^^xsd:double ;
fpo:wallThickness "0.0049"^^xsd:double ; 
fpo:materialType ex:copper ;
fpo:materialClass "M 1/2 RG"^^xsd:string .
inst:Pipe-4-Port-1 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double . 
inst:Pipe-4-Port-2 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "45"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "outlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double . 
inst:Pipe-5 a fpo:Pipe ;
fpo:hasPort inst:Pipe-5-Port-1,
inst:Pipe-5-Port-2;
fpo:thermalConductivity "15"^^xsd:double ; 
fpo:roughness "0.001"^^xsd:double ; 
fpo:length "15"^^xsd:double ;
fpo:wallThickness "0.0049"^^xsd:double ; 
fpo:materialType ex:copper ;
fpo:materialClass "M 1/2 RG"^^xsd:string .
inst:Pipe-5-Port-1 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double . 
inst:Pipe-5-Port-2 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "45"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "outlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double . 
inst:Pipe-6 a fpo:Pipe ;
fpo:hasPort inst:Pipe-6-Port-1,
inst:Pipe-6-Port-2;
fpo:thermalConductivity "15"^^xsd:double ; 
fpo:roughness "0.001"^^xsd:double ; 
fpo:length "15"^^xsd:double ;
fpo:wallThickness "0.0049"^^xsd:double ; 
fpo:materialType ex:copper ;
fpo:materialClass "M 1/2 RG"^^xsd:string .
inst:Pipe-6-Port-1 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Pipe-6-Port-2 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "45"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "outlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Pipe-7 a fpo:Pipe ;
fpo:hasPort inst:Pipe-7-Port-1,
inst:Pipe-7-Port-2;
fpo:thermalConductivity "15"^^xsd:double ; 
fpo:roughness "0.001"^^xsd:double ; 
fpo:length "15"^^xsd:double ;
fpo:wallThickness "0.0049"^^xsd:double ; 
fpo:materialType ex:copper ;
fpo:materialClass "M 1/2 RG"^^xsd:string .
inst:Pipe-7-Port-1 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Pipe-7-Port-2 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "45"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "outlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Pipe-8 a fpo:Pipe ;
fpo:hasPort inst:Pipe-8-Port-1 ,
inst:Pipe-8-Port-2;
fpo:thermalConductivity "15"^^xsd:double ; 
fpo:roughness "0.001"^^xsd:double ; 
fpo:length "15"^^xsd:double ;
fpo:wallThickness "0.0049"^^xsd:double ; 
fpo:materialType ex:copper ;
fpo:materialClass "M 1/2 RG"^^xsd:string .
inst:Pipe-8-Port-1 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Pipe-8-Port-2 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "45"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "outlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Pipe-9 a fpo:Pipe ;
fpo:hasPort inst:Pipe-9-Port-1,
inst:Pipe-9-Port-2;
fpo:thermalConductivity "15"^^xsd:double ; 
fpo:roughness "0.001"^^xsd:double ; 
fpo:length "15"^^xsd:double ;
fpo:wallThickness "0.0049"^^xsd:double ; 
fpo:materialType ex:copper ;
fpo:materialClass "M 1/2 RG"^^xsd:string .
inst:Pipe-9-Port-1 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Pipe-9-Port-2 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "45"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "outlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Pipe-10 a fpo:Pipe ;
fpo:hasPort inst:Pipe-10-Port-1,
inst:Pipe-10-Port-2;
fpo:thermalConductivity "15"^^xsd:double ; 
fpo:roughness "0.001"^^xsd:double ; 
fpo:length "15"^^xsd:double ;
fpo:wallThickness "0.0049"^^xsd:double ; 
fpo:materialType ex:copper ;
fpo:materialClass "M 1/2 RG"^^xsd:string .
inst:Pipe-10-Port-1 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Pipe-10-Port-2 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "45"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "outlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Pipe-11 a fpo:Pipe ;
fpo:hasPort inst:Pipe-11-Port-1,
inst:Pipe-11-Port-2;
fpo:thermalConductivity "15"^^xsd:double ; 
fpo:roughness "0.001"^^xsd:double ; 
fpo:length "15"^^xsd:double ;
fpo:wallThickness "0.0049"^^xsd:double ; 
fpo:materialType ex:copper ;
fpo:materialClass "M 1/2 RG"^^xsd:string .
inst:Pipe-11-Port-1 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Pipe-11-Port-2 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "45"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "outlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Pipe-12 a fpo:Pipe ;
fpo:hasPort inst:Pipe-12-Port-1,
inst:Pipe-12-Port-2;
fpo:thermalConductivity "15"^^xsd:double ; 
fpo:roughness "0.001"^^xsd:double ; 
fpo:length "15"^^xsd:double ;
fpo:wallThickness "0.0049"^^xsd:double ; 
fpo:materialType ex:copper ;
fpo:materialClass "M 1/2 RG"^^xsd:string .
inst:Pipe-12-Port-1 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Pipe-12-Port-2 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "45"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "outlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Pipe-13 a fpo:Pipe ;
fpo:hasPort inst:Pipe-13-Port-1 ,
inst:Pipe-13-Port-2;
fpo:thermalConductivity "15"^^xsd:double ; 
fpo:roughness "0.001"^^xsd:double ; 
fpo:length "15"^^xsd:double ;
fpo:wallThickness "0.0049"^^xsd:double ; 
fpo:materialType ex:copper ;
fpo:materialClass "M 1/2 RG"^^xsd:string .
inst:Pipe-13-Port-1 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Pipe-13-Port-2 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "45"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "outlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Pipe-14 a fpo:Pipe ;
fpo:hasPort inst:Pipe-14-Port-1,
inst:Pipe-14-Port-2;
fpo:thermalConductivity "15"^^xsd:double ; 
fpo:roughness "0.001"^^xsd:double ; 
fpo:length "15"^^xsd:double ;
fpo:wallThickness "0.0049"^^xsd:double ; 
fpo:materialType ex:copper ;
fpo:materialClass "M 1/2 RG"^^xsd:string .
inst:Pipe-14-Port-1 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Pipe-14-Port-2 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "45"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "outlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Pipe-15 a fpo:Pipe ;
fpo:hasPort inst:Pipe-15-Port-1,
inst:Pipe-15-Port-2;
fpo:thermalConductivity "15"^^xsd:double ; 
fpo:roughness "0.001"^^xsd:double ; 
fpo:length "15"^^xsd:double ;
fpo:wallThickness "0.0049"^^xsd:double ; 
fpo:materialType ex:copper ;
fpo:materialClass "M 1/2 RG"^^xsd:string .
inst:Pipe-15-Port-1 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Pipe-15-Port-2 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "45"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "outlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Pipe-16 a fpo:Pipe ;
fpo:hasPort inst:Pipe-16-Port-1,
inst:Pipe-16-Port-2;
fpo:thermalConductivity "15"^^xsd:double ; 
fpo:roughness "0.001"^^xsd:double ; 
fpo:length "15"^^xsd:double ;
fpo:wallThickness "0.0049"^^xsd:double ; 
fpo:materialType ex:copper ;
fpo:materialClass "M 1/2 RG"^^xsd:string .
inst:Pipe-16-Port-1 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Pipe-16-Port-2 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "45"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "outlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Pipe-17 a fpo:Pipe ;
fpo:hasPort inst:Pipe-17-Port-1,
inst:Pipe-17-Port-2;
fpo:thermalConductivity "15"^^xsd:double ; 
fpo:roughness "0.001"^^xsd:double ; 
fpo:length "15"^^xsd:double ;
fpo:wallThickness "0.0049"^^xsd:double ; 
fpo:materialType ex:copper ;
fpo:materialClass "M 1/2 RG"^^xsd:string .
inst:Pipe-17-Port-1 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Pipe-17-Port-2 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "45"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "outlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Pipe-18 a fpo:Pipe ;
fpo:hasPort inst:Pipe-18-Port-1,
inst:Pipe-18-Port-2;
fpo:thermalConductivity "15"^^xsd:double ; 
fpo:roughness "0.001"^^xsd:double ; 
fpo:length "15"^^xsd:double ;
fpo:wallThickness "0.0049"^^xsd:double ; 
fpo:materialType ex:copper ;
fpo:materialClass "M 1/2 RG"^^xsd:string .
inst:Pipe-18-Port-1 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Pipe-18-Port-2 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "45"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "outlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Pipe-19 a fpo:Pipe ;
fpo:hasPort inst:Pipe-19-Port-1,
inst:Pipe-19-Port-2;
fpo:thermalConductivity "15"^^xsd:double ; 
fpo:roughness "0.001"^^xsd:double ; 
fpo:length "15"^^xsd:double ;
fpo:wallThickness "0.0049"^^xsd:double ; 
fpo:materialType ex:copper ;
fpo:materialClass "M 1/2 RG"^^xsd:string .
inst:Pipe-19-Port-1 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Pipe-19-Port-2 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "45"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "outlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Pipe-20 a fpo:Pipe ;
fpo:hasPort inst:Pipe-20-Port-1,
inst:Pipe-20-Port-2;
fpo:thermalConductivity "15"^^xsd:double ; 
fpo:roughness "0.001"^^xsd:double ; 
fpo:length "15"^^xsd:double ;
fpo:wallThickness "0.0049"^^xsd:double ; 
fpo:materialType ex:copper ;
fpo:materialClass "M 1/2 RG"^^xsd:string .
inst:Pipe-20-Port-1 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Pipe-20-Port-2 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "45"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "outlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Pipe-21 a fpo:Pipe ;
fpo:hasPort inst:Pipe-21-Port-1,
inst:Pipe-21-Port-2;
fpo:thermalConductivity "15"^^xsd:double ; 
fpo:roughness "0.001"^^xsd:double ; 
fpo:length "15"^^xsd:double ;
fpo:wallThickness "0.0049"^^xsd:double ; 
fpo:materialType ex:copper ;
fpo:materialClass "M 1/2 RG"^^xsd:string .
inst:Pipe-21-Port-1 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Pipe-21-Port-2 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "45"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "outlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Pipe-22 a fpo:Pipe ;
fpo:hasPort inst:Pipe-22-Port-1,
inst:Pipe-22-Port-2;
fpo:thermalConductivity "15"^^xsd:double ; 
fpo:roughness "0.001"^^xsd:double ; 
fpo:length "15"^^xsd:double ;
fpo:wallThickness "0.0049"^^xsd:double ; 
fpo:materialType ex:copper ;
fpo:materialClass "M 1/2 RG"^^xsd:string .
inst:Pipe-22-Port-1 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Pipe-22-Port-2 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "45"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "outlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Pipe-23 a fpo:Pipe ;
fpo:hasPort inst:Pipe-23-Port-1,
inst:Pipe-23-Port-2;
fpo:thermalConductivity "15"^^xsd:double ; 
fpo:roughness "0.001"^^xsd:double ; 
fpo:length "15"^^xsd:double ;
fpo:wallThickness "0.0049"^^xsd:double ; 
fpo:materialType ex:copper ;
fpo:materialClass "M 1/2 RG"^^xsd:string .
inst:Pipe-23-Port-1 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Pipe-23-Port-2 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "45"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "outlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Pipe-24 a fpo:Pipe ;
fpo:hasPort inst:Pipe-24-Port-1,
inst:Pipe-24-Port-2;
fpo:thermalConductivity "15"^^xsd:double ; 
fpo:roughness "0.001"^^xsd:double ; 
fpo:length "15"^^xsd:double ;
fpo:wallThickness "0.0049"^^xsd:double ; 
fpo:materialType ex:copper ;
fpo:materialClass "M 1/2 RG"^^xsd:string .
inst:Pipe-24-Port-1 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Pipe-24-Port-2 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "45"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "outlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Pipe-25 a fpo:Pipe ;
fpo:hasPort inst:Pipe-25-Port-1,
inst:Pipe-25-Port-2;
fpo:thermalConductivity "15"^^xsd:double ; 
fpo:roughness "0.001"^^xsd:double ; 
fpo:length "15"^^xsd:double ;
fpo:wallThickness "0.0049"^^xsd:double ; 
fpo:materialType ex:copper ;
fpo:materialClass "M 1/2 RG"^^xsd:string .
inst:Pipe-25-Port-1 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Pipe-25-Port-2 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "45"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "outlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Pipe-26 a fpo:Pipe ;
fpo:hasPort inst:Pipe-26-Port-1,
inst:Pipe-26-Port-2;
fpo:thermalConductivity "15"^^xsd:double ; 
fpo:roughness "0.001"^^xsd:double ; 
fpo:length "15"^^xsd:double ;
fpo:wallThickness "0.0049"^^xsd:double ; 
fpo:materialType ex:copper ;
fpo:materialClass "M 1/2 RG"^^xsd:string .
inst:Pipe-26-Port-1 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Pipe-26-Port-2 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "45"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "outlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Pipe-27 a fpo:Pipe ;
fpo:hasPort inst:Pipe-27-Port-1,
inst:Pipe-27-Port-2;
fpo:thermalConductivity "15"^^xsd:double ; 
fpo:roughness "0.001"^^xsd:double ; 
fpo:length "15"^^xsd:double ;
fpo:wallThickness "0.0049"^^xsd:double ; 
fpo:materialType ex:copper ;
fpo:materialClass "M 1/2 RG"^^xsd:string .
inst:Pipe-27-Port-1 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Pipe-27-Port-2 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "45"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "outlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Pipe-28 a fpo:Pipe ;
fpo:hasPort inst:Pipe-28-Port-1,
inst:Pipe-28-Port-2;
fpo:thermalConductivity "15"^^xsd:double ; 
fpo:roughness "0.001"^^xsd:double ; 
fpo:length "15"^^xsd:double ;
fpo:wallThickness "0.0049"^^xsd:double ; 
fpo:materialType ex:copper ;
fpo:materialClass "M 1/2 RG"^^xsd:string .
inst:Pipe-28-Port-1 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Pipe-28-Port-2 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "45"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "outlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Pipe-29 a fpo:Pipe ;
fpo:hasPort inst:Pipe-29-Port-1,
inst:Pipe-29-Port-2;
fpo:thermalConductivity "15"^^xsd:double ; 
fpo:roughness "0.001"^^xsd:double ; 
fpo:length "15"^^xsd:double ;
fpo:wallThickness "0.0049"^^xsd:double ; 
fpo:materialType ex:copper ;
fpo:materialClass "M 1/2 RG"^^xsd:string .
inst:Pipe-29-Port-1 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Pipe-29-Port-2 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "45"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "outlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Pipe-30 a fpo:Pipe ;
fpo:hasPort inst:Pipe-30-Port-1,
inst:Pipe-30-Port-2;
fpo:thermalConductivity "15"^^xsd:double ; 
fpo:roughness "0.001"^^xsd:double ; 
fpo:length "15"^^xsd:double ;
fpo:wallThickness "0.0049"^^xsd:double ; 
fpo:materialType ex:copper ;
fpo:materialClass "M 1/2 RG"^^xsd:string .
inst:Pipe-30-Port-1 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Pipe-30-Port-2 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "45"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "outlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Pipe-31 a fpo:Pipe ;
fpo:hasPort inst:Pipe-31-Port-1,
inst:Pipe-31-Port-2;
fpo:thermalConductivity "15"^^xsd:double ; 
fpo:roughness "0.001"^^xsd:double ; 
fpo:length "15"^^xsd:double ;
fpo:wallThickness "0.0049"^^xsd:double ; 
fpo:materialType ex:copper ;
fpo:materialClass "M 1/2 RG"^^xsd:string .
inst:Pipe-31-Port-1 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Pipe-31-Port-2 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "45"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "outlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Pipe-32 a fpo:Pipe ;
fpo:hasPort inst:Pipe-32-Port-1,
inst:Pipe-32-Port-2;
fpo:thermalConductivity "15"^^xsd:double ; 
fpo:roughness "0.001"^^xsd:double ; 
fpo:length "15"^^xsd:double ;
fpo:wallThickness "0.0049"^^xsd:double ; 
fpo:materialType ex:copper ;
fpo:materialClass "M 1/2 RG"^^xsd:string .
inst:Pipe-32-Port-1 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Pipe-32-Port-2 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "45"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "outlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Pipe-33 a fpo:Pipe ;
fpo:hasPort inst:Pipe-33-Port-1,
inst:Pipe-33-Port-2;
fpo:thermalConductivity "15"^^xsd:double ; 
fpo:roughness "0.001"^^xsd:double ; 
fpo:length "15"^^xsd:double ;
fpo:wallThickness "0.0049"^^xsd:double ; 
fpo:materialType ex:copper ;
fpo:materialClass "M 1/2 RG"^^xsd:string .
inst:Pipe-33-Port-1 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Pipe-33-Port-2 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "45"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "outlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Pipe-34 a fpo:Pipe ;
fpo:hasPort inst:Pipe-34-Port-1,
inst:Pipe-34-Port-2;
fpo:thermalConductivity "15"^^xsd:double ; 
fpo:roughness "0.001"^^xsd:double ; 
fpo:length "15"^^xsd:double ;
fpo:wallThickness "0.0049"^^xsd:double ; 
fpo:materialType ex:copper ;
fpo:materialClass "M 1/2 RG"^^xsd:string .
inst:Pipe-34-Port-1 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Pipe-34-Port-2 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "45"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "outlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Pipe-35 a fpo:Pipe ;
fpo:hasPort inst:Pipe-35-Port-1,
inst:Pipe-35-Port-2;
fpo:thermalConductivity "15"^^xsd:double ; 
fpo:roughness "0.001"^^xsd:double ; 
fpo:length "15"^^xsd:double ;
fpo:wallThickness "0.0049"^^xsd:double ; 
fpo:materialType ex:copper ;
fpo:materialClass "M 1/2 RG"^^xsd:string .
inst:Pipe-35-Port-1 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Pipe-35-Port-2 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "45"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "outlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Pipe-36 a fpo:Pipe ;
fpo:hasPort inst:Pipe-36-Port-1,
inst:Pipe-36-Port-2;
fpo:thermalConductivity "15"^^xsd:double ; 
fpo:roughness "0.001"^^xsd:double ; 
fpo:length "15"^^xsd:double ;
fpo:wallThickness "0.0049"^^xsd:double ; 
fpo:materialType ex:copper ;
fpo:materialClass "M 1/2 RG"^^xsd:string .
inst:Pipe-36-Port-1 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Pipe-36-Port-2 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "45"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "outlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Pipe-37 a fpo:Pipe ;
fpo:hasPort inst:Pipe-37-Port-1,
inst:Pipe-37-Port-2;
fpo:thermalConductivity "15"^^xsd:double ; 
fpo:roughness "0.001"^^xsd:double ; 
fpo:length "15"^^xsd:double ;
fpo:wallThickness "0.0049"^^xsd:double ; 
fpo:materialType ex:copper ;
fpo:materialClass "M 1/2 RG"^^xsd:string .
inst:Pipe-37-Port-1 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Pipe-37-Port-2 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "45"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "outlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Pipe-38 a fpo:Pipe ;
fpo:hasPort inst:Pipe-38-Port-1,
inst:Pipe-38-Port-2;
fpo:thermalConductivity "15"^^xsd:double ; 
fpo:roughness "0.001"^^xsd:double ; 
fpo:length "15"^^xsd:double ;
fpo:wallThickness "0.0049"^^xsd:double ; 
fpo:materialType ex:copper ;
fpo:materialClass "M 1/2 RG"^^xsd:string .
inst:Pipe-38-Port-1 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Pipe-38-Port-2 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "45"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "outlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Pipe-39 a fpo:Pipe ;
fpo:hasPort inst:Pipe-39-Port-1,
inst:Pipe-39-Port-2;
fpo:thermalConductivity "15"^^xsd:double ; 
fpo:roughness "0.001"^^xsd:double ; 
fpo:length "15"^^xsd:double ;
fpo:wallThickness "0.0049"^^xsd:double ; 
fpo:materialType ex:copper ;
fpo:materialClass "M 1/2 RG"^^xsd:string .
inst:Pipe-39-Port-1 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Pipe-39-Port-2 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "45"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "outlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Pipe-40 a fpo:Pipe ;
fpo:hasPort inst:Pipe-40-Port-1,
inst:Pipe-40-Port-2;
fpo:thermalConductivity "15"^^xsd:double ; 
fpo:roughness "0.001"^^xsd:double ; 
fpo:length "15"^^xsd:double ;
fpo:wallThickness "0.0049"^^xsd:double ; 
fpo:materialType ex:copper ;
fpo:materialClass "M 1/2 RG"^^xsd:string .
inst:Pipe-40-Port-1 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Pipe-40-Port-2 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "45"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "outlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
fpo:Pipe rdfs:subClassOf fso:Segment .
#Tee
inst:Fitting-2 a fpo:Tee ;
fpo:hasPort inst:Fitting-2-Port-1,
inst:Fitting-2-Port-2,
inst:Fitting-2-Port-3;
fpo:thermalConductivity "15"^^xsd:double ; 
fpo:wallThickness "0.0049"^^xsd:double ; 
fpo:materialType ex:copper ; 
fpo:materialClass "M 1/2 RG"^^xsd:string .
inst:Fitting-2-Port-1 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Fitting-2-Port-2 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "45"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:zeta "1"^^xsd:int ; 
fpo:connectorType "outlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Fitting-2-Port-3 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:zeta "2"^^xsd:int ; 
fpo:connectorType "outlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Fitting-4 a fpo:Tee ;
fpo:hasPort inst:Fitting-4-Port-1,
inst:Fitting-4-Port-2,
inst:Fitting-4-Port-3;
fpo:thermalConductivity "15"^^xsd:double ; 
fpo:wallThickness "0.0049"^^xsd:double ; 
fpo:materialType ex:copper ; 
fpo:materialClass "M 1/2 RG"^^xsd:string .
inst:Fitting-4-Port-1 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Fitting-4-Port-2 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "45"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:zeta "1"^^xsd:int ; 
fpo:connectorType "outlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Fitting-4-Port-3 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:zeta "2"^^xsd:int ; 
fpo:connectorType "outlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Fitting-5 a fpo:Tee ;
fpo:hasPort inst:Fitting-5-Port-1,
inst:Fitting-5-Port-2,
inst:Fitting-5-Port-3;
fpo:thermalConductivity "15"^^xsd:double ; 
fpo:wallThickness "0.0049"^^xsd:double ; 
fpo:materialType ex:copper ; 
fpo:materialClass "M 1/2 RG"^^xsd:string .
inst:Fitting-5-Port-1 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Fitting-5-Port-2 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "45"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:zeta "1"^^xsd:int ; 
fpo:connectorType "outlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Fitting-5-Port-3 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:zeta "2"^^xsd:int ; 
fpo:connectorType "outlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Fitting-7 a fpo:Tee ;
fpo:hasPort inst:Fitting-7-Port-1,
inst:Fitting-7-Port-2,
inst:Fitting-7-Port-3;
fpo:thermalConductivity "15"^^xsd:double ; 
fpo:wallThickness "0.0049"^^xsd:double ; 
fpo:materialType ex:copper ; 
fpo:materialClass "M 1/2 RG"^^xsd:string .
inst:Fitting-7-Port-1 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Fitting-7-Port-2 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "45"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:zeta "1"^^xsd:int ; 
fpo:connectorType "outlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Fitting-7-Port-3 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:zeta "2"^^xsd:int ; 
fpo:connectorType "outlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Fitting-8 a fpo:Tee ;
fpo:hasPort inst:Fitting-8-Port-1,
inst:Fitting-8-Port-2,
inst:Fitting-8-Port-3;
fpo:thermalConductivity "15"^^xsd:double ; 
fpo:wallThickness "0.0049"^^xsd:double ; 
fpo:materialType ex:copper ; 
fpo:materialClass "M 1/2 RG"^^xsd:string .
inst:Fitting-8-Port-1 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Fitting-8-Port-2 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "45"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:zeta "1"^^xsd:int ; 
fpo:connectorType "outlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Fitting-8-Port-3 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:zeta "2"^^xsd:int ; 
fpo:connectorType "outlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Fitting-11 a fpo:Tee ;
fpo:hasPort inst:Fitting-11-Port-1,
inst:Fitting-11-Port-2,
inst:Fitting-11-Port-3;
fpo:thermalConductivity "15"^^xsd:double ; 
fpo:wallThickness "0.0049"^^xsd:double ; 
fpo:materialType ex:copper ; 
fpo:materialClass "M 1/2 RG"^^xsd:string .
inst:Fitting-11-Port-1 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Fitting-11-Port-2 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "45"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:zeta "1"^^xsd:int ; 
fpo:connectorType "outlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Fitting-11-Port-3 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Fitting-13 a fpo:Tee ;
fpo:hasPort inst:Fitting-13-Port-1,
inst:Fitting-13-Port-2,
inst:Fitting-13-Port-3;
fpo:thermalConductivity "15"^^xsd:double ; 
fpo:wallThickness "0.0049"^^xsd:double ; 
fpo:materialType ex:copper ; 
fpo:materialClass "M 1/2 RG"^^xsd:string .
inst:Fitting-13-Port-1 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Fitting-13-Port-2 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "45"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:zeta "1"^^xsd:int ; 
fpo:connectorType "outlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Fitting-13-Port-3 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Fitting-14 a fpo:Tee ;
fpo:hasPort inst:Fitting-14-Port-1,
inst:Fitting-14-Port-2,
inst:Fitting-14-Port-3;
fpo:thermalConductivity "15"^^xsd:double ; 
fpo:wallThickness "0.0049"^^xsd:double ; 
fpo:materialType ex:copper ; 
fpo:materialClass "M 1/2 RG"^^xsd:string .
inst:Fitting-14-Port-1 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Fitting-14-Port-2 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "45"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:zeta "1"^^xsd:int ; 
fpo:connectorType "outlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Fitting-14-Port-3 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Fitting-16 a fpo:Tee ;
fpo:hasPort inst:Fitting-16-Port-1,
inst:Fitting-16-Port-2,
inst:Fitting-16-Port-3;
fpo:thermalConductivity "15"^^xsd:double ; 
fpo:wallThickness "0.0049"^^xsd:double ; 
fpo:materialType ex:copper ; 
fpo:materialClass "M 1/2 RG"^^xsd:string .
inst:Fitting-16-Port-1 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Fitting-16-Port-2 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "45"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:zeta "1"^^xsd:int ; 
fpo:connectorType "outlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Fitting-16-Port-3 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Fitting-17 a fpo:Tee ;
fpo:hasPort inst:Fitting-17-Port-1,
inst:Fitting-17-Port-2,
inst:Fitting-17-Port-3;
fpo:thermalConductivity "15"^^xsd:double ; 
fpo:wallThickness "0.0049"^^xsd:double ; 
fpo:materialType ex:copper ; 
fpo:materialClass "M 1/2 RG"^^xsd:string .
inst:Fitting-17-Port-1 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Fitting-17-Port-2 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "45"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:zeta "1"^^xsd:int ; 
fpo:connectorType "outlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Fitting-17-Port-3 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
fpo:Tee rdfs:subClassOf fso:Fitting .
#Elbow
inst:Fitting-1 a fso:Elbow ; 
fpo:hasPort inst:Fitting-1-Port-1,
inst:Fitting-1-Port-2;
fpo:thermalConductivity "15 "^^xsd:double ; 
fpo:wallThickness "0.0049"^^xsd:double ;  
fpo:materialType ex:copper ;
fpo:materialClass "M 1/2 RG"^^xsd:string ; 
fpo:angle "90"^^xsd:double . 
inst:Fitting-1-Port-1 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Fitting-1-Port-2 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "45"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:zeta "1"^^xsd:int ; 
fpo:connectorType "outlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Fitting-3 a fso:Elbow ; 
fpo:hasPort inst:Fitting-3-Port-1,
inst:Fitting-3-Port-2;
fpo:thermalConductivity "15 "^^xsd:double ; 
fpo:wallThickness "0.0049"^^xsd:double ;  
fpo:materialType ex:copper ;
fpo:materialClass "M 1/2 RG"^^xsd:string ; 
fpo:angle "90"^^xsd:double . 
inst:Fitting-3-Port-1 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Fitting-3-Port-2 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "45"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:zeta "1"^^xsd:int ; 
fpo:connectorType "outlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Fitting-6 a fpo:Elbow ; 
fpo:hasPort inst:Fitting-6-Port-1,
inst:Fitting-6-Port-2;
fpo:thermalConductivity "15 "^^xsd:double ; 
fpo:wallThickness "0.0049"^^xsd:double ;  
fpo:materialType ex:copper ;
fpo:materialClass "M 1/2 RG"^^xsd:string ; 
fpo:angle "90"^^xsd:double . 
inst:Fitting-6-Port-1 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Fitting-6-Port-2 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "45"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:zeta "1"^^xsd:int ; 
fpo:connectorType "outlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Fitting-9 a fpo:Elbow ; 
fpo:hasPort inst:Fitting-9-Port-1,
inst:Fitting-9-Port-2;
fpo:thermalConductivity "15 "^^xsd:double ; 
fpo:wallThickness "0.0049"^^xsd:double ;  
fpo:materialType ex:copper ;
fpo:materialClass "M 1/2 RG"^^xsd:string ; 
fpo:angle "90"^^xsd:double . 
inst:Fitting-9-Port-1 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Fitting-9-Port-2 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "45"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:zeta "1"^^xsd:int ; 
fpo:connectorType "outlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Fitting-10 a fpo:Elbow ; 
fpo:hasPort inst:Fitting-10-Port-1,
inst:Fitting-10-Port-2;
fpo:thermalConductivity "15 "^^xsd:double ; 
fpo:wallThickness "0.0049"^^xsd:double ;  
fpo:materialType ex:copper ;
fpo:materialClass "M 1/2 RG"^^xsd:string ; 
fpo:angle "90"^^xsd:double . 
inst:Fitting-10-Port-1 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Fitting-10-Port-2 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "45"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:zeta "1"^^xsd:int ; 
fpo:connectorType "outlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Fitting-12 a fpo:Elbow ; 
fpo:hasPort inst:Fitting-12-Port-1,
inst:Fitting-12-Port-2;
fpo:thermalConductivity "15 "^^xsd:double ; 
fpo:outerDiameter "0.0162"^^xsd:double ; 
fpo:wallThickness "0.0049"^^xsd:double ;  
fpo:materialType ex:copper ;
fpo:materialClass "M 1/2 RG"^^xsd:string ; 
fpo:crossSectionalArea "0.0002"^^xsd:double ;
fpo:angle "90"^^xsd:double . 
inst:Fitting-12-Port-1 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Fitting-12-Port-2 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "45"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:zeta "1"^^xsd:int ; 
fpo:connectorType "outlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Fitting-15 a fpo:Elbow ; 
fpo:hasPort inst:Fitting-15-Port-1,
inst:Fitting-15-Port-2;
fpo:thermalConductivity "15 "^^xsd:double ; 
fpo:outerDiameter "0.0162"^^xsd:double ; 
fpo:wallThickness "0.0049"^^xsd:double ;  
fpo:materialType ex:copper ;
fpo:materialClass "M 1/2 RG"^^xsd:string ; 
fpo:crossSectionalArea "0.0002"^^xsd:double ;
fpo:angle "90"^^xsd:double . 
inst:Fitting-15-Port-1 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Fitting-15-Port-2 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "45"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:zeta "1"^^xsd:int ; 
fpo:connectorType "outlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Fitting-16 a fpo:Elbow ; 
fpo:hasPort inst:Fitting-16-Port-1,
inst:Fitting-16-Port-2;
fpo:thermalConductivity "15 "^^xsd:double ; 
fpo:outerDiameter "0.0162"^^xsd:double ; 
fpo:wallThickness "0.0049"^^xsd:double ;  
fpo:materialType ex:copper ;
fpo:materialClass "M 1/2 RG"^^xsd:string ; 
fpo:crossSectionalArea "0.0002"^^xsd:double ;
fpo:angle "90"^^xsd:double . 
inst:Fitting-16-Port-1 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Fitting-16-Port-2 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "45"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:zeta "1"^^xsd:int ; 
fpo:connectorType "outlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Fitting-17 a fpo:Elbow ; 
fpo:hasPort inst:Fitting-17-Port-1,
inst:Fitting-17-Port-2;
fpo:thermalConductivity "15 "^^xsd:double ; 
fpo:outerDiameter "0.0162"^^xsd:double ; 
fpo:wallThickness "0.0049"^^xsd:double ;  
fpo:materialType ex:copper ;
fpo:materialClass "M 1/2 RG"^^xsd:string ; 
fpo:crossSectionalArea "0.0002"^^xsd:double ;
fpo:angle "90"^^xsd:double . 
inst:Fitting-17-Port-1 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Fitting-17-Port-2 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "45"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:zeta "1"^^xsd:int ; 
fpo:connectorType "outlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Fitting-18 a fpo:Elbow ; 
fpo:hasPort inst:Fitting-18-Port-1,
inst:Fitting-18-Port-2;
fpo:thermalConductivity "15 "^^xsd:double ; 
fpo:outerDiameter "0.0162"^^xsd:double ; 
fpo:wallThickness "0.0049"^^xsd:double ;  
fpo:materialType ex:copper ;
fpo:materialClass "M 1/2 RG"^^xsd:string ; 
fpo:crossSectionalArea "0.0002"^^xsd:double ;
fpo:angle "90"^^xsd:double . 
inst:Fitting-18-Port-1 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "70"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:connectorType "inlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
inst:Fitting-18-Port-2 a fso:Port ; 
fpo:massflow "0.03"^^xsd:double ;
fpo:temperature "45"^^xsd:double ;
fpo:pressure "50"^^xsd:double ;
fpo:velocity "0.0471"^^xsd:double ; 
fpo:zeta "1"^^xsd:int ; 
fpo:connectorType "outlet"^^xsd:string;
fpo:shape "circular"^^xsd:string ;
fpo:outerDiameter "0.0162"^^xsd:double ;
fpo:crossSectionalArea "0.0002"^^xsd:double .
   fpo:Elbow rdfs:subClassOf fso:Fitting .
#Creating Systems
inst:A-S
a fso:SupplySystem ;
ex:fluidType "water"^^xsd:string ;
ex:temp "60"^^xsd:int ; 
fso:hasComponent inst:HeatExchanger-1 ;
fso:hasComponent inst:Pipe-1 ;
fso:hasComponent inst:Pump-1 ;
fso:hasComponent inst:Pipe-2 ;
fso:hasComponent inst:Fitting-1 ;
fso:hasComponent inst:Pipe-3 ;
fso:hasComponent inst:Fitting-2 ;
fso:hasComponent inst:Pipe-4 ;
fso:hasComponent inst:Fitting-2 ;
#A.1-S
fso:hasComponent inst:Fitting-2 ;
fso:hasComponent inst:Pipe-11 ;
fso:hasComponent inst:Fitting-7 ;
fso:hasComponent inst:Pipe-12 ;
fso:hasComponent inst:Terminal-1 ;
fso:hasComponent inst:Fitting-7 ;
fso:hasComponent inst:Pipe-13 ;
fso:hasComponent inst:Fitting-8 ;
fso:hasComponent inst:Pipe-14 ;
fso:hasComponent inst:Terminal-2 ;
fso:hasComponent inst:Fitting-8 ;
fso:hasComponent inst:Pipe-15 ;
fso:hasComponent inst:Fitting-9 ;
fso:hasComponent inst:Pipe-16 ;
fso:hasComponent inst:Terminal-3 ;
#A.2-S
fso:hasComponent inst:Fitting-3 ;
fso:hasComponent inst:Pipe-5 ;
fso:hasComponent inst:Fitting-4 ;
fso:hasComponent inst:Pipe-6 ;
fso:hasComponent inst:Terminal-4 ;
fso:hasComponent inst:Fitting-4 ;
fso:hasComponent inst:Pipe-7 ;
fso:hasComponent inst:Fitting-5 ;
fso:hasComponent inst:Pipe-8 ;
fso:hasComponent inst:Terminal-5 ;
fso:hasComponent inst:Fitting-5 ;
fso:hasComponent inst:Pipe-9 ;
fso:hasComponent inst:Fitting-6 ;
fso:hasComponent inst:Pipe-10 ;
fso:hasComponent inst:Terminal-6 .
inst:A-R
a fso:ReturnSystem ;
ex:fluidType "water"^^xsd:string ;
ex:temp "40"^^xsd:int ; 
fso:hasComponent inst:Fitting-12 ;
fso:hasComponent inst:Pipe-20 ;
fso:hasComponent inst:Fitting-11 ;
fso:hasComponent inst:Pipe-19 ;
fso:hasComponent inst:Fitting-10 ;
fso:hasComponent inst:Pipe-18 ;
fso:hasComponent inst:RegulationValve-1 ;
fso:hasComponent inst:Pipe-17 ;
fso:hasComponent inst:HeatExchanger-1 ;
#A.1-R
fso:hasComponent inst:Terminal-3 ;
fso:hasComponent inst:Pipe-40 ;
fso:hasComponent inst:RegulationValve-5 ;
fso:hasComponent inst:Pipe-39 ;
fso:hasComponent inst:Fitting-18 ;
fso:hasComponent inst:Pipe-38 ;
fso:hasComponent inst:Terminal-2 ;
fso:hasComponent inst:Pipe-37 ;
fso:hasComponent inst:RegulationValve-4 ;
fso:hasComponent inst:Pipe-36 ;
fso:hasComponent inst:Fitting-17 ;
fso:hasComponent inst:Pipe-35 ;
fso:hasComponent inst:Terminal-1 ;
fso:hasComponent inst:Pipe-34 ;
fso:hasComponent inst:RegulationValve-3 ;
fso:hasComponent inst:Pipe-33 ;
fso:hasComponent inst:Fitting-16 ;
fso:hasComponent inst:Pipe-32 ;
fso:hasComponent inst:RegulationValve-2 ;
fso:hasComponent inst:Pipe-31 ;
fso:hasComponent inst:Fitting-11 ;
#A.2-R
fso:hasComponent inst:Terminal-6 ;
fso:hasComponent inst:Pipe-30 ;
fso:hasComponent inst:RegulationValve-9 ;
fso:hasComponent inst:Pipe-29 ;
fso:hasComponent inst:Fitting-15 ;
fso:hasComponent inst:Pipe-28 ;
fso:hasComponent inst:Terminal-5 ;
fso:hasComponent inst:Pipe-27 ;
fso:hasComponent inst:RegulationValve-8 ;
fso:hasComponent inst:Pipe-26 ;
fso:hasComponent inst:Fitting-14 ;
fso:hasComponent inst:Pipe-25 ;
fso:hasComponent inst:Terminal-4 ;
fso:hasComponent inst:Pipe-24 ;
fso:hasComponent inst:RegulationValve-7 ;
fso:hasComponent inst:Pipe-23 ;
fso:hasComponent inst:Fitting-13 ;
fso:hasComponent inst:Pipe-22 ;
fso:hasComponent inst:RegulationValve-6 ;
fso:hasComponent inst:Pipe-21 ;
fso:hasComponent inst:inst:Fitting-12 .
##Creating main system and subsystems
inst:HeatingSystem-A a fso:System ;
fso:hasSupplySystem inst:A-S ;
fso:hasReturnSystem inst:A-R .
#Rooms
inst:Room-1
rdfs:label "Room 1"^^xsd:string;
a bot:Space;
ex:hasHeatingDemand "1600"^^xsd:int;
bot:containsElement inst:Terminal-1 ;
bot:containsElement inst:Terminal-2 .
inst:Terminal-1 fso:transfersHeatTo inst:Room-1 .
inst:Terminal-2 fso:transfersHeatTo inst:Room-1 .
inst:Room-2
rdfs:label "Room 2"^^xsd:string ;
a bot:Space;
ex:hasHeatingDemand "500"^^xsd:int;
bot:containsElement inst:Terminal-3.
inst:Terminal-3 fso:transfersHeatTo inst:Room-2 .
inst:Room-3
rdfs:label "Room 3"^^xsd:string ;
a bot:Space ;
ex:hasHeatingDemand "800"^^xsd:int ;
bot:containsElement inst:Terminal-4 .
inst:Terminal-4 fso:transfersHeatTo inst:Room-3 .
inst:Room-4
rdfs:label "Room 4"^^xsd:string;
a bot:Space;
ex:hasHeatingDemand "3000"^^xsd:int;
bot:containsElement inst:Terminal-5 ;
bot:containsElement inst:Terminal-6 .
inst:Terminal-5 fso:transfersHeatTo inst:Room-4 .
inst:Terminal-6 fso:transfersHeatTo inst:Room-4 .
inst:Building-A bot:hasStorey inst:Floor-1 ;
bot:hasStorey inst:Floor-2 ;
a bot:Building .
inst:Floor-1 bot:hasSpace inst:Room-1;
bot:hasSpace inst:Room-2 ;
a bot:Storey .
inst:Floor-2 bot:hasSpace inst:Room-3;
bot:hasSpace inst:Room-4 ;
a bot:Storey .
`;

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
        console.log('FSO triples inserted');

        // console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
    });
