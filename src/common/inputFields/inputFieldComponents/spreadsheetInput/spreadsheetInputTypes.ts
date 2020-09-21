import React from "react";
import ReactDataSheet from "react-datasheet";
import {IValues} from "../../../form/formTypes";

const headBackgroundColor = '#EEEEEE';
const headFontColor = '#424242';
const headBorderColor = '#BDBDBD';

const headFontWeight = 400;

export const cellHeadStyle: React.CSSProperties = {
    width: 200,
    height: 30,
    outline: 10,
    textAlign: "right",
    alignSelf: 'center',
    background: headBackgroundColor,
    zIndex: 1100,
    padding: 5,
    border: `0.35px solid ${headBorderColor}`,
    fontWeight: headFontWeight,
    fontSize: 20,
    color: headFontColor,
};
export const cellLeadHeadCellStyle: React.CSSProperties = {
    width: 35,
    height: 30,
    outline: 10,
    border: `0.35px solid ${headBorderColor}`,
    textAlign: "center",
    verticalAlign: 'middle',
    fontWeight: headFontWeight,
    fontSize: 20,
    background: headBackgroundColor,
    zIndex: 1100,
    color: headFontColor,
};

export const cellHorizontalSectionStyle: React.CSSProperties = {
    width: 200,
    height: 30,
    outline: 10,
    textAlign: "center",
    verticalAlign: 'middle',
    background: headBackgroundColor,
    zIndex: 1100,
    padding: 5,
    border: `0.35px solid ${headBorderColor}`,
    fontWeight: headFontWeight,
    fontSize: 20,
    color: headFontColor,
}
export const cellVerticalSectionStyle: React.CSSProperties = {
    width: 200,
    height: 30,
    outline: 10,
    textAlign: "center",
    verticalAlign: 'middle',
    alignSelf: 'center',
    background: headBackgroundColor,
    zIndex: 1100,
    padding: 5,
    border: `0.35px solid ${headBorderColor}`,
    fontWeight: headFontWeight,
    fontSize: 20,
    color: headFontColor,
};


export const cellLeadCellStyle: React.CSSProperties = {
    width: 35,
    height: 35,
    outline: 2,
    border: '0.35px  solid #DDD',
    textAlign: "center",
    verticalAlign: 'middle',
    fontWeight: 400,
    fontSize: 20,
    background: "#FAFAFA",
    color: "#424242"
};


export const cellBodyStyle: React.CSSProperties = {
    width: 185,
    height: 35,
    outline: 10,
    fontSize: 20,
    verticalAlign: 'middle',
    border: '0.35px  solid #DDD',
    textAlign: "right",
    padding: 5,
    fontWeight: 400,

}

export const cellBodySelectedStyle: React.CSSProperties = {
    width: 185,
    height: 35,
    outline: 10,
    fontSize: 20,
    padding: 5,
    verticalAlign: 'middle',
    textAlign: "right",
    background: '#e6f2ff',
};

export type CellFieldType = 'cm' | 'kg' | 'ton' | 'decimal' | 'int' | 'date' | 'currency' | 'day' | 'boolean' | 'options' | 'percentOfCurrency' | 'dropdown';

export interface GridElement extends ReactDataSheet.Cell<GridElement> {
    field: string;
    value: string | number | null;
    fieldType?: CellFieldType;
    currencyType?: 'USD' | 'NIS'
    fieldName?: string;
    head?: boolean;
    readOnly?: boolean;
    nonDeletable?:boolean;
    component?: JSX.Element;
    colSpan?: number;
    forceComponent?: boolean;
    style?: Object;
    edited?: boolean;
    updated?: boolean;
    selected?: boolean;
    options?: string[];
    name?: string;
    section?: 'vertical' | 'horizontal';
    memberOfSection?: string;
    sectionIndex?: number;
    paddingCell?: boolean;
    staticSection?: boolean;
    fieldMetadata?: IValues;
    rowSpan?: number;
    columnMetadataSection?: GridElement[][]
}

export const convertToReadOnly = (grid: GridElement[][]) => {
    return grid.map(
        row => row.map(
            cell => {
                return {...cell, readOnly: true};
            }
        )
    )
}



export class MyReactDataSheet extends ReactDataSheet<GridElement, string> {
}

export type AvailableCurrencies = 'NIS' | 'USD';