import * as React from "react";
import {Container, Grid} from "@material-ui/core";
import {Form} from "../form/Form";
import {FunctionComponent} from "react";
import Amplify, { Auth } from 'aws-amplify';
import {IValues} from "../form/formTypes";
import awsconfig from '../../aws-exports';
import {AutologSystemMessageSchema} from "../systemMessages/autologSystemMessageTypes";


Amplify.configure(awsconfig);

const validate = () => {
    return {}
};



type OnSuccessFunction = (user:any) => void
type Props = { onLogIn:OnSuccessFunction }


const logInWithCallback = ( onSuccess: OnSuccessFunction) => {

    return (
        (loginFormValues: IValues) => {
            const {username, password} = loginFormValues;
        
            Auth.signIn({
                username,
                password,
            }).then((user) => {

                onSuccess(user)
                           
            }).catch(err => console.log(err));
        }
    )
}

export const formSystemMessageConstructor = (username?: string): AutologSystemMessageSchema => new Map([
    ['success', {
        message: `Welcome to Autolog ${username}.`
    }],
    ['error', {
        message: 'Username/password incorrect'
    }],
]);



export const LoginForm: FunctionComponent< Props > = (props:Props) => {

    const formSystemMessages = formSystemMessageConstructor();
    return(
        <Grid
            container={true}
            direction="column"
            justify="center"
            alignItems="center">
            <Container maxWidth="md">
                <Form
                    title="Log in to Autolog:"
                    submitButtonTitle="Login"
                    command={logInWithCallback( props.onLogIn )}
                    validate={validate}
                    schema={[{name: "username", label: "Email", editor: "email"},
                        {name: "password", label: "Password", editor: "password"}]}
                    formSystemMessage={formSystemMessages}
                />
                
            </Container>
        </Grid>);
};



// const logInValidation = (loginFormValues: IValues) => {
//     const {username, password} = loginFormValues;

//     Auth.signIn({
//         username,
//         password,
//     }).then((user) => {
//         console.log(user)
        
//     }).catch(err => console.log(err));
// };