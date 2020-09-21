import {EnhancedTableProps} from "./AutologTableTypes";
import React from "react";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import {EntityKeyPair} from "../entityKeyPair";
import {Typography} from "@material-ui/core";

export function AutologTableHeader<T extends EntityKeyPair>(props: EnhancedTableProps<T>) {
    const {classes, order, orderBy, onRequestSort, entityTableSchema, fieldsToDisplay} = props;

    const createSortHandler = (property: keyof T) =>
        (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };


    return (
        <TableHead className={classes.header}>
            <TableRow>
                {
                    entityTableSchema.slice(1).filter(
                        header => fieldsToDisplay.has(header.label)
                    ).map(
                        (tableField, index) => (
                            <TableCell
                                key={tableField.id.toString()}
                                align={index === 0 ? 'left' : 'right'}
                                sortDirection={orderBy === tableField.id ? order : false}
                                variant='head'
                            >
                                <TableSortLabel
                                    active={orderBy === tableField.id}
                                    direction={orderBy === tableField.id ? order : 'asc'}
                                    onClick={createSortHandler(tableField.id)}
                                    className={classes.headerCell}
                                >

                                    <Typography noWrap={index !== 0} style={{paddingLeft: index === 0 ? 20 : 0}}>
                                        {tableField.label}
                                    </Typography>

                                    {
                                        orderBy === tableField.id ?
                                            <span className={classes.visuallyHidden}>
                                                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                            </span> :
                                            null
                                    }
                                </TableSortLabel>
                            </TableCell>
                        ))}
            </TableRow>
        </TableHead>
    );
}