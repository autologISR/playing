import {Button, Dialog, DialogActions, DialogContent, DialogContentText} from "@material-ui/core";
import React from "react";

export interface WarningDialogueProps {
    openClosingWarning: boolean;
    handleClose: (command: ("close" | "continue")) => () => void;
    warningDialogueText: string;
}

export const WarningDialogue = (props: WarningDialogueProps) =>
    <Dialog open={props.openClosingWarning}>
        <DialogContent>
            <DialogContentText style={{fontSize: 20}} id="alert-dialog-description">
                {props.warningDialogueText}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={props.handleClose('close')}>
                Close
            </Button>
            <Button onClick={props.handleClose('continue')} autoFocus>
                Cancel
            </Button>
        </DialogActions>
    </Dialog>;