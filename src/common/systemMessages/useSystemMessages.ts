import React, {useState} from "react";
import {makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export type Message  = {messageType: MessageType, messageText: string}
export type MessageType = "error" | "success" | "info" | "warning";

export function useSystemMessages() {
    const systemMessageClasses = useStyles();
    const [openSystemMessage, setSystemMessageOpen] = React.useState(false);
    const [systemMessageType, setSystemMessageType] = useState<MessageType>('error');


    const handleSystemMessageClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSystemMessageOpen(false);
    };

    return {
        openSystemMessage,
        setSystemMessageOpen,
        handleSystemMessageClose,
        systemMessageClasses,
        systemMessageType,
        setSystemMessageType
    }
}