import React from "react";
import {EntityDetailsSchema, EntityKeyPair} from "../entityKeyPair";
import {IValues} from "../form/formTypes";
import {EntityDialogue} from "../entityDialogue/EntityDialogue";
import {EntityDetails} from "../entityDialogue/EntityDetails";

export interface AutologTableRowDetailsProp<T extends EntityKeyPair> {
    id: string;
    entityName: string;
    entityDialogueOpened: boolean;
    handleClose: () => void;
    entityDetails: EntityDetailsSchema<T>;
    entitySingularName: string;
    row: T;
}


export const AutologTableRowDetails = <T extends EntityKeyPair>(props: AutologTableRowDetailsProp<T>) => {
    const {row, entityDetails, handleClose, entityDialogueOpened, entitySingularName} = props;
    const {id, ...otherRowProps} = row;

    const {sourceFields, detailsFields} = entityDetails.splitOverViewAndDetails(row);

    const steps =
        entityDetails.stepsCallback(
            {
                stageValues: sourceFields
            }
        );

    const otherStepValues = Object.values(detailsFields).filter(
        value => value
    ).map(
        (stepValues, index) => {
            const stepName = steps.slice(1)[index];
            return [stepName, JSON.parse(stepValues)] as [string, IValues]
        }
    );

    const dataStore = new Map<string, IValues>([[entityDetails.sourceStep, sourceFields], ...otherStepValues]);

    return (
        <EntityDialogue
            title={`${entitySingularName}: ${id}`}
            handleCloseDialogueBeforeClosing={handleClose}
            entityDetailsComponent={EntityDetails}
            entityDetailsProps={
                {
                    stepFormMap: entityDetails.stepFormMap,
                    stepFormDataStore: dataStore,
                    sourceStep: entityDetails.sourceStep,
                    stepsCallBack: entityDetails.stepsCallback,
                    entitySingularName: entitySingularName
                }

            }
            entityDialogueOpened={entityDialogueOpened}
        />
    );
};