import React from "react";
import {EntityKeyPair} from "../../common/entityKeyPair";
import {HeadCell} from "../../common/table/AutologTableTypes";
import uuid from "uuid";
import {AutologDashboardSection} from "../../common/dashboardSection/AutologDashboardSection";
import {RatesTableProps} from "../rates/RatesDashboardSection";
import {AutologTable} from "../../common/table/AutologTable";


export interface QuoteRequestsProps extends EntityKeyPair{
    id: string;
    carrierName: string;
    shipmentTerm: string;
    modeOfTransportation: string;
    shipmentPointOfOrigin: string;
    shipmentPointOfDestination: string;
    region: string;
    requestedStartDate: string;
    requestedEndDate: string;
}

const headCells: HeadCell<QuoteRequestsProps>[] = [
    {id: 'id', numeric: false, disablePadding: false, label: 'Quote Request Id'},
    {id: "carrierName", numeric: false, disablePadding: false, label: 'Carrier Name'},
    {id: 'shipmentTerm', numeric: false, disablePadding: false, label: 'Shipment Type'},
    {id: 'modeOfTransportation', numeric: false, disablePadding: false, label: 'Mode'},
    {id: "shipmentPointOfOrigin", numeric: false, disablePadding: false, label: 'Region'},
    {id: "shipmentPointOfDestination", numeric: false, disablePadding: false, label: 'Carrier Name'},
    {id: "region", numeric: false, disablePadding: false, label: 'Region'},
    {id: 'requestedStartDate', numeric: false, disablePadding: false, label: 'Req. Start Date'},
    {id: 'requestedEndDate', numeric: false, disablePadding: false, label: 'Req. End Date'},
];

const rowInitialState = [
    {
        objectId: uuid.v4,
        quoteStatus: 'Open',
        quoteId: 'n/a',
        carrierName: 'DHL',
        shipmentTerm: 'EXW',
        modeOfTransportation: 'Air',
        requestedStartDate: '12-02-2020',
        requestedEndDate: '12-03-2020',
        shipmentMode: 'Air',
        shipmentPointOfOrigin: 'יוסף ספיר 4, ראשון לציון, 7570463',
        shipmentPointOfDestination: 'Via del Chionso, 50, 42122 Reggio Emilia RE, Italy',
        region: 'Europe',

    },
    {
        objectId: uuid.v4,
        quoteStatus: 'Closed',
        quoteId: uuid.v4,
        shipmentTerm: 'EXW',
        carrierName: 'DHL',
        modeOfTransportation: 'Air',
        requestedStartDate: '12-02-2020',
        requestedEndDate: '12-03-2020',
        shipmentMode: 'Air',
        shipmentPointOfOrigin: 'יוסף ספיר 4, ראשון לציון, 7570463',
        shipmentPointOfDestination: 'Via del Chionso, 50, 42122 Reggio Emilia RE, Italy',
        region: 'Europe',
    }
];



const detailsRender = (objectId: string) => {
    return (<></>)
};

export const QuoteRequestsTable: React.FunctionComponent<QuoteRequestsProps[]> = (rowInitialState: QuoteRequestsProps[]) => {
    return <></>;
};