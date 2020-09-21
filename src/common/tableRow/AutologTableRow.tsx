import React, {ReactNode} from "react";
import {TableCell, TableRow, Typography} from "@material-ui/core";
import {HeadCell} from "../table/AutologTableTypes";
import {EntityKeyPair} from "../entityKeyPair";
import {useTableRow} from "./useTableRow";
import {AutologTableRowDetails} from "./AutologTableRowDetails";
import {AutologTableRowProps} from "./autologRowTypes";
import {AutologTableCell} from "../tableCell/AutologTableCell";

export interface TableRowProps<T extends EntityKeyPair> {
    tableSchema: HeadCell<T>[],
    row: T
}

export function AutologTableRow<T extends EntityKeyPair>(props: AutologTableRowProps<T>) {
    const {entityName, entityId, tableSchema, row, index, handleClick, entityDetails, entitySingularName} = props;
    const {entityDialogueOpened, handleClickOpen, handleClose} = useTableRow();
    return (
        <>
            {
                entityDialogueOpened &&
                entityDetails !== undefined &&
                <AutologTableRowDetails
                    id={row.id}
                    entityName={entityName}
                    entityDialogueOpened={entityDialogueOpened}
                    handleClose={handleClose}
                    entityDetails={entityDetails}
                    row={row}
                    entitySingularName={entitySingularName}
                />
            }
            <TableRow
                hover
                onClick={(event => handleClick(event, handleClickOpen))}
                role="checkbox"
                tabIndex={-1}
                key={"row_" + row.id}
            >
                {
                    props.tableSchema.slice(1).map(
                        (key: HeadCell<T>, index) => {
                            return AutologTableCell(index, props, key);
                        }
                    )
                }
            </TableRow>
        </>
    );
}