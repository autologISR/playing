import React from "react";
import { AutologDashboardSection } from "../../../common/dashboardSection/AutologDashboardSection";
import {
  DomainSchema,
  EntityDetailsSchema,
} from "../../../common/entityKeyPair";
import { DeclinedShipmentsOverviewSchema } from "./DeclinedShipmentsProps";

const domainSchema: DomainSchema = new Map([
  [
    "Declined shippments",
    {
      entityName: "Declined shippments",
      entitySingularName: "Declined shippment",
      entityOverview: DeclinedShipmentsOverviewSchema,
      // entityDetails: quoteRequsetsDetailsSchema,
      // newEntity: newQuoteRequestSchema,
    },
  ],
]);

export const DeclinedShipmentsDashboardSection = () => {
  return (
    <AutologDashboardSection
      entityNames={["Declined shippments"]}
      domainSchema={domainSchema}
    />
  );
};
