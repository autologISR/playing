/*Autolog Object type, use to build generic reusable components*/

import {HeadCell} from "./table/AutologTableTypes";
import {CommandType, IFormProps, IValues} from "./form/formTypes";
import {StepFormSchema, StepsCallback} from "./stepForm/stepFormTypes";
import moment from "moment";

export type entityType = { id: string };

export interface EntityKeyPair extends entityType {
    [key: string]: string | number;
}

export interface EntityOverview<T extends EntityKeyPair> {
    entityOverviewQuery: string;
    tableSchema: HeadCell<T>[];
    listEntity: CommandType;
    entityOverviewQueryProcessingFunc?: (data: IValues[]) => IValues[]
}


/* Entity Types*/

export interface EntityDetailsSchema<T extends EntityKeyPair> {
    stepsCallback: StepsCallback;
    stepFormMap: Map<string, IFormProps>;
    sourceStep: string;
    sourceForm: IFormProps;
    splitOverViewAndDetails: (entity: T) => { sourceFields: { [key: string]: any }, detailsFields: { [key: string]: any } }
}


export interface EntityAction {
    actionTitle: string;
    command: CommandType,
}

export interface Entity<T extends EntityKeyPair> {
    entityName: string;
    entitySingularName: string;
    entityOverview: EntityOverview<T>;
    newEntity?: StepFormSchema;
    entityDetails?: EntityDetailsSchema<T>
    entityActions?: Map<string, EntityAction>;
}


/* Domain Types*/
export type DomainSchema = Map<string, Entity<any>>;

export interface Domain {
    entityNames: string[];
    domainSchema: DomainSchema;
}

export const dynamoDbDateForTable = (dateStr: string, calendarDate?: boolean) => {

    const inputDateIsToday = moment(dateStr).date() === moment(Date.now()).date();
    return inputDateIsToday ?
        calendarDate ?
            moment(dateStr).format('YYYY-MM-DD').toString() :
            `Today at ${moment(dateStr).hour()}:${moment(dateStr).minute()}` :
        moment(dateStr).format('YYYY-MM-DD').toString()
}