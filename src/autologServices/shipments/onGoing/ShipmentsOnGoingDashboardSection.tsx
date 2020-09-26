import React from "react";
import { AutologDashboardSection } from "../../../common/dashboardSection/AutologDashboardSection";
import {
  DomainSchema,
  EntityDetailsSchema,
} from "../../../common/entityKeyPair";
import { ActiveShipmentsOverviewSchema } from "./ShipmentsOnGoingProps";

const domainSchema: DomainSchema = new Map([
  [
    "Shipments onGoing",
    {
      entityName: "Shipments onGoing",
      entitySingularName: "Shipments onGoing",
      entityOverview: ActiveShipmentsOverviewSchema,
      // entityDetails: quoteRequsetsDetailsSchema,
      // newEntity: newQuoteRequestSchema,
    },
  ],
]);

export const ShipmentsOnGoingDashboardSection = () => {
  return (
    <AutologDashboardSection
      entityNames={["Shipments onGoing"]}
      domainSchema={domainSchema}
    />
  );
};
