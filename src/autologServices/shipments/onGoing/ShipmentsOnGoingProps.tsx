//
import { HeadCell } from "../../../common/table/AutologTableTypes";
import { EntityKeyPair } from "../../../common/entityKeyPair";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../../../graphql/queries";
import { IValues } from "../../../common/form/formTypes";

export interface ActiveShippmentsType extends EntityKeyPair {
  madeByUserMail: string;
  createdAt: string;
  operatedByFF: string;
  offerID: string;
  status: string;
  info: string;
}

export const activeShippmentsHeadCells: HeadCell<ActiveShippmentsType>[] = [
  {
    id: "madeByUserMail",
    numeric: false,
    disablePadding: false,
    label: "madeByUserMail ",
  },
  {
    id: "createdAt",
    numeric: false,
    disablePadding: false,
    label: "createdAt",
  },
  {
    id: "operatedByFF",
    numeric: false,
    disablePadding: false,
    label: "operatedByFF",
  },
  {
    id: "offerID",
    numeric: false,
    disablePadding: false,
    label: "madeByUserMail ",
  },
  { id: "status", numeric: false, disablePadding: false, label: "createdAt" },
  { id: "info", numeric: false, disablePadding: false, label: "operatedByFF" },
];

const activeShippmentsOverview = API.graphql(
  graphqlOperation(queries.listShipmentsOnGoings)
);

export const ActiveShipmentsOverviewSchema = {
  entityOverviewQuery: "listShipmentsOnGoings",
  tableSchema: activeShippmentsHeadCells,
  listEntity: activeShippmentsOverview,

  // listEntity: undefined,

  entityOverviewQueryProcessingFunc: (data: IValues[]) => {
    return data.map((entry, index) => {
      const {
        madeByUserMail,
        createdAt,
        operatedByFF,
        offerID,
        status,
        info,
      } = entry;
      console.log("entry  -> ", index, entry);
      return {
        madeByUserMail,
        createdAt,
        operatedByFF,
        offerID,
        status,
        info,
      };
    });
  },
};
