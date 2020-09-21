import React from "react";
import {MessageType} from "./useSystemMessages";

export interface AutologSystemMessageProps {
    messageSchema: AutologSystemMessageSchema;
    messageType: MessageType;
    openAutologSystemMessage: boolean;
    handleSystemMessageClose: (event?: React.SyntheticEvent, reason?: string) => void;
}


export type AutologSystemMessageSchema = Map<MessageType, { message: any }>;
