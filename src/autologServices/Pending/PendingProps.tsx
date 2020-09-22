import { EntityKeyPair } from "../../common/entityKeyPair";
import { HeadCell } from "../../common/table/AutologTableTypes";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../../graphql/queries";
import { Predicates } from "@aws-amplify/datastore";
import { GraphQLResult } from "@aws-amplify/api";
import { IValues } from "../../common/form/formTypes";

export interface PendingProps extends EntityKeyPair {
  id: string;
  requestid: string;
  byUserMail: string;
  operatedBY: string;
  rateId: string;
  info: string;
}

export const PendingHeadCells: HeadCell<PendingProps>[] = [
  // {id: 'id', numeric: false, disablePadding: false, label: 'Account Id'},
  {
    id: "requestid",
    numeric: false,
    disablePadding: false,
    label: "requestid",
  },
  {
    id: "byUserMail",
    numeric: false,
    disablePadding: false,
    label: "byUserMail",
  },
  {
    id: "operatedBY",
    numeric: false,
    disablePadding: false,
    label: "operatedBY",
  },
  {
    id: "rateId",
    numeric: false,
    disablePadding: false,
    label: "rateId",
  },
  {
    id: "info",
    numeric: false,
    disablePadding: false,
    label: "info",
  },
];

const pendingOverviewQuery = API.graphql(
  graphqlOperation(queries.listPendingRequestss, Predicates.ALL)
);

export const PendingOverviewSchema = {
  entityOverviewQuery: "listPendingRequestss",
  tableSchema: PendingHeadCells,
  listEntity: pendingOverviewQuery as Promise<GraphQLResult<object>>,
  entityOverviewQueryProcessingFunc: (data: IValues[]) => {
    return data.map((entry, index) => {
      const { id, requestid, byUserMail, operatedBY, rateId, info } = entry;
      console.log("entry of Pending ->", index, entry);
      return {
        id,
        requestid,
        byUserMail,
        operatedBY,
        rateId,
        info,
      };
    });
  },
};
