import {Container, Grid} from "@material-ui/core";
import {Form} from "../../../../../common/form/Form";
import * as React from "react";
import {CreateAccountApplicationSubmissions} from "../applyForAnAccountCommands";
import {AutologSystemMessageSchema} from "../../../../../common/systemMessages/autologSystemMessageTypes";
import {companyAccountGeneralInfoForm} from "../../../UsersDashboardSection";


const validate = () => {
    return {}
};

const applyForAccountSystemMessages: AutologSystemMessageSchema = new Map([
    ['success', {
        message: 'Thank you. One of our team members will be contacting you soon.'
    }],
    ['error', {
        message: 'There was an error during submission, please try again.'
    }],

]);


// @ts-ignore
export const ApplyForAnAccountForm =
    <Grid
        container={true}
        direction="column"
        justify="center"
        alignItems="center">
        <Container maxWidth="md">
            <Form
                title="Apply for an Account:"
                submitButtonTitle="Apply"
                command={CreateAccountApplicationSubmissions}
                validate={validate}
                schema={companyAccountGeneralInfoForm}
                formSystemMessage={applyForAccountSystemMessages}
            />
        </Container>
    </Grid
    >;