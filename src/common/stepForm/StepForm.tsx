import * as React from 'react';
import {Box} from "@material-ui/core";

import {
    StepFormSchema,
    StageName,
    StageToFormMap,
    StepFormAction,
    StepsCallback,
    useStyles, StepStateCallbackType
} from "./stepFormTypes";
import {IFormProps, IValues, Schema} from "../form/formTypes";
import {Form} from "../form/Form";

import {StepFromReview} from "./StepFormReview";
import {FormResultPreview, reviewElementArray} from "./StepFormResultPreview";
import {Editor} from "../inputFields/FieldTypes";


export interface UseStepFormProps {
    stepFormMap: StageToFormMap;
    sourceStage: string;
    stepsCallback: StepsCallback;
    stepStateCallback?: StepStateCallbackType;
}


export type StepAction = { actionName: StepFormAction, stageValues: IValues, setValues?: React.Dispatch<IValues>, errors?: IValues };


export function extractStepSubmissionStateForPreview(prevForm: IFormProps | undefined, stageValues: IValues,) {
    return Object.entries(stageValues).map(
        ([key, values]) => {
            const formSchema =
                prevForm !== undefined &&
                prevForm.schema;

            let fieldName = '';
            let formFieldEditor = '';

            (formSchema as Schema).forEach(
                (formField: IValues) => {

                    if (formField.name === key) {
                        fieldName = formField.label;
                        formFieldEditor = formField.editor;
                    }
                }
            );
            return [fieldName, values, formFieldEditor];
        }
    )
}

interface GetReviewElementsProps {
    stepFormDataStore: StepFormDataStore;
    spreadsheetOpenMap: { openMap: Map<string, boolean> },
    dispatchOpenOrCloseSpreadsheet: React.Dispatch<SpreadsheetTableReducerParams>
}

function getReviewElements(props: GetReviewElementsProps) {

    const {stepFormDataStore, spreadsheetOpenMap, dispatchOpenOrCloseSpreadsheet} = props;
    const formResultReview: [string, Editor | "", JSX.Element[]][] = [];

    stepFormDataStore.stepFormDataStore.forEach(
        (stageValues, step) => {

            const currentForm = stepFormDataStore.stepFormMap.get(step) as IFormProps;
            const currentSubmissionState = extractStepSubmissionStateForPreview(currentForm, stageValues);
            currentSubmissionState &&
            formResultReview.push(
                reviewElementArray(
                    {
                        title: currentForm.title,
                        values: currentSubmissionState,
                        spreadsheetOpenMap,
                        dispatchOpenOrCloseSpreadsheet,
                        nextStepIsReview: stepFormDataStore.currentStep === 'Review'
                    }
                )
            );
        }
    );

    return formResultReview;
}

export type StepFormDataStore = {
    currentStepIndex: number;
    currentStep: string,
    currentForm: IFormProps | 'Review',
    sourceStageStep: string,
    steps: string[],
    stepsCallback: StepsCallback,
    stepFormDataStore: Map<StageName, IValues | {}>,
    stepFormMap: Map<string, IFormProps>,
    stepStateMap?: Map<string, IFormProps>
    stepStateCallback?: StepStateCallbackType;
};

function submitSourceStep(state: StepFormDataStore, action: StepAction) {
    const formSteps = state.stepsCallback({stageValues: action.stageValues as IValues | {}})
    console.log('formSteps: ',formSteps);
    const {stepFormDataStore, steps, currentStep, currentForm, currentStepIndex, ...otherStateValues} = state;

    const nextFormProps = state.stepFormMap.get(formSteps[1]);
    action.setValues !== undefined && action.setValues({});
    return {
        steps: formSteps,
        currentStep: formSteps[1],
        currentStepIndex: 1,
        currentForm: {stepButtonType: 'intermediateButton', submittedStep: false, ...nextFormProps},
        stepFormDataStore: stepFormDataStore.set(state.sourceStageStep, action.stageValues),
        ...otherStateValues
    } as StepFormDataStore;
}

function submitNewStep(state: StepFormDataStore, action: StepAction) {
    const {currentStep, currentForm, stepFormDataStore, currentStepIndex, ...otherStateProps} = state;

    const nextIndex = currentStepIndex + 1;
    const isReview = nextIndex === state.steps.length;

    const nextStep =
        isReview ?
            'Review' :
            state.steps[nextIndex];
    console.log('nextStep: ', nextStep)

    const nextForm =
        isReview ?
            'Review' :
            state.stepFormMap.get(nextStep) as IFormProps;
    console.log('nextForm: ', nextForm)

    const submittedValues = stepFormDataStore.get(currentStep) as IValues;
    const modifiedForm = state.stepStateCallback !== undefined ?
        state.stepStateCallback({
            step: currentStep,
            submissionValues: action.stageValues as IValues,
            stepFormMap: state.stepFormMap,
            nextStep
        }) :
        nextForm as Schema;

    const isSubmitted =
        submittedValues !== undefined &&
        Object.values(submittedValues).filter(
            value => value !== ''
        ).length !== 0;

    const nextFormProps =
        nextForm === 'Review' ?
            'Review' : {
                submittedStep: isSubmitted,
                initialState: isSubmitted ? submittedValues : {},
                stepButtonType: "intermediateButton",
                ...modifiedForm
            };

    action.setValues !== undefined && action.setValues({});

    return {
        currentStep: nextStep,
        currentStepIndex: nextIndex,
        currentForm: nextFormProps,
        stepFormDataStore: stepFormDataStore.set(currentStep, action.stageValues),
        ...otherStateProps
    } as StepFormDataStore;
}

function goBack(state: StepFormDataStore, action: StepAction) {
    const {currentStep, currentForm, currentStepIndex, stepFormDataStore, ...otherStateProps} = state;
    const prevStepIndex = currentStepIndex - 1;
    const prevStep = state.steps[prevStepIndex];
    const {initialState, submittedStep, ...otherFormProps} = state.stepFormMap.get(prevStep) as IFormProps;

    if (action.setValues !== undefined)
        prevStep === state.sourceStageStep ?
            action.setValues({}) :
            action.setValues(state.stepFormDataStore.get(prevStep) as IValues);

    return prevStep === state.sourceStageStep ?
        {
            steps: [prevStep],
            currentForm: {
                initialState: {},
                stepButtonType: 'sourceButton',
                submittedStep: false,
                ...state.stepFormMap.get(prevStep)
            } as IFormProps,
            stepFormMap: state.stepFormMap,
            currentStep: prevStep,
            currentStepIndex: 0,
            sourceStageStep: prevStep,
            stepsCallback: state.stepsCallback,
            stepFormDataStore: new Map([[prevStep, {} as IValues]])
        } as StepFormDataStore :
        {
            currentStepIndex: prevStepIndex,
            currentStep: prevStep,
            currentForm: {
                submittedStep: true,
                stepButtonType:
                    prevStepIndex === 0 ?
                        'sourceButton' :
                        'intermediateButton',
                initialState: state.stepFormDataStore.get(prevStep) as IValues,
                ...otherFormProps
            },
            stepFormDataStore: stepFormDataStore,
            ...otherStateProps
        } as StepFormDataStore;
}

function moveForwardUnchanged(state: StepFormDataStore, action: StepAction) {
    const {currentStep, currentStepIndex, currentForm, ...otherStateProps} = state;
    const nextStepIndex = currentStepIndex + 1;
    const isReviewIndex = nextStepIndex === state.steps.length;
    const nextStep = isReviewIndex ? 'Review' : state.steps[nextStepIndex];

    const nextForm = state.stepFormMap.get(nextStep);

    if (nextStep !== 'Review') {
        const {initialState, submittedStep, ...otherFormProps} = nextForm as IFormProps;

        const nextFormInitialState = state.stepFormDataStore.get(nextStep) as IValues;
        const isSubmittedStep = nextFormInitialState !== undefined;

        isSubmittedStep && action.setValues !== undefined && action.setValues(nextFormInitialState);

        return {
            currentStepIndex: nextStepIndex,
            currentStep: nextStep,
            submittedStep: isSubmittedStep,
            stepButtonType: 'intermediateButton',
            currentForm: {
                submittedStep: isSubmittedStep,
                initialState: nextFormInitialState,
                ...otherFormProps
            },
            ...otherStateProps
        } as StepFormDataStore;
    } else {
        return {
            currentStepIndex: nextStepIndex,
            currentStep: nextStep,
            submittedStep: true,
            stepButtonType: 'intermediateButton',
            currentForm: 'Review',
            ...otherStateProps
        } as StepFormDataStore;
    }
}

function stepFormDataStoreReducer(state: StepFormDataStore, action: StepAction) {


    switch (action.actionName) {
        case "sourceStageSubmission":
            return submitSourceStep(state, action);

        case "submitNewStep":
            return submitNewStep(state, action);

        case "returnToPreviousStep":
            return goBack(state, action);

        case "moveForwardUnchanged":
            return moveForwardUnchanged(state, action);
        default:
            return state;
    }
}

export type SpreadsheetTableReducerParams = { actionName: 'open' | 'close' | 'init', spreadsheetName?: string, steps?: string[], stepMap?: Map<string, IFormProps> };

function spreadsheetTableReducer(state: { openMap: Map<string, boolean> }, action: SpreadsheetTableReducerParams): { openMap: Map<string, boolean> } {

    switch (action.actionName) {

        case "open":
            return {
                openMap: (state.openMap as Map<string, boolean>).set(action.spreadsheetName as string, true)
            };

        case "close":
            return {
                openMap: (state.openMap as Map<string, boolean>).set(action.spreadsheetName as string, false)
            };

        case 'init':
            const spreadsheetListInStepForm: string[] = (action.steps as string[]).map(
                (step) =>
                    ((action.stepMap as StageToFormMap).get(step) as IFormProps).schema
            ).flat().filter(
                (input: Schema) =>
                    input.editor === 'spreadsheet'
            ).map(
                (spreadsheetInput: Schema) =>
                    spreadsheetInput.label
            )

            const newSpreadsheetOpenState: Map<string, boolean> = new Map<string, boolean>([])
            spreadsheetListInStepForm.forEach(
                (spreadsheetLabel) =>
                    newSpreadsheetOpenState.set(spreadsheetLabel, false)
            );
            return {openMap: newSpreadsheetOpenState};

        default:
            return state;

    }
}


function useStepForm(props: UseStepFormProps) {
    const {stepFormMap, sourceStage, stepsCallback, stepStateCallback} = props;

    const initialState: StepFormDataStore = {
        steps: [sourceStage],
        currentForm: {
            initialState: {},
            stepButtonType: 'sourceButton',
            submittedStep: false, ...stepFormMap.get(sourceStage)
        } as IFormProps,
        stepFormMap,
        currentStep: sourceStage,
        currentStepIndex: 0,
        sourceStageStep: sourceStage,
        stepFormDataStore: new Map([[sourceStage, {} as IValues]]),
        stepsCallback,
        stepStateCallback
    } as StepFormDataStore;

    const [stepFormDataStore, setStepFormDataStore] = React.useReducer(stepFormDataStoreReducer, initialState);
    const initialStateOpenMap: { openMap: Map<string, boolean> } = {openMap: new Map<string, boolean>([['string', false]])}
    const [spreadsheetOpenMap, dispatchOpenOrCloseSpreadsheet] = React.useReducer(spreadsheetTableReducer, initialStateOpenMap);


    React.useEffect(
        () => {
            stepFormDataStore.steps.length > 1 &&
            dispatchOpenOrCloseSpreadsheet({
                actionName: 'init',
                steps: stepFormDataStore.steps,
                stepMap: stepFormDataStore.stepFormMap
            });

        }, [stepFormDataStore.steps]
    )

    return {
        stepFormDataStore,
        setStepFormDataStore,
        spreadsheetOpenMap,
        dispatchOpenOrCloseSpreadsheet
    }
}

const StepFormComponent = (props: StepFormSchema) => {

    const {sourceStage, command, newEntityStepForm, formSystemMessage, validate, handleClose, stepStateCallback} = props;
    const [stepsCallback, stepFormMap] = newEntityStepForm;

    const classes = useStyles();
    const {
        stepFormDataStore,
        setStepFormDataStore,
        spreadsheetOpenMap,
        dispatchOpenOrCloseSpreadsheet
    } = useStepForm({sourceStage, stepFormMap, stepsCallback, stepStateCallback})

    const formResultReview = getReviewElements({stepFormDataStore, spreadsheetOpenMap, dispatchOpenOrCloseSpreadsheet});


    return (
        <div className={classes.root}>
            {
                stepFormDataStore.currentForm === 'Review' ?
                    /*
                     If the step is Review, render final step form data before submission.
                    * */
                    <Box display="flex" width={'100%'} className={classes.form}>
                        <StepFromReview
                            setStepFormDataStore={setStepFormDataStore}
                            stepFormDataStore={stepFormDataStore}
                            formResultPreview={formResultReview}
                            command={command}
                            handleClose={handleClose}
                        />
                    </Box> :
                    /*
                    Else, render data in each step.
                   * */
                    <Box display="flex">
                        <Box order={1}>
                            <FormResultPreview classes={classes} formResultPreview={formResultReview}/>
                        </Box>
                        <Box order={2} width={'100%'} overflow={"visible"} className={classes.form}>
                            <Form {...{stepFormReducerDispatch: setStepFormDataStore, ...stepFormDataStore.currentForm}}/>
                        </Box>
                    </Box>
            }
        </div>
    );
};

export default StepFormComponent;