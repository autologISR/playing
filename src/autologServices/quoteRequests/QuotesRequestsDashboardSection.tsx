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
import { quoteRequsetsOverviewSchema } from "./NewQuoteRequestHelpers/QuotesRequestsProps";
import { QuoteRequestSubmissions } from "./NewQuoteRequestHelpers/QuoteRequestCommands";
import { newQuoteRequestSchema } from "./NewQuoteRequest";

const domainSchema: DomainSchema = new Map([
  [
    "Quote requests",
    {
      entityName: "Quote requests",
      entitySingularName: "Quote request",
      entityOverview: quoteRequsetsOverviewSchema,
      // entityDetails: quoteRequsetsDetailsSchema,
      newEntity: newQuoteRequestSchema,
    },
  ],
]);

export const QuotesRequestsDashboardSection = () => {
  return (
    <AutologDashboardSection
      entityNames={["Quote requests"]}
      domainSchema={domainSchema}
    />
  );
};
