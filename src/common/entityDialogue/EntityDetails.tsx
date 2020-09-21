import {IFormProps, IValues} from "../form/formTypes";
import {StepAction, StepFormDataStore} from "../stepForm/StepForm";
import React from "react";
import {Divider, Grid} from "@material-ui/core";
import {Form} from "../form/Form";
import {StepsCallback} from "../stepForm/stepFormTypes";

export interface EntityDetailsParams {
    stepFormMap: Map<string, IFormProps>;
    stepFormDataStore: Map<string, IValues | {}>;
    stepsCallBack: StepsCallback,
    sourceStep: string,
    entitySingularName?: string;
}

export interface ReadOnlyInputsProps {
    steps: string[];
    stepFormMap: Map<string, IFormProps>;
    stepFormDataStore: Map<string, IValues>;
}

export const ReadOnlyInputs = (props: ReadOnlyInputsProps) =>
    <Grid container alignContent={'stretch'} alignItems={'flex-start'} direction={'row'}>
        {
            props.steps.map(
                (step, index) => {
                    const form = props.stepFormMap.get(step);
                    const initialValue = props.stepFormDataStore.get(step);

                    return (
                        <Grid item xs={12}>
                            <Form
                                {
                                    ...{
                                        ...form,
                                        dataPresentation: true,
                                        initialState: initialValue
                                    } as IFormProps
                                }
                            />
                            {
                                index === props.steps.length - 1 ?
                                    null :
                                    <Divider style={{marginTop: 16, marginBottom: 10}}/>
                            }
                        </Grid>
                    )
                }
            )
        }
    </Grid>;


export const EntityDetails = (props: EntityDetailsParams) => {
    const {stepFormMap, stepFormDataStore, stepsCallBack, sourceStep} = props;
    const steps = stepsCallBack({stageValues: stepFormDataStore.get(sourceStep) as IValues});

    return <ReadOnlyInputs stepFormMap={stepFormMap} steps={steps} stepFormDataStore={stepFormDataStore}/>;

}