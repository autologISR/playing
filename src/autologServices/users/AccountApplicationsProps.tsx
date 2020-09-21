/* Implementing the ObjectKeyPair interface used in AutologTables*/
import {HeadCell} from "../../common/table/AutologTableTypes";
import {EntityKeyPair} from "../../common/entityKeyPair";

export interface AccountApplicationsProps extends EntityKeyPair {
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

/* Implementing HeadCell[] interface used to describe the schema of the table */
export const accountApplicationsHeadCells: HeadCell<AccountApplicationsProps>[] = [
    {id: 'id', numeric: false, disablePadding: false, label: 'Account Id'},
    {id: "companyName", numeric: false, disablePadding: false, label: 'Company Name'},
    {id: 'companyType', numeric: false, disablePadding: false, label: 'Company Type'},
    {id: 'userRole', numeric: false, disablePadding: false, label: 'Role'},
    {id: "firstName", numeric: false, disablePadding: false, label: 'First Name'},
    {id: "lastName", numeric: false, disablePadding: false, label: 'Last Name'},
    {id: 'phoneNumber', numeric: false, disablePadding: false, label: 'Phone Number'},
    {id: 'emailAddress', numeric: false, disablePadding: false, label: 'Email'},
    {id: 'additionalInfo', numeric: false, disablePadding: false, label: 'Additional Info'},
];
