import Amplify, {API, graphqlOperation} from 'aws-amplify';
import * as mutations from "../../../graphql/mutations";
import awsconfig from '../../../aws-exports';
import {IValues} from "../../../common/form/formTypes";
import {GridElement} from "../../../common/inputFields/inputFieldComponents/spreadsheetInput/spreadsheetInputTypes";
// import {deserializeSpreadsheet} from "../../../common/stepForm/StepFormResultPreview";
import {dynamoDbDateForTable} from "../../../common/entityKeyPair";

Amplify.configure(awsconfig);

export const getRowValueByFieldName = (field: string, row: GridElement[]) => {
    const cell = row.find(cell => !cell.head && cell.field === field);
    return cell === undefined ? undefined : cell.value;
}


enum RateType {
    FOBImportOCEANLCL = 'FOBImportOCEANLCL',
    FOBImportOCEANFCL = 'FOBImportOCEANFCL',
    FOBImportAIRLCL = 'FOBImportAIRLCL',

    EXWImportOCEANFCL = 'EXWImportOCEANFCL',
    EXWImportOCEANLCL = 'EXWImportOCEANLCL',
    EXWImportAIRLCL = 'EXWImportAIRLCL',

    CIFImportOCEANLCL = 'CIFImportOCEANLCL',
    CIFImportOCEANFCL = 'CIFImportOCEANFCL',
    CIFImportAIRLCL = 'CIFImportAIRLCL',

    DAPImportOCEANLCL = 'DAPImportOCEANLCL',
    DAPImportOCEANFCL = 'DAPImportOCEANFCL',
    DAPImportAIRLCL = 'DAPImportAIRLCL',

    DDPImportOCEANLCL = 'DDPImportOCEANLCL',
    DDPImportOCEANFCL = 'DDPImportOCEANFCL',
    DDPImportAIRLCL = 'DDPImportAIRLCL',

    FOBExportOCEANLCL = 'FOBExportOCEANLCL',
    FOBExportOCEANFCL = 'FOBExportOCEANFCL',
    FOBExportAIRLCL = 'FOBExportAIRLCL',

    EXWExportOCEANFCL = 'EXWExportOCEANFCL',
    EXWExportOCEANLCL = 'EXWExportOCEANLCL',
    EXWExportAIRLCL = 'EXWExportAIRLCL',

    CIFExportOCEANLCL = 'CIFExportOCEANLCL',
    CIFExportOCEANFCL = 'CIFExportOCEANFCL',
    CIFExportAIRLCL = 'CIFExportAIRLCL',

    DAPExportOCEANLCL = "DAPExportOCEANLCL",
    DAPExportOCEANFCL = "DAPExportOCEANFCL",
    DAPExportAIRLCL = "DAPExportAIRLCL",

    DDPExportOCEANLCL = "DDPExportOCEANLCL",
    DDPExportOCEANFCL = "DDPExportOCEANFCL",
    DDPExportAIRLCL = "DDPExportAIRLCL",

    COURIERExport = "COURIERExport",
    COURIERImport = "COURIERImport"
}

const companyTypeValue = (basicRateInfo: IValues) => {
    const submissionRateType = basicRateInfo.incoterm === 'Courier' ?
        'COURIER' + basicRateInfo.direction :
        basicRateInfo.incoterm + basicRateInfo.direction + basicRateInfo.modeOfTransport + basicRateInfo.cargoLoad;

    return RateType[submissionRateType as RateType];
};

export const getSubmissionDateString = (dateString: string) => {
    return new Date(dateString).getFullYear() + "-" + new Date(dateString).getMonth() + "-" + new Date(dateString).getDay()
}

const stringifyRateCharge = (chargeObj: IValues) => {
    let chargeObjSerialized = {} as IValues;

    Object.entries(chargeObj).forEach(
        ([key, value]) => {
            chargeObjSerialized = {
                ...chargeObjSerialized,
                [key]: JSON.stringify(value, undefined, 1)
            };
        }
    )
    return chargeObjSerialized
}

export const getCharges = (rateType: RateType, submissionData: IValues) => {
    switch (rateType) {

        case RateType.FOBImportOCEANLCL:
            return stringifyRateCharge({
                freightTransportCharges: submissionData.FreightTransportFOBOCEANLCL,
                localCharges: submissionData.LocalsImportOCEANLCL
            });

        case RateType.FOBImportOCEANFCL:
            return stringifyRateCharge({
                freightTransportCharges: submissionData.FreightTransportFOBOCEANFCL,
                localCharges: submissionData.LocalsImportOCEANFCL
            });

        case RateType.FOBImportAIRLCL:
            return stringifyRateCharge({
                freightTransportCharges: submissionData.FreightTransportFOBAIRLCL,
                localCharges: submissionData.LocalsImportAIRLCL
            });

        case RateType.EXWImportOCEANLCL:
            return stringifyRateCharge({
                originCharges: submissionData.PickUp,
                freightTransportCharges: submissionData.FreightTransportEXWOCEANLCL,
                localCharges: submissionData.LocalsImportOCEANLCL
            });

        case RateType.EXWImportOCEANFCL:
            return stringifyRateCharge({
                originCharges: submissionData.PickUp,
                freightTransportCharges: submissionData.FreightTransportEXWOCEANFCL,
                localCharges: submissionData.LocalsImportOCEANFCL
            });

        case RateType.EXWImportAIRLCL:
            return stringifyRateCharge({
                originCharges: submissionData.PickUp,
                freightTransportCharges: submissionData.FreightTransportEXWAIRLCL,
                localCharges: submissionData.LocalsImportAIRLCL
            });

        case RateType.CIFImportOCEANLCL:
            return stringifyRateCharge({
                originCharges: submissionData.PickUp,
                freightTransportCharges: submissionData.FreightTransportCIFOCEANLCL,
                localCharges: submissionData.LocalsImportOCEANFCL
            });

        case RateType.CIFImportOCEANFCL:
            return stringifyRateCharge({
                originCharges: submissionData.PickUp,
                freightTransportCharges: submissionData.FreightTransportCIFOCEANFCL,
                localCharges: submissionData.LocalsImportAIRLCL
            });

        case RateType.CIFImportAIRLCL:
            return stringifyRateCharge({
                PickUp: submissionData.PickUp,
                freightTransportCharges: submissionData.FreightTransportCIFAIRLCL,
                localCharges: submissionData.LocalsImportAIRLCL,
            });


        case RateType.FOBExportOCEANLCL:
            return stringifyRateCharge({
                freightTransportCharges: submissionData.FreightTransportFOBOCEANLCL,
                localCharges: submissionData.LocalsImportOCEANLCL
            });

        case RateType.FOBExportOCEANFCL:
            return stringifyRateCharge({
                freightTransportCharges: submissionData.FreightTransportFOBOCEANLCL,
                localCharges: submissionData.LocalsImportOCEANLCL
            });

        case RateType.FOBExportAIRLCL:
            return stringifyRateCharge({
                freightTransportCharges: submissionData.FreightTransportFOBOCEANLCL,
                localCharges: submissionData.LocalsImportOCEANLCL
            });

        case RateType.EXWExportOCEANLCL:
            return stringifyRateCharge({
                originCharges: submissionData.PickUp,
                freightTransportCharges: submissionData.FreightTransportEXWOCEANLCL,
                localCharges: submissionData.LocalsImportOCEANLCL
            });

        case RateType.EXWExportOCEANFCL:
            return stringifyRateCharge({
                originCharges: submissionData.PickUp,
                freightTransportCharges: submissionData.FreightTransportEXWOCEANFCL,
                localCharges: submissionData.LocalsImportOCEANFCL
            });

        case RateType.EXWExportAIRLCL:
            return stringifyRateCharge({
                originCharges: submissionData.PickUp,
                freightTransportCharges: submissionData.FreightTransportEXWAIRLCL,
                localCharges: submissionData.LocalsImportAIRLCL
            });

        case RateType.CIFExportOCEANLCL:
            return stringifyRateCharge({
                originCharges: submissionData.PickUp,
                freightTransportCharges: submissionData.FreightTransportCIFOCEANLCL,
                localCharges: submissionData.LocalsImportOCEANLCL
            });

        case RateType.CIFExportOCEANFCL:
            return stringifyRateCharge({
                originCharges: submissionData.PickUp,
                freightTransportCharges: submissionData.FreightTransportCIFOCEANFCL,
                localCharges: submissionData.LocalsImportOCEANFCL
            });

        case RateType.CIFExportAIRLCL:
            return stringifyRateCharge({
                originCharges: submissionData.PickUp,
                freightTransportCharges: submissionData.FreightTransportCIFAIRLCL,
                localCharges: submissionData.LocalsExportAIRLCL
            });

        case RateType.COURIERImport:

            return stringifyRateCharge({
                originCharges: submissionData.Courier,
                localCharges: submissionData.LocalsImportAIRLCL
            });
        case RateType.COURIERExport:
            return stringifyRateCharge({
                originCharges: submissionData.Courier,
                localCharges: submissionData.LocalsExportAIRLCL
            });
    }
};

export const CreateRate = async (submissionData: IValues) => {
    const basicRateInfo = submissionData.BasicRateInfo;
    const rateType = companyTypeValue(basicRateInfo);
    const rateName = basicRateInfo.rateName;
    const freightForwarderName = basicRateInfo.freightForwarderName;
    const carrierName = basicRateInfo.carrierName;
    const validFrom = basicRateInfo.validFrom;
    const validTo = basicRateInfo.validTo;

    const charges = getCharges(rateType, submissionData);

    const submission = {
        rateType,
        rateName,
        freightForwarderName,
        carrierName,
        validFrom: dynamoDbDateForTable(validFrom, true),
        validTo: dynamoDbDateForTable(validTo, true),
        ...charges
    };

    return API.graphql(
        graphqlOperation(
            mutations.createRateSubmission, {
                input: submission
            }
        )
    );
};