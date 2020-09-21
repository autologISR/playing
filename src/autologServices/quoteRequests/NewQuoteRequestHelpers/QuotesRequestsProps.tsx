/* Implementing the ObjectKeyPair interface used in AutologTables*/
import { HeadCell } from "../../../common/table/AutologTableTypes";
import { EntityKeyPair } from "../../../common/entityKeyPair";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../../../graphql/queries";
import { Predicates } from "@aws-amplify/datastore";
import { GraphQLResult } from "@aws-amplify/api";
import {
  DomainSchema,
  EntityDetailsSchema,
} from "../../../common/entityKeyPair";
import { IFormProps, IValues, Schema } from "../../../common/form/formTypes";
import { AutologSystemMessageSchema } from "../../../common/systemMessages/autologSystemMessageTypes";

export const quoteRequestCreationMessages: AutologSystemMessageSchema = new Map(
  [
    ["success", { message: "Quote request was created." }],
    [
      "error",
      {
        message:
          "There was an error during quote requesting creation, please check errors.",
      },
    ],
  ]
);

export interface QuotesRequestsProps extends EntityKeyPair {
  fromRegion: any;
  terms: string;
  status: string;
}

export const quotesRequestHeadCells: HeadCell<QuotesRequestsProps>[] = [
  { id: "fromRegion", numeric: false, disablePadding: false, label: "From " },
  { id: "terms", numeric: false, disablePadding: false, label: "Terms" },
  { id: "status", numeric: false, disablePadding: false, label: "Status" },
];

/* TODO Change to lazy evaluation. 
MORE - 
NEED TO specify which user and the status of request*/
const requestsOverview = API.graphql(
  graphqlOperation(queries.listAllRequestss)
);
console.log("this is requestsOverview -> ", requestsOverview);

export const quoteRequsetsOverviewSchema = {
  entityOverviewQuery: "listAllRequestss",
  tableSchema: quotesRequestHeadCells,
  listEntity: requestsOverview,

  // listEntity: undefined,

  entityOverviewQueryProcessingFunc: (data: IValues[]) => {
    return data.map((entry, index) => {
      const { fromRegion, terms, status } = entry;
      console.log("entry  -> ", index, entry);
      return {
        fromRegion,
        terms,
        status,
      };
    });
  },
};
