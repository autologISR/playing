import { HeadCell } from "../../../common/table/AutologTableTypes";
import { EntityKeyPair } from "../../../common/entityKeyPair";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../../../graphql/queries";
import { IValues } from "../../../common/form/formTypes";

export interface DeclinedRFQType extends EntityKeyPair {
  requestid: string;
  info: string;
}

export const declinedRFQHeadCells: HeadCell<DeclinedRFQType>[] = [
  {
    id: "requestid",
    numeric: false,
    disablePadding: false,
    label: "requestid ",
  },
  {
    id: "info",
    numeric: false,
    disablePadding: false,
    label: "info ",
  },
];

const declinedShippmentsOverview = API.graphql(
  graphqlOperation(queries.listDeclinedRfQs)
);

export const DeclinedShipmentsOverviewSchema = {
  entityOverviewQuery: "listDeclinedRfQs",
  tableSchema: declinedRFQHeadCells,
  listEntity: declinedShippmentsOverview,

  // listEntity: undefined,

  entityOverviewQueryProcessingFunc: (data: IValues[]) => {
    return data.map((entry, index) => {
      const { requestid, info } = entry;
      console.log("entry  -> ", index, entry);
      return {
        requestid,
        info,
      };
    });
  },
};
