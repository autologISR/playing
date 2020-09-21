/* Implementing the ObjectKeyPair interface used in AutologTables*/
import {HeadCell} from "../../common/table/AutologTableTypes";
import {EntityKeyPair} from "../../common/entityKeyPair";
import {API, graphqlOperation} from "aws-amplify";
import * as queries from "../../graphql/queries";
import {Predicates} from "@aws-amplify/datastore";
import {GraphQLResult} from "@aws-amplify/api";
import {IValues} from "../../common/form/formTypes";

export interface CompanyAccountProps extends EntityKeyPair {
    id: string;
    companyName: string;
    companyType: string;
    userRole: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    emailAddress: string;
    additionalInfo: string;
}

export const companyAccountHeadCells: HeadCell<CompanyAccountProps>[] = [
    // {id: 'id', numeric: false, disablePadding: false, label: 'Account Id'},
    {id: "companyName", numeric: false, disablePadding: false, label: 'Company Name'},
    {id: 'companyType', numeric: false, disablePadding: false, label: 'Company Type'},
    {id: 'userRole', numeric: false, disablePadding: false, label: 'Role'},
    {id: "firstName", numeric: false, disablePadding: false, label: 'First Name'},
    {id: "lastName", numeric: false, disablePadding: false, label: 'Last Name'},
    {id: 'phoneNumber', numeric: false, disablePadding: false, label: 'Phone Number'},
    {id: 'emailAddress', numeric: false, disablePadding: false, label: 'Email'},
    {id: 'additionalInfo', numeric: false, disablePadding: false, label: 'Additional Info'},
];

const companyAccountsListOverviewQuery = API.graphql(graphqlOperation(queries.listAccountApplicationSubmissionss, Predicates.ALL));


export const companyAccountOverviewSchema = {
    entityOverviewQuery: "listAccountApplicationSubmissionss",
    tableSchema: companyAccountHeadCells,
    listEntity: companyAccountsListOverviewQuery as Promise<GraphQLResult<object>>,
    entityOverviewQueryProcessingFunc: (data: IValues[]) => {
        return data.map(
            (entry, index) => {
                const {
                    companyName,
                    companyType,
                    userRole,
                    firstName,
                    lastName,
                    phoneNumber,
                    emailAddress,
                    additionalInfo,
                    importerExporterInfo,
                    freightForwarderInfo
                } = entry;
                console.log(index, entry);
                return {
                    companyName,
                    companyType,
                    userRole,
                    firstName,
                    lastName,
                    phoneNumber,
                    emailAddress,
                    additionalInfo,
                    ImporterExporter: importerExporterInfo,
                    FreightForwarder: freightForwarderInfo
                };
            }
        )
    }
};