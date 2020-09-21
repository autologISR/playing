import React from "react";
import AutologDashboard from "../../common/dashboard/AutologDashboard";
import {UsersDashboardSection} from "../../autologServices/users/UsersDashboardSection";
import {RatesDashboardSection} from "../../autologServices/rates/RatesDashboardSection";

const tabValues = ['Rates', 'Users'];
const tableComponents = [RatesDashboardSection, UsersDashboardSection];

export const AutologTeamDashboard: React.FunctionComponent = () => {
    return (<AutologDashboard tabValues={tabValues} serviceComponents={tableComponents}/>);
};
