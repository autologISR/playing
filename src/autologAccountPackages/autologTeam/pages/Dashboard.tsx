import * as React from "react";
import {FunctionComponent} from "react";
import {AutologTeamDashboard} from "../AutologTeamDashboard";

interface user {
    userType: string;
    cognitoUser: any;
  }
  
export const Dashboard: FunctionComponent<user> = ({
    // userType,
    cognitoUser,
    userType,
  }) => {

    return <AutologTeamDashboard/>;
};
