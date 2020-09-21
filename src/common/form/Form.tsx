import React, {FunctionComponent} from "react";
import {IFormProps, IValues, Schema} from "./formTypes";
import useForm from "./useForm";
import {Button, createStyles, Divider, Grid, makeStyles, Theme, Typography} from "@material-ui/core";
import {InputField} from "../inputFields/InputField";
import {AutologSystemMessage} from "../systemMessages/AutologSystemMessage";
import {IFieldProps} from "../inputFields/FieldTypes";
import {StepButtonType} from "../stepForm/stepFormTypes";
import {StepAction} from "../stepForm/StepForm";
import {MessageType} from "../systemMessages/useSystemMessages";


function returnExistingValue(values: IValues | {}, input: IFieldProps) {
    const key =
        Object.keys(values).filter(
            (field) =>
                field === input.name
        )[0];
    return key !== undefined ?
        Object.entries(values).filter(
            ([fieldKey, value]) =>
                fieldKey === key
        )[0][1] :
        false;
}

export interface FormInputsProps {
    schema: Schema;
    initialState: IValues | {};
    handleBlur: () => void;
    handleChange: (e: React.ChangeEvent<any>) => void;
    handleSpreadsheetChange?: (name: string, spreadSheetValues: string) => void;
    errorMap: Map<string, boolean>
    dataPresentation?: boolean
}

const FormInputs = (props: FormInputsProps) => {

    return <Grid container alignContent={'stretch'} alignItems={'flex-start'} direction={'row'} spacing={2}>
        {
            props.schema !== undefined && props.schema.map(
                (input: IFieldProps, index: number) => {

                    const initialValue =
                        props.initialState === undefined ?
                            undefined :
                            returnExistingValue(props.initialState, input);

                    return (
                        <Grid item spacing={2} lg={
                            input.editor === 'spreadsheet' ?
                                12 :
                                input.editor === 'radio' ?
                                    2 :
                                    input.editor === 'dateinput' ?
                                        2 :
                                        4
                        }
                        >
                            {
                                input.editor === 'spreadsheet' &&
                                input.customComponent !== undefined &&
                                index > 0 &&
                                <Grid item>
                                    <Divider light variant={'fullWidth'}/>
                                </Grid>
                            }

                            <InputField
                                required={input.required}
                                initialValue={initialValue ? initialValue : input.initialValue ? input.initialValue : undefined}
                                name={input.name}
                                key={input.name}
                                label={input.label}
                                handleBlur={props.handleBlur}
                                handleChange={props.handleChange}
                                options={input.options}
                                editor={input.editor}
                                spreadsheetColumns={input.spreadsheetColumns}
                                onCellChange={input.onCellChange}
                                customComponent={input.customComponent}
                                groupOrientation={input.groupOrientation}
                                sheetRenderer={input.sheetRenderer}
                                rowRenderer={input.rowRenderer}
                                cellRenderer={input.cellRenderer}
                                customSpreadsheetInputFunc={input.customSpreadsheetInputFunc}
                                handleSpreadsheetChange={props.handleSpreadsheetChange}
                                spreadsheetInitialEmptyRows={input.spreadsheetInitialEmptyRows}
                                error={props.errorMap.get(input.name)}
                                readOnlySpreadsheet={input.readOnlySpreadsheet}
                                customComponentContext={input.customComponentContext}
                                readOnly={props.dataPresentation}
                                country_state={input.country_state}
                                region={input.region}
                                columnMetadataTable={input.columnMetadataTable}
                            />
                        </Grid>
                    );
                }
            )
        }
    </Grid>;
};

interface StepCommand {
    buttonDisabled: boolean;
    buttonText: string;
    values: IValues;
    stepFormButtonType: StepButtonType;
    stepFormReducerDispatch: React.Dispatch<StepAction>;
    setValues: React.Dispatch<IValues>;
    errorMap?: Map<string, boolean>;
    errors?: IValues;
    setSystemMessageType: React.Dispatch<MessageType>;
    setErrorMap: React.Dispatch<Map<string, boolean>>;
    handleBlur: () => void;
    setSystemMessageOpen: React.Dispatch<boolean>
}

const stepCommand = (props: StepCommand) => {
    const {
        values,
        stepFormButtonType,
        stepFormReducerDispatch,
        buttonText,
        setValues,
        handleBlur,
        setSystemMessageType,
        errors,
        setErrorMap,
        errorMap,
        setSystemMessageOpen
    } = props;

    if (Object.values(errors as IValues).length === 0) {

        stepFormButtonType === 'sourceButton' ?
            stepFormReducerDispatch({actionName: 'sourceStageSubmission', stageValues: values, setValues}) :
            buttonText === 'Continue Without Saving' ?
                stepFormReducerDispatch({actionName: 'moveForwardUnchanged', stageValues: {}, setValues}) :
                stepFormReducerDispatch({actionName: 'submitNewStep', stageValues: values, setValues})
    } else {
        errors !== undefined &&
        errorMap !== undefined &&
        Object.keys(errors).forEach(
            inputFieldName => {
                setErrorMap(errorMap.set(inputFieldName, true));
                handleBlur();
            }
        )
        setSystemMessageType('error');
        setSystemMessageOpen(true);
    }
};

interface FormButtonProps {
    submitButtonTitle: string,
    stepCommandProps?: StepCommand,

}

const FormButton = (props: FormButtonProps) => {
    const {submitButtonTitle, stepCommandProps} = props;
    return (
        <div className='button'>
            {
                stepCommandProps ?
                    <Grid
                        spacing={2}
                        direction={'row'}
                    >
                        <Grid
                            item md={12}
                            style={{padding: 2}}
                        >
                            <Button
                                style={{textTransform: 'none', fontSize: 16}}
                                color={'primary'}
                                disabled={stepCommandProps.buttonDisabled}
                                variant="outlined"

                                onClick={
                                    () => stepCommand(stepCommandProps)
                                }
                                fullWidth={true}
                            >
                                {stepCommandProps.buttonText}
                            </Button>
                        </Grid>

                        {
                            stepCommandProps.stepFormButtonType !== 'sourceButton' &&
                            <Grid item md={12} alignContent={'center'} style={{padding: 2}}>
                                <Button
                                    style={{textTransform: 'none', fontSize: 16}}
                                    color={'primary'}
                                    variant="outlined"
                                    onClick={
                                        () =>
                                            stepCommandProps?.stepFormReducerDispatch(
                                                {
                                                    actionName: 'returnToPreviousStep',
                                                    stageValues: {},
                                                    setValues: stepCommandProps.setValues
                                                }
                                            )
                                    }
                                    fullWidth={true}
                                >
                                    Previous Step
                                </Button>
                            </Grid>
                        }
                    </Grid> :
                    <Grid item md={12} style={{padding: 2}}>
                        <Button style={{textTransform: 'none', fontSize: 16}} color={'primary'} variant="outlined"
                                type={"submit"} fullWidth={true}>
                            {submitButtonTitle}
                        </Button>
                    </Grid>
            }
        </div>
    );
}


export const Form: FunctionComponent<IFormProps> = ({
                                                        title,
                                                        submitButtonTitle,
                                                        stepFormReducerDispatch,
                                                        submittedStep,
                                                        command,
                                                        schema,
                                                        validate,
                                                        initialState,
                                                        formSystemMessage,
                                                        stepButtonType,
                                                        dataPresentation
                                                    }) => {

    const FormTitle = <Typography variant='h6' align='left'> {title} </Typography>;

    const {
        handleChange,
        handleBlur,
        handleSubmit,
        handleSystemMessageClose,
        openSystemMessage,
        systemMessageType,
        values,
        buttonText,
        buttonDisabled,
        setValues,
        errors,
        errorMap,
        setErrorMap,
        setSystemMessageType,
        handleSpreadsheetChange,
        setSystemMessageOpen

    } = useForm({
        submittedStep,
        initialState,
        command,
        validate,
        schema
    });

    const stepCommandProps: StepCommand = {
        buttonDisabled: buttonDisabled,
        buttonText: buttonText,
        stepFormButtonType: stepButtonType as StepButtonType,
        stepFormReducerDispatch: stepFormReducerDispatch as React.Dispatch<StepAction>,
        values: values,
        setValues: setValues,
        errors: errors,
        errorMap: errorMap,
        setErrorMap: setErrorMap,
        handleBlur: handleBlur,
        setSystemMessageType: setSystemMessageType,
        setSystemMessageOpen: setSystemMessageOpen
    };

    const formButtonProps: FormButtonProps =
        stepCommandProps ?
            {submitButtonTitle: title, stepCommandProps: stepCommandProps} :
            {submitButtonTitle: title}


    return (
        <>
            {
                formSystemMessage &&
                <AutologSystemMessage
                    handleSystemMessageClose={handleSystemMessageClose}
                    messageSchema={formSystemMessage}
                    openAutologSystemMessage={openSystemMessage}
                    messageType={systemMessageType}
                />
            }
            <form onSubmit={handleSubmit}>
                <>{FormTitle}</>
                {/* Form inputs render */}
                {
                    <FormInputs
                        schema={schema}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        initialState={initialState}
                        handleSpreadsheetChange={handleSpreadsheetChange}
                        errorMap={errorMap}
                        dataPresentation={dataPresentation}
                    />
                }
                {/* Form Button */}
                {dataPresentation ? null: <FormButton {...formButtonProps}/>}
            </form>
        </>
    )
};