import React from "react";
import AutologDashboard from "../../common/dashboard/AutologDashboard";
import { ApplyingUsersDashboardSection } from "../../autologServices/users/ApplyingUsersDashboardSection";
import { RatesDashboardSection } from "../../autologServices/rates/RatesDashboardSection";
import { QuotesRequestsDashboardSection } from "../../autologServices/quoteRequests/QuotesRequestsDashboardSection";
import { SystemUsersDashboardSection } from "../../autologServices/users/SystemUsersAndRegistrations/SystemUsersSection";
import { PendingRFQDashboardSection } from "../../autologServices/Pending/PendingDashBoardSection";

const tabValues = ["Rates", "Applying", "Quotes", "Users", "Pending"];
const tableComponents = [
  RatesDashboardSection,
  ApplyingUsersDashboardSection,
  QuotesRequestsDashboardSection,
  SystemUsersDashboardSection,
  PendingRFQDashboardSection,
];

export const AutologTeamDashboard: React.FunctionComponent = () => {
  return (
    <AutologDashboard
      tabValues={tabValues}
      serviceComponents={tableComponents}
    />
  );
};
