import React from "react";
import { AutologDashboardSection } from "../../../common/dashboardSection/AutologDashboardSection";
import { DomainSchema } from "../../../common/entityKeyPair";
import { SystemUsersOverviewSchema } from "./SystemUserProps";
import { createUserSchema } from "./Newuser";

const domainSchema: DomainSchema = new Map([
  [
    "Users",
    {
      entityName: "Users",
      entitySingularName: "User",
      entityOverview: SystemUsersOverviewSchema,
      // entityDetails: companyAccountDetailsSchema,
      newEntity: createUserSchema,
    },
  ],
]);

export const SystemUsersDashboardSection = () => {
  return (
    <AutologDashboardSection
      entityNames={["Users"]}
      domainSchema={domainSchema}
    />
  );
};
