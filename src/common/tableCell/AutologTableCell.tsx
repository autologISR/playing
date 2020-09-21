import {EntityKeyPair} from "../entityKeyPair";
import React from "react";
import {HeadCell} from "../table/AutologTableTypes";
import {TableCell, Typography} from "@material-ui/core";
import {TableRowProps} from "../tableRow/AutologTableRow";

export const AutologTableCell = <T extends EntityKeyPair>(index: number, props: TableRowProps<T> & { children?: React.ReactNode }, key: HeadCell<T>) => {
    return (
        <TableCell
            align={index === 0 ? 'left' : 'right'}
            scope="row"
        >
            <Typography
                style={{
                    fontSize: 18,
                    marginLeft: index === 0 ? 20 : 0,
                    padding: 14
                }}
            >
                {props.row[key.id]}
            </Typography>
        </TableCell>
    );
}