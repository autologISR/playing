import * as React from "react";
import {rulesInput} from "./rulesInput";
import {
    fromWeightAdHocColumnsSpreadsheetParser,
    fromWeightRatesCustomComponentFunc,
    rowIndexField,
    WeightLimitsComponent
} from "./common";
import {additionalChargesTable} from "./additionalChargesInput";


export const airFreightPartColumns = [
    {field: 'portFrom', value: 'Port From', readOnly: true, head: true},
    {field: 'portTo', value: 'Port To', readOnly: true, head: true},
    {field: 'transitTime', value: 'Transit Time', readOnly: true, head: true, fieldType: "day"},
];
export const route = {field: 'route', value: 'Routes', readOnly: true, head: true};
export const minWeight = {field: "minimumWeight", value: "Min Weight", readonly: true, head: true, fieldType: 'kg'};
export const airColumns = [[rowIndexField, ...airFreightPartColumns, route, minWeight]];

export const airRates = (incoterm: "FOB" | "EXW") =>
    incoterm === "FOB" ?
        [
            {
                name: 'airTable',
                label: 'Air Rates:',
                editor: 'spreadsheet',
                customComponent: WeightLimitsComponent,
                customSpreadsheetInputFunc: fromWeightRatesCustomComponentFunc,
                adHocColumnsSpreadsheetParser: fromWeightAdHocColumnsSpreadsheetParser,
                spreadsheetColumns: airColumns,
                required: true
            },
            rulesInput,
            additionalChargesTable()

        ] :
        [
            {
                name: 'airTable',
                label: 'Air Rates:',
                editor: 'spreadsheet',
                customComponent: WeightLimitsComponent,
                customSpreadsheetInputFunc: fromWeightRatesCustomComponentFunc,
                adHocColumnsSpreadsheetParser: fromWeightAdHocColumnsSpreadsheetParser,
                spreadsheetColumns: airColumns,
                required: true
            },
            rulesInput,
            additionalChargesTable()
        ];