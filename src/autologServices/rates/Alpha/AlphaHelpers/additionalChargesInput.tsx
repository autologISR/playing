import * as React from "react";
import {ChangeEvent} from "react";
import {CustomComponentFuncProps, CustomComponentProps, IFieldProps} from "../../../../common/inputFields/FieldTypes";
import {Box, Button, Grid} from "@material-ui/core";
import {InputField} from "../../../../common/inputFields/InputField";
import {
    AvailableCurrencies,
    CellFieldType,
    GridElement
} from "../../../../common/inputFields/inputFieldComponents/spreadsheetInput/spreadsheetInputTypes";
import {IValues} from "../../../../common/form/formTypes";
import {getChooseCurrencyInput, rowIndexField} from "./common";


export type ChargeType = '' | "Fix" | "Per Type" | "Per Weight" | "Per Value";

export interface Fix {
    chargeAmount: string;
}

export type ChargeDetails = {
    chargeName: string;
    chargeAmount: string;
    chargeCurrency: string;
    percentageCharge?: string;
    fromWeight?: string;
    fieldType?: CellFieldType;
    minimum?: 'Minimum' | 'Regular';
    minimumCharge?: string;
    unitOfCharge?: string;
};

const chargeTypeOptions: ChargeType[] = ["Fix", "Per Type", "Per Weight", "Per Value"];

export const chargeType = {
    field: 'chargeType',
    head: true,
    readonly: true,
    section: 'vertical' as 'vertical' | 'horizontal',
    value: 'Charge Type Name',
    staticSection: true
};
export const chargeDetails = {
    field: 'chargeDetails',
    colSpan: 6,
    head: true,
    readonly: true,
    section: 'horizontal' as 'vertical' | 'horizontal',
    value: 'Charge Details',
    staticSection: true
};

export function chargeAmountColumn() {
    return {
        value: "Charge Amount",
        field: 'chargeAmount',
        head: true,
        readOnly: true,
        fieldType: "currency",
        currencyType: 'NIS'
    };
}

export function chargeAmountCell(chargeAmount: string, currencyType: 'NIS' | 'USD'): GridElement {
    return {
        value: chargeAmount,
        field: 'chargeAmount',
        fieldType: "currency" as CellFieldType,
        currencyType: currencyType,

    };
}

export function chargeNameColumn() {
    return {
        head: true,
        value: 'Charge Name',
        field: 'chargeName',
    }
}

export function chargeNameCell(chargeName: string, chargeType: ChargeType) {
    return {
        value: chargeName,
        field: 'chargeName',
        memberOfSection: chargeType,
    }
}

export function minimumChargeColumn() {
    return {
        head: true,
        readOnly: true,
        field: 'minimumCharge',
        value: 'Minimum Charge',
        fieldType: 'currency',
        currencyType: 'NIS'
    }
}

export function minimumChargeCell(chargeAmount: string, currencyType: 'NIS' | 'USD'): GridElement {
    return {
        field: 'minimumCharge',
        value: chargeAmount,
        currencyType: currencyType,
        fieldType: 'currency'
    }
}

export function fromWeightColumn(columnFieldType?: CellFieldType) {
    return {
        head: true,
        readOnly: true,
        value: 'From Weight',
        field: 'fromWeight',
        fieldType: columnFieldType ? columnFieldType : 'kg',
    }
}

export function fromWeightCell(weight: string, unit: CellFieldType): GridElement {
    return {
        value: weight,
        field: 'fromWeight',
        fieldType: unit,
        updated: true,
    }
}

export function chargeByTypeColumn() {
    return {
        head: true,
        readOnly: true,
        value: 'Charge Per',
        field: 'unitOfCharge',
    }
}

export function chargeByTypeCell(unitOfCharge: string) {
    return {
        value: unitOfCharge,
        field: 'unitOfCharge',
        updated: true,
    }
}

export function chargeByValueColumn() {
    return {
        head: true,
        readOnly: true,
        value: '% of Value',
        field: 'percentageCharge',
    }
}

export function chargeByValueCell(percentOfCurrency: CellFieldType) {
    return {
        value: percentOfCurrency,
        field: 'percentageCharge',
        updated: true,
        fieldType: 'percentOfCurrency' as CellFieldType
    }
}


export const chargeByWeightColumns = (props: { containsMinimumCharge: boolean, weightFieldType?: CellFieldType }): GridElement[] =>
    props.containsMinimumCharge ?
        [
            chargeNameColumn(),
            fromWeightColumn(props.weightFieldType),
            chargeAmountColumn(),
            minimumChargeColumn()
        ] :
        [
            chargeNameColumn(),
            fromWeightColumn(props.weightFieldType),
            chargeAmountColumn()
        ]

export const chargeByWeightCells = (props: { chargeDetails: ChargeDetails }): GridElement[] | [] => {
    const {chargeAmount, fromWeight, chargeName, minimum, minimumCharge, fieldType} = props.chargeDetails;
    return fromWeight === undefined ?
        [] :
        minimum === 'Minimum' ?
            [
                chargeNameCell(chargeName, "Per Weight"),
                fromWeightCell(fromWeight, fieldType as CellFieldType),
                chargeAmountCell(chargeAmount, props.chargeDetails.chargeCurrency as 'NIS' | 'USD'),
                minimumChargeCell(minimumCharge as string, props.chargeDetails.chargeCurrency as 'NIS' | 'USD')
            ] :
            [
                chargeNameCell(chargeName, "Per Weight"),
                fromWeightCell(fromWeight, fieldType as CellFieldType),
                chargeAmountCell(chargeAmount, props.chargeDetails.chargeCurrency as 'NIS' | 'USD'),

            ]
}

export const chargeByTypeColumns = (props: { containsMinimumCharge: boolean }): GridElement[] =>
    props.containsMinimumCharge ?
        [
            chargeNameColumn(),
            chargeByTypeColumn(),
            chargeAmountColumn(),
            minimumChargeColumn()
        ] :
        [
            chargeNameColumn(),
            chargeByTypeColumn(),
            chargeAmountColumn(),
        ];

export const chargeByTypeCells = (props: { chargeDetails: ChargeDetails }): GridElement[] => {
    const {chargeName, unitOfCharge, chargeAmount, minimum, minimumCharge} = props.chargeDetails;
    return minimum === 'Minimum' ?
        [
            chargeNameCell(chargeName, "Per Type"),
            chargeByTypeCell(unitOfCharge as string),
            chargeAmountCell(chargeAmount, props.chargeDetails.chargeCurrency as 'NIS' | 'USD'),
            minimumChargeCell(minimumCharge as string, props.chargeDetails.chargeCurrency as 'NIS' | 'USD')
        ] as GridElement[] :
        [
            chargeNameCell(chargeName, "Per Type"),
            chargeByTypeCell(unitOfCharge as string),
            chargeAmountCell(chargeAmount, props.chargeDetails.chargeCurrency as 'NIS' | 'USD'),
        ] as GridElement[]

}

export const fixChargeColumns = (props: { containsMinimumCharge: boolean, specificImplementation: boolean }) =>
    props.containsMinimumCharge ?
        props.specificImplementation ?
            [
                chargeAmountColumn(),
                minimumChargeColumn()
            ] :
            [
                chargeNameColumn(),
                chargeAmountColumn(),
                minimumChargeColumn()
            ] :
        props.specificImplementation ?
            [
                chargeAmountColumn(),
            ] :
            [
                chargeNameColumn(),
                chargeAmountColumn(),
            ];

export const fixChargeCells = (props: { chargeDetails: ChargeDetails, specificImplementation: boolean }): GridElement[] | [] => {
    const {chargeName, chargeAmount, minimum, minimumCharge} = props.chargeDetails;

    return minimum === 'Minimum' ?
        props.specificImplementation ?
            [
                chargeAmountCell(chargeAmount, props.chargeDetails.chargeCurrency as 'NIS' | 'USD',),
                minimumChargeCell(minimumCharge as string, props.chargeDetails.chargeCurrency as 'NIS' | 'USD')
            ] :
            [
                chargeNameCell(chargeName, 'Fix'),
                chargeAmountCell(chargeAmount, props.chargeDetails.chargeCurrency as 'NIS' | 'USD'),
                minimumChargeCell(minimumCharge as string, props.chargeDetails.chargeCurrency as 'NIS' | 'USD')
            ] :
        props.specificImplementation ?
            [
                chargeAmountCell(chargeAmount, props.chargeDetails.chargeCurrency as 'NIS' | 'USD'),
            ] :
            [
                chargeNameCell(chargeName, 'Fix'),
                chargeAmountCell(chargeAmount, props.chargeDetails.chargeCurrency as 'NIS' | 'USD'),
            ]
};

export const valueChargeColumns = (props: { containsMinimumCharge: boolean, specificImplementation: boolean }) =>
    props.containsMinimumCharge ?
        props.specificImplementation ?
            [
                chargeByValueColumn(),
                minimumChargeColumn()
            ] :
            [
                chargeNameColumn(),
                chargeByValueColumn(),
                minimumChargeColumn()
            ] :
        props.specificImplementation ?
            [
                chargeByValueColumn(),
            ] :
            [
                chargeNameColumn(),
                chargeByValueColumn(),
            ];

export const valueChargeCells = (props: { chargeDetails: ChargeDetails, specificImplementation: boolean }): GridElement[] | [] => {
    const {chargeName, percentageCharge, minimumCharge, minimum} = props.chargeDetails;
    return minimum === 'Minimum' ?
        props.specificImplementation ?
            [
                chargeByValueCell(percentageCharge as CellFieldType),
                minimumChargeCell(minimumCharge as string, props.chargeDetails.chargeCurrency as 'NIS' | 'USD')
            ] :
            [
                chargeNameCell(chargeName, 'Fix'),
                chargeByValueCell(percentageCharge as CellFieldType),
                minimumChargeCell(minimumCharge as string, props.chargeDetails.chargeCurrency as 'NIS' | 'USD')
            ] :
        props.specificImplementation ?
            [
                chargeByValueCell(percentageCharge as CellFieldType),
            ] :
            [
                chargeNameCell(chargeName, 'Fix'),
                chargeByValueCell(percentageCharge as CellFieldType),
            ]
};

export const getRowColumns = (chargeType: ChargeType, containsMinimumCharge: boolean, weightFieldType?: CellFieldType): GridElement[] | undefined => {
    switch (chargeType) {
        case "Fix":
            return fixChargeColumns({containsMinimumCharge, specificImplementation: false});
        case "Per Weight":
            return chargeByWeightColumns({containsMinimumCharge, weightFieldType})
        case "Per Type":
            return chargeByTypeColumns({containsMinimumCharge});
        case "Per Value":
            return valueChargeColumns({containsMinimumCharge, specificImplementation: false});
    }
}

function chargeTypeCategoryCell(rowSpan: number, name: string, value: string) {
    return {
        head: true,
        readOnly: true,
        field: 'chargeType',
        value: value,
        name: name,
        section: 'vertical' as 'vertical' | 'horizontal',
        rowSpan: rowSpan,
    }
}

export const additionalChargesColumns: GridElement[][] = [
    [chargeType, chargeDetails]
]
type ChargeTypeDataStoreAction = 'ADD' | "REMOVE_CHARGE_LINE";
type AddingChargeReducerAction = {
    command: ChargeTypeDataStoreAction,
    chargeType?: ChargeType,
    chargeDetails?: ChargeDetails,
    fieldName?: string,
    currencyToChange?: AvailableCurrencies,
    handleCustomComponentChange?: (event: React.ChangeEvent<any>) => void,
    handleCustomSectionDeletion?: (event: React.ChangeEvent<any>) => void,
    newState?: ApplyingChargesDataStore
};
type ApplyingChargesDataStore = Map<ChargeType, IValues>;

const addingNewChargeReducer = (state: ApplyingChargesDataStore, action: AddingChargeReducerAction) => {
    switch (action.command) {
        case "ADD":
            const {chargeName, ...otherChargeDetails} = action.chargeDetails as ChargeDetails;
            const chargeAlreadyInRecord = Object.keys(state.get(action.chargeType as ChargeType) as IValues).some(
                (chargeNameEntry) => chargeNameEntry === chargeName
            );
            let newState =
                chargeAlreadyInRecord ?
                    state :
                    (action.newState ? action.newState : state).set(
                        action.chargeType as ChargeType,
                        {
                            ...state.get(action.chargeType as ChargeType),
                            [`${chargeName}`]: otherChargeDetails,
                        }
                    );


            const changeEvent = {
                target: {
                    name: 'chargeTypes',
                    value: newState,
                    handleCustomSectionDeletion: action.handleCustomSectionDeletion
                }
            } as React.ChangeEvent<any>

            action.handleCustomComponentChange !== undefined &&
            action.handleCustomComponentChange(changeEvent);

            return newState;
        case "REMOVE_CHARGE_LINE":
            return removeChargeLineFromStore(state, action.chargeType as ChargeType, action.fieldName as string);

        default:
            return state;
    }
}

function chargeAmountInput(
    currency: 'USD' | 'NIS',
    handleBlur: () => void,
    handleChargeDetails: (event: React.ChangeEvent<any>) => void
) {
    return <InputField
        handleBlur={handleBlur}
        label={'Charge Amount'}
        required={true}
        handleChange={handleChargeDetails}
        name={'chargeAmount'}
        editor={'chargeAmount'}
        unitOfMeasurement={currency}
    />;
}

function fromWeightInput(
    handleBlur: () => void,
    handleChargeDetails: (event: React.ChangeEvent<any>) => void,
    weightUnitOfMeasurement: 'kg' | 'ton'
) {
    return <InputField
        handleBlur={handleBlur}
        label={'Per Weight'}
        required={true}
        handleChange={handleChargeDetails}
        name={'perWeight'}
        editor={'weight'}
        unitOfMeasurement={weightUnitOfMeasurement}
    />;
}

function chooseWeightUnitOfMeasurement(handleBlur: () => void, handleChargeDetails: (event: React.ChangeEvent<any>) => void) {
    return <InputField
        handleBlur={handleBlur}
        label={'Per Weight'}
        required={true}
        handleChange={handleChargeDetails}
        name={'weightUnitOfMeasurement'}
        groupOrientation={'row'}
        editor={'radio'}
        options={['kg', 'ton']}
    />;
}

function perType(handleBlur: () => void, handleChangeDetails: (event: React.ChangeEvent<any>) => void) {
    return <InputField
        handleBlur={handleBlur}
        label={'Charge Per'}
        required={true}
        handleChange={handleChangeDetails}
        name={'unitOfCharge'}
        editor={'dropdown'}
        options={['Palette', 'Container', 'Shipment']}
    />;
}

function perValueInput(handleBlur: () => void, handleChargeDetails: (event: React.ChangeEvent<any>) => void) {
    return <InputField
        handleBlur={handleBlur}
        label={'Per Value'}
        required={true}
        handleChange={handleChargeDetails}
        name={'perValue'}
        editor={'percentageInput'}
    />;
}

function minimumOrRegularCharge(handleBlur: () => void, handleChargeDetails: (event: React.ChangeEvent<any>) => void) {
    return <InputField
        handleBlur={handleBlur}
        label={'Minimum?'}
        required={true}
        initialValue={'Regular'}
        handleChange={handleChargeDetails}
        name={'minimum'}
        groupOrientation={'row'}
        options={['Regular', 'Minimum']}
        editor='radio'
    />;
}

function minimumCharge(handleBlur: () => void, handleChargeDetails: (event: React.ChangeEvent<any>) => void, currency: 'USD' | 'NIS',) {
    return <InputField
        handleBlur={handleBlur}
        label={'Minimum Charge'}
        required={true}
        handleChange={handleChargeDetails}
        name={'minimumCharge'}
        editor='chargeAmount'
        unitOfMeasurement={currency}
    />;
}

function chargeTypeInput(handleBlur: () => void, handleChargeSelectChange: (event: React.ChangeEvent<any>) => void) {
    return <InputField
        handleBlur={handleBlur}
        label={'Charge Type'}
        required={false}
        handleChange={handleChargeSelectChange}
        name={'chargeType'}
        editor={'dropdown'}
        options={chargeTypeOptions}
    />;
}

function chargeNameInput(handleBlur: () => void, handleChargeSelectChange: (event: React.ChangeEvent<any>) => void) {
    return <InputField
        handleBlur={handleBlur}
        label={'Enter Charge Name'}
        required={false}
        handleChange={handleChargeSelectChange}
        name={'chargeName'}
    />;
}

function initialInputState(): ChargeDetails {
    return {
        minimum: 'Regular',
        minimumCharge: "",
        unitOfCharge: "",
        chargeName: "",
        chargeAmount: "",
        chargeCurrency: 'NIS',
        fromWeight: "",
        percentageCharge: ""
    };
}

function addChargeLineToTableCallback(
    addingChargesReducer: (value: AddingChargeReducerAction) => void,
    chargeSelectState: ChargeType,
    chargeDetails: ChargeDetails,
    handleCustomComponentChange: (event: React.ChangeEvent<any>) => void,
    initializingChargeState?: Map<ChargeType, IValues>
) {
    return () => {
        chargeSelectState !== undefined &&
        addingChargesReducer(
            {
                command: 'ADD',
                chargeType: chargeSelectState,
                chargeDetails: chargeDetails,
                handleCustomComponentChange: handleCustomComponentChange,
                newState: initializingChargeState
            }
        )
    };
}


function addChargeButton(
    addingChargesReducer: React.Dispatch<AddingChargeReducerAction>,
    chargeSelectState: ChargeType,
    chargeDetails: ChargeDetails,
    handleCustomComponentChange: (event: React.ChangeEvent<any>) => void,
    initializingChargeState?: Map<ChargeType, IValues>
) {

    return (
        <Button
            style={{textTransform: 'none', fontSize: 16}}
            variant="contained"
            disableElevation
            color="inherit"
            onClick={
                addChargeLineToTableCallback(
                    addingChargesReducer,
                    chargeSelectState,
                    chargeDetails,
                    handleCustomComponentChange,
                    initializingChargeState
                )
            }
        >
            Add Charge
        </Button>
    );
}

function getInitialChargeState(chargeState?: Map<ChargeType, ChargeDetails>) {
    return chargeState !== undefined ?
        chargeState : new Map([
            ['Fix' as ChargeType, {}],
            ['Per Type' as ChargeType, {}],
            ["Per Weight" as ChargeType, {}],
            ["Per Value" as ChargeType, {}],
        ]);
}

function removeChargeLineFromStore(state: ApplyingChargesDataStore, rowSection: ChargeType, rowChargeName: string) {
    const newState = state;
    let chargeLine = newState.get(rowSection);
    if (chargeLine !== undefined) {
        newState.set(rowSection, chargeLine)
        delete chargeLine[rowChargeName]
    }
    return newState;
}

export const GeneralChargeInputs: React.FunctionComponent<CustomComponentProps> = (props: CustomComponentProps) => {

    const [chargeSelectState, setChargeSelectState] = React.useState<ChargeType>('');
    const [chargeDetails, setChargeDetails] = React.useState<ChargeDetails>(
        initialInputState() as ChargeDetails
    );
    const customComponentContext = props.customComponentContext;

    const initializingChargeState = getInitialChargeState(
        customComponentContext ?
            customComponentContext.chargeState :
            undefined
    );

    const [applyingChargesDataStore, chargesReducer] = React.useReducer(
        addingNewChargeReducer,
        initializingChargeState
    );

    const handleChargeLineDeletion = (event: React.ChangeEvent<any>) => {
        const chargeLineToDelete = event.target;
        chargesReducer({
            command: 'REMOVE_CHARGE_LINE',
            chargeType: chargeLineToDelete.section,
            fieldName: chargeLineToDelete.fieldName
        })
    }
    const handleCustomComponentChange = (event: React.ChangeEvent<any>) => {
        props.setCustomComponentState({
            chargeTypes: event.target.value,
            handleCustomSectionDeletion: handleChargeLineDeletion
        });
    };
    const handleBlur = () => {

    };

    const handleChargeSelectChange = (event: React.ChangeEvent<any>) => {
        setChargeSelectState(event.target.value);
    };

    const handleChange = (prop: string) => (e: ChangeEvent<any>) => {
        setChargeDetails({...chargeDetails, [prop]: e.target.value});
    };


    return (
        <Grid container alignContent={'stretch'} alignItems={'flex-start'} direction={'row'} spacing={2}>

            <Grid item md={12}>
                <Box
                    paddingTop={2}
                    paddingBottom={1}
                    style={{fontSize: 18, fontWeight: 400}}
                    order={1}
                    m={1}
                >
                    Add Additional Rate Charge
                </Box>
            </Grid>

            <Grid item md={12}>
                {chargeTypeInput(handleBlur, handleChargeSelectChange)}
            </Grid>

            <Grid item md={12}>
                {chargeNameInput(handleBlur, handleChange('chargeName'))}
            </Grid>
            {
                chargeSelectState === 'Per Weight' &&
                <Grid item md={4}>
                    {chooseWeightUnitOfMeasurement(handleBlur, handleChange('weightUnitOfMeasurement'))}
                </Grid>

            }
            {
                chargeSelectState === 'Per Weight' &&
                <Grid item md={6}>
                    {fromWeightInput(handleBlur, handleChange('fromWeight'), chargeDetails.fieldType as 'kg' | 'ton')}
                </Grid>

            }
            {
                chargeSelectState === 'Per Type' &&
                <Grid item md={12}>
                    {perType(handleBlur, handleChange('unitOfCharge'))}
                </Grid>
            }
            {
                chargeSelectState === 'Per Value' &&
                <Grid item md={12}>
                    {perValueInput(handleBlur, handleChange('percentageCharge'))}
                </Grid>
            }
            {
                chargeSelectState !== '' && chargeSelectState !== 'Per Value' &&
                <>
                    <Grid item xs={4}>
                        {getChooseCurrencyInput(handleBlur, handleChange('chargeCurrency'), chargeDetails.chargeCurrency as 'NIS' | 'USD')}
                    </Grid>
                    <Grid item xs={6}>
                        {chargeAmountInput(chargeDetails.chargeCurrency as 'NIS' | 'USD', handleBlur, handleChange('chargeAmount'))}
                    </Grid>
                </>
            }

            {
                chargeSelectState !== '' &&
                <>
                    <Grid item xs={4}>
                        {minimumOrRegularCharge(handleBlur, handleChange('minimum'))}
                    </Grid>
                    {
                        chargeDetails.minimum === 'Minimum' &&
                        <Grid item xs={6}>
                            {minimumCharge(handleBlur, handleChange('minimumCharge'), chargeDetails.chargeCurrency as 'NIS' | 'USD')}
                        </Grid>
                    }
                </>
            }
            <Grid item md={12}>
                <Box padding={1}>
                    {addChargeButton(chargesReducer, chargeSelectState, chargeDetails, handleCustomComponentChange, customComponentContext ? customComponentContext.chargeMap : undefined)}
                </Box>
            </Grid>

        </Grid>
    );
}

function maxLengthChargeLineSize(gridSection: GridElement[][]) {
    return Math.max(...gridSection.map(chargeLineValue => chargeLineValue.length));
}

function insertNewSection(
    chargeType: ChargeType,
    gridSection: GridElement[][],
    rowSpan: number
): GridElement[] {
    const {value: rowCellValue, ...otherRowIndexProps} = rowIndexField;
    const containsMinimumCharge = gridSection.some(
        row => row.some(cell => cell.field === 'minimumCharge')
    )
    const weightTypeRow = gridSection.find(row => row.some(cell => cell.fieldType === 'ton' || cell.fieldType === 'kg'));
    let weightCellField;
    if (weightTypeRow !== undefined) {
        weightCellField = weightTypeRow.find((cell) => cell.fieldType === 'kg' || cell.fieldType === 'ton')
    }
    const newSection = getRowColumns(
        chargeType, containsMinimumCharge,
        weightCellField === undefined ?
            undefined :
            (weightCellField.fieldType) as CellFieldType
    );

    const validSection =
        newSection === undefined ?
            [] :
            newSection
    return [
        chargeTypeCategoryCell(rowSpan, chargeType, chargeType),
        {value: '', ...otherRowIndexProps},
        ...validSection
    ]

}

function convertToGridSection(
    chargeType: ChargeType,
    chargeTypeLineEntries: [string, ChargeDetails][],
): GridElement[][] {
    const {value, head, ...otherRowIndexFieldProps} = rowIndexField;

    return (
        chargeType === 'Fix' ?
            chargeTypeLineEntries.map(
                ([chargeName, chargeDetails], index) => {
                    const {chargeName: extractedChargeName, ...otherDetailProps} = chargeDetails;

                    return [
                        {value: `${index + 1}.`, ...otherRowIndexFieldProps, memberOfSection: 'Fix'},
                        ...fixChargeCells({
                            chargeDetails: {chargeName: chargeName, ...(otherDetailProps)},
                            specificImplementation: false
                        })
                    ] as GridElement[]
                }
            ) :
            chargeType === 'Per Type' ?
                chargeTypeLineEntries.map(
                    ([chargeName, chargeDetails], index) => {
                        const {chargeName: extractedChargeName, ...otherDetailProps} = chargeDetails;

                        return [
                            {
                                value: `${index + 1}.`,
                                ...otherRowIndexFieldProps,
                                memberOfSection: 'Per Type'
                            } as GridElement,
                            ...chargeByTypeCells({
                                    chargeDetails: {
                                        chargeName: chargeName,
                                        ...otherDetailProps,
                                    }
                                }
                            )
                        ] as GridElement[]
                    }
                ) :
                chargeType === 'Per Weight' ?
                    chargeTypeLineEntries.map(
                        ([chargeName, chargeDetails], index) => {
                            const {chargeName: extractedChargeName, ...otherDetailProps} = chargeDetails;
                            return [
                                {
                                    value: `${index + 1}.`, ...otherRowIndexFieldProps,
                                    memberOfSection: 'Per Weight'
                                } as GridElement,
                                ...chargeByWeightCells({
                                        chargeDetails: {
                                            chargeName: chargeName,
                                            fieldType: otherDetailProps.fieldType,
                                            ...otherDetailProps
                                        }
                                    }
                                )
                            ] as GridElement[]
                        }
                    ) :
                    chargeType === 'Per Value' ?
                        chargeTypeLineEntries.map(
                            ([chargeName, chargeDetails], index) => {
                                const {chargeName: extractedChargeName, ...otherDetailProps} = chargeDetails;

                                return [
                                    {
                                        value: `${index + 1}.`, ...otherRowIndexFieldProps,
                                        memberOfSection: 'Per Value'
                                    } as GridElement,
                                    ...valueChargeCells({
                                            chargeDetails: {
                                                chargeName: chargeName,
                                                ...otherDetailProps
                                            },
                                            specificImplementation: false
                                        }
                                    )
                                ] as GridElement[]
                            }
                        ) :
                        []
    );
}


function getChargeSection(grid: GridElement[][], chargeType: ChargeType): GridElement[][] {
    const gridSection: GridElement[][] = [];
    gridSection.push(
        ...grid.filter(row => row[0].memberOfSection === chargeType)
    );
    return gridSection.map(
        row => row.filter(cell => !Object.keys(cell).some(key => key === 'paddingCell'))
    );
}

//: [ChargeType, IValues]
function getDataStoreEntry(chargeSection: GridElement[][], chargeType: ChargeType) {
    const sectionChargeDetails: IValues = {};
    chargeSection.forEach(
        (row: GridElement[]) => {


            const chargeName = row[1].value as string;
            const chargeDetails = row[2] as GridElement;

            let newChargeDetails: ChargeDetails = initialInputState();
            switch (chargeType) {
                case "Fix":
                    newChargeDetails['chargeCurrency'] = chargeDetails.currencyType as 'NIS' | 'USD';
                    newChargeDetails['chargeAmount'] = chargeDetails.value as string;
                    newChargeDetails.chargeName = chargeName;
                    break;
                case "Per Value":
                    newChargeDetails.percentageCharge = chargeDetails.value as string;
                    newChargeDetails.chargeName = chargeName;
                    break;
                case "Per Weight":
                    newChargeDetails['fromWeight'] = chargeDetails.value as string;
                    newChargeDetails.chargeName = chargeName;
                    newChargeDetails.fieldType = chargeDetails.fieldType;
                    break;
                case "Per Type":
                    newChargeDetails.unitOfCharge = chargeDetails.field;
                    newChargeDetails.chargeName = chargeName;
                    newChargeDetails['chargeAmount'] = chargeDetails.value as string;
                    newChargeDetails.fieldType = chargeDetails.fieldType;
                    break;


            }
            if (row.some(cell => cell.field === 'minimumCharge')) {
                newChargeDetails.minimum = 'Minimum';
            } else {
                newChargeDetails.minimum = 'Regular';
            }

            sectionChargeDetails[chargeName] =newChargeDetails;
        }
);


    return sectionChargeDetails;
}

function convertToDataStore(grid: GridElement[][]) {
    const fixCharges = getChargeSection(grid, 'Fix');
    const perTypeCharges = getChargeSection(grid, 'Per Type');
    const perValueCharges = getChargeSection(grid, 'Per Value');
    const perWeightCharges = getChargeSection(grid, 'Per Weight');

    return new Map<ChargeType, IValues>(
        [
            ['Fix', getDataStoreEntry(fixCharges, 'Fix')],
            ['Per Type', getDataStoreEntry(perTypeCharges, 'Per Type')],
            ['Per Value', getDataStoreEntry(perValueCharges, 'Per Value')],
            ['Per Weight', getDataStoreEntry(perWeightCharges, 'Per Weight')]
        ]
    )
}

export function padGrid(grid: GridElement[][], maxLengthSectionRowLength: number) {
    return grid.map(
        (row, index) =>
            index === 0 ?
                row :
                maxLengthSectionRowLength === 0 ?
                    row :
                    [
                        ...row,
                        ...new Array(
                            maxLengthSectionRowLength - row.slice(row[0].section === undefined ? 1 : 2).length - 1
                        ).fill(
                            {
                                field: '',
                                value: '',
                                head: true,
                                paddingCell: true
                            }
                        )
                    ]
    );
}

export interface ZoneDefinition {

}

const zoneDefinitionsRow = () => {
    return {

    }
}

function appendEntry(chargeDataStoreFromGrid: ApplyingChargesDataStore, currentCharges: ApplyingChargesDataStore) {
    let newChargeDataStore = chargeDataStoreFromGrid;
    currentCharges.forEach((chargeDetails, chargeType) => {
        newChargeDataStore = newChargeDataStore.set(chargeType, {...chargeDataStoreFromGrid.get(chargeType), ...chargeDetails})
    })
    return newChargeDataStore;
}

export const chargeInputFunc = (props: CustomComponentFuncProps) => {
    const {customComponentState, state, handleSpreadsheetChange} = props;
    let newState = state;

    /* state.grid.length === 1 means we are initializing the grid, otherwise we have > 1 rows in any case. */
    if ('customComponentContext' in customComponentState) {

        newState.grid = [newState.grid[0]];
        let maxLengthSectionRowLength = 0;
        (customComponentState.customComponentContext.chargeMap as ApplyingChargesDataStore).forEach(
            (chargeTypeLines, chargeType) => {
                const chargeTypeLineEntries = Object.entries(chargeTypeLines)
                const gridSection = convertToGridSection(chargeType, chargeTypeLineEntries);

                newState.grid =
                    chargeTypeLineEntries.length === 0 ?
                        newState.grid :
                        [
                            ...newState.grid,
                            insertNewSection(chargeType, gridSection, chargeTypeLineEntries.length + 1),
                            ...gridSection
                        ]

                const currentMaxLength = maxLengthChargeLineSize(gridSection);

                maxLengthSectionRowLength =
                    currentMaxLength >= maxLengthSectionRowLength ?
                        currentMaxLength :
                        maxLengthSectionRowLength;
            }
        );

        newState = {
            grid: padGrid(newState.grid, maxLengthSectionRowLength)
        }
        handleSpreadsheetChange !== undefined &&
        handleSpreadsheetChange('additionalCharges', JSON.stringify([...[...newState.grid]]));
        return newState;
    }

    if ('chargeTypes' in customComponentState) {
        let currentDataStore = appendEntry(
            convertToDataStore(newState.grid),
            customComponentState.chargeTypes as ApplyingChargesDataStore
        );
        let maxLengthSectionRowLength = 0;
        newState.grid = [newState.grid[0]];

        currentDataStore.forEach(
            (chargeTypeLines, chargeType) => {
                const chargeTypeLineEntries = Object.entries(chargeTypeLines);
                const gridSection = convertToGridSection(chargeType, chargeTypeLineEntries);

                newState.grid =
                    chargeTypeLineEntries.length === 0 ?
                        newState.grid :
                        [
                            ...newState.grid,
                            insertNewSection(chargeType, gridSection, chargeTypeLineEntries.length + 1),
                            ...gridSection
                        ]

                const currentMaxLength = maxLengthChargeLineSize(gridSection);

                maxLengthSectionRowLength =
                    currentMaxLength >= maxLengthSectionRowLength ?
                        currentMaxLength :
                        maxLengthSectionRowLength;
            }
        );

        newState = {
            grid: padGrid(newState.grid, maxLengthSectionRowLength),
            columnMetadataTable: state.columnMetadataTable
        }
        handleSpreadsheetChange !== undefined &&
        handleSpreadsheetChange('additionalCharges', JSON.stringify([...[...newState.grid]]));
        return newState;
    }

};

export const additionalChargesTable = (
    editable?: boolean,
    customComponent?: (props: CustomComponentProps) => JSX.Element,
    label?: string,
    customComponentContext?: IValues,
): IFieldProps => {
    return {
        name: 'additionalCharges',
        editor: 'spreadsheet',
        customComponent: GeneralChargeInputs,
        customSpreadsheetInputFunc: chargeInputFunc,
        spreadsheetColumns: additionalChargesColumns,
        label: label ?
            label :
            "Additional Charges List",
        required: true,
        spreadsheetInitialEmptyRows: 1,
        readOnlySpreadsheet: !editable,
        customComponentContext: customComponentContext
    } as IFieldProps
};