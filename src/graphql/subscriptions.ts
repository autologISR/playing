/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateAccountApplicationSubmissions = /* GraphQL */ `
  subscription OnCreateAccountApplicationSubmissions {
    onCreateAccountApplicationSubmissions {
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
export const onUpdateAccountApplicationSubmissions = /* GraphQL */ `
  subscription OnUpdateAccountApplicationSubmissions {
    onUpdateAccountApplicationSubmissions {
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
export const onDeleteAccountApplicationSubmissions = /* GraphQL */ `
  subscription OnDeleteAccountApplicationSubmissions {
    onDeleteAccountApplicationSubmissions {
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
export const onCreateRateSubmission = /* GraphQL */ `
  subscription OnCreateRateSubmission {
    onCreateRateSubmission {
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
export const onUpdateRateSubmission = /* GraphQL */ `
  subscription OnUpdateRateSubmission {
    onUpdateRateSubmission {
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
export const onDeleteRateSubmission = /* GraphQL */ `
  subscription OnDeleteRateSubmission {
    onDeleteRateSubmission {
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
export const onCreateClients = /* GraphQL */ `
  subscription OnCreateClients {
    onCreateClients {
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
export const onUpdateClients = /* GraphQL */ `
  subscription OnUpdateClients {
    onUpdateClients {
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
export const onDeleteClients = /* GraphQL */ `
  subscription OnDeleteClients {
    onDeleteClients {
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
export const onCreateFfClients = /* GraphQL */ `
  subscription OnCreateFfClients {
    onCreateFFClients {
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
export const onUpdateFfClients = /* GraphQL */ `
  subscription OnUpdateFfClients {
    onUpdateFFClients {
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
export const onDeleteFfClients = /* GraphQL */ `
  subscription OnDeleteFfClients {
    onDeleteFFClients {
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
export const onCreateCompanyUsersInSystem = /* GraphQL */ `
  subscription OnCreateCompanyUsersInSystem {
    onCreateCompanyUsersInSystem {
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
export const onUpdateCompanyUsersInSystem = /* GraphQL */ `
  subscription OnUpdateCompanyUsersInSystem {
    onUpdateCompanyUsersInSystem {
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
export const onDeleteCompanyUsersInSystem = /* GraphQL */ `
  subscription OnDeleteCompanyUsersInSystem {
    onDeleteCompanyUsersInSystem {
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
export const onCreateAllRequests = /* GraphQL */ `
  subscription OnCreateAllRequests {
    onCreateAllRequests {
      id
      requestID
      fromRegion
      fromState
      fromPort
      terms
      airOcean
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
export const onUpdateAllRequests = /* GraphQL */ `
  subscription OnUpdateAllRequests {
    onUpdateAllRequests {
      id
      requestID
      fromRegion
      fromState
      fromPort
      terms
      airOcean
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
export const onDeleteAllRequests = /* GraphQL */ `
  subscription OnDeleteAllRequests {
    onDeleteAllRequests {
      id
      requestID
      fromRegion
      fromState
      fromPort
      terms
      airOcean
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
export const onCreatePendingRequests = /* GraphQL */ `
  subscription OnCreatePendingRequests {
    onCreatePendingRequests {
      id
      requestid
      byUserMail
      operatedBY
      rateId
      info
      createdAt
      updatedAt
    }
  }
`;
export const onUpdatePendingRequests = /* GraphQL */ `
  subscription OnUpdatePendingRequests {
    onUpdatePendingRequests {
      id
      requestid
      byUserMail
      operatedBY
      rateId
      info
      createdAt
      updatedAt
    }
  }
`;
export const onDeletePendingRequests = /* GraphQL */ `
  subscription OnDeletePendingRequests {
    onDeletePendingRequests {
      id
      requestid
      byUserMail
      operatedBY
      rateId
      info
      createdAt
      updatedAt
    }
  }
`;
export const onCreateImportRatesSimplified = /* GraphQL */ `
  subscription OnCreateImportRatesSimplified {
    onCreateIMPORTRatesSimplified {
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
export const onUpdateImportRatesSimplified = /* GraphQL */ `
  subscription OnUpdateImportRatesSimplified {
    onUpdateIMPORTRatesSimplified {
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
export const onDeleteImportRatesSimplified = /* GraphQL */ `
  subscription OnDeleteImportRatesSimplified {
    onDeleteIMPORTRatesSimplified {
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
