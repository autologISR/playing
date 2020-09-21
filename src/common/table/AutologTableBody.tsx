import {EntityDetailsSchema, EntityKeyPair} from "../entityKeyPair";
import {HeadCell, Order} from "./AutologTableTypes";
import React from "react";
import {getSorting, stableSort} from "./tableSorting";
import {AutologTableRow} from "../tableRow/AutologTableRow";

export interface AutologTableBodyProps<T extends EntityKeyPair> {
     entityName: string;
    rows: T[];
    order: Order;
    orderBy: keyof T;
    entityTableSchema: HeadCell<T>[];
    handleClickRow: (event: React.MouseEvent<unknown>, handleClickOpen: () => void) => void;
    entityDetails?: EntityDetailsSchema<T>;
    entitySingularName: string;
    fieldsToDisplay: Set<string>;
}

export const AutologTableBody = <T extends EntityKeyPair>(props: AutologTableBodyProps<T>) => {
    const {entityName, rows, order, orderBy, entityTableSchema, handleClickRow, entityDetails, entitySingularName, fieldsToDisplay} = props;

    /* Sorting according to ordering field of T and rendering rows of the table */
    return (
        <>
            {
                stableSort(rows, getSorting(order, orderBy))
                    /* Rendering a checkbox, objectId and remaining cell values of the interface in a given row*/
                    .map(
                        (row: T, index: number) => {
                            return (
                                <AutologTableRow
                                    entityName={entityName}
                                    entityId={row.id}
                                    tableSchema={entityTableSchema.filter(field => fieldsToDisplay.has(field.label))}
                                    row={row}
                                    key={'option_' + index}
                                    index={index}
                                    handleClick={handleClickRow}
                                    entityDetails={entityDetails}
                                    entitySingularName={entitySingularName}
                                />
                            );
                        }
                    )
            }
        </>
    );
}