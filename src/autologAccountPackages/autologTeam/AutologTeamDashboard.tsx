import React from "react";
import AutologDashboard from "../../common/dashboard/AutologDashboard";
import { ApplyingUsersDashboardSection } from "../../autologServices/users/ApplyingUsersDashboardSection";
import { RatesDashboardSection } from "../../autologServices/rates/RatesDashboardSection";
import { QuotesRequestsDashboardSection } from "../../autologServices/quoteRequests/QuotesRequestsDashboardSection";
import { SystemUsersDashboardSection } from "../../autologServices/users//SystemUsersAndRegistrations/SystemUsersSection";

const tabValues = ["Rates", "Applying", "Quotes", "Users"];
const tableComponents = [
  RatesDashboardSection,
  ApplyingUsersDashboardSection,
  QuotesRequestsDashboardSection,
  SystemUsersDashboardSection,
];

export const AutologTeamDashboard: React.FunctionComponent = () => {
  return (
    <AutologDashboard
      tabValues={tabValues}
      serviceComponents={tableComponents}
    />
  );
};
