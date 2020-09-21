import * as React from "react";
import { FunctionComponent } from "react";
import { AutologTeamDashboard } from "../AutologTeamDashboard";

interface user {
  userType: string;
  cognitoUser: any;
}

export const Dashboard: FunctionComponent<user> = ({
  // userType,
  cognitoUser,
  userType,
}) => {
  console.log("userType -> ", userType);
  if (userType) {
    switch (userType) {
      case "Team":
        return <AutologTeamDashboard />;
      case "Client":
        return <AutologTeamDashboard />;
    }
  }
  return <div>Loading...</div>;
};
