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
  rateType: string,
  validFrom: string,
  validTo: string,
  originCharges?: string | null,
  freightTransportCharges?: string | null,
  localCharges: string,
};

export type ModelRateSubmissionConditionInput = {
  rateName?: ModelStringInput | null,
  freightForwarderName?: ModelStringInput | null,
  carrierName?: ModelStringInput | null,
  rateType?: ModelStringInput | null,
  validFrom?: ModelStringInput | null,
  validTo?: ModelStringInput | null,
  originCharges?: ModelStringInput | null,
  freightTransportCharges?: ModelStringInput | null,
  localCharges?: ModelStringInput | null,
  and?: Array< ModelRateSubmissionConditionInput | null > | null,
  or?: Array< ModelRateSubmissionConditionInput | null > | null,
  not?: ModelRateSubmissionConditionInput | null,
};

export type UpdateRateSubmissionInput = {
  id: string,
  rateName?: string | null,
  freightForwarderName?: string | null,
  carrierName?: string | null,
  rateType?: string | null,
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
  fromRegion?: string | null,
  fromState?: string | null,
  fromPort?: string | null,
  incoterms: string,
  modeOfTransport: string,
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
  fromRegion?: ModelStringInput | null,
  fromState?: ModelStringInput | null,
  fromPort?: ModelStringInput | null,
  incoterms?: ModelStringInput | null,
  modeOfTransport?: ModelStringInput | null,
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

export type ModelRequestStatusInput = {
  eq?: RequestStatus | null,
  ne?: RequestStatus | null,
};

export type UpdateAllRequestsInput = {
  fromRegion?: string | null,
  fromState?: string | null,
  fromPort?: string | null,
  incoterms?: string | null,
  modeOfTransport?: string | null,
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
  operatedByFF: string,
  rateId: string,
  info: string,
};

export type ModelPendingRequestsConditionInput = {
  requestid?: ModelIDInput | null,
  byUserMail?: ModelStringInput | null,
  operatedByFF?: ModelStringInput | null,
  rateId?: ModelIDInput | null,
  info?: ModelStringInput | null,
  and?: Array< ModelPendingRequestsConditionInput | null > | null,
  or?: Array< ModelPendingRequestsConditionInput | null > | null,
  not?: ModelPendingRequestsConditionInput | null,
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

export type UpdatePendingRequestsInput = {
  id: string,
  requestid?: string | null,
  byUserMail?: string | null,
  operatedByFF?: string | null,
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

export type CreateShipmentsOnGoingInput = {
  id?: string | null,
  madeByUserMail: string,
  createdAt?: string | null,
  operatedByFF: string,
  offerID: string,
  status: string,
  info?: string | null,
};

export type ModelShipmentsOnGoingConditionInput = {
  madeByUserMail?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  operatedByFF?: ModelStringInput | null,
  offerID?: ModelStringInput | null,
  status?: ModelStringInput | null,
  info?: ModelStringInput | null,
  and?: Array< ModelShipmentsOnGoingConditionInput | null > | null,
  or?: Array< ModelShipmentsOnGoingConditionInput | null > | null,
  not?: ModelShipmentsOnGoingConditionInput | null,
};

export type UpdateShipmentsOnGoingInput = {
  madeByUserMail?: string | null,
  createdAt?: string | null,
  operatedByFF?: string | null,
  offerID?: string | null,
  status?: string | null,
  info?: string | null,
};

export type DeleteShipmentsOnGoingInput = {
  id?: string | null,
};

export type CreateShipmentsDoneInput = {
  id?: string | null,
  info?: string | null,
  status?: string | null,
};

export type ModelShipmentsDoneConditionInput = {
  info?: ModelStringInput | null,
  status?: ModelStringInput | null,
  and?: Array< ModelShipmentsDoneConditionInput | null > | null,
  or?: Array< ModelShipmentsDoneConditionInput | null > | null,
  not?: ModelShipmentsDoneConditionInput | null,
};

export type UpdateShipmentsDoneInput = {
  info?: string | null,
  status?: string | null,
};

export type DeleteShipmentsDoneInput = {
  id?: string | null,
};

export type CreateDeclinedRFQInput = {
  id?: string | null,
  requestid?: string | null,
  info?: string | null,
};

export type ModelDeclinedRFQConditionInput = {
  requestid?: ModelStringInput | null,
  info?: ModelStringInput | null,
  and?: Array< ModelDeclinedRFQConditionInput | null > | null,
  or?: Array< ModelDeclinedRFQConditionInput | null > | null,
  not?: ModelDeclinedRFQConditionInput | null,
};

export type UpdateDeclinedRFQInput = {
  requestid?: string | null,
  info?: string | null,
};

export type DeleteDeclinedRFQInput = {
  id?: string | null,
};

export type CreateAccepedOffersInput = {
  id?: string | null,
  requestid: string,
  offerId: string,
  info: string,
  status?: string | null,
};

export type ModelAccepedOffersConditionInput = {
  requestid?: ModelStringInput | null,
  offerId?: ModelStringInput | null,
  info?: ModelStringInput | null,
  status?: ModelStringInput | null,
  and?: Array< ModelAccepedOffersConditionInput | null > | null,
  or?: Array< ModelAccepedOffersConditionInput | null > | null,
  not?: ModelAccepedOffersConditionInput | null,
};

export type UpdateAccepedOffersInput = {
  requestid?: string | null,
  offerId?: string | null,
  info?: string | null,
  status?: string | null,
};

export type DeleteAccepedOffersInput = {
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
  rateType?: ModelStringInput | null,
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
  fromRegion?: ModelStringInput | null,
  fromState?: ModelStringInput | null,
  fromPort?: ModelStringInput | null,
  incoterms?: ModelStringInput | null,
  modeOfTransport?: ModelStringInput | null,
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
  operatedByFF?: ModelStringInput | null,
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

export type ModelShipmentsOnGoingFilterInput = {
  madeByUserMail?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  operatedByFF?: ModelStringInput | null,
  offerID?: ModelStringInput | null,
  status?: ModelStringInput | null,
  info?: ModelStringInput | null,
  and?: Array< ModelShipmentsOnGoingFilterInput | null > | null,
  or?: Array< ModelShipmentsOnGoingFilterInput | null > | null,
  not?: ModelShipmentsOnGoingFilterInput | null,
};

export type ModelShipmentsDoneFilterInput = {
  info?: ModelStringInput | null,
  status?: ModelStringInput | null,
  and?: Array< ModelShipmentsDoneFilterInput | null > | null,
  or?: Array< ModelShipmentsDoneFilterInput | null > | null,
  not?: ModelShipmentsDoneFilterInput | null,
};

export type ModelDeclinedRFQFilterInput = {
  requestid?: ModelStringInput | null,
  info?: ModelStringInput | null,
  and?: Array< ModelDeclinedRFQFilterInput | null > | null,
  or?: Array< ModelDeclinedRFQFilterInput | null > | null,
  not?: ModelDeclinedRFQFilterInput | null,
};

export type ModelAccepedOffersFilterInput = {
  requestid?: ModelStringInput | null,
  offerId?: ModelStringInput | null,
  info?: ModelStringInput | null,
  status?: ModelStringInput | null,
  and?: Array< ModelAccepedOffersFilterInput | null > | null,
  or?: Array< ModelAccepedOffersFilterInput | null > | null,
  not?: ModelAccepedOffersFilterInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelStringKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
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
    rateType: string,
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
    rateType: string,
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
    rateType: string,
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
    fromRegion: string | null,
    fromState: string | null,
    fromPort: string | null,
    incoterms: string,
    modeOfTransport: string,
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
    fromRegion: string | null,
    fromState: string | null,
    fromPort: string | null,
    incoterms: string,
    modeOfTransport: string,
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
    fromRegion: string | null,
    fromState: string | null,
    fromPort: string | null,
    incoterms: string,
    modeOfTransport: string,
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
    operatedByFF: string,
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
    operatedByFF: string,
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
    operatedByFF: string,
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

export type CreateShipmentsOnGoingMutationVariables = {
  input: CreateShipmentsOnGoingInput,
  condition?: ModelShipmentsOnGoingConditionInput | null,
};

export type CreateShipmentsOnGoingMutation = {
  createShipmentsOnGoing:  {
    __typename: "ShipmentsOnGoing",
    id: string,
    madeByUserMail: string,
    createdAt: string,
    operatedByFF: string,
    offerID: string,
    status: string,
    info: string | null,
    updatedAt: string,
  } | null,
};

export type UpdateShipmentsOnGoingMutationVariables = {
  input: UpdateShipmentsOnGoingInput,
  condition?: ModelShipmentsOnGoingConditionInput | null,
};

export type UpdateShipmentsOnGoingMutation = {
  updateShipmentsOnGoing:  {
    __typename: "ShipmentsOnGoing",
    id: string,
    madeByUserMail: string,
    createdAt: string,
    operatedByFF: string,
    offerID: string,
    status: string,
    info: string | null,
    updatedAt: string,
  } | null,
};

export type DeleteShipmentsOnGoingMutationVariables = {
  input: DeleteShipmentsOnGoingInput,
  condition?: ModelShipmentsOnGoingConditionInput | null,
};

export type DeleteShipmentsOnGoingMutation = {
  deleteShipmentsOnGoing:  {
    __typename: "ShipmentsOnGoing",
    id: string,
    madeByUserMail: string,
    createdAt: string,
    operatedByFF: string,
    offerID: string,
    status: string,
    info: string | null,
    updatedAt: string,
  } | null,
};

export type CreateShipmentsDoneMutationVariables = {
  input: CreateShipmentsDoneInput,
  condition?: ModelShipmentsDoneConditionInput | null,
};

export type CreateShipmentsDoneMutation = {
  createShipmentsDone:  {
    __typename: "ShipmentsDone",
    id: string,
    info: string | null,
    status: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateShipmentsDoneMutationVariables = {
  input: UpdateShipmentsDoneInput,
  condition?: ModelShipmentsDoneConditionInput | null,
};

export type UpdateShipmentsDoneMutation = {
  updateShipmentsDone:  {
    __typename: "ShipmentsDone",
    id: string,
    info: string | null,
    status: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteShipmentsDoneMutationVariables = {
  input: DeleteShipmentsDoneInput,
  condition?: ModelShipmentsDoneConditionInput | null,
};

export type DeleteShipmentsDoneMutation = {
  deleteShipmentsDone:  {
    __typename: "ShipmentsDone",
    id: string,
    info: string | null,
    status: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateDeclinedRfqMutationVariables = {
  input: CreateDeclinedRFQInput,
  condition?: ModelDeclinedRFQConditionInput | null,
};

export type CreateDeclinedRfqMutation = {
  createDeclinedRFQ:  {
    __typename: "DeclinedRFQ",
    id: string,
    requestid: string | null,
    info: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateDeclinedRfqMutationVariables = {
  input: UpdateDeclinedRFQInput,
  condition?: ModelDeclinedRFQConditionInput | null,
};

export type UpdateDeclinedRfqMutation = {
  updateDeclinedRFQ:  {
    __typename: "DeclinedRFQ",
    id: string,
    requestid: string | null,
    info: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteDeclinedRfqMutationVariables = {
  input: DeleteDeclinedRFQInput,
  condition?: ModelDeclinedRFQConditionInput | null,
};

export type DeleteDeclinedRfqMutation = {
  deleteDeclinedRFQ:  {
    __typename: "DeclinedRFQ",
    id: string,
    requestid: string | null,
    info: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateAccepedOffersMutationVariables = {
  input: CreateAccepedOffersInput,
  condition?: ModelAccepedOffersConditionInput | null,
};

export type CreateAccepedOffersMutation = {
  createAccepedOffers:  {
    __typename: "AccepedOffers",
    id: string,
    requestid: string,
    offerId: string,
    info: string,
    status: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateAccepedOffersMutationVariables = {
  input: UpdateAccepedOffersInput,
  condition?: ModelAccepedOffersConditionInput | null,
};

export type UpdateAccepedOffersMutation = {
  updateAccepedOffers:  {
    __typename: "AccepedOffers",
    id: string,
    requestid: string,
    offerId: string,
    info: string,
    status: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteAccepedOffersMutationVariables = {
  input: DeleteAccepedOffersInput,
  condition?: ModelAccepedOffersConditionInput | null,
};

export type DeleteAccepedOffersMutation = {
  deleteAccepedOffers:  {
    __typename: "AccepedOffers",
    id: string,
    requestid: string,
    offerId: string,
    info: string,
    status: string | null,
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
    rateType: string,
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
      rateType: string,
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
    fromRegion: string | null,
    fromState: string | null,
    fromPort: string | null,
    incoterms: string,
    modeOfTransport: string,
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
      fromRegion: string | null,
      fromState: string | null,
      fromPort: string | null,
      incoterms: string,
      modeOfTransport: string,
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
    operatedByFF: string,
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
      operatedByFF: string,
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

export type GetShipmentsOnGoingQueryVariables = {
  id: string,
};

export type GetShipmentsOnGoingQuery = {
  getShipmentsOnGoing:  {
    __typename: "ShipmentsOnGoing",
    id: string,
    madeByUserMail: string,
    createdAt: string,
    operatedByFF: string,
    offerID: string,
    status: string,
    info: string | null,
    updatedAt: string,
  } | null,
};

export type ListShipmentsOnGoingsQueryVariables = {
  filter?: ModelShipmentsOnGoingFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListShipmentsOnGoingsQuery = {
  listShipmentsOnGoings:  {
    __typename: "ModelShipmentsOnGoingConnection",
    items:  Array< {
      __typename: "ShipmentsOnGoing",
      id: string,
      madeByUserMail: string,
      createdAt: string,
      operatedByFF: string,
      offerID: string,
      status: string,
      info: string | null,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetShipmentsDoneQueryVariables = {
  id: string,
};

export type GetShipmentsDoneQuery = {
  getShipmentsDone:  {
    __typename: "ShipmentsDone",
    id: string,
    info: string | null,
    status: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListShipmentsDonesQueryVariables = {
  filter?: ModelShipmentsDoneFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListShipmentsDonesQuery = {
  listShipmentsDones:  {
    __typename: "ModelShipmentsDoneConnection",
    items:  Array< {
      __typename: "ShipmentsDone",
      id: string,
      info: string | null,
      status: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetDeclinedRfqQueryVariables = {
  id: string,
};

export type GetDeclinedRfqQuery = {
  getDeclinedRFQ:  {
    __typename: "DeclinedRFQ",
    id: string,
    requestid: string | null,
    info: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListDeclinedRfQsQueryVariables = {
  filter?: ModelDeclinedRFQFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListDeclinedRfQsQuery = {
  listDeclinedRFQs:  {
    __typename: "ModelDeclinedRFQConnection",
    items:  Array< {
      __typename: "DeclinedRFQ",
      id: string,
      requestid: string | null,
      info: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetAccepedOffersQueryVariables = {
  id: string,
};

export type GetAccepedOffersQuery = {
  getAccepedOffers:  {
    __typename: "AccepedOffers",
    id: string,
    requestid: string,
    offerId: string,
    info: string,
    status: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListAccepedOfferssQueryVariables = {
  filter?: ModelAccepedOffersFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAccepedOfferssQuery = {
  listAccepedOfferss:  {
    __typename: "ModelAccepedOffersConnection",
    items:  Array< {
      __typename: "AccepedOffers",
      id: string,
      requestid: string,
      offerId: string,
      info: string,
      status: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type ByRequestIdQueryVariables = {
  requestid?: string | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPendingRequestsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ByRequestIdQuery = {
  byRequestID:  {
    __typename: "ModelPendingRequestsConnection",
    items:  Array< {
      __typename: "PendingRequests",
      id: string,
      requestid: string,
      byUserMail: string,
      operatedByFF: string,
      rateId: string,
      info: string,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type SimplifiedByPortFobQueryVariables = {
  rateHash?: string | null,
  portFrom?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelIMPORTRatesSimplifiedFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type SimplifiedByPortFobQuery = {
  SimplifiedByPortFOB:  {
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

export type SimplifiedByStateExwQueryVariables = {
  rateHash?: string | null,
  state?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelIMPORTRatesSimplifiedFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type SimplifiedByStateExwQuery = {
  SimplifiedByStateEXW:  {
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

export type ByUserMailQueryVariables = {
  madeByUserMail?: string | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelShipmentsOnGoingFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ByUserMailQuery = {
  byUserMail:  {
    __typename: "ModelShipmentsOnGoingConnection",
    items:  Array< {
      __typename: "ShipmentsOnGoing",
      id: string,
      madeByUserMail: string,
      createdAt: string,
      operatedByFF: string,
      offerID: string,
      status: string,
      info: string | null,
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
    rateType: string,
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
    rateType: string,
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
    rateType: string,
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
    fromRegion: string | null,
    fromState: string | null,
    fromPort: string | null,
    incoterms: string,
    modeOfTransport: string,
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
    fromRegion: string | null,
    fromState: string | null,
    fromPort: string | null,
    incoterms: string,
    modeOfTransport: string,
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
    fromRegion: string | null,
    fromState: string | null,
    fromPort: string | null,
    incoterms: string,
    modeOfTransport: string,
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
    operatedByFF: string,
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
    operatedByFF: string,
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
    operatedByFF: string,
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

export type OnCreateShipmentsOnGoingSubscription = {
  onCreateShipmentsOnGoing:  {
    __typename: "ShipmentsOnGoing",
    id: string,
    madeByUserMail: string,
    createdAt: string,
    operatedByFF: string,
    offerID: string,
    status: string,
    info: string | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateShipmentsOnGoingSubscription = {
  onUpdateShipmentsOnGoing:  {
    __typename: "ShipmentsOnGoing",
    id: string,
    madeByUserMail: string,
    createdAt: string,
    operatedByFF: string,
    offerID: string,
    status: string,
    info: string | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteShipmentsOnGoingSubscription = {
  onDeleteShipmentsOnGoing:  {
    __typename: "ShipmentsOnGoing",
    id: string,
    madeByUserMail: string,
    createdAt: string,
    operatedByFF: string,
    offerID: string,
    status: string,
    info: string | null,
    updatedAt: string,
  } | null,
};

export type OnCreateShipmentsDoneSubscription = {
  onCreateShipmentsDone:  {
    __typename: "ShipmentsDone",
    id: string,
    info: string | null,
    status: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateShipmentsDoneSubscription = {
  onUpdateShipmentsDone:  {
    __typename: "ShipmentsDone",
    id: string,
    info: string | null,
    status: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteShipmentsDoneSubscription = {
  onDeleteShipmentsDone:  {
    __typename: "ShipmentsDone",
    id: string,
    info: string | null,
    status: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateDeclinedRfqSubscription = {
  onCreateDeclinedRFQ:  {
    __typename: "DeclinedRFQ",
    id: string,
    requestid: string | null,
    info: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateDeclinedRfqSubscription = {
  onUpdateDeclinedRFQ:  {
    __typename: "DeclinedRFQ",
    id: string,
    requestid: string | null,
    info: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteDeclinedRfqSubscription = {
  onDeleteDeclinedRFQ:  {
    __typename: "DeclinedRFQ",
    id: string,
    requestid: string | null,
    info: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateAccepedOffersSubscription = {
  onCreateAccepedOffers:  {
    __typename: "AccepedOffers",
    id: string,
    requestid: string,
    offerId: string,
    info: string,
    status: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateAccepedOffersSubscription = {
  onUpdateAccepedOffers:  {
    __typename: "AccepedOffers",
    id: string,
    requestid: string,
    offerId: string,
    info: string,
    status: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteAccepedOffersSubscription = {
  onDeleteAccepedOffers:  {
    __typename: "AccepedOffers",
    id: string,
    requestid: string,
    offerId: string,
    info: string,
    status: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
