import {useStyles} from "../table/AutologTableTypes";
import React from "react";
import {Domain, Entity, EntityKeyPair} from "../entityKeyPair";


export function useDashboardSection<T extends EntityKeyPair>({entityNames, domainSchema}: Domain) {
    const [entitySelected, setEntitySelected] = React.useState<string>(entityNames[0]);
    const [currentEntity, setCurrentEntity] = React.useState<Entity<T> | undefined>(domainSchema.get(entityNames[0]));
    const [fieldsToDisplay, setFieldsToDisplay] = React.useState<Set<string>>(
        new Set(
            (domainSchema.get(entitySelected) as Entity<T>).entityOverview.tableSchema.map(
                tableHeader => tableHeader.label
            )
        )
    );
    const [finishedEntityOverviewData, setFinishedLoadEntityOverviewData] = React.useState(false);
    const classes = useStyles();

    React.useEffect(
        () => {
            return () => {
                currentEntity !== undefined &&
                setCurrentEntity(currentEntity);
            };
        },
        [currentEntity, entitySelected, domainSchema, fieldsToDisplay]
    );

    return {
        entitySelected,
        fieldsToDisplay,
        setFieldsToDisplay,
        setEntitySelected,
        currentEntity,
        classes,
        finishedEntityOverviewData,
        setFinishedLoadEntityOverviewData
    };
}