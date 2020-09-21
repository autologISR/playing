import React, {Dispatch} from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {EntityDetailsSchema, EntityKeyPair} from "../entityKeyPair";
import {CommandType, IValues} from "../form/formTypes";

export type Order = 'asc' | 'desc';

export interface HeadCell<T extends EntityKeyPair> {
    id: keyof T;
    disablePadding: boolean;
    label: string;
    numeric: boolean;
}

export interface EnhancedTableProps<T extends EntityKeyPair> {
    classes: ReturnType<typeof useStyles>;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof T) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
    entityTableSchema: HeadCell<T>[];
    fieldsToDisplay: Set<string>
}

/*TODO differentiate between multiple tables and single table types in a more intentional way.*/
export interface AutologTableToolbarProps<T extends EntityKeyPair> {
    tableNames: string[];
    setEntitySelected: Dispatch<any>;
    tableSelected?: string;
    handleClickOpen: () => void;
    entitySingularName?: string;
    setFieldsToDisplay: React.Dispatch<Set<string>>
    fieldsToDisplay: Set<string>
}

export interface AutologTableProps<T extends EntityKeyPair> {
    ariaBusy: boolean
    entityName: string;
    entityListQuery: string;
    tableSchema: HeadCell<T>[];
    listEntity: CommandType;
    fieldsToDisplay: Set<string>;
    setFinishedLoadEntityOverviewData: React.Dispatch<boolean>;
    entityDetails?: EntityDetailsSchema<any>;
    entityOverviewQueryProcessingFunc?: (data: IValues[]) => IValues[];
    entitySingularName: string;
}

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            // height: '100vh',
        },
        paper: {
            width: '100%',
            marginBottom: theme.spacing(2),
        },
        table: {
        },
        visuallyHidden: {
            border: 0,
            clip: 'rect(0 0 0 0)',
            height: 1,
            margin: 1,
            overflow: 'visible',
            padding: 0,
            position: 'absolute',
            top: 20,
            width: 1,
        },
        headerCell:{
            fontSize: 18,

        },
        header: {
            elevation: 2,
            backgroundColor: '#EEEEEE',
        }
    }),
);

