import React from "react";
import ReactDataSheet from "react-datasheet";
import "react-datasheet/lib/react-datasheet.css";
import {Button, Grid, Menu, MenuItem} from "@material-ui/core";
import {IValues} from "../../../form/formTypes";
import {CustomComponentFuncProps, IFieldProps} from "../../FieldTypes";
import Select from 'react-select'
import {centi, days, kilo, kilograms, Measure, meters} from 'safe-units';
import {Integer, wrap, zero} from "money-ts/lib/Integer";
import Typography from '@material-ui/core/Typography';

import {
    AvailableCurrencies,
    cellBodySelectedStyle,
    cellBodyStyle,
    CellFieldType,
    cellHeadStyle,
    cellHorizontalSectionStyle,
    cellLeadCellStyle,
    cellLeadHeadCellStyle,
    cellVerticalSectionStyle,
    convertToReadOnly,
    GridElement,
    MyReactDataSheet
} from "./spreadsheetInputTypes";

import {rowIndexField} from "../../../../autologServices/rates/newRates/common";
import {BigInteger} from "money-ts/lib/io-ts/BigInteger";
import {dense} from "money-ts";
import * as PosRational from "money-ts/lib/PositiveRational";
import {scale} from "money-ts/lib/Scale";
import {unsafePositiveRational} from "money-ts/lib/scale/unsafePositiveRational";
import {Discrete} from "money-ts/lib/Discrete";


export const metricTon = Measure.of(1000, kilograms, "ton");

/**************************************  Spreadsheet Data Helper Methods  *************************************************/

function decodeInteger(value: string) {
    return BigInteger.decode(value).fold<Integer>(
        (l) => {
            console.log(
                `getValue: (value: string) => Natural: `,
                `\n\t\t* Attempted to parse string ${value} to Integer.`,
                `\n\t\t* Error in value conversion: ${JSON.stringify(l)}.`
            );
            return zero;
        },
        (a) => {
            return wrap(a);
        }
    );
}

const getValue = (values: string[]): [Integer, Integer] => {

    return values.length === 1 ?
        [
            decodeInteger(values[0]),
            zero
        ] : [
            decodeInteger(values[0]),
            decodeInteger(values[1]),
        ];
};
declare module 'money-ts/lib/Scale' {
    interface Scale {
        NIS: {
            NIS: PosRational.PositiveRational,
            shekel: PosRational.PositiveRational,
            agora: PosRational.PositiveRational
        },
        USD: {
            USD: PosRational.PositiveRational,
            dollar: PosRational.PositiveRational,
            cent: PosRational.PositiveRational
        }
    }
}

scale['NIS'] = {
    NIS: unsafePositiveRational([100, 1]),
    shekel: unsafePositiveRational([1, 1]),
    agora: unsafePositiveRational([100, 1])
}

scale['USD'] = {
    USD: unsafePositiveRational([100, 1]),
    dollar: unsafePositiveRational([1, 1]),
    cent: unsafePositiveRational([100, 1])
}

function getCurrencyValues(rawValue: [Integer, Integer], currencyType: AvailableCurrencies) {

    const unitValue = dense.fromDiscrete(
        new Discrete(
            {dimension: "USD", unit: 'dollar'},
            rawValue[0]
        )).value[0];

    const hundredthValue = rawValue[1] === zero ?
        "" :
        `.${
            dense.fromDiscrete(
                new Discrete(
                    {dimension: "NIS", unit: "agora"},
                    rawValue[1]
                )
            ).value[0]
        }`;

    return currencyType === 'USD' ?
        `USD ${unitValue}${hundredthValue}` :
        `NIS ${unitValue}${hundredthValue}`
}

function getUnitAndHundredthValue(matchCurrency: RegExpMatchArray): string[] {
    return matchCurrency[3] === undefined ?
        [matchCurrency[2]] :
        [matchCurrency[2], matchCurrency[3]] as string[];
}

function dataSerializer(cell: GridElement) {
    /*
        **dataSerializer**
        Each field gets a fieldType (or by default it will be a simple text input).
        * This fieldType determines what value will be in the cell.
        NOTE: Each time we add a new cell we must provide this property to ensure te data will be validated and formatted as specified below.
    */

    if (cell.head) {
        return cell.value;
    }
    switch (cell.fieldType) {

        case "int":
            return cell.value !== null ? parseInt(cell.value as string) : "";

        case "date":
            return cell.value !== null ? Date.parse(cell.value as string) : ""

        case "kg":
            let parsedKg;
            let kgValue;
            parsedKg = (cell.value as string).match(/^(\d+)(\.\d+)?\s*(kg|ton)?\s*$/) as string[];

            if (cell.value !== '' && parsedKg !== null) {
                kgValue = Number((parsedKg as string[])[2] === undefined ? parsedKg[1] : parsedKg[1] + parsedKg[2]);
                return Measure.of(kgValue, kilograms).toString();
            }
            return '';

        case "ton":
            let parsedTon;
            let tonValue;
            parsedTon = (cell.value as string).match(/^(\d+)(\.\d+)?\s*(kg|ton)?\s*$/) as string[];

            if (cell.value !== '' && parsedTon !== null) {
                tonValue = Number((parsedTon as string[])[2] === undefined ? parsedTon[1] : parsedTon[1] + parsedTon[2]);
                return Measure.of(tonValue, kilo(kilograms)).in(metricTon).toString();
            }
            return '';
        case "cm":
            return cell.value === '' ? '' : Measure.of(parseInt(cell.value as string), centi(meters)).in(centi(meters)).toString();

        case "currency":
            const matchCurrency = (cell.value as string).match(/^(NIS\s+|USD\s+)?(\d+)\.?(\d+)?$/);
            if (matchCurrency !== null && cell.value !== '' && cell.value !== 'NaN') {

                const [resultUnit, resultHundredth] = getValue(getUnitAndHundredthValue(matchCurrency));
                const currencyUnitValue = getCurrencyValues([resultUnit, resultHundredth],
                    matchCurrency[1] as AvailableCurrencies);

                return cell.value === '' ? '' : Number(cell.value) ? currencyUnitValue : 'NaN';
            } else {
                return cell.value === '' ? '' : 'NaN';
            }

        case "day":
            const numberOfDays = Math.round(Number(cell.value as string));
            return (
                cell.value === '' ?
                    '' :
                    Measure.of(numberOfDays, days, numberOfDays === 1 ? 'day' : 'days').in(days).toString()
            );
        case "boolean":
            const isBoolean = (cell.value as string).match(/^\s*(\*)\s*/);
            return cell.value === '' ?
                '' :
                isBoolean ?
                    '✖' :
                    'NaN'

        case "percentOfCurrency":
            const percentageOfCurrency = getMatchPercentageOfCurrency((cell.value as Number).toString());
            return cell.value === '' ?
                '' :
                percentageOfCurrency ?
                    `${percentageOfCurrency[1]}%` :
                    'NaN'
        case undefined:
            return cell.value;
        default:
            return cell.value;
    }

}

function getMatchWeight(serializedValue: string) {

    return serializedValue.match(/^(\d+)(\.\d+)?\s*(kg|ton)?\s*$/);
}

function getMatchLength(serializedValue: string) {
    return serializedValue.match(/^(\d+)(\.\d+)?( cm)?$/);
}

function getMatchCurrency(serializedValue: string) {
    return serializedValue.match(/^(NIS\s+|USD\s+)?(\d+)(\.\d+)?$/);
}

function getMatchDay(serializedValue: string) {
    return serializedValue.match(/^\s*(\d+)( d)?\s*$/);
}

function getMatchPercentageOfCurrency(serializedValue: string) {
    return serializedValue.match(/^((\d+)(\.\d+)?)\s*%?$/)
}

/*function matchFieldType(value: string): CellFieldType | undefined {
    const kg = getMatchWeight(value) !== null && 'kg';
    const cm = getMatchLength(value) !== null && 'cm';
    const currency = getMatchCurrency(value) !== null && 'currency';
    return kg ? kg : cm ? cm : currency ? currency : undefined
}*/

function dataDeSerializer(fieldType: CellFieldType, serializedValue: string) {

    switch (fieldType) {

        case "int":
            const integer = parseInt(serializedValue);
            return serializedValue === '' ? '' : integer === null ? "NaN" : integer;

        case "date":
            return serializedValue === '' ? '' : serializedValue === null ? "NaN" : Date.parse(serializedValue);

        case "kg":
            const matchKg = getMatchWeight(serializedValue);
            return serializedValue === '' ? '' : matchKg === null ? 'NaN' : matchKg[2] === undefined ? matchKg[1] + " kg" : matchKg[1] + matchKg[2];

        case "ton":
            const matchTon = getMatchWeight(serializedValue);
            return serializedValue === '' ? '' : matchTon === null ? 'NaN' : matchTon[2] === undefined ? matchTon[1] + " ton" : matchTon[1] + matchTon[2];

        case "cm":
            const matchLength = getMatchLength(serializedValue)
            return serializedValue === '' ? '' : matchLength === null ? 'NaN' : matchLength[2] ? matchLength[1] + matchLength[2] : matchLength[1];

        case "currency":
            const matchCurrency = getMatchCurrency(serializedValue)
            return serializedValue === '' ? '' : matchCurrency === null ? 'NaN' : matchCurrency[3] ? matchCurrency[2] + matchCurrency[3] : matchCurrency[2];

        case "day":
            const matchDay = getMatchDay(serializedValue)
            return serializedValue === '' ? '' : matchDay === null ? 'NaN' : matchDay[1];

        case "percentOfCurrency":
            const matchPercentOfCurrency = getMatchPercentageOfCurrency(serializedValue);
            return serializedValue === '' ? '' : matchPercentOfCurrency === null ? 'NaN' : matchPercentOfCurrency[1]
        default:
            return serializedValue;
    }

}

export function convertToSubmissionValues(state: { grid: GridElement[][], columnMetadataTable?: GridElement[][] }) {
    /*
    **convertToSubmissionValues:**
     Takes a grid and serializes it to a string for submission (as all our values will be string types) or other needs.
    */

    // Serialize the full string.
    return JSON.stringify(state, undefined, 1);
}

export const deserializeSpreadsheetValue = (initialValue: any) => {
    return JSON.parse(initialValue);
};


/**************************************  Grid Helper Methods  *************************************************/

function emptyGrid(grid: GridElement[][], spreadsheetInitialEmptyRows?: number, columnMetadataTable?: GridElement[][]) {
    const initialGrid = [];
    const numberOfRowsToAdd = spreadsheetInitialEmptyRows === undefined ? 5 : spreadsheetInitialEmptyRows
    //arbitrarily add 5 empty arrays in loop or as many rows as defined.
    const headers = grid[0].map(
        cell => {
            return {
                nonDeletable: true, ...cell
            }
        });

    for (let i = 1; i < numberOfRowsToAdd; i++) {
        initialGrid.push(
            headers.map(
                cell => {
                    const {head, value, readOnly, ...otherCellProps} = cell;
                    //If cell is a rowIndex then add it as such, otherwise add a regular cell.
                    return cell.field === 'rowIndex' ?
                        {field: 'rowIndex', value: `${i}.`, style: cell.style, readOnly: true} :
                        {value: '', ...otherCellProps};
                }
            )
        );
    }
    return {
        grid: [
            grid[0], ...initialGrid
        ],
        columnMetadataTable: columnMetadataTable
    };
}

export interface ConstructInitialGridProps {
    grid: GridElement[][];
    initialValue?: IValues;
    spreadsheetInitialEmptyRows?: number;
    columnMetadataTable?: GridElement[][];
}

function constructInitialGrid(params: ConstructInitialGridProps) {
    /*
     ** constructInitialGrid **
        Create a new grid with empty values or an initialValue: IValues (passed as a serialized string \
        into the @SpreadsheetInput component from a parent) to initiate a grid with those values.
    */

    const {
        grid,
        initialValue,
        spreadsheetInitialEmptyRows,
        columnMetadataTable
    } = params;

    // console.log('constructInitialGrid', 'initialValue', initialValue);
    return initialValue === undefined ?
        emptyGrid(grid, spreadsheetInitialEmptyRows, columnMetadataTable) :
        deserializeSpreadsheetValue(initialValue)

}


function clearDatasheet(
    state: { grid: GridElement[][], columnMetadataTable?: GridElement[][] },
    setState: React.Dispatch<{ grid: GridElement[][], columnMetadataTable?: GridElement[][] }>,
    spreadsheetColumns: GridElement[][],
    spreadsheetInitialEmptyRows?: number,
    setCustomComponentState?: React.Dispatch<IValues | {}>
) {
    return () => {
        setState(
            constructInitialGrid({
                grid: spreadsheetColumns.slice(0, 1),
                spreadsheetInitialEmptyRows,
                columnMetadataTable: state.columnMetadataTable
            })
        )
        setCustomComponentState !== undefined &&
        setCustomComponentState({})
    };
}


/**************************************  Row Helper Methods  *************************************************/

function addNewRow(grid: GridElement[][]) {

    /*
    **createNewRows:**
        Takes the grid and appends a new row.
    */
    // Get Table columns, the first sub-array of the state.
    const tableColumns = grid[0];

    // Initialize newRows with old values.
    const newRows = grid;

    // get row index by the number of rows (the tableColumns doesnt have an index, since it is meaningless)
    const newRowIndex = grid.length;

    // Push new row by initializing new column.
    newRows.push(
        // for each cell in table columns, add a index cell or a regular cell (both need to be of type GridElement).
        tableColumns.map(
            (cell: GridElement) => {
                const {head, readOnly, value, ...cellProps} = cell;
                return cell.field === 'rowIndex' ?
                    {
                        field: 'rowIndex',
                        value: `${newRowIndex}.`,
                        style: cell.style,
                        readOnly: true
                    } :
                    {
                        value: '',
                        ...cellProps
                    };
            }
        )
    );
    return newRows;
}


const addEmptyRowToGrid = (event: React.MouseEvent<any>, state: { grid: GridElement[][], columnMetadataTable?: GridElement[][] }, setState: React.Dispatch<{ grid: GridElement[][], columnMetadataTable?: GridElement[][] }>) => {
    /*
        **AddEmptyRowToGrid**
        Adds new rows to the grid, as the name suggests.
    */
    setState({grid: addNewRow(state.grid)})
};

function addNewRows(state: { grid: GridElement[][], columnMetadataTable?: GridElement[][] }, setState: React.Dispatch<{ grid: GridElement[][], columnMetadataTable?: GridElement[][] }>) {
    return (e: React.MouseEvent<any>) => addEmptyRowToGrid(e, state, setState);
}

/**************************************  Renderer Methods  *************************************************/

export interface CellRendererProps {
    /* HTML tag for the cell */
    as: 'th' | 'td';
    /* Props that React Datasheet passes to the cellRender function, hooked into the @MyReactDataSheet implementation of ReactDataSheet generic class */
    cellProps: ReactDataSheet.CellRendererProps<GridElement> & { children?: React.ReactNode };
    /* We can add CSS to the specific cell if wanted. */
    cellStyle: React.CSSProperties;
}


export const CellRenderer = (props: CellRendererProps) => {
    /*
         CellRenderer component:
             * React Datasheet allows up to define a cell component (a <td> (regular cell) or <th> (header) html tags, or \
             a <div> tag if we want to pass a custom component).
             * Based on how we declared our spreadsheet input, we can pass properties that will add capabilities (or not) \
              from any cell we need to change.
         - **In General:**
             * To enforce consistency, we predefine cell types a developer needs to implement on any spreadsheet input.
             *
             * *React Datasheet still allows the library user to add these directly in the definition of a field (column), \
             yet we prefer consistency over flexibility in this case, since the effort needed to integrate most \
             functional requirements for these cells in a generic way. *
     */
    const {as: Tag, cellProps, cellStyle} = props;

    /* cellReactDatasheetHandlers:
     * React Datasheet has default cell handlers that are necessary to correctly extend the library.
     * We need to pass them as props as they utilize the logic we define in onCellsChanged (in which we update the \
     * state of the form the spreadsheet is defined as an input).
     * React Datasheet makes sure onCellsChanged receives the events generated by these handlers.
     *
     * For a more in-depth explanation, look at
     * https://github.com/nadbm/react-datasheet#cell-options.
    */
    const cellReactDatasheetHandlers =
        // If tag is td (a table cell), add handlers.
        Tag === 'td' ?
            {
                onMouseDown: cellProps.onMouseDown,
                onMouseOver: cellProps.onMouseOver,
                onDoubleClick: cellProps.onDoubleClick,
                updated: cellProps.updated,
                edited: cellProps.editing,
                attributesRenderer: cellProps.attributesRenderer,
                onContextMenu: props.cellProps.onContextMenu,
            } :
            // otherwise, if Tag is 'th', add onContextMenu.
            {
                onMouseDown: cellProps.onMouseDown,
                attributesRenderer: cellProps.attributesRenderer,
                onContextMenu: props.cellProps.onContextMenu,
            };

    return (
        <Tag
            style={cellStyle}
            rowSpan={cellProps.cell.rowSpan}
            colSpan={cellProps.cell.colSpan}
            className="cell"
            {...cellReactDatasheetHandlers}
        >
            {cellProps.children}
        </Tag>
    );
}


export interface DefaultCellRendererProps {
    state: { grid: GridElement[][], columnMetadataTable?: GridElement[][] };
    setState: React.Dispatch<{ grid: GridElement[][], columnMetadataTable?: GridElement[][] }>;
    name: string;
    handleSpreadsheetChange: (name: string, value: string) => void;
    handleBlur?: () => void;
    header?: GridElement[];
}


const addPastedRows = (arrayOfAdditions: () => { row: number, col: number, value: string }[], grid: GridElement[][]) => {
    let newGrid = grid;
    const rowsToAdd = (arrayOfAdditions().map(cell => cell.row).sort().pop() as number) - grid.length + 1;

    for (let i = 0; i < rowsToAdd; i++) {
        newGrid = addNewRow(grid)
    }

    arrayOfAdditions().forEach(
        ({row, col, value}) => {
            if ((row < newGrid.length) && (col < newGrid[0].length)) {
                const {value: emptyValue, ...otherProps} = newGrid[row][col]
                newGrid[row][col] = {
                    ...otherProps,
                    value: value
                }
            }
        }
    )
    return newGrid;
}
/*
 **getDefaultOnCellsChanged:**
  React Datasheet sends all changes in the changes: any[] array from its cells to this function,
  and we use it to update grid and function state, as described in https://github.com/nadbm/react-datasheet#usage.
 */
export const getDefaultOnCellsChanged = ({name, state, setState, handleSpreadsheetChange}: DefaultCellRendererProps) =>

    (changes: any[], arrayOfAdditions?: any[]) => {

        // new grid
        let grid = state.grid;
        // for each change to the grid,
        changes.forEach(
            ({value, col, row}) => {
                grid[row][col] = {
                    ...grid[row][col],
                    value: dataDeSerializer(grid[row][col].fieldType as CellFieldType, value)
                }
            }
        );

        if (arrayOfAdditions !== undefined) {
            grid = addPastedRows(
                () => arrayOfAdditions,
                state.grid
            );
        }
        const submissionValues = convertToSubmissionValues(state);
        // console.log('submissionValues',submissionValues);

        handleSpreadsheetChange(name, submissionValues);
        setState({grid: state.grid, columnMetadataTable: state.columnMetadataTable});
    }

export function defaultCellRenderer() {
    /*
    The custom renderer function passed into the @MyReactDatasheet component, that React Datasheet uses to render a \
    cell in the datasheet component (basically an HTML table)
    Here we place logic that chooses our Tag and our style, while the @CellRender component will (arbitrarily) deal \
    with the specific logic connected to the cellProps passed by React Datasheet.
    For further info look at https://github.com/nadbm/react-datasheet#cell-renderer.
    */
    const cellRenderer: ReactDataSheet.CellRenderer<GridElement> = (props) => {
        /*
        * */
        let cellStyle =
            props.cell.field === 'rowIndex' ?
                props.cell.head === true ?
                    cellLeadHeadCellStyle :
                    cellLeadCellStyle :
                props.cell.head ?
                    props.cell.section === undefined ?
                        cellHeadStyle :
                        props.cell.section === 'vertical' ?
                            cellVerticalSectionStyle :
                            cellHorizontalSectionStyle :
                    props.col === 0 ?
                        cellLeadCellStyle :
                        props.selected ?
                            cellBodySelectedStyle :
                            cellBodyStyle;

        cellStyle = props.style !== undefined ?
            {...props.style, ...cellStyle} :
            cellStyle;

        return (
            <CellRenderer
                as={
                    props.cell.head ?
                        'th' :
                        'td'
                }
                cellProps={props}
                cellStyle={cellStyle}
            />
        );
    };
    return cellRenderer;
}

export const defaultValueRenderer = (cell: GridElement) => {
    /*
    ** value renderer **
        How data should be formatted when not in edit mode.
        We use the dataSerializer to show value (or NaN if there is an error in the input).
    */
    return dataSerializer(cell);
}

function dataRenderer(cell: GridElement) {
    /*
        ** dataRenderer **
         How data should be formatted when in edit mode.
         We use the dataSerializer to show value (or NaN if there is an error in the input).
    */
    return dataSerializer(cell);
}

export type MousePosition = {
    mouseX: null | number;
    mouseY: null | number;
};

function defaultOnContextMenu(
    setContextMenuState: React.Dispatch<SpreadSheetOnContextMenu>,
) {

    return (e: MouseEvent, cell: GridElement) => {

        if (cell.fieldType === 'currency') {
            e.preventDefault();
            setContextMenuState(
                {
                    mousePosition: {
                        mouseX: e.clientX - 2,
                        mouseY: e.clientY - 4,
                    },
                    cellType: 'currency',
                    cell: cell
                }
            )
            return;
        } else if (cell.fieldType === 'kg' || cell.fieldType === 'ton') {
            e.preventDefault();
            setContextMenuState(
                {
                    mousePosition: {
                        mouseX: e.clientX - 2,
                        mouseY: e.clientY - 4,
                    },
                    cellType: 'weight',
                    cell: cell
                }
            )
        }
        if (
            (cell.memberOfSection && !cell.staticSection) ||
            (cell.field === 'rowIndex' && cell.value !== '')
        ) {

            e.preventDefault();
            setContextMenuState(
                {
                    mousePosition: {
                        mouseX: e.clientX - 2,
                        mouseY: e.clientY - 4,
                    },
                    cellType:
                        cell.field === 'rowIndex' ?
                            'row' :
                            'section',
                    cell: cell,
                },
            );
            return;
        }
        if (cell.head === true) {
            e.preventDefault();
            setContextMenuState(
                {
                    mousePosition: {
                        mouseX: e.clientX - 2,
                        mouseY: e.clientY - 4,
                    },
                    cellType: 'column',
                    cell: cell
                }
            )

            return;
        } else {
            e.preventDefault();
            return;
        }
    }
}


const initialContextMenuState = {
    mousePosition: {
        mouseX: null,
        mouseY: null,
    },
    cellType: null,
    cell: null,
};

type SpreadSheetOnContextMenu = {
    mousePosition: MousePosition,
    cellType: null | 'section' | 'column' | 'row' | 'currency' | 'weight',
    cell: GridElement | null,
};

function changeFieldType(
    state: { grid: GridElement[][], columnMetadataTable?: GridElement[][] },
    contextCell: false | GridElement,
    setState: (value: { grid: GridElement[][], columnMetadataTable?: GridElement[][] }) => void,
    handleSpreadsheetChange: ((name: string, spreadSheetValues: string) => void) | undefined, name: string,
    fieldNameToChange: 'currencyType' | 'fieldType',
    customComponentState: IValues | {},
    typeToChange: 'NIS' | 'USD' | CellFieldType | false,
) {

    let newState = state;
    switch (fieldNameToChange) {
        case "currencyType":

            const currencyCellRow = state.grid.findIndex(
                row =>
                    row.some(
                        cell =>
                            cell == contextCell
                    )
            );
            const currencyCellColumn = state.grid[currencyCellRow].findIndex(cell => cell == contextCell);
            newState.grid[currencyCellRow][currencyCellColumn].currencyType = typeToChange as 'NIS' | 'USD';
            break;
        case "fieldType":

            const weightCellRow = state.grid.findIndex(
                row => row.some(
                    cell => cell == contextCell
                )
            );
            const weightCellColumn = state.grid[weightCellRow].findIndex(cell => cell == contextCell);
            newState.grid[weightCellRow][weightCellColumn].fieldType = typeToChange as CellFieldType;

    }
    setState(newState);
    handleSpreadsheetChange !== undefined && handleSpreadsheetChange(name, convertToSubmissionValues(newState));

}

function fieldTypeChange(
    state: { grid: GridElement[][], columnMetadataTable?: GridElement[][] },
    contextCell: false | GridElement,
    setState: React.Dispatch<{ grid: GridElement[][] }>,
    handleSpreadsheetChange: ((name: string, spreadSheetValues: string) => void) | undefined,
    name: string,
    fieldNameToChange: 'currencyType' | 'fieldType',
    customComponentState: IValues | {},
    customSpreadsheetInputFunc?: (props: CustomComponentFuncProps) => { grid: GridElement[][] },
    currencyType?: 'NIS' | 'USD',
    weightUnit?: CellFieldType,
) {
    changeFieldType(
        state,
        contextCell,
        setState,
        handleSpreadsheetChange,
        name,
        fieldNameToChange,
        customComponentState,
        currencyType ? currencyType : weightUnit ? weightUnit : false,
    );
}

export const SelectEditor = (props: ReactDataSheet.DataEditorProps<GridElement> & { children?: React.ReactNode }) =>
    <Select
        options={
            props.cell.options?.map((value) => {
                    return {label: value, value: value}
                }
            )
        }
        onChange={
            (value) => {
                props.onChange((value as { label: string, value: string }).value)
            }}

    />

export function SpreadsheetInput(props: IFieldProps) {

    /*
    A component that receives @IField props and returns an implementation of the \
    React Datasheet library[https://github.com/nadbm/react-datasheet].
    * We pass the definitions of the table into the schema of the @Form component, and down to the SpreadsheetInput, \
    just like any other input field in the form.
    * Note on React DataSheet usage from the creators of React Datasheet:
     "
         Note:
         For brevity, in this example the custom renderers are all defined as arrow functions inside of render, \
         but using a bound function in the parent component or a separate custom component \
         will let you avoid a lot of needless re-renders.
     "
     - This is why we extract all functions as global as we should in general. Then we do not have to rerender them on
     each component re-rendering.
    **Usage:**
    * - To declare this component we need to pass an input definition that looks something like this: \
    **
        {editor: 'spreadsheet', name: 'mySpreadsheetFieldName', label: 'My Spreadsheet', \
        spreadsheetColumns: [[rowIndex, ...otherColumns]], required: true, ...otherSpreadsheetInputProps}, \
        *spreadsheetColumns are of type GridElement[][] and GridElement represents the cell in the table.*
    **
    **There are 2 versions of this component:**
    * 1. **Regular Table**:
        - All of the component is contained in the table and its control buttons, Add Rows and Clear Spreadsheet.
        - Note that this means that all of the behavior is related to how we implement the React Spreadsheet library.
        - Other  props might include a custom renderer for the rows or the complete spreadsheet,
        but this is optional.
      2. **Table with custom component**
        - The table has an outside component that changes table content. In this case we additionally must pass:
        a)
        @customComponent: (props: CustomComponentProps) => JSX.Element, that renders with the table and is hooked in \
        the table via:
            [customComponentState, setCustomComponentState] = React.useState<IValues | {}>({});
        b)
        @customSpreadsheetInputFunc: (props: CustomComponentFuncProps) => { grid: GridElement[][] },
        that fires whenever we detect change in the customComponentState via useEffect hook and updates the state \
        of the Datasheet by whatever logic we provided in the body of the function.
        *we can pass other custom renderers (row and sheet) as detailed in the library,
        but we can still heavily customize without it.*
    P.S. We rely a lot on this dependency, but the library has been forked just in case something stops working. :-)
    */

    const {
        label,
        name,
        initialValue,
        onCellChange,
        spreadsheetColumns,
        customComponent,
        sheetRenderer,
        rowRenderer,
        cellRenderer,
        customSpreadsheetInputFunc,
        handleSpreadsheetChange,
        spreadsheetInitialEmptyRows,
        handleBlur,
        readOnlySpreadsheet,
        customComponentContext,
        readOnly,
        columnMetadataTable
    } = props;
    // console.log('columnMetadataTable: ', columnMetadataTable);
    const [state, setState] = React.useState<{ grid: GridElement[][], columnMetadataTable?: GridElement[][] }>(
        // initialize the state to the grid with the initialValue (undefined by default).
        constructInitialGrid({
            grid: spreadsheetColumns.slice(0, 1),
            initialValue,
            spreadsheetInitialEmptyRows,
            columnMetadataTable
        }),
    );
    // Custom component state hook, used to control the custom component state value.

    const [customComponentState, setCustomComponentState] = React.useState<IValues | {}>((initialValue === undefined) && (customComponentContext !== undefined) ? customComponentContext : {});
    const [contextMenuState, setContextMenuState] = React.useState<SpreadSheetOnContextMenu>(initialContextMenuState);

    const handleRowDeletion = (rowIndex: number, section?: string) => {
        const {value, head, ...otherRowIndexProps} = rowIndexField;

        if (section !== undefined) {
            if ('handleCustomSectionDeletion' in customComponentState) {
                const deleteEvent = {
                    target: {
                        section: section, fieldName: state.grid[rowIndex][1].value
                    }
                }
                customComponentState.handleCustomSectionDeletion(deleteEvent)

                const newState =
                    customSpreadsheetInputFunc !== undefined &&
                    customSpreadsheetInputFunc(
                        {
                            // Custom Component State
                            customComponentState,
                            // Grid State
                            state,
                            // and the name of the SpreadsheetInput defined in its declaration,
                            name
                        }
                    );
                newState &&
                setState(newState)
            }
        } else {
            const newGrid = [
                ...state.grid.slice(0, rowIndex),
                ...state.grid.slice(rowIndex + 1)
            ].map(
                (row, index) => {
                    return row[0].head ?
                        row :
                        [{
                            value: `${index}.`, ...otherRowIndexProps
                        }, ...row.slice(1)];
                }
            );
            setState({grid: newGrid, columnMetadataTable: state.columnMetadataTable})
        }
    }

    const handleCustomColumnDelete = (state: { grid: GridElement[][], columnMetadataTable?: GridElement[][] }, headerCell: GridElement) => {
        if ('handleCustomColumnDelete' in customComponentState) {

            const deleteEvent = {
                target: {
                    field: headerCell.field
                }
            }
            customComponentState.handleCustomColumnDelete(deleteEvent);

            const newState =
                customSpreadsheetInputFunc !== undefined &&
                customSpreadsheetInputFunc(
                    {
                        // Custom Component State
                        customComponentState,
                        // Grid State
                        state,
                        // and the name of the SpreadsheetInput defined in its declaration,
                        name,

                        initialHeaders: spreadsheetColumns
                    }
                );
            newState &&
            setState(newState)
        } else {
            const newState = state.grid.map(
                row => row.filter(
                    cell => {
                        console.log('cell.field', cell.field);
                        console.log('headerCell.field', headerCell.field)
                        return cell.field !== headerCell.field
                    }
                )
            )
            setState({grid: newState, columnMetadataTable: state.columnMetadataTable});
        }
    }
    React.useEffect(
        () => {

            // If customSpreadsheetInputFunc is defined,
            console.log('columnMetadataTable', state.columnMetadataTable)

            const addedState =
                customComponentState !== {} &&
                customSpreadsheetInputFunc !== undefined &&
                customSpreadsheetInputFunc(
                    {
                        // Custom Component State
                        customComponentState,
                        // Grid State
                        state,
                        // and the name of the SpreadsheetInput defined in its declaration,
                        name,
                        handleSpreadsheetChange,
                        initialHeaders: spreadsheetColumns

                    }
                );

            // Fake action input event to re-render the changes on the spreadsheet as soon as they are entered,
            // otherwise it will wait until the next update to the state.

            // Set grid state according to the customSpreadsheetInputFunc
            addedState && setState(
                // That takes the
                (readOnlySpreadsheet || readOnly) ? {
                    grid: convertToReadOnly(addedState.grid),
                    columnMetadataTable: addedState.columnMetadataTable
                } : addedState
            )
            // If there were any changes to the custom component state.
            handleBlur();
        },
        [customComponentState]
    )


    const handleClose = (itemClicked?: string, column?: boolean) => () => {
        const contextCell = contextMenuState.cell !== null && contextMenuState.cell;

        if (contextCell) {
            switch (itemClicked) {
                case 'delete':
                    const indexOfRowToDelete = state.grid.findIndex(row => row.some(cell => cell == contextCell));
                    const cellInSection = (contextMenuState.cell as GridElement).memberOfSection;
                    column ?
                        handleCustomColumnDelete(state, contextCell) :
                        cellInSection === undefined ?
                            handleRowDeletion(indexOfRowToDelete) :
                            handleRowDeletion(indexOfRowToDelete, cellInSection);
                    break;
                case 'USD':
                    fieldTypeChange(state, contextCell, setState, handleSpreadsheetChange, name, 'currencyType', customComponentState, customSpreadsheetInputFunc, 'USD');
                    break;
                case 'NIS':
                    fieldTypeChange(state, contextCell, setState, handleSpreadsheetChange, name, 'currencyType', customComponentState, customSpreadsheetInputFunc, 'USD');
                    break;
                case 'weight':
                    contextMenuState.cell?.fieldType === 'kg' ?
                        fieldTypeChange(state, contextCell, setState, handleSpreadsheetChange, name, 'fieldType', customComponentState, customSpreadsheetInputFunc, undefined, 'ton') :
                        fieldTypeChange(state, contextCell, setState, handleSpreadsheetChange, name, 'fieldType', customComponentState, customSpreadsheetInputFunc, undefined, 'kg');
                    break;
            }

        }
        setContextMenuState(initialContextMenuState);
    };

    return (
        <Grid container direction={"column"} spacing={2} style={{paddingTop: 1}}>
            {/* render custom component if it is defined */}

            {
                customComponent !== undefined &&
                !readOnly &&
                <Grid item md={12}>
                    {
                        customComponent(
                            {
                                customComponentState,
                                setCustomComponentState,
                                customComponentContext
                            }
                        )
                    }
                </Grid>
            }
            <Grid item md={12}>
                {
                    state.columnMetadataTable !== undefined &&
                    <MyReactDataSheet
                        data={state.columnMetadataTable}
                        valueRenderer={defaultValueRenderer}
                        cellRenderer={defaultCellRenderer()}
                    />
                }
            </Grid>

            {/* render input label */}
            <Grid item md={12}>
                <Typography style={{fontSize: 18}}>
                    {label}
                </Typography>
            </Grid>

            <Grid item md={12}>
                <ContextMenu state={contextMenuState} handleClose={handleClose}/>

                {/* render the sheet itself */}
                <MyReactDataSheet

                    sheetRenderer={
                        // Use sheet renderer if declared
                        sheetRenderer !== undefined ?
                            sheetRenderer({setState, state}) :
                            undefined
                    }

                    rowRenderer={
                        // Use row renderer if declared
                        rowRenderer !== undefined ?
                            rowRenderer({setState, state}) :
                            undefined
                    }

                    data={
                        // hook in grid state
                        state.grid
                    }

                    valueRenderer={
                        // hook in value renderer (display of cell data) when not in edit mode.
                        defaultValueRenderer
                    }

                    dataRenderer={dataRenderer}

                    onContextMenu={
                        // hook in the context menu renderer (right click action?)
                        defaultOnContextMenu(setContextMenuState)
                    }

                    onCellsChanged={
                        // if onCellsChange undefined
                        onCellChange === undefined ?
                            // hook in on default onCellsChanged
                            getDefaultOnCellsChanged({
                                name,
                                state,
                                setState,
                                handleSpreadsheetChange: handleSpreadsheetChange as
                                    (name: string, value: string) => void
                            }) :
                            // else hook in the declared onCellsChanged
                            onCellChange({setState, state})
                    }
                    cellRenderer={
                        // if cellRenderer undefined
                        cellRenderer === undefined ?
                            // hook in defaultCellRenderer
                            defaultCellRenderer() :
                            // else hook in a custom renderer.
                            cellRenderer(name, state)
                    }
                />
            </Grid>

            {
                (readOnlySpreadsheet || readOnly) ?
                    null :
                    <Grid
                        item
                        container
                        justify={"flex-start"}
                        alignItems={'center'}
                        direction={'row'}
                        xs={6}
                    >
                        {
                            !readOnlySpreadsheet &&
                            <Grid item xs={3}>
                                {/* A button that will add a single row to the table */}
                                <Button disableElevation style={{textTransform: 'none', fontSize: 16}}
                                        variant={'contained'}
                                        onClick={addNewRows(state, setState)}>
                                    Add New Rows
                                </Button>
                            </Grid>
                        }
                        <Grid item xs={4}>
                            {/* A button that will clear all table values */}
                            <Button
                                style={{textTransform: 'none', fontSize: 16}}
                                variant={'contained'}
                                disableElevation
                                onClick={
                                    clearDatasheet(
                                        state,
                                        setState,
                                        spreadsheetColumns,
                                        spreadsheetInitialEmptyRows,
                                        setCustomComponentState
                                    )
                                }>
                                Clear Spreadsheet
                            </Button>
                        </Grid>
                    </Grid>
            }
        </Grid>

    );
}

type SpreadsheetOnContextMenuItem = {
    state: SpreadSheetOnContextMenu,
    handleClose: (itemClicked?: string, column?: boolean) => () => void
};


export const ContextMenu = (props: SpreadsheetOnContextMenuItem) => {
    const {state, handleClose} = props;

    return (
        <>
            <Menu
                keepMounted
                open={state.mousePosition.mouseY !== null}
                onClose={handleClose()}
                anchorReference="anchorPosition"
                anchorPosition={
                    state.mousePosition.mouseY !== null &&
                    state.mousePosition.mouseX !== null ?
                        {
                            top: state.mousePosition.mouseY,
                            left: state.mousePosition.mouseX
                        } :
                        undefined
                }
            >
                {
                    props.state.cellType === "row" ?
                        <MenuItem onClick={props.handleClose('delete')}>
                            Delete Row
                        </MenuItem> :
                        props.state.cellType === "section" ?
                            <MenuItem onClick={props.handleClose('delete')}>
                                Delete Section
                            </MenuItem> :
                            <MenuItem onClick={props.handleClose('delete', true)}>
                                Delete Column
                            </MenuItem>
                }
                {
                    props.state.cellType === "currency" &&
                    props.state.cell &&
                    props.state.cell.fieldType === "currency" &&
                    props.state.cell.currencyType === 'NIS' ?
                        <MenuItem onClick={props.handleClose('USD')}>
                            Change Currency to USD
                        </MenuItem> :
                        <MenuItem onClick={props.handleClose('NIS')}>
                            Change Currency to NIS
                        </MenuItem>

                }
                {
                    props.state.cellType === "weight" &&
                    props.state.cell?.fieldType === 'kg' ?
                        <MenuItem onClick={props.handleClose('weight')}>
                            Change Weight Unit to ton
                        </MenuItem> :
                        <MenuItem onClick={props.handleClose('weight')}>
                            Change Currency to kg
                        </MenuItem>

                }
            </Menu>
        </>
    );
}