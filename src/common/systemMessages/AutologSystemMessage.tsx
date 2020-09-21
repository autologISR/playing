import React from "react";
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import {Snackbar} from '@material-ui/core';
import {AutologSystemMessageProps, AutologSystemMessageSchema} from "./autologSystemMessageTypes";
import {makeStyles, Theme} from "@material-ui/core/styles";

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
        anchor: 'top',
    },
}));

export const messageContent = (messageType: "error" | "success" | "info" | "warning", messageSchema: AutologSystemMessageSchema) => {
    return messageSchema.get(messageType);
};

export const AutologSystemMessage: React.FunctionComponent<AutologSystemMessageProps> = (props: AutologSystemMessageProps) => {
    const {messageSchema, messageType, handleSystemMessageClose, openAutologSystemMessage} = props;
    const classes = useStyles();
    const messageObj = messageContent(messageType, messageSchema);
    return (
        <div className={classes.root}>
            <Snackbar open={openAutologSystemMessage} autoHideDuration={4000} onClose={handleSystemMessageClose}>
                <Alert style={{fontSize: 20}} icon={false} onClose={handleSystemMessageClose} variant='filled'
                       severity={messageType}>
                    {messageObj && messageObj.message}
                </Alert>
            </Snackbar>
        </div>
    );
};
