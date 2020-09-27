/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createAccountApplicationSubmissions = /* GraphQL */ `
  mutation CreateAccountApplicationSubmissions(
    $input: CreateAccountApplicationSubmissionsInput!
    $condition: ModelAccountApplicationSubmissionsConditionInput
  ) {
    createAccountApplicationSubmissions(input: $input, condition: $condition) {
      id
      companyName
      companyType
      userRole
      firstName
      lastName
      phoneNumber
      emailAddress
      additionalInfo
      importerExporterInfo
      freightForwarderInfo
      createdAt
      updatedAt
    }
  }
`;
export const updateAccountApplicationSubmissions = /* GraphQL */ `
  mutation UpdateAccountApplicationSubmissions(
    $input: UpdateAccountApplicationSubmissionsInput!
    $condition: ModelAccountApplicationSubmissionsConditionInput
  ) {
    updateAccountApplicationSubmissions(input: $input, condition: $condition) {
      id
      companyName
      companyType
      userRole
      firstName
      lastName
      phoneNumber
      emailAddress
      additionalInfo
      importerExporterInfo
      freightForwarderInfo
      createdAt
      updatedAt
    }
  }
`;
export const deleteAccountApplicationSubmissions = /* GraphQL */ `
  mutation DeleteAccountApplicationSubmissions(
    $input: DeleteAccountApplicationSubmissionsInput!
    $condition: ModelAccountApplicationSubmissionsConditionInput
  ) {
    deleteAccountApplicationSubmissions(input: $input, condition: $condition) {
      id
      companyName
      companyType
      userRole
      firstName
      lastName
      phoneNumber
      emailAddress
      additionalInfo
      importerExporterInfo
      freightForwarderInfo
      createdAt
      updatedAt
    }
  }
`;
export const createRateSubmission = /* GraphQL */ `
  mutation CreateRateSubmission(
    $input: CreateRateSubmissionInput!
    $condition: ModelRateSubmissionConditionInput
  ) {
    createRateSubmission(input: $input, condition: $condition) {
      id
      rateName
      freightForwarderName
      carrierName
      rateType
      validFrom
      validTo
      originCharges
      freightTransportCharges
      localCharges
      createdAt
      updatedAt
    }
  }
`;
export const updateRateSubmission = /* GraphQL */ `
  mutation UpdateRateSubmission(
    $input: UpdateRateSubmissionInput!
    $condition: ModelRateSubmissionConditionInput
  ) {
    updateRateSubmission(input: $input, condition: $condition) {
      id
      rateName
      freightForwarderName
      carrierName
      rateType
      validFrom
      validTo
      originCharges
      freightTransportCharges
      localCharges
      createdAt
      updatedAt
    }
  }
`;
export const deleteRateSubmission = /* GraphQL */ `
  mutation DeleteRateSubmission(
    $input: DeleteRateSubmissionInput!
    $condition: ModelRateSubmissionConditionInput
  ) {
    deleteRateSubmission(input: $input, condition: $condition) {
      id
      rateName
      freightForwarderName
      carrierName
      rateType
      validFrom
      validTo
      originCharges
      freightTransportCharges
      localCharges
      createdAt
      updatedAt
    }
  }
`;
export const createClients = /* GraphQL */ `
  mutation CreateClients(
    $input: CreateClientsInput!
    $condition: ModelClientsConditionInput
  ) {
    createClients(input: $input, condition: $condition) {
      id
      companyName
      impExp
      cognitoGroup
      mainUserMail
      mainUserName
      info {
        officeAddress
        cargoLoadAddress
        officeNumber
        phoneNumber
        deltaImport
        deltaExport
        localsByTomindu
        additionalInfo
      }
      addedBy
      openShipments
      closedShipments
      createdAt
      updatedAt
    }
  }
`;
export const updateClients = /* GraphQL */ `
  mutation UpdateClients(
    $input: UpdateClientsInput!
    $condition: ModelClientsConditionInput
  ) {
    updateClients(input: $input, condition: $condition) {
      id
      companyName
      impExp
      cognitoGroup
      mainUserMail
      mainUserName
      info {
        officeAddress
        cargoLoadAddress
        officeNumber
        phoneNumber
        deltaImport
        deltaExport
        localsByTomindu
        additionalInfo
      }
      addedBy
      openShipments
      closedShipments
      createdAt
      updatedAt
    }
  }
`;
export const deleteClients = /* GraphQL */ `
  mutation DeleteClients(
    $input: DeleteClientsInput!
    $condition: ModelClientsConditionInput
  ) {
    deleteClients(input: $input, condition: $condition) {
      id
      companyName
      impExp
      cognitoGroup
      mainUserMail
      mainUserName
      info {
        officeAddress
        cargoLoadAddress
        officeNumber
        phoneNumber
        deltaImport
        deltaExport
        localsByTomindu
        additionalInfo
      }
      addedBy
      openShipments
      closedShipments
      createdAt
      updatedAt
    }
  }
`;
export const createFfClients = /* GraphQL */ `
  mutation CreateFfClients(
    $input: CreateFFClientsInput!
    $condition: ModelFFClientsConditionInput
  ) {
    createFFClients(input: $input, condition: $condition) {
      id
      companyName
      cognitoGroup
      mainUserMail
      mainUserName
      info {
        officeAddress
        officeNumber
        additionalInfo
      }
      openShipments
      closedShipments
      createdAt
      updatedAt
    }
  }
`;
export const updateFfClients = /* GraphQL */ `
  mutation UpdateFfClients(
    $input: UpdateFFClientsInput!
    $condition: ModelFFClientsConditionInput
  ) {
    updateFFClients(input: $input, condition: $condition) {
      id
      companyName
      cognitoGroup
      mainUserMail
      mainUserName
      info {
        officeAddress
        officeNumber
        additionalInfo
      }
      openShipments
      closedShipments
      createdAt
      updatedAt
    }
  }
`;
export const deleteFfClients = /* GraphQL */ `
  mutation DeleteFfClients(
    $input: DeleteFFClientsInput!
    $condition: ModelFFClientsConditionInput
  ) {
    deleteFFClients(input: $input, condition: $condition) {
      id
      companyName
      cognitoGroup
      mainUserMail
      mainUserName
      info {
        officeAddress
        officeNumber
        additionalInfo
      }
      openShipments
      closedShipments
      createdAt
      updatedAt
    }
  }
`;
export const createCompanyUsersInSystem = /* GraphQL */ `
  mutation CreateCompanyUsersInSystem(
    $input: CreateCompanyUsersInSystemInput!
    $condition: ModelCompanyUsersInSystemConditionInput
  ) {
    createCompanyUsersInSystem(input: $input, condition: $condition) {
      id
      companyType
      mainUserName
      mainUserMail
      info
      createdAt
      updatedAt
    }
  }
`;
export const updateCompanyUsersInSystem = /* GraphQL */ `
  mutation UpdateCompanyUsersInSystem(
    $input: UpdateCompanyUsersInSystemInput!
    $condition: ModelCompanyUsersInSystemConditionInput
  ) {
    updateCompanyUsersInSystem(input: $input, condition: $condition) {
      id
      companyType
      mainUserName
      mainUserMail
      info
      createdAt
      updatedAt
    }
  }
`;
export const deleteCompanyUsersInSystem = /* GraphQL */ `
  mutation DeleteCompanyUsersInSystem(
    $input: DeleteCompanyUsersInSystemInput!
    $condition: ModelCompanyUsersInSystemConditionInput
  ) {
    deleteCompanyUsersInSystem(input: $input, condition: $condition) {
      id
      companyType
      mainUserName
      mainUserMail
      info
      createdAt
      updatedAt
    }
  }
`;
export const createAllRequests = /* GraphQL */ `
  mutation CreateAllRequests(
    $input: CreateAllRequestsInput!
    $condition: ModelAllRequestsConditionInput
  ) {
    createAllRequests(input: $input, condition: $condition) {
      id
      fromRegion
      fromState
      fromPort
      incoterms
      modeOfTransport
      madeByUserMail
      createdAt
      status
      details
      Test
      offersCount
      offers
      updatedAt
    }
  }
`;
export const updateAllRequests = /* GraphQL */ `
  mutation UpdateAllRequests(
    $input: UpdateAllRequestsInput!
    $condition: ModelAllRequestsConditionInput
  ) {
    updateAllRequests(input: $input, condition: $condition) {
      id
      fromRegion
      fromState
      fromPort
      incoterms
      modeOfTransport
      madeByUserMail
      createdAt
      status
      details
      Test
      offersCount
      offers
      updatedAt
    }
  }
`;
export const deleteAllRequests = /* GraphQL */ `
  mutation DeleteAllRequests(
    $input: DeleteAllRequestsInput!
    $condition: ModelAllRequestsConditionInput
  ) {
    deleteAllRequests(input: $input, condition: $condition) {
      id
      fromRegion
      fromState
      fromPort
      incoterms
      modeOfTransport
      madeByUserMail
      createdAt
      status
      details
      Test
      offersCount
      offers
      updatedAt
    }
  }
`;
export const createPendingRequests = /* GraphQL */ `
  mutation CreatePendingRequests(
    $input: CreatePendingRequestsInput!
    $condition: ModelPendingRequestsConditionInput
  ) {
    createPendingRequests(input: $input, condition: $condition) {
      id
      requestid
      byUserMail
      operatedByFF
      rateId
      info
      createdAt
      updatedAt
    }
  }
`;
export const updatePendingRequests = /* GraphQL */ `
  mutation UpdatePendingRequests(
    $input: UpdatePendingRequestsInput!
    $condition: ModelPendingRequestsConditionInput
  ) {
    updatePendingRequests(input: $input, condition: $condition) {
      id
      requestid
      byUserMail
      operatedByFF
      rateId
      info
      createdAt
      updatedAt
    }
  }
`;
export const deletePendingRequests = /* GraphQL */ `
  mutation DeletePendingRequests(
    $input: DeletePendingRequestsInput!
    $condition: ModelPendingRequestsConditionInput
  ) {
    deletePendingRequests(input: $input, condition: $condition) {
      id
      requestid
      byUserMail
      operatedByFF
      rateId
      info
      createdAt
      updatedAt
    }
  }
`;
export const createImportRatesSimplified = /* GraphQL */ `
  mutation CreateImportRatesSimplified(
    $input: CreateIMPORTRatesSimplifiedInput!
    $condition: ModelIMPORTRatesSimplifiedConditionInput
  ) {
    createIMPORTRatesSimplified(input: $input, condition: $condition) {
      rateHash
      id
      rateID
      rateName
      freightForwarderName
      carrierName
      validFrom
      validTo
      direct
      zone
      state
      portFrom
      portTo
      limits
      airRate
      lcl
      dv20
      hc20
      dv40
      hq40
      otherContainers
      exwCharges
      fobCharges
      localCharges
      createdAt
      updatedAt
    }
  }
`;
export const updateImportRatesSimplified = /* GraphQL */ `
  mutation UpdateImportRatesSimplified(
    $input: UpdateIMPORTRatesSimplifiedInput!
    $condition: ModelIMPORTRatesSimplifiedConditionInput
  ) {
    updateIMPORTRatesSimplified(input: $input, condition: $condition) {
      rateHash
      id
      rateID
      rateName
      freightForwarderName
      carrierName
      validFrom
      validTo
      direct
      zone
      state
      portFrom
      portTo
      limits
      airRate
      lcl
      dv20
      hc20
      dv40
      hq40
      otherContainers
      exwCharges
      fobCharges
      localCharges
      createdAt
      updatedAt
    }
  }
`;
export const deleteImportRatesSimplified = /* GraphQL */ `
  mutation DeleteImportRatesSimplified(
    $input: DeleteIMPORTRatesSimplifiedInput!
    $condition: ModelIMPORTRatesSimplifiedConditionInput
  ) {
    deleteIMPORTRatesSimplified(input: $input, condition: $condition) {
      rateHash
      id
      rateID
      rateName
      freightForwarderName
      carrierName
      validFrom
      validTo
      direct
      zone
      state
      portFrom
      portTo
      limits
      airRate
      lcl
      dv20
      hc20
      dv40
      hq40
      otherContainers
      exwCharges
      fobCharges
      localCharges
      createdAt
      updatedAt
    }
  }
`;
export const createShipmentsOnGoing = /* GraphQL */ `
  mutation CreateShipmentsOnGoing(
    $input: CreateShipmentsOnGoingInput!
    $condition: ModelShipmentsOnGoingConditionInput
  ) {
    createShipmentsOnGoing(input: $input, condition: $condition) {
      id
      madeByUserMail
      createdAt
      operatedByFF
      offerID
      status
      info
      updatedAt
    }
  }
`;
export const updateShipmentsOnGoing = /* GraphQL */ `
  mutation UpdateShipmentsOnGoing(
    $input: UpdateShipmentsOnGoingInput!
    $condition: ModelShipmentsOnGoingConditionInput
  ) {
    updateShipmentsOnGoing(input: $input, condition: $condition) {
      id
      madeByUserMail
      createdAt
      operatedByFF
      offerID
      status
      info
      updatedAt
    }
  }
`;
export const deleteShipmentsOnGoing = /* GraphQL */ `
  mutation DeleteShipmentsOnGoing(
    $input: DeleteShipmentsOnGoingInput!
    $condition: ModelShipmentsOnGoingConditionInput
  ) {
    deleteShipmentsOnGoing(input: $input, condition: $condition) {
      id
      madeByUserMail
      createdAt
      operatedByFF
      offerID
      status
      info
      updatedAt
    }
  }
`;
export const createShipmentsDone = /* GraphQL */ `
  mutation CreateShipmentsDone(
    $input: CreateShipmentsDoneInput!
    $condition: ModelShipmentsDoneConditionInput
  ) {
    createShipmentsDone(input: $input, condition: $condition) {
      id
      info
      status
      createdAt
      updatedAt
    }
  }
`;
export const updateShipmentsDone = /* GraphQL */ `
  mutation UpdateShipmentsDone(
    $input: UpdateShipmentsDoneInput!
    $condition: ModelShipmentsDoneConditionInput
  ) {
    updateShipmentsDone(input: $input, condition: $condition) {
      id
      info
      status
      createdAt
      updatedAt
    }
  }
`;
export const deleteShipmentsDone = /* GraphQL */ `
  mutation DeleteShipmentsDone(
    $input: DeleteShipmentsDoneInput!
    $condition: ModelShipmentsDoneConditionInput
  ) {
    deleteShipmentsDone(input: $input, condition: $condition) {
      id
      info
      status
      createdAt
      updatedAt
    }
  }
`;
export const createDeclinedRfq = /* GraphQL */ `
  mutation CreateDeclinedRfq(
    $input: CreateDeclinedRFQInput!
    $condition: ModelDeclinedRFQConditionInput
  ) {
    createDeclinedRFQ(input: $input, condition: $condition) {
      id
      requestid
      info
      createdAt
      updatedAt
    }
  }
`;
export const updateDeclinedRfq = /* GraphQL */ `
  mutation UpdateDeclinedRfq(
    $input: UpdateDeclinedRFQInput!
    $condition: ModelDeclinedRFQConditionInput
  ) {
    updateDeclinedRFQ(input: $input, condition: $condition) {
      id
      requestid
      info
      createdAt
      updatedAt
    }
  }
`;
export const deleteDeclinedRfq = /* GraphQL */ `
  mutation DeleteDeclinedRfq(
    $input: DeleteDeclinedRFQInput!
    $condition: ModelDeclinedRFQConditionInput
  ) {
    deleteDeclinedRFQ(input: $input, condition: $condition) {
      id
      requestid
      info
      createdAt
      updatedAt
    }
  }
`;
export const createAccepedOffers = /* GraphQL */ `
  mutation CreateAccepedOffers(
    $input: CreateAccepedOffersInput!
    $condition: ModelAccepedOffersConditionInput
  ) {
    createAccepedOffers(input: $input, condition: $condition) {
      id
      requestid
      offerId
      info
      status
      createdAt
      updatedAt
    }
  }
`;
export const updateAccepedOffers = /* GraphQL */ `
  mutation UpdateAccepedOffers(
    $input: UpdateAccepedOffersInput!
    $condition: ModelAccepedOffersConditionInput
  ) {
    updateAccepedOffers(input: $input, condition: $condition) {
      id
      requestid
      offerId
      info
      status
      createdAt
      updatedAt
    }
  }
`;
export const deleteAccepedOffers = /* GraphQL */ `
  mutation DeleteAccepedOffers(
    $input: DeleteAccepedOffersInput!
    $condition: ModelAccepedOffersConditionInput
  ) {
    deleteAccepedOffers(input: $input, condition: $condition) {
      id
      requestid
      offerId
      info
      status
      createdAt
      updatedAt
    }
  }
`;
