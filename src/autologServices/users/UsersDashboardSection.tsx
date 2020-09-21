import React from "react";
import { AutologDashboardSection } from "../../common/dashboardSection/AutologDashboardSection";
import { DomainSchema, EntityDetailsSchema } from "../../common/entityKeyPair";
import { AutologSystemMessageSchema } from "../../common/systemMessages/autologSystemMessageTypes";
import { IFormProps, IValues, Schema } from "../../common/form/formTypes";
import { CreateAccountApplicationSubmissions } from "./onboarding/ApplyForAnAccount/applyForAnAccountCommands";
import { companyAccountOverviewSchema } from "./CompanyAccountsProps";
import {
  StepFormSchema,
  StepsCallbackProps,
  StepForm,
} from "../../common/stepForm/stepFormTypes";
import { AccountApplicationsProps } from "./AccountApplicationsProps";

export const companyAccountGeneralInfoForm = [
  {
    name: "companyType",
    label: "Company Type",
    editor: "dropdown",
    options: ["Import and/or Export", "Freight Forwarder"],
    required: true,
  },
  {
    name: "companyName",
    label: "Company Name",
    editor: "textbox",
    required: true,
  },
  { name: "userRole", label: "Your Role", editor: "textbox", required: true },
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

const companyAccountCreationMessages: AutologSystemMessageSchema = new Map([
  ["success", { message: "User was created." }],
  [
    "error",
    {
      message: "There was an error during user creation, please check errors.",
    },
  ],
]);

/* New Company Account Stage IFormProps */
const AddGeneralInfoFormProps: IFormProps = {
  formSystemMessage: companyAccountCreationMessages,
  schema: companyAccountGeneralInfoForm,
  submitButtonTitle: "Next",
  title: "Add General Info",
  validate: function(values: IValues) {
    return {};
  },
};

const freightForwarderSchema: Schema[] = [
  { name: "vatNumber", label: "VAT Number", editor: "textbox", required: true },
  {
    name: "officeAddress",
    label: "Office Address",
    editor: "textbox",
    required: true,
  },
  { name: "erpSystem", label: "ERP System", editor: "textbox", required: true },
  {
    name: "operatingITDivision",
    label: "Operating IT Division",
    required: true,
    editor: "radio",
    options: ["Yes", "No"],
  },
  {
    name: "monetizationType",
    label: "Monetization Type",
    required: true,
    editor: "radio",
    options: ["Profit Share", "50%-50%"],
  },
];
const importerExporterSchema: Schema[] = [
  {
    name: "importerExporterType",
    label: "Shipping Direction",
    editor: "dropdown",
    options: ["Import", "Export", "Import And Export"],
    required: true,
  },
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
  formSystemMessage: companyAccountCreationMessages,
  schema: importerExporterSchema,
  submitButtonTitle: "Next",
  title: "Add Importer/Exporter Data",
  validate: function(values: IValues) {
    return {};
  },
};

const AddFreightForwarderData: IFormProps = {
  formSystemMessage: companyAccountCreationMessages,
  schema: freightForwarderSchema,
  submitButtonTitle: "Next",
  title: "Add Freight Forwarder Data",
  validate: function(values: IValues) {
    return {};
  },
};

const AddExpertise: IFormProps = {
  formSystemMessage: companyAccountCreationMessages,
  schema: freightForwarderSchema,
  submitButtonTitle: "Next",
  title: "Add Freight Forwarder Data",
  validate: function(values: IValues) {
    return {};
  },
};

/* New Company Account Step Form Schema*/
const companyAccountCreationFormMap = new Map([
  ["GeneralInfo", AddGeneralInfoFormProps],
  ["ImporterExporter", AddImporterExporterData],
  ["FreightForwarder", AddFreightForwarderData],
]);

function getAccountType(stageValues: IValues) {
  switch (stageValues.companyType) {
    case "Import and/or Export":
      return "ImporterExporter";
    case "ImportExport":
      return "ImporterExporter";
    case "Freight Forwarder":
      return "FreightForwarder";
    case "FreightForwarder":
      return "FreightForwarder";
    default:
      return false;
  }
}

/* TODO New Company Account Next Stage Callback */
export const newCompanyAccountNextStageCallback = (
  props: StepsCallbackProps
) => {
  const { stageValues } = props;
  const accountType = getAccountType(stageValues);
  return accountType ? ["GeneralInfo", accountType] : ["GeneralInfo"];
};

/* New Company Account StepForm Schema */
const newCompanyAccountStepForm: StepForm = [
  newCompanyAccountNextStageCallback,
  companyAccountCreationFormMap,
];

/*TODO Implement validation*/
const validateAccountInfo = (values: IValues) => {
  return {};
};

export const createCompanyAccountSchema: StepFormSchema = {
  sourceStage: "GeneralInfo",
  command: CreateAccountApplicationSubmissions,
  newEntityStepForm: newCompanyAccountStepForm,
  validate: validateAccountInfo,
  formSystemMessage: companyAccountCreationMessages,
};

export const companyAccountDetailsSchema: EntityDetailsSchema<AccountApplicationsProps> = {
  sourceForm: AddGeneralInfoFormProps,
  sourceStep: "GeneralInfo",
  splitOverViewAndDetails(
    entity: AccountApplicationsProps
  ): {
    sourceFields: { [p: string]: any };
    detailsFields: { [p: string]: any };
  } {
    const {
      id,
      companyType,
      companyName,
      firstName,
      lastName,
      additionalInfo,
      emailAddress,
      phoneNumber,
      userRole,
      ...otherFields
    } = entity;
    return {
      sourceFields: {
        companyType,
        companyName,
        firstName,
        lastName,
        additionalInfo,
        emailAddress,
        phoneNumber,
        userRole,
      },
      detailsFields: { ...otherFields },
    };
  },
  stepFormMap: companyAccountCreationFormMap,
  stepsCallback: newCompanyAccountNextStageCallback,
};

const domainSchema: DomainSchema = new Map([
  [
    "Company Accounts",
    {
      entityName: "Company Accounts",
      entitySingularName: "Company Account",
      entityOverview: companyAccountOverviewSchema,
      entityDetails: companyAccountDetailsSchema,
      newEntity: createCompanyAccountSchema,
    },
  ],
]);

export const UsersDashboardSection = () => {
  return (
    <AutologDashboardSection
      entityNames={["Company Accounts"]}
      domainSchema={domainSchema}
    />
  );
};
