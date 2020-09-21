/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateAccountApplicationSubmissionsInput = {
  id?: string | null,
  companyName: string,
  companyType: CompanyType,
  userRole: string,
  firstName: string,
  lastName: string,
  phoneNumber: string,
  emailAddress: string,
  additionalInfo?: string | null,
  importerExporterInfo?: string | null,
  freightForwarderInfo?: string | null,
};

export enum CompanyType {
  ImportExport = "ImportExport",
  FreightForwarder = "FreightForwarder",
  AutologTeam = "AutologTeam",
}


export type ModelAccountApplicationSubmissionsConditionInput = {
  companyName?: ModelStringInput | null,
  companyType?: ModelCompanyTypeInput | null,
  userRole?: ModelStringInput | null,
  firstName?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  phoneNumber?: ModelStringInput | null,
  emailAddress?: ModelStringInput | null,
  additionalInfo?: ModelStringInput | null,
  importerExporterInfo?: ModelStringInput | null,
  freightForwarderInfo?: ModelStringInput | null,
  and?: Array< ModelAccountApplicationSubmissionsConditionInput | null > | null,
  or?: Array< ModelAccountApplicationSubmissionsConditionInput | null > | null,
  not?: ModelAccountApplicationSubmissionsConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelCompanyTypeInput = {
  eq?: CompanyType | null,
  ne?: CompanyType | null,
};

export type UpdateAccountApplicationSubmissionsInput = {
  id: string,
  companyName?: string | null,
  companyType?: CompanyType | null,
  userRole?: string | null,
  firstName?: string | null,
  lastName?: string | null,
  phoneNumber?: string | null,
  emailAddress?: string | null,
  additionalInfo?: string | null,
  importerExporterInfo?: string | null,
  freightForwarderInfo?: string | null,
};

export type DeleteAccountApplicationSubmissionsInput = {
  id?: string | null,
};

export type CreateRateSubmissionInput = {
  id?: string | null,
  rateName: string,
  freightForwarderName: string,
  carrierName: string,
  rateType: RateType,
  validFrom: string,
  validTo: string,
  originCharges?: string | null,
  freightTransportCharges?: string | null,
  localCharges: string,
};

export enum RateType {
  FOBImportOCEANLCL = "FOBImportOCEANLCL",
  FOBImportOCEANFCL = "FOBImportOCEANFCL",
  FOBImportAIRLCL = "FOBImportAIRLCL",
  EXWImportOCEANFCL = "EXWImportOCEANFCL",
  EXWImportOCEANLCL = "EXWImportOCEANLCL",
  EXWImportAIRLCL = "EXWImportAIRLCL",
  CIFImportOCEANLCL = "CIFImportOCEANLCL",
  CIFImportOCEANFCL = "CIFImportOCEANFCL",
  CIFImportAIRLCL = "CIFImportAIRLCL",
  DAPImportOCEANLCL = "DAPImportOCEANLCL",
  DAPImportOCEANFCL = "DAPImportOCEANFCL",
  DAPImportAIRLCL = "DAPImportAIRLCL",
  DDPImportOCEANLCL = "DDPImportOCEANLCL",
  DDPImportOCEANFCL = "DDPImportOCEANFCL",
  DDPImportAIRLCL = "DDPImportAIRLCL",
  FOBExportOCEANLCL = "FOBExportOCEANLCL",
  FOBExportOCEANFCL = "FOBExportOCEANFCL",
  FOBExportAIRLCL = "FOBExportAIRLCL",
  EXWExportOCEANFCL = "EXWExportOCEANFCL",
  EXWExportOCEANLCL = "EXWExportOCEANLCL",
  EXWExportAIRLCL = "EXWExportAIRLCL",
  CIFExportOCEANLCL = "CIFExportOCEANLCL",
  CIFExportOCEANFCL = "CIFExportOCEANFCL",
  CIFExportAIRLCL = "CIFExportAIRLCL",
  DAPExportOCEANLCL = "DAPExportOCEANLCL",
  DAPExportOCEANFCL = "DAPExportOCEANFCL",
  DAPExportAIRLCL = "DAPExportAIRLCL",
  DDPExportOCEANLCL = "DDPExportOCEANLCL",
  DDPExportOCEANFCL = "DDPExportOCEANFCL",
  DDPExportAIRLCL = "DDPExportAIRLCL",
  COURIERExport = "COURIERExport",
  COURIERImport = "COURIERImport",
}


export type ModelRateSubmissionConditionInput = {
  rateName?: ModelStringInput | null,
  freightForwarderName?: ModelStringInput | null,
  carrierName?: ModelStringInput | null,
  rateType?: ModelRateTypeInput | null,
  validFrom?: ModelStringInput | null,
  validTo?: ModelStringInput | null,
  originCharges?: ModelStringInput | null,
  freightTransportCharges?: ModelStringInput | null,
  localCharges?: ModelStringInput | null,
  and?: Array< ModelRateSubmissionConditionInput | null > | null,
  or?: Array< ModelRateSubmissionConditionInput | null > | null,
  not?: ModelRateSubmissionConditionInput | null,
};

export type ModelRateTypeInput = {
  eq?: RateType | null,
  ne?: RateType | null,
};

export type UpdateRateSubmissionInput = {
  id: string,
  rateName?: string | null,
  freightForwarderName?: string | null,
  carrierName?: string | null,
  rateType?: RateType | null,
  validFrom?: string | null,
  validTo?: string | null,
  originCharges?: string | null,
  freightTransportCharges?: string | null,
  localCharges?: string | null,
};

export type DeleteRateSubmissionInput = {
  id?: string | null,
};

export type CreateClientsInput = {
  id?: string | null,
  companyName: string,
  impExp: ImportExport,
  cognitoGroup: string,
  mainUserMail: string,
  mainUserName: string,
  info: InfoClientInput,
  addedBy: string,
  openShipments?: string | null,
  closedShipments?: string | null,
};

export enum ImportExport {
  Import = "Import",
  Export = "Export",
  ImportExport = "ImportExport",
}


export type InfoClientInput = {
  officeAddress: string,
  cargoLoadAddress: string,
  officeNumber?: string | null,
  phoneNumber?: string | null,
  deltaImport?: string | null,
  deltaExport?: string | null,
  localsByTomindu?: string | null,
  additionalInfo?: string | null,
};

export type ModelClientsConditionInput = {
  companyName?: ModelStringInput | null,
  impExp?: ModelImportExportInput | null,
  cognitoGroup?: ModelStringInput | null,
  mainUserMail?: ModelStringInput | null,
  mainUserName?: ModelStringInput | null,
  addedBy?: ModelStringInput | null,
  openShipments?: ModelStringInput | null,
  closedShipments?: ModelStringInput | null,
  and?: Array< ModelClientsConditionInput | null > | null,
  or?: Array< ModelClientsConditionInput | null > | null,
  not?: ModelClientsConditionInput | null,
};

export type ModelImportExportInput = {
  eq?: ImportExport | null,
  ne?: ImportExport | null,
};

export type UpdateClientsInput = {
  id: string,
  companyName?: string | null,
  impExp?: ImportExport | null,
  cognitoGroup?: string | null,
  mainUserMail?: string | null,
  mainUserName?: string | null,
  info?: InfoClientInput | null,
  addedBy?: string | null,
  openShipments?: string | null,
  closedShipments?: string | null,
};

export type DeleteClientsInput = {
  id?: string | null,
};

export type CreateFFClientsInput = {
  id?: string | null,
  companyName: string,
  cognitoGroup: string,
  mainUserMail: string,
  mainUserName: string,
  info: InfoFFClientInput,
  openShipments?: string | null,
  closedShipments?: string | null,
};

export type InfoFFClientInput = {
  officeAddress: string,
  officeNumber?: string | null,
  additionalInfo?: string | null,
};

export type ModelFFClientsConditionInput = {
  companyName?: ModelStringInput | null,
  cognitoGroup?: ModelStringInput | null,
  mainUserMail?: ModelStringInput | null,
  mainUserName?: ModelStringInput | null,
  openShipments?: ModelStringInput | null,
  closedShipments?: ModelStringInput | null,
  and?: Array< ModelFFClientsConditionInput | null > | null,
  or?: Array< ModelFFClientsConditionInput | null > | null,
  not?: ModelFFClientsConditionInput | null,
};

export type UpdateFFClientsInput = {
  id: string,
  companyName?: string | null,
  cognitoGroup?: string | null,
  mainUserMail?: string | null,
  mainUserName?: string | null,
  info?: InfoFFClientInput | null,
  openShipments?: string | null,
  closedShipments?: string | null,
};

export type DeleteFFClientsInput = {
  id?: string | null,
};

export type CreateCompanyUsersInSystemInput = {
  id?: string | null,
  companyType: CompanyUsersTypes,
  mainUserName: string,
  mainUserMail: string,
  info: string,
};

export enum CompanyUsersTypes {
  ImportExport = "ImportExport",
  FreightForwarder = "FreightForwarder",
}


export type ModelCompanyUsersInSystemConditionInput = {
  companyType?: ModelCompanyUsersTypesInput | null,
  mainUserName?: ModelStringInput | null,
  mainUserMail?: ModelStringInput | null,
  info?: ModelStringInput | null,
  and?: Array< ModelCompanyUsersInSystemConditionInput | null > | null,
  or?: Array< ModelCompanyUsersInSystemConditionInput | null > | null,
  not?: ModelCompanyUsersInSystemConditionInput | null,
};

export type ModelCompanyUsersTypesInput = {
  eq?: CompanyUsersTypes | null,
  ne?: CompanyUsersTypes | null,
};

export type UpdateCompanyUsersInSystemInput = {
  id: string,
  companyType?: CompanyUsersTypes | null,
  mainUserName?: string | null,
  mainUserMail?: string | null,
  info?: string | null,
};

export type DeleteCompanyUsersInSystemInput = {
  id?: string | null,
};

export type CreateAllRequestsInput = {
  id?: string | null,
  requestID: string,
  fromRegion?: string | null,
  fromState?: string | null,
  fromPort?: string | null,
  terms: string,
  airOcean: string,
  madeByUserMail: string,
  createdAt?: string | null,
  status?: RequestStatus | null,
  details: string,
  Test?: string | null,
  offersCount?: string | null,
  offers?: string | null,
};

export enum RequestStatus {
  Pending = "Pending",
  ApprovedOnGoing = "ApprovedOnGoing",
  ApprovedDone = "ApprovedDone",
  Declined = "Declined",
}


export type ModelAllRequestsConditionInput = {
  requestID?: ModelIDInput | null,
  fromRegion?: ModelStringInput | null,
  fromState?: ModelStringInput | null,
  fromPort?: ModelStringInput | null,
  terms?: ModelStringInput | null,
  airOcean?: ModelStringInput | null,
  madeByUserMail?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  status?: ModelRequestStatusInput | null,
  details?: ModelStringInput | null,
  Test?: ModelStringInput | null,
  offersCount?: ModelStringInput | null,
  offers?: ModelStringInput | null,
  and?: Array< ModelAllRequestsConditionInput | null > | null,
  or?: Array< ModelAllRequestsConditionInput | null > | null,
  not?: ModelAllRequestsConditionInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelRequestStatusInput = {
  eq?: RequestStatus | null,
  ne?: RequestStatus | null,
};

export type UpdateAllRequestsInput = {
  requestID?: string | null,
  fromRegion?: string | null,
  fromState?: string | null,
  fromPort?: string | null,
  terms?: string | null,
  airOcean?: string | null,
  madeByUserMail?: string | null,
  createdAt?: string | null,
  status?: RequestStatus | null,
  details?: string | null,
  Test?: string | null,
  offersCount?: string | null,
  offers?: string | null,
};

export type DeleteAllRequestsInput = {
  id?: string | null,
};

export type CreatePendingRequestsInput = {
  id?: string | null,
  requestid: string,
  byUserMail: string,
  operatedBY: string,
  rateId: string,
  info: string,
};

export type ModelPendingRequestsConditionInput = {
  requestid?: ModelIDInput | null,
  byUserMail?: ModelStringInput | null,
  operatedBY?: ModelStringInput | null,
  rateId?: ModelIDInput | null,
  info?: ModelStringInput | null,
  and?: Array< ModelPendingRequestsConditionInput | null > | null,
  or?: Array< ModelPendingRequestsConditionInput | null > | null,
  not?: ModelPendingRequestsConditionInput | null,
};

export type UpdatePendingRequestsInput = {
  id: string,
  requestid?: string | null,
  byUserMail?: string | null,
  operatedBY?: string | null,
  rateId?: string | null,
  info?: string | null,
};

export type DeletePendingRequestsInput = {
  id?: string | null,
};

export type CreateIMPORTRatesSimplifiedInput = {
  rateHash: string,
  id?: string | null,
  rateID: string,
  rateName: string,
  freightForwarderName: string,
  carrierName: string,
  validFrom: string,
  validTo: string,
  direct?: Array< string | null > | null,
  zone?: string | null,
  state?: string | null,
  portFrom?: string | null,
  portTo: string,
  limits?: string | null,
  airRate?: string | null,
  lcl?: string | null,
  dv20?: string | null,
  hc20?: string | null,
  dv40?: string | null,
  hq40?: string | null,
  otherContainers?: string | null,
  exwCharges?: string | null,
  fobCharges?: string | null,
  localCharges?: string | null,
};

export type ModelIMPORTRatesSimplifiedConditionInput = {
  rateHash?: ModelStringInput | null,
  rateID?: ModelIDInput | null,
  rateName?: ModelStringInput | null,
  freightForwarderName?: ModelStringInput | null,
  carrierName?: ModelStringInput | null,
  validFrom?: ModelStringInput | null,
  validTo?: ModelStringInput | null,
  direct?: ModelStringInput | null,
  zone?: ModelStringInput | null,
  state?: ModelStringInput | null,
  portFrom?: ModelStringInput | null,
  portTo?: ModelStringInput | null,
  limits?: ModelStringInput | null,
  airRate?: ModelStringInput | null,
  lcl?: ModelStringInput | null,
  dv20?: ModelStringInput | null,
  hc20?: ModelStringInput | null,
  dv40?: ModelStringInput | null,
  hq40?: ModelStringInput | null,
  otherContainers?: ModelStringInput | null,
  exwCharges?: ModelStringInput | null,
  fobCharges?: ModelStringInput | null,
  localCharges?: ModelStringInput | null,
  and?: Array< ModelIMPORTRatesSimplifiedConditionInput | null > | null,
  or?: Array< ModelIMPORTRatesSimplifiedConditionInput | null > | null,
  not?: ModelIMPORTRatesSimplifiedConditionInput | null,
};

export type UpdateIMPORTRatesSimplifiedInput = {
  rateHash?: string | null,
  id: string,
  rateID?: string | null,
  rateName?: string | null,
  freightForwarderName?: string | null,
  carrierName?: string | null,
  validFrom?: string | null,
  validTo?: string | null,
  direct?: Array< string | null > | null,
  zone?: string | null,
  state?: string | null,
  portFrom?: string | null,
  portTo?: string | null,
  limits?: string | null,
  airRate?: string | null,
  lcl?: string | null,
  dv20?: string | null,
  hc20?: string | null,
  dv40?: string | null,
  hq40?: string | null,
  otherContainers?: string | null,
  exwCharges?: string | null,
  fobCharges?: string | null,
  localCharges?: string | null,
};

export type DeleteIMPORTRatesSimplifiedInput = {
  id?: string | null,
};

export type ModelAccountApplicationSubmissionsFilterInput = {
  id?: ModelIDInput | null,
  companyName?: ModelStringInput | null,
  companyType?: ModelCompanyTypeInput | null,
  userRole?: ModelStringInput | null,
  firstName?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  phoneNumber?: ModelStringInput | null,
  emailAddress?: ModelStringInput | null,
  additionalInfo?: ModelStringInput | null,
  importerExporterInfo?: ModelStringInput | null,
  freightForwarderInfo?: ModelStringInput | null,
  and?: Array< ModelAccountApplicationSubmissionsFilterInput | null > | null,
  or?: Array< ModelAccountApplicationSubmissionsFilterInput | null > | null,
  not?: ModelAccountApplicationSubmissionsFilterInput | null,
};

export type ModelRateSubmissionFilterInput = {
  id?: ModelIDInput | null,
  rateName?: ModelStringInput | null,
  freightForwarderName?: ModelStringInput | null,
  carrierName?: ModelStringInput | null,
  rateType?: ModelRateTypeInput | null,
  validFrom?: ModelStringInput | null,
  validTo?: ModelStringInput | null,
  originCharges?: ModelStringInput | null,
  freightTransportCharges?: ModelStringInput | null,
  localCharges?: ModelStringInput | null,
  and?: Array< ModelRateSubmissionFilterInput | null > | null,
  or?: Array< ModelRateSubmissionFilterInput | null > | null,
  not?: ModelRateSubmissionFilterInput | null,
};

export type ModelClientsFilterInput = {
  id?: ModelIDInput | null,
  companyName?: ModelStringInput | null,
  impExp?: ModelImportExportInput | null,
  cognitoGroup?: ModelStringInput | null,
  mainUserMail?: ModelStringInput | null,
  mainUserName?: ModelStringInput | null,
  addedBy?: ModelStringInput | null,
  openShipments?: ModelStringInput | null,
  closedShipments?: ModelStringInput | null,
  and?: Array< ModelClientsFilterInput | null > | null,
  or?: Array< ModelClientsFilterInput | null > | null,
  not?: ModelClientsFilterInput | null,
};

export type ModelFFClientsFilterInput = {
  id?: ModelIDInput | null,
  companyName?: ModelStringInput | null,
  cognitoGroup?: ModelStringInput | null,
  mainUserMail?: ModelStringInput | null,
  mainUserName?: ModelStringInput | null,
  openShipments?: ModelStringInput | null,
  closedShipments?: ModelStringInput | null,
  and?: Array< ModelFFClientsFilterInput | null > | null,
  or?: Array< ModelFFClientsFilterInput | null > | null,
  not?: ModelFFClientsFilterInput | null,
};

export type ModelCompanyUsersInSystemFilterInput = {
  id?: ModelIDInput | null,
  companyType?: ModelCompanyUsersTypesInput | null,
  mainUserName?: ModelStringInput | null,
  mainUserMail?: ModelStringInput | null,
  info?: ModelStringInput | null,
  and?: Array< ModelCompanyUsersInSystemFilterInput | null > | null,
  or?: Array< ModelCompanyUsersInSystemFilterInput | null > | null,
  not?: ModelCompanyUsersInSystemFilterInput | null,
};

export type ModelAllRequestsFilterInput = {
  requestID?: ModelIDInput | null,
  fromRegion?: ModelStringInput | null,
  fromState?: ModelStringInput | null,
  fromPort?: ModelStringInput | null,
  terms?: ModelStringInput | null,
  airOcean?: ModelStringInput | null,
  madeByUserMail?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  status?: ModelRequestStatusInput | null,
  details?: ModelStringInput | null,
  Test?: ModelStringInput | null,
  offersCount?: ModelStringInput | null,
  offers?: ModelStringInput | null,
  and?: Array< ModelAllRequestsFilterInput | null > | null,
  or?: Array< ModelAllRequestsFilterInput | null > | null,
  not?: ModelAllRequestsFilterInput | null,
};

export type ModelPendingRequestsFilterInput = {
  id?: ModelIDInput | null,
  requestid?: ModelIDInput | null,
  byUserMail?: ModelStringInput | null,
  operatedBY?: ModelStringInput | null,
  rateId?: ModelIDInput | null,
  info?: ModelStringInput | null,
  and?: Array< ModelPendingRequestsFilterInput | null > | null,
  or?: Array< ModelPendingRequestsFilterInput | null > | null,
  not?: ModelPendingRequestsFilterInput | null,
};

export type ModelIMPORTRatesSimplifiedFilterInput = {
  rateHash?: ModelStringInput | null,
  id?: ModelIDInput | null,
  rateID?: ModelIDInput | null,
  rateName?: ModelStringInput | null,
  freightForwarderName?: ModelStringInput | null,
  carrierName?: ModelStringInput | null,
  validFrom?: ModelStringInput | null,
  validTo?: ModelStringInput | null,
  direct?: ModelStringInput | null,
  zone?: ModelStringInput | null,
  state?: ModelStringInput | null,
  portFrom?: ModelStringInput | null,
  portTo?: ModelStringInput | null,
  limits?: ModelStringInput | null,
  airRate?: ModelStringInput | null,
  lcl?: ModelStringInput | null,
  dv20?: ModelStringInput | null,
  hc20?: ModelStringInput | null,
  dv40?: ModelStringInput | null,
  hq40?: ModelStringInput | null,
  otherContainers?: ModelStringInput | null,
  exwCharges?: ModelStringInput | null,
  fobCharges?: ModelStringInput | null,
  localCharges?: ModelStringInput | null,
  and?: Array< ModelIMPORTRatesSimplifiedFilterInput | null > | null,
  or?: Array< ModelIMPORTRatesSimplifiedFilterInput | null > | null,
  not?: ModelIMPORTRatesSimplifiedFilterInput | null,
};

export type CreateAccountApplicationSubmissionsMutationVariables = {
  input: CreateAccountApplicationSubmissionsInput,
  condition?: ModelAccountApplicationSubmissionsConditionInput | null,
};

export type CreateAccountApplicationSubmissionsMutation = {
  createAccountApplicationSubmissions:  {
    __typename: "AccountApplicationSubmissions",
    id: string,
    companyName: string,
    companyType: CompanyType,
    userRole: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    emailAddress: string,
    additionalInfo: string | null,
    importerExporterInfo: string | null,
    freightForwarderInfo: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateAccountApplicationSubmissionsMutationVariables = {
  input: UpdateAccountApplicationSubmissionsInput,
  condition?: ModelAccountApplicationSubmissionsConditionInput | null,
};

export type UpdateAccountApplicationSubmissionsMutation = {
  updateAccountApplicationSubmissions:  {
    __typename: "AccountApplicationSubmissions",
    id: string,
    companyName: string,
    companyType: CompanyType,
    userRole: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    emailAddress: string,
    additionalInfo: string | null,
    importerExporterInfo: string | null,
    freightForwarderInfo: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteAccountApplicationSubmissionsMutationVariables = {
  input: DeleteAccountApplicationSubmissionsInput,
  condition?: ModelAccountApplicationSubmissionsConditionInput | null,
};

export type DeleteAccountApplicationSubmissionsMutation = {
  deleteAccountApplicationSubmissions:  {
    __typename: "AccountApplicationSubmissions",
    id: string,
    companyName: string,
    companyType: CompanyType,
    userRole: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    emailAddress: string,
    additionalInfo: string | null,
    importerExporterInfo: string | null,
    freightForwarderInfo: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateRateSubmissionMutationVariables = {
  input: CreateRateSubmissionInput,
  condition?: ModelRateSubmissionConditionInput | null,
};

export type CreateRateSubmissionMutation = {
  createRateSubmission:  {
    __typename: "RateSubmission",
    id: string,
    rateName: string,
    freightForwarderName: string,
    carrierName: string,
    rateType: RateType,
    validFrom: string,
    validTo: string,
    originCharges: string | null,
    freightTransportCharges: string | null,
    localCharges: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateRateSubmissionMutationVariables = {
  input: UpdateRateSubmissionInput,
  condition?: ModelRateSubmissionConditionInput | null,
};

export type UpdateRateSubmissionMutation = {
  updateRateSubmission:  {
    __typename: "RateSubmission",
    id: string,
    rateName: string,
    freightForwarderName: string,
    carrierName: string,
    rateType: RateType,
    validFrom: string,
    validTo: string,
    originCharges: string | null,
    freightTransportCharges: string | null,
    localCharges: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteRateSubmissionMutationVariables = {
  input: DeleteRateSubmissionInput,
  condition?: ModelRateSubmissionConditionInput | null,
};

export type DeleteRateSubmissionMutation = {
  deleteRateSubmission:  {
    __typename: "RateSubmission",
    id: string,
    rateName: string,
    freightForwarderName: string,
    carrierName: string,
    rateType: RateType,
    validFrom: string,
    validTo: string,
    originCharges: string | null,
    freightTransportCharges: string | null,
    localCharges: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateClientsMutationVariables = {
  input: CreateClientsInput,
  condition?: ModelClientsConditionInput | null,
};

export type CreateClientsMutation = {
  createClients:  {
    __typename: "Clients",
    id: string,
    companyName: string,
    impExp: ImportExport,
    cognitoGroup: string,
    mainUserMail: string,
    mainUserName: string,
    info:  {
      __typename: "infoClient",
      officeAddress: string,
      cargoLoadAddress: string,
      officeNumber: string | null,
      phoneNumber: string | null,
      deltaImport: string | null,
      deltaExport: string | null,
      localsByTomindu: string | null,
      additionalInfo: string | null,
    },
    addedBy: string,
    openShipments: string | null,
    closedShipments: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateClientsMutationVariables = {
  input: UpdateClientsInput,
  condition?: ModelClientsConditionInput | null,
};

export type UpdateClientsMutation = {
  updateClients:  {
    __typename: "Clients",
    id: string,
    companyName: string,
    impExp: ImportExport,
    cognitoGroup: string,
    mainUserMail: string,
    mainUserName: string,
    info:  {
      __typename: "infoClient",
      officeAddress: string,
      cargoLoadAddress: string,
      officeNumber: string | null,
      phoneNumber: string | null,
      deltaImport: string | null,
      deltaExport: string | null,
      localsByTomindu: string | null,
      additionalInfo: string | null,
    },
    addedBy: string,
    openShipments: string | null,
    closedShipments: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteClientsMutationVariables = {
  input: DeleteClientsInput,
  condition?: ModelClientsConditionInput | null,
};

export type DeleteClientsMutation = {
  deleteClients:  {
    __typename: "Clients",
    id: string,
    companyName: string,
    impExp: ImportExport,
    cognitoGroup: string,
    mainUserMail: string,
    mainUserName: string,
    info:  {
      __typename: "infoClient",
      officeAddress: string,
      cargoLoadAddress: string,
      officeNumber: string | null,
      phoneNumber: string | null,
      deltaImport: string | null,
      deltaExport: string | null,
      localsByTomindu: string | null,
      additionalInfo: string | null,
    },
    addedBy: string,
    openShipments: string | null,
    closedShipments: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateFfClientsMutationVariables = {
  input: CreateFFClientsInput,
  condition?: ModelFFClientsConditionInput | null,
};

export type CreateFfClientsMutation = {
  createFFClients:  {
    __typename: "FFClients",
    id: string,
    companyName: string,
    cognitoGroup: string,
    mainUserMail: string,
    mainUserName: string,
    info:  {
      __typename: "infoFFClient",
      officeAddress: string,
      officeNumber: string | null,
      additionalInfo: string | null,
    },
    openShipments: string | null,
    closedShipments: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateFfClientsMutationVariables = {
  input: UpdateFFClientsInput,
  condition?: ModelFFClientsConditionInput | null,
};

export type UpdateFfClientsMutation = {
  updateFFClients:  {
    __typename: "FFClients",
    id: string,
    companyName: string,
    cognitoGroup: string,
    mainUserMail: string,
    mainUserName: string,
    info:  {
      __typename: "infoFFClient",
      officeAddress: string,
      officeNumber: string | null,
      additionalInfo: string | null,
    },
    openShipments: string | null,
    closedShipments: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteFfClientsMutationVariables = {
  input: DeleteFFClientsInput,
  condition?: ModelFFClientsConditionInput | null,
};

export type DeleteFfClientsMutation = {
  deleteFFClients:  {
    __typename: "FFClients",
    id: string,
    companyName: string,
    cognitoGroup: string,
    mainUserMail: string,
    mainUserName: string,
    info:  {
      __typename: "infoFFClient",
      officeAddress: string,
      officeNumber: string | null,
      additionalInfo: string | null,
    },
    openShipments: string | null,
    closedShipments: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateCompanyUsersInSystemMutationVariables = {
  input: CreateCompanyUsersInSystemInput,
  condition?: ModelCompanyUsersInSystemConditionInput | null,
};

export type CreateCompanyUsersInSystemMutation = {
  createCompanyUsersInSystem:  {
    __typename: "CompanyUsersInSystem",
    id: string,
    companyType: CompanyUsersTypes,
    mainUserName: string,
    mainUserMail: string,
    info: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateCompanyUsersInSystemMutationVariables = {
  input: UpdateCompanyUsersInSystemInput,
  condition?: ModelCompanyUsersInSystemConditionInput | null,
};

export type UpdateCompanyUsersInSystemMutation = {
  updateCompanyUsersInSystem:  {
    __typename: "CompanyUsersInSystem",
    id: string,
    companyType: CompanyUsersTypes,
    mainUserName: string,
    mainUserMail: string,
    info: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteCompanyUsersInSystemMutationVariables = {
  input: DeleteCompanyUsersInSystemInput,
  condition?: ModelCompanyUsersInSystemConditionInput | null,
};

export type DeleteCompanyUsersInSystemMutation = {
  deleteCompanyUsersInSystem:  {
    __typename: "CompanyUsersInSystem",
    id: string,
    companyType: CompanyUsersTypes,
    mainUserName: string,
    mainUserMail: string,
    info: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateAllRequestsMutationVariables = {
  input: CreateAllRequestsInput,
  condition?: ModelAllRequestsConditionInput | null,
};

export type CreateAllRequestsMutation = {
  createAllRequests:  {
    __typename: "AllRequests",
    id: string,
    requestID: string,
    fromRegion: string | null,
    fromState: string | null,
    fromPort: string | null,
    terms: string,
    airOcean: string,
    madeByUserMail: string,
    createdAt: string,
    status: RequestStatus | null,
    details: string,
    Test: string | null,
    offersCount: string | null,
    offers: string | null,
    updatedAt: string,
  } | null,
};

export type UpdateAllRequestsMutationVariables = {
  input: UpdateAllRequestsInput,
  condition?: ModelAllRequestsConditionInput | null,
};

export type UpdateAllRequestsMutation = {
  updateAllRequests:  {
    __typename: "AllRequests",
    id: string,
    requestID: string,
    fromRegion: string | null,
    fromState: string | null,
    fromPort: string | null,
    terms: string,
    airOcean: string,
    madeByUserMail: string,
    createdAt: string,
    status: RequestStatus | null,
    details: string,
    Test: string | null,
    offersCount: string | null,
    offers: string | null,
    updatedAt: string,
  } | null,
};

export type DeleteAllRequestsMutationVariables = {
  input: DeleteAllRequestsInput,
  condition?: ModelAllRequestsConditionInput | null,
};

export type DeleteAllRequestsMutation = {
  deleteAllRequests:  {
    __typename: "AllRequests",
    id: string,
    requestID: string,
    fromRegion: string | null,
    fromState: string | null,
    fromPort: string | null,
    terms: string,
    airOcean: string,
    madeByUserMail: string,
    createdAt: string,
    status: RequestStatus | null,
    details: string,
    Test: string | null,
    offersCount: string | null,
    offers: string | null,
    updatedAt: string,
  } | null,
};

export type CreatePendingRequestsMutationVariables = {
  input: CreatePendingRequestsInput,
  condition?: ModelPendingRequestsConditionInput | null,
};

export type CreatePendingRequestsMutation = {
  createPendingRequests:  {
    __typename: "PendingRequests",
    id: string,
    requestid: string,
    byUserMail: string,
    operatedBY: string,
    rateId: string,
    info: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdatePendingRequestsMutationVariables = {
  input: UpdatePendingRequestsInput,
  condition?: ModelPendingRequestsConditionInput | null,
};

export type UpdatePendingRequestsMutation = {
  updatePendingRequests:  {
    __typename: "PendingRequests",
    id: string,
    requestid: string,
    byUserMail: string,
    operatedBY: string,
    rateId: string,
    info: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeletePendingRequestsMutationVariables = {
  input: DeletePendingRequestsInput,
  condition?: ModelPendingRequestsConditionInput | null,
};

export type DeletePendingRequestsMutation = {
  deletePendingRequests:  {
    __typename: "PendingRequests",
    id: string,
    requestid: string,
    byUserMail: string,
    operatedBY: string,
    rateId: string,
    info: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateImportRatesSimplifiedMutationVariables = {
  input: CreateIMPORTRatesSimplifiedInput,
  condition?: ModelIMPORTRatesSimplifiedConditionInput | null,
};

export type CreateImportRatesSimplifiedMutation = {
  createIMPORTRatesSimplified:  {
    __typename: "IMPORTRatesSimplified",
    rateHash: string,
    id: string,
    rateID: string,
    rateName: string,
    freightForwarderName: string,
    carrierName: string,
    validFrom: string,
    validTo: string,
    direct: Array< string | null > | null,
    zone: string | null,
    state: string | null,
    portFrom: string | null,
    portTo: string,
    limits: string | null,
    airRate: string | null,
    lcl: string | null,
    dv20: string | null,
    hc20: string | null,
    dv40: string | null,
    hq40: string | null,
    otherContainers: string | null,
    exwCharges: string | null,
    fobCharges: string | null,
    localCharges: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateImportRatesSimplifiedMutationVariables = {
  input: UpdateIMPORTRatesSimplifiedInput,
  condition?: ModelIMPORTRatesSimplifiedConditionInput | null,
};

export type UpdateImportRatesSimplifiedMutation = {
  updateIMPORTRatesSimplified:  {
    __typename: "IMPORTRatesSimplified",
    rateHash: string,
    id: string,
    rateID: string,
    rateName: string,
    freightForwarderName: string,
    carrierName: string,
    validFrom: string,
    validTo: string,
    direct: Array< string | null > | null,
    zone: string | null,
    state: string | null,
    portFrom: string | null,
    portTo: string,
    limits: string | null,
    airRate: string | null,
    lcl: string | null,
    dv20: string | null,
    hc20: string | null,
    dv40: string | null,
    hq40: string | null,
    otherContainers: string | null,
    exwCharges: string | null,
    fobCharges: string | null,
    localCharges: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteImportRatesSimplifiedMutationVariables = {
  input: DeleteIMPORTRatesSimplifiedInput,
  condition?: ModelIMPORTRatesSimplifiedConditionInput | null,
};

export type DeleteImportRatesSimplifiedMutation = {
  deleteIMPORTRatesSimplified:  {
    __typename: "IMPORTRatesSimplified",
    rateHash: string,
    id: string,
    rateID: string,
    rateName: string,
    freightForwarderName: string,
    carrierName: string,
    validFrom: string,
    validTo: string,
    direct: Array< string | null > | null,
    zone: string | null,
    state: string | null,
    portFrom: string | null,
    portTo: string,
    limits: string | null,
    airRate: string | null,
    lcl: string | null,
    dv20: string | null,
    hc20: string | null,
    dv40: string | null,
    hq40: string | null,
    otherContainers: string | null,
    exwCharges: string | null,
    fobCharges: string | null,
    localCharges: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetAccountApplicationSubmissionsQueryVariables = {
  id: string,
};

export type GetAccountApplicationSubmissionsQuery = {
  getAccountApplicationSubmissions:  {
    __typename: "AccountApplicationSubmissions",
    id: string,
    companyName: string,
    companyType: CompanyType,
    userRole: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    emailAddress: string,
    additionalInfo: string | null,
    importerExporterInfo: string | null,
    freightForwarderInfo: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListAccountApplicationSubmissionssQueryVariables = {
  filter?: ModelAccountApplicationSubmissionsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAccountApplicationSubmissionssQuery = {
  listAccountApplicationSubmissionss:  {
    __typename: "ModelAccountApplicationSubmissionsConnection",
    items:  Array< {
      __typename: "AccountApplicationSubmissions",
      id: string,
      companyName: string,
      companyType: CompanyType,
      userRole: string,
      firstName: string,
      lastName: string,
      phoneNumber: string,
      emailAddress: string,
      additionalInfo: string | null,
      importerExporterInfo: string | null,
      freightForwarderInfo: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetRateSubmissionQueryVariables = {
  id: string,
};

export type GetRateSubmissionQuery = {
  getRateSubmission:  {
    __typename: "RateSubmission",
    id: string,
    rateName: string,
    freightForwarderName: string,
    carrierName: string,
    rateType: RateType,
    validFrom: string,
    validTo: string,
    originCharges: string | null,
    freightTransportCharges: string | null,
    localCharges: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListRateSubmissionsQueryVariables = {
  filter?: ModelRateSubmissionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListRateSubmissionsQuery = {
  listRateSubmissions:  {
    __typename: "ModelRateSubmissionConnection",
    items:  Array< {
      __typename: "RateSubmission",
      id: string,
      rateName: string,
      freightForwarderName: string,
      carrierName: string,
      rateType: RateType,
      validFrom: string,
      validTo: string,
      originCharges: string | null,
      freightTransportCharges: string | null,
      localCharges: string,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetClientsQueryVariables = {
  id: string,
};

export type GetClientsQuery = {
  getClients:  {
    __typename: "Clients",
    id: string,
    companyName: string,
    impExp: ImportExport,
    cognitoGroup: string,
    mainUserMail: string,
    mainUserName: string,
    info:  {
      __typename: "infoClient",
      officeAddress: string,
      cargoLoadAddress: string,
      officeNumber: string | null,
      phoneNumber: string | null,
      deltaImport: string | null,
      deltaExport: string | null,
      localsByTomindu: string | null,
      additionalInfo: string | null,
    },
    addedBy: string,
    openShipments: string | null,
    closedShipments: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListClientssQueryVariables = {
  filter?: ModelClientsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListClientssQuery = {
  listClientss:  {
    __typename: "ModelClientsConnection",
    items:  Array< {
      __typename: "Clients",
      id: string,
      companyName: string,
      impExp: ImportExport,
      cognitoGroup: string,
      mainUserMail: string,
      mainUserName: string,
      info:  {
        __typename: "infoClient",
        officeAddress: string,
        cargoLoadAddress: string,
        officeNumber: string | null,
        phoneNumber: string | null,
        deltaImport: string | null,
        deltaExport: string | null,
        localsByTomindu: string | null,
        additionalInfo: string | null,
      },
      addedBy: string,
      openShipments: string | null,
      closedShipments: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetFfClientsQueryVariables = {
  id: string,
};

export type GetFfClientsQuery = {
  getFFClients:  {
    __typename: "FFClients",
    id: string,
    companyName: string,
    cognitoGroup: string,
    mainUserMail: string,
    mainUserName: string,
    info:  {
      __typename: "infoFFClient",
      officeAddress: string,
      officeNumber: string | null,
      additionalInfo: string | null,
    },
    openShipments: string | null,
    closedShipments: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListFfClientssQueryVariables = {
  filter?: ModelFFClientsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListFfClientssQuery = {
  listFFClientss:  {
    __typename: "ModelFFClientsConnection",
    items:  Array< {
      __typename: "FFClients",
      id: string,
      companyName: string,
      cognitoGroup: string,
      mainUserMail: string,
      mainUserName: string,
      info:  {
        __typename: "infoFFClient",
        officeAddress: string,
        officeNumber: string | null,
        additionalInfo: string | null,
      },
      openShipments: string | null,
      closedShipments: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetCompanyUsersInSystemQueryVariables = {
  id: string,
};

export type GetCompanyUsersInSystemQuery = {
  getCompanyUsersInSystem:  {
    __typename: "CompanyUsersInSystem",
    id: string,
    companyType: CompanyUsersTypes,
    mainUserName: string,
    mainUserMail: string,
    info: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListCompanyUsersInSystemsQueryVariables = {
  filter?: ModelCompanyUsersInSystemFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCompanyUsersInSystemsQuery = {
  listCompanyUsersInSystems:  {
    __typename: "ModelCompanyUsersInSystemConnection",
    items:  Array< {
      __typename: "CompanyUsersInSystem",
      id: string,
      companyType: CompanyUsersTypes,
      mainUserName: string,
      mainUserMail: string,
      info: string,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetAllRequestsQueryVariables = {
  id: string,
};

export type GetAllRequestsQuery = {
  getAllRequests:  {
    __typename: "AllRequests",
    id: string,
    requestID: string,
    fromRegion: string | null,
    fromState: string | null,
    fromPort: string | null,
    terms: string,
    airOcean: string,
    madeByUserMail: string,
    createdAt: string,
    status: RequestStatus | null,
    details: string,
    Test: string | null,
    offersCount: string | null,
    offers: string | null,
    updatedAt: string,
  } | null,
};

export type ListAllRequestssQueryVariables = {
  filter?: ModelAllRequestsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAllRequestssQuery = {
  listAllRequestss:  {
    __typename: "ModelAllRequestsConnection",
    items:  Array< {
      __typename: "AllRequests",
      id: string,
      requestID: string,
      fromRegion: string | null,
      fromState: string | null,
      fromPort: string | null,
      terms: string,
      airOcean: string,
      madeByUserMail: string,
      createdAt: string,
      status: RequestStatus | null,
      details: string,
      Test: string | null,
      offersCount: string | null,
      offers: string | null,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetPendingRequestsQueryVariables = {
  id: string,
};

export type GetPendingRequestsQuery = {
  getPendingRequests:  {
    __typename: "PendingRequests",
    id: string,
    requestid: string,
    byUserMail: string,
    operatedBY: string,
    rateId: string,
    info: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListPendingRequestssQueryVariables = {
  filter?: ModelPendingRequestsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPendingRequestssQuery = {
  listPendingRequestss:  {
    __typename: "ModelPendingRequestsConnection",
    items:  Array< {
      __typename: "PendingRequests",
      id: string,
      requestid: string,
      byUserMail: string,
      operatedBY: string,
      rateId: string,
      info: string,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetImportRatesSimplifiedQueryVariables = {
  id: string,
};

export type GetImportRatesSimplifiedQuery = {
  getIMPORTRatesSimplified:  {
    __typename: "IMPORTRatesSimplified",
    rateHash: string,
    id: string,
    rateID: string,
    rateName: string,
    freightForwarderName: string,
    carrierName: string,
    validFrom: string,
    validTo: string,
    direct: Array< string | null > | null,
    zone: string | null,
    state: string | null,
    portFrom: string | null,
    portTo: string,
    limits: string | null,
    airRate: string | null,
    lcl: string | null,
    dv20: string | null,
    hc20: string | null,
    dv40: string | null,
    hq40: string | null,
    otherContainers: string | null,
    exwCharges: string | null,
    fobCharges: string | null,
    localCharges: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListImportRatesSimplifiedsQueryVariables = {
  filter?: ModelIMPORTRatesSimplifiedFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListImportRatesSimplifiedsQuery = {
  listIMPORTRatesSimplifieds:  {
    __typename: "ModelIMPORTRatesSimplifiedConnection",
    items:  Array< {
      __typename: "IMPORTRatesSimplified",
      rateHash: string,
      id: string,
      rateID: string,
      rateName: string,
      freightForwarderName: string,
      carrierName: string,
      validFrom: string,
      validTo: string,
      direct: Array< string | null > | null,
      zone: string | null,
      state: string | null,
      portFrom: string | null,
      portTo: string,
      limits: string | null,
      airRate: string | null,
      lcl: string | null,
      dv20: string | null,
      hc20: string | null,
      dv40: string | null,
      hq40: string | null,
      otherContainers: string | null,
      exwCharges: string | null,
      fobCharges: string | null,
      localCharges: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateAccountApplicationSubmissionsSubscription = {
  onCreateAccountApplicationSubmissions:  {
    __typename: "AccountApplicationSubmissions",
    id: string,
    companyName: string,
    companyType: CompanyType,
    userRole: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    emailAddress: string,
    additionalInfo: string | null,
    importerExporterInfo: string | null,
    freightForwarderInfo: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateAccountApplicationSubmissionsSubscription = {
  onUpdateAccountApplicationSubmissions:  {
    __typename: "AccountApplicationSubmissions",
    id: string,
    companyName: string,
    companyType: CompanyType,
    userRole: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    emailAddress: string,
    additionalInfo: string | null,
    importerExporterInfo: string | null,
    freightForwarderInfo: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteAccountApplicationSubmissionsSubscription = {
  onDeleteAccountApplicationSubmissions:  {
    __typename: "AccountApplicationSubmissions",
    id: string,
    companyName: string,
    companyType: CompanyType,
    userRole: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    emailAddress: string,
    additionalInfo: string | null,
    importerExporterInfo: string | null,
    freightForwarderInfo: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateRateSubmissionSubscription = {
  onCreateRateSubmission:  {
    __typename: "RateSubmission",
    id: string,
    rateName: string,
    freightForwarderName: string,
    carrierName: string,
    rateType: RateType,
    validFrom: string,
    validTo: string,
    originCharges: string | null,
    freightTransportCharges: string | null,
    localCharges: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateRateSubmissionSubscription = {
  onUpdateRateSubmission:  {
    __typename: "RateSubmission",
    id: string,
    rateName: string,
    freightForwarderName: string,
    carrierName: string,
    rateType: RateType,
    validFrom: string,
    validTo: string,
    originCharges: string | null,
    freightTransportCharges: string | null,
    localCharges: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteRateSubmissionSubscription = {
  onDeleteRateSubmission:  {
    __typename: "RateSubmission",
    id: string,
    rateName: string,
    freightForwarderName: string,
    carrierName: string,
    rateType: RateType,
    validFrom: string,
    validTo: string,
    originCharges: string | null,
    freightTransportCharges: string | null,
    localCharges: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateClientsSubscription = {
  onCreateClients:  {
    __typename: "Clients",
    id: string,
    companyName: string,
    impExp: ImportExport,
    cognitoGroup: string,
    mainUserMail: string,
    mainUserName: string,
    info:  {
      __typename: "infoClient",
      officeAddress: string,
      cargoLoadAddress: string,
      officeNumber: string | null,
      phoneNumber: string | null,
      deltaImport: string | null,
      deltaExport: string | null,
      localsByTomindu: string | null,
      additionalInfo: string | null,
    },
    addedBy: string,
    openShipments: string | null,
    closedShipments: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateClientsSubscription = {
  onUpdateClients:  {
    __typename: "Clients",
    id: string,
    companyName: string,
    impExp: ImportExport,
    cognitoGroup: string,
    mainUserMail: string,
    mainUserName: string,
    info:  {
      __typename: "infoClient",
      officeAddress: string,
      cargoLoadAddress: string,
      officeNumber: string | null,
      phoneNumber: string | null,
      deltaImport: string | null,
      deltaExport: string | null,
      localsByTomindu: string | null,
      additionalInfo: string | null,
    },
    addedBy: string,
    openShipments: string | null,
    closedShipments: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteClientsSubscription = {
  onDeleteClients:  {
    __typename: "Clients",
    id: string,
    companyName: string,
    impExp: ImportExport,
    cognitoGroup: string,
    mainUserMail: string,
    mainUserName: string,
    info:  {
      __typename: "infoClient",
      officeAddress: string,
      cargoLoadAddress: string,
      officeNumber: string | null,
      phoneNumber: string | null,
      deltaImport: string | null,
      deltaExport: string | null,
      localsByTomindu: string | null,
      additionalInfo: string | null,
    },
    addedBy: string,
    openShipments: string | null,
    closedShipments: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateFfClientsSubscription = {
  onCreateFFClients:  {
    __typename: "FFClients",
    id: string,
    companyName: string,
    cognitoGroup: string,
    mainUserMail: string,
    mainUserName: string,
    info:  {
      __typename: "infoFFClient",
      officeAddress: string,
      officeNumber: string | null,
      additionalInfo: string | null,
    },
    openShipments: string | null,
    closedShipments: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateFfClientsSubscription = {
  onUpdateFFClients:  {
    __typename: "FFClients",
    id: string,
    companyName: string,
    cognitoGroup: string,
    mainUserMail: string,
    mainUserName: string,
    info:  {
      __typename: "infoFFClient",
      officeAddress: string,
      officeNumber: string | null,
      additionalInfo: string | null,
    },
    openShipments: string | null,
    closedShipments: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteFfClientsSubscription = {
  onDeleteFFClients:  {
    __typename: "FFClients",
    id: string,
    companyName: string,
    cognitoGroup: string,
    mainUserMail: string,
    mainUserName: string,
    info:  {
      __typename: "infoFFClient",
      officeAddress: string,
      officeNumber: string | null,
      additionalInfo: string | null,
    },
    openShipments: string | null,
    closedShipments: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateCompanyUsersInSystemSubscription = {
  onCreateCompanyUsersInSystem:  {
    __typename: "CompanyUsersInSystem",
    id: string,
    companyType: CompanyUsersTypes,
    mainUserName: string,
    mainUserMail: string,
    info: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateCompanyUsersInSystemSubscription = {
  onUpdateCompanyUsersInSystem:  {
    __typename: "CompanyUsersInSystem",
    id: string,
    companyType: CompanyUsersTypes,
    mainUserName: string,
    mainUserMail: string,
    info: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteCompanyUsersInSystemSubscription = {
  onDeleteCompanyUsersInSystem:  {
    __typename: "CompanyUsersInSystem",
    id: string,
    companyType: CompanyUsersTypes,
    mainUserName: string,
    mainUserMail: string,
    info: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateAllRequestsSubscription = {
  onCreateAllRequests:  {
    __typename: "AllRequests",
    id: string,
    requestID: string,
    fromRegion: string | null,
    fromState: string | null,
    fromPort: string | null,
    terms: string,
    airOcean: string,
    madeByUserMail: string,
    createdAt: string,
    status: RequestStatus | null,
    details: string,
    Test: string | null,
    offersCount: string | null,
    offers: string | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateAllRequestsSubscription = {
  onUpdateAllRequests:  {
    __typename: "AllRequests",
    id: string,
    requestID: string,
    fromRegion: string | null,
    fromState: string | null,
    fromPort: string | null,
    terms: string,
    airOcean: string,
    madeByUserMail: string,
    createdAt: string,
    status: RequestStatus | null,
    details: string,
    Test: string | null,
    offersCount: string | null,
    offers: string | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteAllRequestsSubscription = {
  onDeleteAllRequests:  {
    __typename: "AllRequests",
    id: string,
    requestID: string,
    fromRegion: string | null,
    fromState: string | null,
    fromPort: string | null,
    terms: string,
    airOcean: string,
    madeByUserMail: string,
    createdAt: string,
    status: RequestStatus | null,
    details: string,
    Test: string | null,
    offersCount: string | null,
    offers: string | null,
    updatedAt: string,
  } | null,
};

export type OnCreatePendingRequestsSubscription = {
  onCreatePendingRequests:  {
    __typename: "PendingRequests",
    id: string,
    requestid: string,
    byUserMail: string,
    operatedBY: string,
    rateId: string,
    info: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdatePendingRequestsSubscription = {
  onUpdatePendingRequests:  {
    __typename: "PendingRequests",
    id: string,
    requestid: string,
    byUserMail: string,
    operatedBY: string,
    rateId: string,
    info: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeletePendingRequestsSubscription = {
  onDeletePendingRequests:  {
    __typename: "PendingRequests",
    id: string,
    requestid: string,
    byUserMail: string,
    operatedBY: string,
    rateId: string,
    info: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateImportRatesSimplifiedSubscription = {
  onCreateIMPORTRatesSimplified:  {
    __typename: "IMPORTRatesSimplified",
    rateHash: string,
    id: string,
    rateID: string,
    rateName: string,
    freightForwarderName: string,
    carrierName: string,
    validFrom: string,
    validTo: string,
    direct: Array< string | null > | null,
    zone: string | null,
    state: string | null,
    portFrom: string | null,
    portTo: string,
    limits: string | null,
    airRate: string | null,
    lcl: string | null,
    dv20: string | null,
    hc20: string | null,
    dv40: string | null,
    hq40: string | null,
    otherContainers: string | null,
    exwCharges: string | null,
    fobCharges: string | null,
    localCharges: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateImportRatesSimplifiedSubscription = {
  onUpdateIMPORTRatesSimplified:  {
    __typename: "IMPORTRatesSimplified",
    rateHash: string,
    id: string,
    rateID: string,
    rateName: string,
    freightForwarderName: string,
    carrierName: string,
    validFrom: string,
    validTo: string,
    direct: Array< string | null > | null,
    zone: string | null,
    state: string | null,
    portFrom: string | null,
    portTo: string,
    limits: string | null,
    airRate: string | null,
    lcl: string | null,
    dv20: string | null,
    hc20: string | null,
    dv40: string | null,
    hq40: string | null,
    otherContainers: string | null,
    exwCharges: string | null,
    fobCharges: string | null,
    localCharges: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteImportRatesSimplifiedSubscription = {
  onDeleteIMPORTRatesSimplified:  {
    __typename: "IMPORTRatesSimplified",
    rateHash: string,
    id: string,
    rateID: string,
    rateName: string,
    freightForwarderName: string,
    carrierName: string,
    validFrom: string,
    validTo: string,
    direct: Array< string | null > | null,
    zone: string | null,
    state: string | null,
    portFrom: string | null,
    portTo: string,
    limits: string | null,
    airRate: string | null,
    lcl: string | null,
    dv20: string | null,
    hc20: string | null,
    dv40: string | null,
    hq40: string | null,
    otherContainers: string | null,
    exwCharges: string | null,
    fobCharges: string | null,
    localCharges: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
