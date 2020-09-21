import React from 'react';
import {AutologTableProps} from "./AutologTableTypes";
import {EntityKeyPair} from "../entityKeyPair";
import {useTable} from "./useTable";
import {AutologTableHeader} from "./TableHead";
import {Table, TableBody} from "@material-ui/core";
import {AutologTableBody} from "./AutologTableBody";


export function AutologTable<T extends EntityKeyPair>(props: AutologTableProps<T>) {

    const {
        ariaBusy,
        listEntity,
        entityName,
        entityListQuery,
        tableSchema,
        entityOverviewQueryProcessingFunc,
        entityDetails,
        entitySingularName,
        fieldsToDisplay,
        setFinishedLoadEntityOverviewData
    } = props;

    const {
        rows,
        classes,
        order,
        orderBy,
        handleRequestSort,
        handleClickRow
    } = useTable<T>(
        listEntity,
        entityListQuery,
        setFinishedLoadEntityOverviewData,
        entityOverviewQueryProcessingFunc
    );

    const rowLength = rows.length;


    return (
        <Table
            className={classes.table}
            aria-describedby={'entityProgressBar'}
            aria-labelledby="autologTable"
            aria-label="enhanced table"
            aria-busy={ariaBusy}
        >
            <AutologTableHeader
                classes={classes}
                order={order}
                orderBy={orderBy.toString()}
                onRequestSort={handleRequestSort}
                rowCount={rowLength}
                entityTableSchema={tableSchema}
                fieldsToDisplay={fieldsToDisplay}
            />
            <TableBody>
                <AutologTableBody
                    entityName={entityName}
                    rows={rows}
                    order={order}
                    orderBy={orderBy}
                    entityTableSchema={tableSchema}
                    handleClickRow={handleClickRow}
                    entitySingularName={entitySingularName}
                    entityDetails={entityDetails}
                    fieldsToDisplay={fieldsToDisplay}
                />
            </TableBody>

        </Table>
    );
}