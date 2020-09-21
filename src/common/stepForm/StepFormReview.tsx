import React from "react";
import {CommandType, IValues} from "../form/formTypes";
import {StepAction, StepFormDataStore} from "./StepForm";
import {StageName} from "./stepFormTypes";
import {Editor} from "../inputFields/FieldTypes";
import {EntityDetails} from "../entityDialogue/EntityDetails";
import {Button, Grid} from "@material-ui/core";
import {AutologSystemMessage} from "../systemMessages/AutologSystemMessage";
import {MessageType, useSystemMessages} from "../systemMessages/useSystemMessages";
import {GraphQLResult} from "@aws-amplify/api";

export interface StepFromReviewProps {
    formResultPreview: [string, Editor | "", JSX.Element[]][];
    command: CommandType;
    stepFormDataStore: StepFormDataStore;
    setStepFormDataStore: React.Dispatch<StepAction>;
    handleClose?: (closeCommand: 'continue' | 'close') => () => void
}

function applyCommand(
    stepFormProps: StepFromReviewProps,
    setSystemMessageType: React.Dispatch<MessageType>,
    setSystemMessageOpen: React.Dispatch<boolean>,
) {
    return () => {
        const {command, stepFormDataStore, handleClose} = stepFormProps;
        let stepValues: IValues = {};
        stepFormDataStore.stepFormDataStore.forEach(
            (stepValue, stepName) => {
                stepValues[stepName] = stepValue;
            }
        )

        let successfulQuery = (command as (submissionData: IValues) => Promise<GraphQLResult>)(stepValues);
        console.log('successfulQuery',successfulQuery);
        const errorAction = () => {
            setSystemMessageType('error');
            setSystemMessageOpen(true);
        }

        const successAction = () => {
            handleClose !== undefined &&
            handleClose('close');
            setSystemMessageType('success');
            setSystemMessageOpen(true);
        }

        successfulQuery ? successAction() : errorAction();
    };
}

interface StepFormReviewButtonsProps {
    applyCommandMemoized: () => void;
    setStepFormDataStore: (value: StepAction) => void;
    lastStepData: IValues;
}

const StepFormReviewButtons = (props: StepFormReviewButtonsProps) =>
    <>
        <Grid item xs={12} style={{padding: 2}}>
            <Button
                variant="outlined"
                color="primary"
                style={{textTransform: 'none', fontSize: 16}}
                onClick={props.applyCommandMemoized}
                fullWidth={true}
            >
                Submit
            </Button>
        </Grid>
        <Grid item xs={12}>
            <Button
                variant="outlined"
                color="primary"
                style={{textTransform: 'none', fontSize: 16}}
                onClick={
                    (e) => {
                        props.setStepFormDataStore(
                            {
                                actionName: "returnToPreviousStep",
                                stageValues: props.lastStepData
                            }
                        )
                    }
                }
                fullWidth={true}
            >
                Back to Form
            </Button>
        </Grid>
    </>;

export const StepFromReview = (props: StepFromReviewProps) => {
    const {stepFormDataStore, handleClose} = props;

    const lastStep = stepFormDataStore.steps[props.stepFormDataStore.steps.length - 1];
    const lastStepData = stepFormDataStore.stepFormDataStore.get(lastStep as StageName) as IValues;
    const {
        openSystemMessage,
        setSystemMessageOpen,
        handleSystemMessageClose,
        systemMessageType,
        setSystemMessageType
    } = useSystemMessages();

    const formSystemMessage = new Map<MessageType, { message: any }>(
        [
            ['success', {message: 'Successfully uploaded'}],
            ['error', {message: 'Error occurred, please details.'}]
        ]
    );
    const applyCommandMemoized = React.useMemo(
        () => applyCommand(props, setSystemMessageType, setSystemMessageOpen),
        [stepFormDataStore]
    );
    const stepFormMap = props.stepFormDataStore.stepFormMap;
    const stepsCallBack = props.stepFormDataStore.stepsCallback;
    const sourceStep = props.stepFormDataStore.sourceStageStep

    return (
        <Grid container direction={'row'}>
            {
                formSystemMessage &&
                    <AutologSystemMessage
                    handleSystemMessageClose={handleSystemMessageClose}
                    messageSchema={formSystemMessage}
                    openAutologSystemMessage={openSystemMessage}
                    messageType={systemMessageType}

                />
            }
           <Grid item xs={12}>
               <EntityDetails
                {

                    ...{
                        stepFormMap,
                        sourceStep,
                        stepsCallBack,
                        stepFormDataStore: stepFormDataStore.stepFormDataStore,
                    }
                }
            />
           </Grid>
            <Grid item xs={12}>
            <StepFormReviewButtons
                applyCommandMemoized={applyCommandMemoized}
                lastStepData={lastStepData}
                setStepFormDataStore={props.setStepFormDataStore}
            />
            </Grid>
        </Grid>
    );
};