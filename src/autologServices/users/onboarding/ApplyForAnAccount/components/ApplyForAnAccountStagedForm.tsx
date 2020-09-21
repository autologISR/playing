import React from "react";
import StepFormComponent from "../../../../../common/stepForm/StepForm";
import {createCompanyAccountSchema} from '../../../UsersDashboardSection';

export default function ApplyForAnAccountStagedForm() {
    return (
        <StepFormComponent
            sourceStage={createCompanyAccountSchema.sourceStage}
            command={createCompanyAccountSchema.command}
            newEntityStepForm={createCompanyAccountSchema.newEntityStepForm}
            validate={createCompanyAccountSchema.validate}
            formSystemMessage={createCompanyAccountSchema.formSystemMessage}
        />
    );
}