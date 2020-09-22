import { IFormProps, IValues, Schema } from "../../../common/form/formTypes";
import {
  StepForm,
  StepFormSchema,
  StepsCallbackProps,
} from "../../../common/stepForm/stepFormTypes";
import { AutologSystemMessageSchema } from "../../../common/systemMessages/autologSystemMessageTypes";
import { CreateSystemUserSubmissions } from "./NewUserCommand";

/*TODO Implement validation*/
const validateAccountInfo = (values: IValues) => {
  return {};
};
const userCreationMessages: AutologSystemMessageSchema = new Map([
  ["success", { message: "User was created." }],
  [
    "error",
    {
      message: "There was an error during user creation, please check errors.",
    },
  ],
]);

export const newUserGeneralInfoForm = [
  {
    name: "companyType",
    label: "Company Type",
    editor: "dropdown",
    options: ["ImportExport"],
    required: true,
  },
  {
    name: "companyName",
    label: "Company Name",
    editor: "textbox",
    required: true,
  },
  { name: "userRole", label: "User Role", editor: "textbox", required: true },
  { name: "firstName", label: "First Name", editor: "textbox", required: true },
  { name: "lastName", label: "Last Name", editor: "textbox", required: true },
  {
    name: "phoneNumber",
    label: "Phone Number",
    editor: "textbox",
    required: true,
  },
  { name: "emailAddress", label: "Email", editor: "textbox", required: true },
  {
    name: "additionalInfo",
    label: "Additional info about your company:",
    editor: "multilinetextbox",
  },
];

/* New Company Account Stage IFormProps */
const AddGeneralInfoFormProps: IFormProps = {
  formSystemMessage: userCreationMessages,
  schema: newUserGeneralInfoForm,
  submitButtonTitle: "Next",
  title: "Add General Info",
  validate: function(values: IValues) {
    return {};
  },
};

const importerExporterSchema: Schema[] = [
  { name: "vatNumber", label: "VAT Number", editor: "textbox", required: true },
  {
    name: "businessField",
    label: "Business Field",
    editor: "textbox",
    required: true,
  },
  {
    name: "inlandAddress",
    label: "Inland Address",
    editor: "search",
    required: true,
  },
  {
    name: "inlandViaAutolog",
    label: "Inland via Autolog",
    editor: "radio",
    options: ["Yes", "No"],
    required: true,
  },
  {
    name: "customsClearanceViaAutolog",
    label: "Customs Clearance via Autolog",
    editor: "radio",
    options: ["Yes", "No"],
    required: true,
  },
  {
    name: "oceanPortDestination",
    label: "Ocean Port Destination",
    editor: "textbox",
    required: true,
  },
];

const AddImporterExporterData: IFormProps = {
  formSystemMessage: userCreationMessages,
  schema: importerExporterSchema,
  submitButtonTitle: "Next",
  title: "Add Importer/Exporter Data",
  validate: function(values: IValues) {
    return {};
  },
};
/* New Company Account Step Form Schema*/
const companyAccountCreationFormMap = new Map([
  ["GeneralInfo", AddGeneralInfoFormProps],
  ["ImporterExporter", AddImporterExporterData],
  //   ["FreightForwarder", AddFreightForwarderData],
]);

function getUserType(stageValues: IValues) {
  switch (stageValues.companyType) {
    case "ImportExport":
      return "ImporterExporter";

    default:
      return false;
  }
}

/* TODO New Company Account Next Stage Callback */
export const newUserNextStageCallback = (props: StepsCallbackProps) => {
  const { stageValues } = props;
  const userType = getUserType(stageValues);
  return userType ? ["GeneralInfo", userType] : ["GeneralInfo"];
};

/* New Company Account StepForm Schema */
const newUserStepForm: StepForm = [
  newUserNextStageCallback,
  companyAccountCreationFormMap,
];

export const createUserSchema: StepFormSchema = {
  sourceStage: "GeneralInfo",
  command: CreateSystemUserSubmissions,
  newEntityStepForm: newUserStepForm,
  validate: validateAccountInfo,
  formSystemMessage: userCreationMessages,
};

// const freightForwarderSchema: Schema[] = [
//     { name: "vatNumber", label: "VAT Number", editor: "textbox", required: true },
//     {
//       name: "officeAddress",
//       label: "Office Address",
//       editor: "textbox",
//       required: true,
//     },
//     { name: "erpSystem", label: "ERP System", editor: "textbox", required: true },
//     {
//       name: "operatingITDivision",
//       label: "Operating IT Division",
//       required: true,
//       editor: "radio",
//       options: ["Yes", "No"],
//     },
//     {
//       name: "monetizationType",
//       label: "Monetization Type",
//       required: true,
//       editor: "radio",
//       options: ["Profit Share", "50%-50%"],
//     },
//   ];
// const AddFreightForwarderData: IFormProps = {
//   formSystemMessage: companyAccountCreationMessages,
//   schema: freightForwarderSchema,
//   submitButtonTitle: "Next",
//   title: "Add Freight Forwarder Data",
//   validate: function(values: IValues) {
//     return {};
//   },
// };

// const AddExpertise: IFormProps = {
//   formSystemMessage: companyAccountCreationMessages,
//   schema: freightForwarderSchema,
//   submitButtonTitle: "Next",
//   title: "Add Freight Forwarder Data",
//   validate: function(values: IValues) {
//     return {};
//   },
// };
