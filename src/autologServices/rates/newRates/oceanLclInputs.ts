import {rowIndexField} from "./common";
import {additionalChargesTable} from "./additionalChargesInput";

export const oceanFreightPartColumns = [
    {field: 'portFrom', value: 'Port From', readOnly: true, head: true},
    {field: 'portTo', value: 'Port To', readOnly: true, head: true},
    {field: 'transitTime', value: 'Transit Time', readOnly: true, head: true, fieldType: 'day'},
];

const remarksField = {field: 'remarks', value: 'Remarks', readOnly: true, head: true};
const lclField = {
    field: "weightMeasure",
    value: "W/M",
    readonly: true,
    head: true,
    currencyType: 'NIS',
    fieldType: 'currency'
};

export const airColumns = [[rowIndexField, ...oceanFreightPartColumns, lclField, remarksField]];

export const OceanLclRates = [
    {
        name: 'oceanTable',
        label: 'Ocean Rates:',
        editor: 'spreadsheet',
        spreadsheetColumns: airColumns,
        required: true
    },
    additionalChargesTable()
];