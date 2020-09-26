import React from "react";
import AutologDashboard from "../../common/dashboard/AutologDashboard";
import { ApplyingUsersDashboardSection } from "../../autologServices/users/ApplyingUsersDashboardSection";
import { RatesDashboardSection } from "../../autologServices/rates/RatesDashboardSection";
import { QuotesRequestsDashboardSection } from "../../autologServices/quoteRequests/QuotesRequestsDashboardSection";
import { SystemUsersDashboardSection } from "../../autologServices/users/SystemUsersAndRegistrations/SystemUsersSection";
import { PendingRFQDashboardSection } from "../../autologServices/Pending/PendingDashBoardSection";
import { ShipmentsOnGoingDashboardSection } from "../../autologServices/shipments/onGoing/ShipmentsOnGoingDashboardSection";
import { DeclinedShipmentsDashboardSection } from "../../autologServices/shipments/Declined/DeclinedShipments";
// import { ShipmenAutologSection } from "../../autologServices/shipments/ShipmentsSection";

const tabValues = [
  "Rates",
  "Applying",
  "Quotes",
  "Users",
  "Pending",
  "Active shipments",
  "Declined shipments",
];
const tableComponents = [
  RatesDashboardSection,
  ApplyingUsersDashboardSection,
  QuotesRequestsDashboardSection,
  SystemUsersDashboardSection,
  PendingRFQDashboardSection,
  ShipmentsOnGoingDashboardSection,
  DeclinedShipmentsDashboardSection,
];

export const AutologTeamDashboard: React.FunctionComponent = () => {
  return (
    <AutologDashboard
      tabValues={tabValues}
      serviceComponents={tableComponents}
    />
  );
};
