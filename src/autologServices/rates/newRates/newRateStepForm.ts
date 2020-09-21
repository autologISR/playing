import {IFormProps, IValues, Schema} from "../../../common/form/formTypes";
import {AutologSystemMessageSchema} from "../../../common/systemMessages/autologSystemMessageTypes";
import {
    StepForm,
    StepFormSchema,
    StepsCallbackProps,
    StepStateCallbackType
} from "../../../common/stepForm/stepFormTypes";
import {airRates} from "./airInputs";
import {getZoneTable, inlandInputFields, ZoneSectionMap} from "./inlandInputs";
import {OceanFclRates} from "./oceanFclInputs";
import {OceanLclRates} from "./oceanLclInputs";
import {rowIndexField} from "./common";
import {additionalChargesTable, ChargeType} from "./additionalChargesInput";
import {
    CellFieldType, convertToReadOnly,
    GridElement
} from "../../../common/inputFields/inputFieldComponents/spreadsheetInput/spreadsheetInputTypes";
import {CreateRate} from "./newRatesCommand";
import {SelectEditor} from "../../../common/inputFields/inputFieldComponents/spreadsheetInput/SpreadsheetInput";

const ratesCreationMessages: AutologSystemMessageSchema = new Map([
    ['success', {message: 'Rate was created.'}],
    ['error', {message: 'There was an error during rate creation, please check errors.'}],
]);
/*

const pointOfDestination = {
    head: true,
    field: 'pointOfDestination',
    value: 'Point of Destination',
    readOnly: true,
};


const pointsOfDestinationColumns = [
    [rowIndexField, pointOfDestination]
];
*/

export const rateGeneralInfoForm = [
    {name: "rateName", label: "Rate Name", editor: "textbox", required: true},
    {name: "freightForwarderName", label: "Freight Forwarder Name", editor: "textbox", required: true},
    {name: "carrierName", label: "Carrier Name", editor: "textbox", required: true},
    {name: "validFrom", label: "Valid From", editor: "dateinput", required: true},
    {name: "validTo", label: "Valid To", editor: "dateinput", required: true},
    /*{
        name: 'pointsOfDestination',
        required: true,
        label: 'Add Rate Points of Destination',
        editor: 'spreadsheet',
        spreadsheetColumns: pointsOfDestinationColumns
    },*/
    {
        name: "direction", label: "Direction", editor: "radio",
        options: ['Import', 'Export'], required: true
    },
    {
        name: "incoterm", label: "Incoterm", editor: "radio",
        options: ['EXW', 'FOB', 'CIF', 'DAP', "Courier"], required: true
    },
    {
        name: "modeOfTransport", label: "Mode Of Transport", editor: "radio",
        options: ['OCEAN', 'AIR'], required: true
    },
    {
        name: "cargoLoad", label: "Cargo Load", editor: "radio",
        options: ['FCL', 'LCL'], required: true
    },
];

const localsImportOceanFcl = [
    additionalChargesTable(
        true,
        undefined,
        'Local Charges Ocean FCL',
        {
            customComponentContext: {
                chargeMap: new Map(
                    [
                        [
                            'Fix' as ChargeType, {
                            "IT, Delivery Order, ISPS": {
                                minimum: 'Regular',
                                minimumCharge: "",
                                unitOfCharge: "",
                                chargeName: "IT, Delivery Order, ISPS",
                                chargeAmount: "",
                                chargeCurrency: 'NIS',
                                fromWeight: "",
                                percentageCharge: "",
                                weightUnitOfMeasurement: 'kg' as 'kg' | 'ton'
                            },
                            "Custom Clearance": {
                                minimum: 'Regular',
                                minimumCharge: "",
                                unitOfCharge: "",
                                chargeName: "Custom Clearance",
                                chargeAmount: "",
                                chargeCurrency: 'NIS',
                                fromWeight: "",
                                percentageCharge: "",
                                weightUnitOfMeasurement: 'kg' as 'kg' | 'ton'
                            },
                            "THC CTN 20": {
                                minimum: 'Regular',
                                minimumCharge: "",
                                unitOfCharge: "",
                                chargeName: "THC CTN 20",
                                chargeAmount: "",
                                chargeCurrency: 'NIS',
                                fromWeight: "",
                                percentageCharge: "",
                                weightUnitOfMeasurement: 'kg' as 'kg' | 'ton'
                            },
                            "THC CTN 40": {
                                minimum: 'Regular',
                                minimumCharge: "",
                                unitOfCharge: "",
                                chargeName: "THC CTN 40",
                                chargeAmount: "",
                                chargeCurrency: 'NIS',
                                fromWeight: "",
                                percentageCharge: "",
                                weightUnitOfMeasurement: 'kg' as 'kg' | 'ton'
                            },

                        }],
                        ['Per Type' as ChargeType, {}],
                        ["Per Weight" as ChargeType, {}],
                        ["Per Value" as ChargeType, {
                            'Communication Fee': {
                                minimum: 'Minimum',
                                minimumCharge: "",
                                unitOfCharge: "",
                                chargeName: "Communication Fee",
                                chargeAmount: "",
                                chargeCurrency: 'NIS',
                                fromWeight: "",
                                percentageCharge: "",
                                weightUnitOfMeasurement: 'kg' as 'kg' | 'ton'
                            }
                        }]
                    ]
                ),
                initialized: false
            }
        }
    )
];

const localsImportOceanLcl = [
    additionalChargesTable(
        true,
        undefined,
        'Local Charges Ocean LCL',
        {
            customComponentContext: {
                chargeMap: new Map(
                    [
                        ['Fix' as ChargeType, {
                            "Communications": {
                                minimum: 'Regular',
                                minimumCharge: "",
                                unitOfCharge: "",
                                chargeName: "Communications",
                                chargeAmount: "",
                                chargeCurrency: 'NIS',
                                fromWeight: "",
                                percentageCharge: "",
                            },
                            "Delivery order": {
                                minimum: 'Regular',
                                minimumCharge: "",
                                unitOfCharge: "",
                                chargeName: "Delivery order",
                                chargeAmount: "",
                                chargeCurrency: 'NIS',
                                fromWeight: "",
                                percentageCharge: "",
                            },
                            "Agent fee": {
                                minimum: 'Regular',
                                minimumCharge: "",
                                unitOfCharge: "",
                                chargeName: "Agent fee",
                                chargeAmount: "",
                                chargeCurrency: 'NIS',
                                fromWeight: "",
                                percentageCharge: "",
                            },

                        }],
                        ['Per Type' as ChargeType, {
                            'IT': {
                                minimum: 'Minimum',
                                minimumCharge: "",
                                unitOfCharge: "W/M",
                                chargeName: "IT",
                                chargeAmount: "",
                                chargeCurrency: 'NIS',
                                percentageCharge: "",
                            },
                            'ISPS': {
                                minimum: 'Minimum',
                                minimumCharge: "",
                                unitOfCharge: "W/M",
                                chargeName: "ISPS",
                                chargeAmount: "",
                                chargeCurrency: 'NIS',
                                percentageCharge: "",
                            },
                            'THC': {
                                minimum: 'Minimum',
                                minimumCharge: "",
                                unitOfCharge: "W/M",
                                chargeName: "THC",
                                chargeAmount: "",
                                chargeCurrency: 'NIS',
                                percentageCharge: "",
                            }
                        }],
                        ["Per Weight" as ChargeType, {
                            'Empty fees': {
                                minimum: 'Minimum',
                                minimumCharge: "",
                                unitOfCharge: "",
                                chargeName: "Empty fees",
                                chargeAmount: "",
                                chargeCurrency: 'NIS',
                                fromWeight: "",
                                percentageCharge: "",
                                fieldType: 'ton' as CellFieldType
                            }
                        }],
                        ["Per Value" as ChargeType, {
                            'Communication Fee': {
                                minimum: 'Minimum',
                                minimumCharge: "",
                                unitOfCharge: "",
                                chargeName: "Collection Fee",
                                chargeAmount: "",
                                chargeCurrency: 'NIS',
                                percentageCharge: "",
                            }
                        }]
                    ]
                ),
            }
        }
    )
];

const localsImportAirLcl = [
    additionalChargesTable(
        true,
        undefined,
        'Local Charges Air',
        {
            customComponentContext: {
                chargeMap: new Map(
                    [
                        ['Fix' as ChargeType, {
                            "Delivery Order": {
                                minimum: 'Minimum',
                                minimumCharge: "",
                                unitOfCharge: "",
                                chargeName: "Delivery Order",
                                chargeAmount: "",
                                chargeCurrency: 'NIS',
                                fromWeight: "",
                                percentageCharge: "",
                            },
                            "IATA": {
                                minimum: 'Minimum',
                                minimumCharge: "",
                                unitOfCharge: "",
                                chargeName: "IATA",
                                chargeAmount: "",
                                chargeCurrency: 'NIS',
                                fromWeight: "",
                                percentageCharge: "",
                            },
                            "Communications": {
                                minimum: 'Regular',
                                minimumCharge: "",
                                unitOfCharge: "",
                                chargeName: "Communications ",
                                chargeAmount: "",
                                chargeCurrency: 'NIS',
                                fromWeight: "",
                                percentageCharge: "",
                            },
                            "Handling fee & BL": {
                                minimum: 'Regular',
                                minimumCharge: "",
                                unitOfCharge: "",
                                chargeName: "Communications ",
                                chargeAmount: "",
                                chargeCurrency: 'NIS',
                                fromWeight: "",
                                percentageCharge: "",
                            },
                            "Maman/Swissport": {
                                minimum: 'Regular',
                                minimumCharge: "",
                                unitOfCharge: "",
                                chargeName: "Communications ",
                                chargeAmount: "",
                                chargeCurrency: 'NIS',
                                fromWeight: "",
                                percentageCharge: "",
                            },
                        }],
                        ['Per Type' as ChargeType, {}],
                        ["Per Weight" as ChargeType, {}],
                        ["Per Value" as ChargeType, {}]
                    ]
                ),
            }
        }
    )
];


export const RateGeneralInfoProps: IFormProps = {
    formSystemMessage: ratesCreationMessages,
    schema: rateGeneralInfoForm,
    submitButtonTitle: "Next",
    title: "Basic Rate Info",
    validate: function (values: IValues) {

        let errors: IValues = {};
        if (!('rateName' in values)) {
            errors.rateName = 'Rate Name is required.';
        }
        if (!('freightForwarderName' in values)) {
            errors.freightForwarderName = 'Freight Forwarder Name is required.';
        }
        if (!('carrierName' in values)) {
            errors.carrierName = 'Carrier Name is required.'
        }
        if (!('validFrom' in values)) {
            errors.validFrom = 'Validity Start Date is required.'
        }
        if (!('validTo' in values)) {
            errors.validFrom = 'Validity End Date is required.'
        }
        /*

                if (!('pointsOfDestination' in values)) {
                    errors.pointsOfDestination = 'Points of Destination is required.'
                }
        */

        if (!('direction' in values)) {
            errors.direction = 'Rate Direction is required.'
        }

        if (!('incoterm' in values)) {
            errors.incoterm = 'Rate Incoterm is required.'
        }
        if (!('modeOfTransport' in values)) {
            errors.modeOfTransport = 'Rate Mode of Transport is required.';
        }
        if (!('cargoLoad' in values)) {
            errors.cargoLoad = 'Rate Cargo Load is required.'
        }
        return errors;
    }
};

type LocalsType = 'LocalsImportOCEANFCL' | 'LocalsImportOCEANLCL' | 'LocalsImportAIRLCL' | undefined;


function getLocalsSchema(localsType: LocalsType) {
    switch (localsType) {
        case "LocalsImportOCEANFCL":
            return localsImportOceanFcl;
        case "LocalsImportOCEANLCL":
            return localsImportOceanLcl;
        case "LocalsImportAIRLCL":
            return localsImportAirLcl;
    }
}

const AddLocalsProps: (localsType?: LocalsType) =>
    IFormProps = (localsType: LocalsType) => {
    return {
        formSystemMessage: ratesCreationMessages,
        schema: (localsType ? getLocalsSchema(localsType) : [additionalChargesTable()]) as Schema,
        submitButtonTitle: "Next",
        title: "Add Locals",
        validate: function (values: IValues) {
            return {};
        }
    }
};

const AddTaxAndRules: IFormProps = {
    formSystemMessage: ratesCreationMessages,
    schema: rateGeneralInfoForm,
    submitButtonTitle: "Next",
    title: "Add Tax Rules",
    validate: function (values: IValues) {
        return {};
    }
};

const FreightTransportOceanLcl: IFormProps = {
    formSystemMessage: ratesCreationMessages,
    schema: OceanLclRates,
    submitButtonTitle: "Next",
    title: "Add Freight Transport Rates",
    validate: function (values: IValues) {
        return {};
    }
};
const FreightTransportEXWOceanFcl: IFormProps = {
    formSystemMessage: ratesCreationMessages,
    schema: OceanFclRates('EXW'),
    submitButtonTitle: "Next",
    title: "Add Freight Transport Rates",
    validate: function (values: IValues) {
        return {};
    }
};

const FreightTransportFOBOceanFcl: IFormProps = {
    formSystemMessage: ratesCreationMessages,
    schema: OceanFclRates('FOB'),
    submitButtonTitle: "Next",
    title: "Add Freight Transport Rates",
    validate: function (values: IValues) {
        return {};
    }
};

const FreightTransportEXWAir: IFormProps = {
    formSystemMessage: ratesCreationMessages,
    schema: airRates('EXW'),
    submitButtonTitle: "Next",
    title: "Add Freight Transport Rates",
    validate: function (values: IValues) {
        return {};
    }
};

const FreightTransportFOBAir: IFormProps = {
    formSystemMessage: ratesCreationMessages,
    schema: airRates('FOB'),
    submitButtonTitle: "Next",
    title: "Add Freight Transport Rates",
    validate: function (values: IValues) {
        return {};
    }
};


const PickUp: IFormProps = {
    formSystemMessage: ratesCreationMessages,
    schema: inlandInputFields('NonCourier'),
    submitButtonTitle: "Next",
    title: 'Add Pick Up Rates',
    validate: function (values: IValues) {
        return {}
    }
};
const Courier: IFormProps = {
    formSystemMessage: ratesCreationMessages,
    schema: inlandInputFields('Courier'),
    submitButtonTitle: "Next",
    title: 'Add Courier Rates',
    validate: function (values: IValues) {
        return {}
    }
};
const Delivery: IFormProps = {
    formSystemMessage: ratesCreationMessages,
    schema: inlandInputFields('NonCourier'),
    submitButtonTitle: "Next",
    title: 'Add Delivery Rates',
    validate: function (values: IValues) {
        return {}
    }
};

export const newRatesStepFormMap = new Map([
    ['BasicRateInfo', RateGeneralInfoProps],
    ['FreightTransportOCEANLCL', FreightTransportOceanLcl],
    ['FreightTransportEXWAIRLCL', FreightTransportEXWAir],
    ['FreightTransportFOBAIRLCL', FreightTransportFOBAir],
    ['FreightTransportEXWOCEANFCL', FreightTransportEXWOceanFcl],
    ['FreightTransportFOBOCEANFCL', FreightTransportFOBOceanFcl],
    ['LocalsImportOCEANFCL', AddLocalsProps('LocalsImportOCEANFCL')],
    ['LocalsImportOCEANLCL', AddLocalsProps('LocalsImportOCEANLCL')],
    ['LocalsImportAIRLCL', AddLocalsProps('LocalsImportAIRLCL')],
    ['LocalsExportOCEANFCL', AddLocalsProps()],
    ['LocalsExportOCEANLCL', AddLocalsProps()],
    ['LocalsExportAIRLCL', AddLocalsProps()],
    ['AddTaxAndRules', AddTaxAndRules],
    ['PickUp', PickUp],
    ['Courier', Courier],
    ['Delivery', Delivery],
]);

export function newRateCreationStepsCallback(props: StepsCallbackProps) {
    const {stageValues} = props;
    const {incoterm, modeOfTransport, cargoLoad, direction} = stageValues;
    const exw = ['PickUp', 'FreightTransport', 'Locals'];
    const fob = ['FreightTransport', 'Locals'];
    const cif = ['PickUp', 'FreightTransport', 'Locals'];
    const courier = ['Courier', 'Locals'];


    const getSteps = (step: string) => {
        switch (step) {
            case 'PickUp' :
                return 'PickUp';
            case 'Delivery' :
                return 'Delivery';
            case 'FreightTransport':
                return 'FreightTransport' + incoterm + modeOfTransport + cargoLoad;
            case 'Courier':
                return 'Courier';
            case 'Locals':
                return 'Locals' + direction + modeOfTransport + cargoLoad;
        }
    };

    const stagesArr = () => {

        switch (incoterm) {
            case "FOB":
                return fob;
            case "EXW":
                return exw;
            case "CIF":
                return cif;
            case "Courier":
                return courier;
        }
    };
    const incotermStages = stagesArr();
    const formStages = incotermStages !== undefined && incotermStages.map(getSteps) as string[];
    console.log('formStages: ', formStages);
    return formStages ?
        ['BasicRateInfo', ...formStages] :
        ['BasicRateInfo'];
}


const newRatesStepForm: StepForm = [newRateCreationStepsCallback, newRatesStepFormMap];

export const createNewRateCommand = (props: IValues) => {
    return CreateRate(props);
};

export const validateRate = (props: IValues) => {
    return {};
};

export const newRateStepStateCallback: StepStateCallbackType = (props): IFormProps => {
    const {submissionValues, stepFormMap, nextStep, step} = props;

    switch (step) {
        case 'PickUp':
            const {inlandRates,} = submissionValues
            const inlandTableSheet = JSON.parse(inlandRates);
            const zoneHeaders = inlandTableSheet.grid[0].slice(2);
            const parsedInlandZones = zoneHeaders.map(
                (headerCell: GridElement) => {
                    const matchedZoneOption = (headerCell.value as string).match(/^Zone_.*$/);
                    return matchedZoneOption ? matchedZoneOption[0] : null;
                });

            console.log('submissionValues: ', submissionValues);
            console.log('inlandTableSheet: ', inlandTableSheet);

            const fobForm = stepFormMap.get(nextStep) as IFormProps;
            const {schema, ...otherFormProps} = fobForm;
            const [fob, additional] = schema as Schema[];
            const {spreadsheetColumns, ...other} = fob;
            let [[rowIndex, ...otherCols]] = spreadsheetColumns;

            const newHeaders = [
                [
                    rowIndex,
                    {
                        field: "portZone",
                        value: "Port Zone",
                        forceComponent: true,
                        dataEditor: SelectEditor,
                        options: parsedInlandZones,
                        head: true,
                        readOnly: true
                    } as GridElement,
                    ...otherCols
                ]
            ];

            return {
                schema: [
                    {
                        spreadsheetColumns: newHeaders,
                        columnMetadataTable: inlandTableSheet.columnMetadataTable,
                        ...other
                    },
                    additional
                ],
                ...otherFormProps
            };
        default:
            return stepFormMap.get(step) as IFormProps;

    }

}

export const newRateSchema: StepFormSchema = {
    sourceStage: 'BasicRateInfo',
    command: createNewRateCommand,
    newEntityStepForm: newRatesStepForm,
    validate: validateRate,
    formSystemMessage: ratesCreationMessages,
    stepStateCallback: newRateStepStateCallback
};