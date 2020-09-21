import {CommandType, IErrors, IFormProps, IValues} from "../form/formTypes";
import {makeStyles, Theme} from "@material-ui/core/styles";
import {AutologSystemMessageSchema} from "../systemMessages/autologSystemMessageTypes";

/** Dispatch action passed to the form button that applies the logic defined in the reducer function on the StepFormSubmissionStateLog. */
export type StepFormAction =
    'sourceStageSubmission'
    | 'submitNewStep'
    | 'returnToPreviousStep'
    | 'moveForwardUnchanged'
    | 'Review'
    | 'Command';


/** NextStage name and StageName type*/
export type NextStageName = string;
export type StageName = string;


/** Map that is declared to specify which */
export type StageToFormMap = Map<StageName, IFormProps>;


/** Data input from the previous stage */
export interface StepsCallbackProps {
    stageValues: IValues;
}

/** Callback that determines the next stage */
export type StepsCallback = (props: StepsCallbackProps) => string[];

/** Step Form data structure; we define NextStageCallback to receive previous step,
 * output the next stage name look it up in StageToFormMap.*/
export type StepForm = [StepsCallback, StageToFormMap];

export interface StepStateCallbackProps {
    step: string;
    stepFormMap: Map<string, IFormProps>;
    submissionValues: IValues;
    nextStep: string;
}

export type StepStateCallbackType = (props: StepStateCallbackProps) => IFormProps;

/** Interface used to declare a Step Form */
export interface StepFormSchema {
    sourceStage: StageName;
    command: CommandType;
    newEntityStepForm: StepForm;
    validate: (props: IValues) => IErrors;
    formSystemMessage: AutologSystemMessageSchema;
    handleClose?: (command: 'continue' | 'close') => () => void;
    stepStateCallback?: StepStateCallbackType;
}

/** Width of the preview sidebar*/
const stepResultPreviewDrawerWidth = 440;

export const useStyles = makeStyles((theme: Theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        overflow: "visible",
        whiteSpace: "normal",
        textTransform: 'none',
        fontWeight: theme.typography.fontWeightRegular,

    },
    form: {
        margin: 20
    },

    formPreview: {
        width: stepResultPreviewDrawerWidth,
        marginTop: 96,
        height: 'calc(100% - 64px)',
    },

    drawer: {
        flexContainerVertical: 'true',
        width: stepResultPreviewDrawerWidth,
        height: 'calc(100% - 64px)'
    },
    drawerPaper: {
        width: stepResultPreviewDrawerWidth,
    },

    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        width: '100%',
    },
}));
export type StepButtonType = 'sourceButton' | 'intermediateButton' | 'continueToReview' | 'submit' ;