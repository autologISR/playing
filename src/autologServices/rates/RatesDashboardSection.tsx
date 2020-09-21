/* Implementing the ObjectKeyPair interface used in AutologTables*/
import {HeadCell} from "../../common/table/AutologTableTypes";
import React from "react";
import {AutologDashboardSection} from "../../common/dashboardSection/AutologDashboardSection";
import {
    DomainSchema,
    dynamoDbDateForTable,
    EntityDetailsSchema,
    EntityKeyPair,
    EntityOverview
} from "../../common/entityKeyPair";
import {
    newRateCreationStepsCallback,
    newRateSchema,
    newRatesStepFormMap,
    RateGeneralInfoProps
} from "./newRates/newRateStepForm";
import {API, graphqlOperation} from "aws-amplify";
import * as queries from "../../graphql/queries";
import {Predicates} from "@aws-amplify/datastore";
import {IValues} from "../../common/form/formTypes";


export interface RatesTableProps extends EntityKeyPair {
    id: string;
    rateName: string;
    freightForwarderName: string;
    createdAt: string;
    updatedAt: string
    incoterm: string;
    modeOfTransport: string;
    direction: string;
    cargoLoad: string;
    carrierName: string;
    startOfValidity: string;
    endOfValidity: string;
}

/* Implementing HeadCell[] interface used to describe the schema of the table */
const headCells: HeadCell<RatesTableProps>[] = [
    {id: 'id', numeric: false, disablePadding: false, label: 'Rate Id'},
    {id: "rateName", numeric: false, disablePadding: false, label: 'Rate Title'},
    {id: "updatedAt", numeric: false, disablePadding: false, label: 'Last Update'},
    {id: 'validFrom', numeric: false, disablePadding: false, label: 'Valid From'},
    {id: 'validTo', numeric: false, disablePadding: false, label: 'Valid To'},
    {id: "freightForwarderName", numeric: false, disablePadding: false, label: 'Freight Forwarder'},
    {id: 'incoterm', numeric: false, disablePadding: false, label: 'Incoterms'},
    {id: 'direction', numeric: false, disablePadding: false, label: 'Direction'},
    {id: 'modeOfTransport', numeric: false, disablePadding: false, label: 'Mode'},
    {id: 'cargoLoad', numeric: false, disablePadding: false, label: 'Cargo Load'},
    {id: "carrierName", numeric: false, disablePadding: false, label: 'Carrier Name'},

];

export function arrayValueSerialized(arr: string[]) {
    let arrStr = '';
    arr.forEach(
        item => {
            if (item !== null && item !== "") {
                arrStr = arrStr === "" ? item : arrStr + ', ' + item;
            }
        }
    )
    return arrStr;
}

export const ratesOverviewQueryProcessingFunc = (data: IValues[]) => {
    return data.map(
        (rate) => {
            const {rateName, rateType, createdAt, updatedAt, validFrom, validTo, ...otherRateProps} = rate;
            const rateTypeSubtypes = rateType.match(
                /^(FOB|EXW|CIF|DAP|DDP|COURIER)(Import|Export)(OCEAN|AIR)?(FCL|LCL)?$/
            )

            const incoterm = rateTypeSubtypes[1];
            const direction = rateTypeSubtypes[2];
            const modeOfTransport = incoterm === 'COURIER' ? 'N/A' : rateTypeSubtypes[3];
            const cargoLoad = incoterm === 'COURIER' ? 'N/A' : rateTypeSubtypes[4]

            return {
                rateName,
                incoterm,
                direction,
                modeOfTransport,
                cargoLoad,
                updatedAt: dynamoDbDateForTable(updatedAt),
                createdAt: dynamoDbDateForTable(createdAt),
                validFrom: dynamoDbDateForTable(validFrom, true),
                validTo: dynamoDbDateForTable(validTo, true),
                ...otherRateProps
            }
        }
    )
}

/* TODO Change to lazy evaluation. */
const ratesOverview = API.graphql(graphqlOperation(queries.listRateSubmissions, Predicates.ALL));


export const rateOverviewSchema: EntityOverview<RatesTableProps> = {
    entityOverviewQuery: "listRateSubmissions",
    tableSchema: headCells,
    listEntity: ratesOverview,
    entityOverviewQueryProcessingFunc: ratesOverviewQueryProcessingFunc
};

export const rateEntityDetails: EntityDetailsSchema<RatesTableProps> = {
    stepsCallback: newRateCreationStepsCallback,
    stepFormMap: newRatesStepFormMap,
    splitOverViewAndDetails: (rateEntity: RatesTableProps) => {
        const {
            rateName,
            freightForwarderName,
            incoterm,
            modeOfTransport,
            direction,
            cargoLoad,
            carrierName,
            pointsOfDestination,
            validTo,
            validFrom,
            id,
            createdAt,
            updatedAt,
            ...otherFields
        } = rateEntity;


        return {
            sourceFields: {
                rateName,
                freightForwarderName,
                carrierName,
                incoterm,
                modeOfTransport,
                direction,
                cargoLoad,
                validTo,
                validFrom,
                createdAt,
                updatedAt,
            },
            detailsFields: {
                ...otherFields
            }
        }
    },
    sourceStep: 'BasicRateInfo',
    sourceForm: RateGeneralInfoProps
}

const domainSchema: DomainSchema = new Map([
    ["Current Rates", {
        entityName: "Current Rates",
        entitySingularName: "Rate",
        entityOverview: rateOverviewSchema,
        entityDetails: rateEntityDetails,
        newEntity: newRateSchema,
    }]
]);

export const RatesDashboardSection: React.FunctionComponent<RatesTableProps[]> = () => {
    return <AutologDashboardSection entityNames={['Current Rates']} domainSchema={domainSchema}/>;
};
