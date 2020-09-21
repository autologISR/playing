import React from 'react';
import {Grid, TableContainer} from '@material-ui/core';
import {AutologTableToolbar, useNewEntity} from "../table/AutologTableToolbar";
import {useDashboardSection} from "./useDashboardSection";
import {AutologTable} from "../table/AutologTable";
import {Domain, EntityKeyPair} from "../entityKeyPair";
import {EntityDialogue} from "../entityDialogue/EntityDialogue";
import StepFormComponent from "../stepForm/StepForm";
import {WarningDialogue} from "../warningDialog/WarningDialog";
import LinearProgress from "@material-ui/core/LinearProgress";


export const AutologDashboardSection = <T extends EntityKeyPair>(props: Domain) => {
    const {entityNames, domainSchema} = props;

    const {
        fieldsToDisplay,
        setFieldsToDisplay,
        entitySelected,
        setEntitySelected,
        currentEntity,
        classes,
        finishedEntityOverviewData,
        setFinishedLoadEntityOverviewData
    } =
        useDashboardSection<T>({
            entityNames,
            domainSchema,
        });


    const currentTableProps =
        currentEntity !== undefined && {
            entityName:
            currentEntity.entityName,
            ...currentEntity.entityOverview,
            entityDetails: currentEntity.entityDetails,
            entitySingularName: currentEntity.entitySingularName
        };


    const {entityDialogueOpened, handleClickOpen, handleClose, handleDialogueBeforeClosing, openClosingWarning} = useNewEntity();

    const newEntityProps =
        currentEntity !== undefined &&
        currentEntity.newEntity !== undefined &&
        {...currentEntity.newEntity, handleClose};
    console.log('finishedEntityOverviewData: ', finishedEntityOverviewData);

    return (
        <div className={classes.root}>
            {
                openClosingWarning &&
                <WarningDialogue
                    handleClose={handleClose}
                    openClosingWarning={openClosingWarning}
                    warningDialogueText={'By clicking on "Close" you will discard all your progress.'}
                />
            }
            {
                entityDialogueOpened &&
                newEntityProps &&
                <EntityDialogue
                    title={`New ${entitySelected}`}
                    entityDialogueOpened={entityDialogueOpened}
                    handleClose={newEntityProps.handleClose}
                    handleCloseDialogueBeforeClosing={handleDialogueBeforeClosing}
                    newEntityProps={newEntityProps}
                    newEntityComponent={StepFormComponent}
                />
            }
            <Grid container direction={'row'}>
                <Grid item xs={12}>
                    <AutologTableToolbar
                        tableNames={entityNames}
                        setEntitySelected={setEntitySelected}
                        tableSelected={entitySelected}
                        handleClickOpen={handleClickOpen}
                        entitySingularName={currentEntity?.entitySingularName}
                        setFieldsToDisplay={setFieldsToDisplay}
                        fieldsToDisplay={fieldsToDisplay}
                    />
                </Grid>

                <Grid item xs={12}  >
                    {
                        currentTableProps &&
                        <TableContainer >
                            <AutologTable
                                ariaBusy={!finishedEntityOverviewData}
                                tableSchema={currentTableProps.tableSchema}
                                entityName={currentTableProps.entityName}
                                entityListQuery={currentTableProps.entityOverviewQuery}
                                listEntity={currentTableProps.listEntity}
                                entityOverviewQueryProcessingFunc={currentTableProps.entityOverviewQueryProcessingFunc}
                                entityDetails={currentTableProps.entityDetails}
                                entitySingularName={currentTableProps.entitySingularName}
                                fieldsToDisplay={fieldsToDisplay}
                                setFinishedLoadEntityOverviewData={setFinishedLoadEntityOverviewData}
                            />
                        </TableContainer>
                    }
                </Grid>
            </Grid>
        </div>
    );
};
