import {AutologSystemMessageSchema} from "../systemMessages/autologSystemMessageTypes";
import React from "react";
import {StepButtonType} from "../stepForm/stepFormTypes";
import {GraphQLResult} from "@aws-amplify/api";
import Observable from "zen-observable-ts";
import {StepAction} from "../stepForm/StepForm";

export type FormSubmissionType = ((submissionData: IValues) => Promise<void> ) | ((submissionData: IValues) => void )  | (() => Promise<void>)  ;


export interface IFormProps {

    /* Form title */
    title: string

    /* Form button title */
    submitButtonTitle: String

    /* Submission form type */
    command?: CommandType

    /* A prop which allows content to be injected */
    schema: Schema

    /* Initial state of the form passed into the form */
    initialState?: any;

    /* Form validation function*/
    validate: (values: IValues) => IValues

    formSystemMessage: AutologSystemMessageSchema

    handleStepBack?: (event?: React.MouseEvent<HTMLElement>) => void;

    handleStepForward?: (event?: React.MouseEvent<HTMLElement>) => void;

    stepFormReducerDispatch?: React.Dispatch<StepAction>;

    stepButtonType?: StepButtonType;

    submittedStep?: boolean;

    dataPresentation?: boolean;
}


export interface Schema {
    [key: string]: any;
}


export interface IValues {
    /* Key value pairs for all the field values with key being the field name */
    [key: string]: any;
}

export interface IErrors {
    /* The validation error messages for each field (key is the field name */
    [key: string]: string;
}

export type CommandType = FormSubmissionType | Promise<GraphQLResult> | Observable<object> | undefined | React.Dispatch<IValues | {}>;
export type ButtonText = 'Fill The Required Fields' | 'Continue Without Saving' | 'Save Changes' | 'Submit Changes';