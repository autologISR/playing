import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {ButtonText, CommandType, FormSubmissionType, IValues, Schema} from "./formTypes";
import {useSystemMessages} from "../systemMessages/useSystemMessages";
import {StepButtonType} from "../stepForm/stepFormTypes";
import {IFieldProps} from "../inputFields/FieldTypes";

export interface UseFormProps {
    command: CommandType;
    validate: (values: IValues) => IValues;
    initialState: IValues | {};
    buttonType?: StepButtonType;
    submittedStep?: boolean;
    schema: Schema;
}

interface AddGroupedValuesProps {
    groupedValues: Map<"parentInputField" | "childInputField", [IFieldProps, (IValues | {})]>,
    setValues: React.Dispatch<IValues | {}>,
    values: IValues | {}
}

function addGroupedValues(props: AddGroupedValuesProps) {

    const {groupedValues, setValues, values} = props;

    const [parentInputDefinition, parentInputValue] = groupedValues.get('parentInputField') as [IFieldProps, IValues];
    const [childInputDefinition, childInputValue] = groupedValues.get('childInputField') as [IFieldProps, IValues];

    setValues({
        ...values,
        [parentInputDefinition.name as string]: parentInputValue as any,
    })

    childInputDefinition !== undefined && setValues({
        ...values,
        [childInputDefinition.name as string]: childInputValue as any,
    })
}

function changesSubmittingOnClickButton(setButtonText: React.Dispatch<ButtonText>, setButtonDisabled: React.Dispatch<boolean>) {
    setButtonText('Submit Changes');
    setButtonDisabled(false);
}

export interface UnSubmittedStepDisabled {
    setButtonText: React.Dispatch<ButtonText>,
    setButtonDisabled: React.Dispatch<boolean>
}

const unSubmittedStepDisabled = (props: UnSubmittedStepDisabled) => {
    const {setButtonText, setButtonDisabled} = props;
    setButtonText('Fill The Required Fields');
    setButtonDisabled(true);
}

export interface SubmittedStepContinueWithoutSavingProps {
    setButtonText: React.Dispatch<ButtonText>,
    setButtonDisabled: React.Dispatch<boolean>,
}

function submittedStepContinueWithoutSaving(props: SubmittedStepContinueWithoutSavingProps) {
    const {setButtonDisabled, setButtonText} = props;
    setButtonText('Continue Without Saving');
    setButtonDisabled(false);
}


export default function useForm(props: UseFormProps) {
    const {command, validate, submittedStep, initialState={}, schema} = props;

    const [values, setValues] = useState<IValues | {}>(initialState);
    const [errors, setError] = useState({});


    const [errorMap, setErrorMap] = useState<Map<string, boolean>>(new Map(schema.map((input: IFieldProps) => [input.name, false])))
    const [isSubmitting, setSubmitting] = useState<boolean | undefined>();

    const [buttonText, setButtonText] = React.useState<ButtonText>('Fill The Required Fields');
    const [buttonDisabled, setButtonDisabled] = React.useState<boolean>(true);
    const {
        openSystemMessage,
        setSystemMessageOpen,
        handleSystemMessageClose,
        systemMessageType,
        setSystemMessageType
    } = useSystemMessages();


    useEffect(() => {
        const formValues = Object.values(values).filter(value => value !== '');
        const initialStateValues = initialState !== undefined && Object.values(initialState);
        const isUnchangedFromLastSubmission = JSON.stringify(initialStateValues) === JSON.stringify(formValues);
        const isEdited = formValues.length > 0 && !isUnchangedFromLastSubmission;

        !isEdited ?
            submittedStep && isUnchangedFromLastSubmission ?
                submittedStepContinueWithoutSaving({setButtonText, setButtonDisabled}) :
                unSubmittedStepDisabled({setButtonText, setButtonDisabled}) :
            changesSubmittingOnClickButton(setButtonText, setButtonDisabled);

        errorMap !== undefined &&
        Object.keys(values).forEach(
            (inputFieldName) => {
                setErrorMap(errorMap.set(inputFieldName, false))
            }
        );

        if (isSubmitting) {
            const noErrors = Object.keys(errors as IValues).length === 0;
            if (noErrors) {
                setSubmitting(true);
                setSystemMessageType('success')
            } else {
                setSubmitting(false);
                setSystemMessageType('error')
            }
        }
    }, [errors, initialState, isSubmitting, setSystemMessageType, submittedStep, values]);

    const handleSpreadsheetChange = (name: string, spreadSheetValues: string) => {
        setValues({...values, [name]: spreadSheetValues})
    }

    const handleChange = (event: ChangeEvent<any>) => {
        event.target.editor !== 'groupedinput' ?
            setValues({
                ...values,
                [event.target.name as string]: event.target.value as any
            }) :
            addGroupedValues({groupedValues: event.target.value, setValues, values});
    };

    function handleBlur() {
        const validationErrors = validate(values);
        setError(validationErrors);
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        const validationErrors = validate(values);
        setError(validationErrors);
        try {
            if (command) {
                (command as FormSubmissionType)(values);
                setSubmitting(true);
            }
            setSystemMessageOpen(true);
        } catch (e) {
            console.log(e);
            setSystemMessageOpen(true);
        }
    }


    return {
        handleChange,
        handleBlur,
        handleSubmit,
        handleSystemMessageClose,
        openSystemMessage,
        systemMessageType,
        buttonText,
        buttonDisabled,
        values,
        setValues,
        handleSpreadsheetChange,
        errors,
        errorMap,
        setErrorMap,
        setSystemMessageType,
        setSystemMessageOpen
    }
}
