import {EntityDetailsSchema, EntityKeyPair} from "../entityKeyPair";
import {HeadCell} from "../table/AutologTableTypes";
import React from "react";

export interface AutologTableRowProps<T extends EntityKeyPair> {
    entityName: string;
    entityId: string;
    tableSchema: HeadCell<T>[];
    row: T;
    index: number;
    handleClick: (event: React.MouseEvent<unknown>, handleClickOpen: () => void) => void;
    entityDetails?: EntityDetailsSchema<T>;
    entitySingularName: string
}