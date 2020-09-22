import { HeadCell } from "../../../common/table/AutologTableTypes";
import { GraphQLResult } from "@aws-amplify/api";
import { IValues } from "../../../common/form/formTypes";
import { API, graphqlOperation, Predicates } from "aws-amplify";
import * as queries from "./../../../graphql/queries";
import { EntityKeyPair } from "../../../common/entityKeyPair";

enum CompanyUsersTypes {
  ImportExport,
  FreightForwarder,
}
export interface Systemusers extends EntityKeyPair {
  id: string;
  companyType: CompanyUsersTypes;
  mainUserName: string;
  mainUserMail: string;
  info: string;
}

export const UsersHeadCells: HeadCell<Systemusers>[] = [
  {
    id: "companyType",
    numeric: false,
    disablePadding: false,
    label: "company Type",
  },
  {
    id: "mainUserName",
    numeric: false,
    disablePadding: false,
    label: "User name",
  },
  {
    id: "mainUserMail",
    numeric: false,
    disablePadding: false,
    label: "User mail",
  },
  // {id: "info", numeric: false, disablePadding: false, label: 'company Type'},
];

const usersOverviewQuery = API.graphql(
  graphqlOperation(queries.listCompanyUsersInSystems, Predicates.ALL)
);

export const SystemUsersOverviewSchema = {
  entityOverviewQuery: "listCompanyUsersInSystems",
  tableSchema: UsersHeadCells,
  listEntity: usersOverviewQuery as Promise<
    GraphQLResult<object>
  >,
  entityOverviewQueryProcessingFunc: (data: IValues[]) => {
    return data.map((entry, index) => {
      const { id, companyType, mainUserName, mainUserMail, info } = entry;
      // console.log(index, entry);
      return {
        id,
        companyType,
        mainUserName,
        mainUserMail,
        info,
      };
    });
  },
};
