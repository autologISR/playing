import * as React from "react";
import {IValues} from "../form/formTypes";
import {GroupedFieldInputsType} from "./inputFieldComponents/groupedInputFields/useGroupedInput";
import ReactDataSheet from "react-datasheet";
import {GridElement} from "./inputFieldComponents/spreadsheetInput/spreadsheetInputTypes";
import {CustomRowRenderer} from "../../autologServices/rates/newRates/inlandInputs";
import CellsChangedHandler = ReactDataSheet.CellsChangedHandler;


export type UnitOfMeasurement =
    'ton'
    | 'cm'
    | 'kg'
    | 'decimal'
    | 'int'
    | 'date'
    | 'NIS'
    | 'USD'
    | 'day'
    | 'boolean'
    | 'options'
    | "";


/* The available editors for the field */
export type Editor =
    "textbox"
    | "password"
    | "multilinetextbox"
    | "dropdown"
    | "radio"
    | "decimalinput"
    | "dateinput"
    | 'spreadsheet'
    | 'groupedInputs'
    | 'integerInput'
    | 'switch'
    | 'weight'
    | 'chargeAmount'
    | 'numberInput'
    | 'percentageInput'
    | 'postalCodeRange'
    | 'length'
    | 'radius'
    | 'addressSearch'
    | 'phonemasktextbox';


export interface CustomComponentOnCellsChangeProps {
    setState: React.Dispatch<{ grid: GridElement[][] }>;
    state: { grid: GridElement[][] };
}

export interface CustomSheetRendererProps {
    state: { grid: GridElement[][] };
    setState: React.Dispatch<{ grid: GridElement[][] }>
}

export interface CustomComponentFuncProps {
    name: string;
    initialHeaders?: GridElement[][]
    customComponentState: IValues | {};
    state: { grid: GridElement[][], columnMetadataTable?: GridElement[][]};
    componentFuncMap?: Map<string, (props: CustomComponentProps) => void>
    handleSpreadsheetChange?: (name: string, value: string) => void
}

export interface CustomComponentProps {
    customComponentContext?: IValues;
    customComponentState: IValues | {};
    setCustomComponentState: React.Dispatch<IValues | {}>;
}

export type AdHocColumnsSpreadsheetParser = (fieldName: string) => string;


export interface IFieldProps {
    /* The unique field name */
    name: string;

    /* The label text for the field */
    label: string;

    /* The editor for the field */
    editor?: Editor;

    /* The drop down items for the field */
    options?: string[]

    /* Vertical size of multiline input */
    rows?: number;

    /* Horizontal size of multiline input */
    cols?: number;

    /* Placeholder for text*/
    placeholder?: string;

    /* Handle change for text inputs */
    handleChange: (event: React.ChangeEvent<any>) => void;

    /* Horizontal size of multiline input */
    handleBlur: () => void;

    /* Input helper text input */
    helperText?: string;

    /* Spreadsheet Input props */
    spreadsheetColumns?: any;

    sheetRenderer?: (props: CustomSheetRendererProps) => ReactDataSheet.SheetRenderer<GridElement>;

    rowRenderer?: (props: CustomRowRenderer) => ReactDataSheet.RowRenderer<GridElement>;

    cellRenderer?: (name: string, state: { grid: GridElement[][] }) => React.FunctionComponent<ReactDataSheet.CellRendererProps<GridElement, string>>;

    customComponent?: (props: CustomComponentProps) => JSX.Element;

    onCellChange?: (props: CustomComponentOnCellsChangeProps) => CellsChangedHandler<GridElement>;

    customSpreadsheetInputFunc?: (props: CustomComponentFuncProps) => { grid: GridElement[][], columnMetadataTable?: GridElement[][]};

    required: boolean;

    initialValue?: any;

    conditionalInputFunc?: (parentResultState: IValues, handleChildComponentChange: (e: React.ChangeEvent<any>) => void, handleBlur: () => void, childResultState?: IValues) => IFieldProps;

    parentInputField?: { [key: string]: any };

    initialChildDefinition?: IFieldProps;

    groupedInputValues?: GroupedFieldInputsType;

    fullWidth?: boolean;

    groupOrientation?: 'row' | 'col';

    handleSpreadsheetChange?: (name: string, spreadSheetValues: string) => void;

    error?: boolean;

    spreadsheetInitialEmptyRows?: number;

    unitOfMeasurement?: UnitOfMeasurement;

    readOnlySpreadsheet?: boolean;

    customComponentContext?: IValues;

    readOnly?: boolean;

    inputClasses?: Record<any, any>;

    country_state?: string;

    region?: 'Usa' | 'Rest';

    columnMetadataTable?: GridElement[][]
}