import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "../../../graphql/mutations";
import { IValues } from "../../../common/form/formTypes";
import { uuid } from 'uuidv4';

enum companyTypeChoice {
  ImportExport = "ImportExport",
  FreightForwarder = "FreightForwarder",
}

export const CreateSystemUserSubmissions = async (submissionData: IValues) => {
  const GeneralInfoHelper = submissionData.GeneralInfo;
  const ImporterExporterHelper = submissionData.ImporterExporter;
  let idHelper = uuid();
  let inputToAd = {
    id: idHelper,
    companyType: GeneralInfoHelper.companyType,
    mainUserName: GeneralInfoHelper.firstName,
    mainUserMail: GeneralInfoHelper.emailAddress,
    info: JSON.stringify(ImporterExporterHelper),
  };

  console.log("submitiing inputToAd -> ", inputToAd);
  return API.graphql(
    graphqlOperation(mutations.createCompanyUsersInSystem, {
      input: inputToAd,
    })
  );
};
