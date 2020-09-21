import React from "react";
import {Order, useStyles} from "./AutologTableTypes";
import {EntityKeyPair} from "../entityKeyPair";
//API, graphqlOperation,
import {Hub} from "aws-amplify";
import {IValues} from "../form/formTypes";

// import * as subscriptions from "../../graphql/subscriptions";

async function queryEntityOverview(setRows: React.SetStateAction<any>, listRowObject: Promise<any>, objectShortQueryName: string, entityOverviewQueryProcessingFunc?: (data: IValues[]) => IValues[]) {
    try {
        const rowObjects = await listRowObject;
        const queriedRows = rowObjects["data"][objectShortQueryName]['items'];
        console.log('entityOverviewQueryProcessingFunc', entityOverviewQueryProcessingFunc);
        setRows(
            entityOverviewQueryProcessingFunc === undefined ?
                queriedRows :
                entityOverviewQueryProcessingFunc(queriedRows)
        );

    } catch (e) {
        console.log(e)
    }
}


export function useTable<T extends EntityKeyPair>(
    listObject: any,
    objectShortQueryName: string,
    setFinishedLoadEntityOverviewData: React.Dispatch<boolean>,
    entityOverviewQueryProcessingFunc?: (data: IValues[]) => IValues[],
) {

    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof T>('id');
    const [rows, setRows] = React.useState([]);
    const classes = useStyles();

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof T) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };
    React.useEffect(() => {
        queryEntityOverview(
            setRows,
            listObject,
            objectShortQueryName,
            entityOverviewQueryProcessingFunc
        ).catch(
            e => console.log(e)
        ).finally(() => setFinishedLoadEntityOverviewData(true));
        const listener = (data: any) => {
            if (data.payload.event === "signOut") {
                // DataStore.clear();
            }
        };

        Hub.listen('auth', listener);

        /*      const subscription =  API.graphql(graphqlOperation(subscriptions.onCreateAccountApplicationSubmissions)).subscribe({
                  next: () => queryAllEntityOverview(setRows, listObject, objectShortQueryName)
              });*/


        const handleConnectionChange = () => {
            const condition = navigator.onLine ? "online" : "offline";
            console.log(condition);
            if (condition === "online") {
                listObject(setRows);
            }
        };

        window.addEventListener("online", handleConnectionChange);
        window.addEventListener("offline", handleConnectionChange);
        // return () => subscription.unsubscribe();
    }, [listObject, objectShortQueryName]);

    const handleClickRow = (event: React.MouseEvent<unknown>, handleClickOpen: () => void) => {
        handleClickOpen()
    };

    return {
        rows,
        order,
        orderBy,
        handleRequestSort,
        handleClickRow,
        classes
    }
}