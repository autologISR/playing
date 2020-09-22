import React from "react";
import { AutologDashboardSection } from "../../common/dashboardSection/AutologDashboardSection";
import { DomainSchema, EntityDetailsSchema } from "../../common/entityKeyPair";
import { AutologSystemMessageSchema } from "../../common/systemMessages/autologSystemMessageTypes";
import { IFormProps, IValues, Schema } from "../../common/form/formTypes";
import {
  StepFormSchema,
  StepsCallbackProps,
  StepForm,
} from "../../common/stepForm/stepFormTypes";

import { PendingOverviewSchema } from "./PendingProps";

//companyAccountOverviewSchema
const domainSchema: DomainSchema = new Map([
  [
    "Pending",
    {
      entityName: "Pending",
      entitySingularName: "Pending",
      entityOverview: PendingOverviewSchema,
      // entityDetails: companyAccountDetailsSchema,
      // newEntity: createCompanyAccountSchema,
    },
  ],
]);

export const PendingRFQDashboardSection = () => {
  return (
    <AutologDashboardSection
      entityNames={["Pending"]}
      domainSchema={domainSchema}
    />
  );
};
