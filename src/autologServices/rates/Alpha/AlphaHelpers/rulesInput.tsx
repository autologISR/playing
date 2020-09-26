import {CustomComponentFuncProps} from "../../../../common/inputFields/FieldTypes";
import {rowIndexField, TableCurrency} from "./common";

export const ruleName = {head: true, readonly: true, value: 'Rule Name', field: 'ruleName'};
export const ratioRuleCbm = {head: true, readonly: true, value: '1 CBM = ? kg', field: 'ratioRuleCbm', fieldType: "kg"};

export const ruleUptoHeight = {
    head: true,
    readonly: true,
    value: 'Up to Height',
    field: 'ruleUptoHeight',
    fieldType: "cm",
};

export const ruleUptoWeight = {
    head: true,
    readonly: true,
    value: 'Up to Weight',
    field: 'ruleUptoWeight',
    fieldType: "kg",
};
export const rulePerPallet = {
    head: true,
    readOnly: true,
    value: 'Per Pallet',
    field: 'rulePerPallet',
    fieldType: "boolean"
};
export const ruleUptoShipment = {
    head: true,
    readOnly: true,
    value: 'Per Shipment',
    field: 'rulePerShipment',
    fieldType: "boolean"
};
export const rulesCustomComponentFunc = (props: CustomComponentFuncProps) => {
    const {state, customComponentState} = props;
    if ('currency' in customComponentState) {
        return {
            grid: state.grid.map(
                row =>
                    row.map(
                        cell => {
                            if (cell.currencyType !== undefined) {
                                const {currencyType, ...otherCellProps} = cell;
                                return {currencyType: customComponentState.currency, ...otherCellProps};
                            } else {
                                return cell;
                            }
                        }
                    )
            )
        }
    } else {
        return state;
    }
};
export const rulesSpreadsheetColumns = [[rowIndexField, ruleName, ratioRuleCbm, ruleUptoHeight, ruleUptoWeight, rulePerPallet, ruleUptoShipment]];


export const rulesInput = {
    name: 'rules',
    label: 'Rules',
    editor: 'spreadsheet',
    customComponent: TableCurrency,
    customSpreadsheetInputFunc: rulesCustomComponentFunc,
    spreadsheetColumns: rulesSpreadsheetColumns,
    required: true
};
