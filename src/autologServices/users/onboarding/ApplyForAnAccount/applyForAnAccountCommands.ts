import Amplify, {API, graphqlOperation} from 'aws-amplify';
import * as mutations from "../../../../graphql/mutations";
import {IValues} from "../../../../common/form/formTypes";
import awsconfig from '../../../../aws-exports';

Amplify.configure(awsconfig);

enum companyTypeChoice {
    ImportExport = 'ImportExport',
    FreightForwarder = 'FreightForwarder',
}

/*const {companyType, ...otherFields} = submissionData;*/

export const CreateAccountApplicationSubmissions = async (submissionData: IValues) => {
    const companyTypeValue = () => {
        switch (submissionData.GeneralInfo.companyType) {
            case 'Import and/or Export':
                return companyTypeChoice['ImportExport'];
            case 'Freight Forwarder':
                return companyTypeChoice['FreightForwarder'];
        }
    };
    const {companyType, ...remainingData} = submissionData.GeneralInfo;

    const accountDetailsInfo =
        submissionData.ImporterExporter === undefined ?
            {freightForwarderInfo: JSON.stringify(submissionData.FreightForwarder)} :
            {importerExporterInfo: JSON.stringify(submissionData.ImporterExporter)};
    return API.graphql(
        graphqlOperation(
            mutations.createAccountApplicationSubmissions,
            {
                input: {
                    companyType: companyTypeValue(),
                    ...remainingData,
                    ...accountDetailsInfo
                }
            }
        )
    );
};
