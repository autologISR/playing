/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getAccountApplicationSubmissions = /* GraphQL */ `
  query GetAccountApplicationSubmissions($id: ID!) {
    getAccountApplicationSubmissions(id: $id) {
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
export const listAccountApplicationSubmissionss = /* GraphQL */ `
  query ListAccountApplicationSubmissionss(
    $filter: ModelAccountApplicationSubmissionsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAccountApplicationSubmissionss(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getRateSubmission = /* GraphQL */ `
  query GetRateSubmission($id: ID!) {
    getRateSubmission(id: $id) {
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
export const listRateSubmissions = /* GraphQL */ `
  query ListRateSubmissions(
    $filter: ModelRateSubmissionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRateSubmissions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getClients = /* GraphQL */ `
  query GetClients($id: ID!) {
    getClients(id: $id) {
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
export const listClientss = /* GraphQL */ `
  query ListClientss(
    $filter: ModelClientsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listClientss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getFfClients = /* GraphQL */ `
  query GetFfClients($id: ID!) {
    getFFClients(id: $id) {
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
export const listFfClientss = /* GraphQL */ `
  query ListFfClientss(
    $filter: ModelFFClientsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFFClientss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getCompanyUsersInSystem = /* GraphQL */ `
  query GetCompanyUsersInSystem($id: ID!) {
    getCompanyUsersInSystem(id: $id) {
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
export const listCompanyUsersInSystems = /* GraphQL */ `
  query ListCompanyUsersInSystems(
    $filter: ModelCompanyUsersInSystemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCompanyUsersInSystems(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        companyType
        mainUserName
        mainUserMail
        info
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getAllRequests = /* GraphQL */ `
  query GetAllRequests($id: ID!) {
    getAllRequests(id: $id) {
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
export const listAllRequestss = /* GraphQL */ `
  query ListAllRequestss(
    $filter: ModelAllRequestsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAllRequestss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getPendingRequests = /* GraphQL */ `
  query GetPendingRequests($id: ID!) {
    getPendingRequests(id: $id) {
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
export const listPendingRequestss = /* GraphQL */ `
  query ListPendingRequestss(
    $filter: ModelPendingRequestsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPendingRequestss(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        requestid
        byUserMail
        operatedByFF
        rateId
        info
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getImportRatesSimplified = /* GraphQL */ `
  query GetImportRatesSimplified($id: ID!) {
    getIMPORTRatesSimplified(id: $id) {
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
export const listImportRatesSimplifieds = /* GraphQL */ `
  query ListImportRatesSimplifieds(
    $filter: ModelIMPORTRatesSimplifiedFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listIMPORTRatesSimplifieds(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getShipmentsOnGoing = /* GraphQL */ `
  query GetShipmentsOnGoing($id: ID!) {
    getShipmentsOnGoing(id: $id) {
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
export const listShipmentsOnGoings = /* GraphQL */ `
  query ListShipmentsOnGoings(
    $filter: ModelShipmentsOnGoingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listShipmentsOnGoings(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        madeByUserMail
        createdAt
        operatedByFF
        offerID
        status
        info
        updatedAt
      }
      nextToken
    }
  }
`;
export const getShipmentsDone = /* GraphQL */ `
  query GetShipmentsDone($id: ID!) {
    getShipmentsDone(id: $id) {
      id
      info
      status
      createdAt
      updatedAt
    }
  }
`;
export const listShipmentsDones = /* GraphQL */ `
  query ListShipmentsDones(
    $filter: ModelShipmentsDoneFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listShipmentsDones(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        info
        status
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getDeclinedRfq = /* GraphQL */ `
  query GetDeclinedRfq($id: ID!) {
    getDeclinedRFQ(id: $id) {
      id
      requestid
      info
      createdAt
      updatedAt
    }
  }
`;
export const listDeclinedRfQs = /* GraphQL */ `
  query ListDeclinedRfQs(
    $filter: ModelDeclinedRFQFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDeclinedRFQs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        requestid
        info
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getAccepedOffers = /* GraphQL */ `
  query GetAccepedOffers($id: ID!) {
    getAccepedOffers(id: $id) {
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
export const listAccepedOfferss = /* GraphQL */ `
  query ListAccepedOfferss(
    $filter: ModelAccepedOffersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAccepedOfferss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        requestid
        offerId
        info
        status
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const byRequestId = /* GraphQL */ `
  query ByRequestId(
    $requestid: ID
    $sortDirection: ModelSortDirection
    $filter: ModelPendingRequestsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    byRequestID(
      requestid: $requestid
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        requestid
        byUserMail
        operatedByFF
        rateId
        info
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const simplifiedByPortFob = /* GraphQL */ `
  query SimplifiedByPortFob(
    $rateHash: String
    $portFrom: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelIMPORTRatesSimplifiedFilterInput
    $limit: Int
    $nextToken: String
  ) {
    SimplifiedByPortFOB(
      rateHash: $rateHash
      portFrom: $portFrom
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const simplifiedByStateExw = /* GraphQL */ `
  query SimplifiedByStateExw(
    $rateHash: String
    $state: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelIMPORTRatesSimplifiedFilterInput
    $limit: Int
    $nextToken: String
  ) {
    SimplifiedByStateEXW(
      rateHash: $rateHash
      state: $state
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const byUserMail = /* GraphQL */ `
  query ByUserMail(
    $madeByUserMail: String
    $sortDirection: ModelSortDirection
    $filter: ModelShipmentsOnGoingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    byUserMail(
      madeByUserMail: $madeByUserMail
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        madeByUserMail
        createdAt
        operatedByFF
        offerID
        status
        info
        updatedAt
      }
      nextToken
    }
  }
`;
