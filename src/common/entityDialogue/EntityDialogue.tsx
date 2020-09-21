import React from "react";
import {createStyles, Dialog, DialogContent, makeStyles, Slide, Theme} from "@material-ui/core";
import {TransitionProps} from '@material-ui/core/transitions';
import {DialogueAppBar} from "./DialogueAppBar";
import {StepFormSchema} from "../stepForm/stepFormTypes";
import {EntityDetailsParams} from "./EntityDetails";


export interface EntityDialogueProps {
    title: string;
    entityDialogueOpened: boolean | undefined;
    handleCloseDialogueBeforeClosing: () => void;
    handleClose?: (command: 'close' | 'continue') => () => void;
    newEntityProps?: StepFormSchema;
    newEntityComponent?: (props: StepFormSchema) => JSX.Element;
    entityDetailsProps?: EntityDetailsParams;
    entityDetailsComponent?: (props: EntityDetailsParams) => JSX.Element;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            backgroundColor: theme.palette.background.paper,
            overflow: "visible",
            whiteSpace: "normal",
            textTransform: 'none',
            fontWeight: theme.typography.fontWeightRegular,

        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            width: '100%',
        },
        title: {
            marginLeft: theme.spacing(2),
            flex: 1,
        },
    }),
);


const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props as React.PropsWithChildren<any>} />;
});

/*TODO Build this into a wrap, pass the props of the dialogue render and apply within the component*/
export const EntityDialogue = (props: EntityDialogueProps) => {
    const {title, entityDialogueOpened, handleClose,handleCloseDialogueBeforeClosing,  newEntityProps, newEntityComponent, entityDetailsProps, entityDetailsComponent} = props;
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {
                entityDialogueOpened &&
                <Dialog
                    fullScreen
                    open={entityDialogueOpened}
                    onClose={handleClose}
                    onEscapeKeyDown={(e) => {
                        handleCloseDialogueBeforeClosing();
                    }}
                    TransitionComponent={Transition}
                >
                    <DialogueAppBar
                        handleClose={handleCloseDialogueBeforeClosing}
                        title={title}
                    />
                    <DialogContent>{
                        newEntityComponent !== undefined &&
                        newEntityProps !== undefined ?
                            newEntityComponent(newEntityProps) :
                            entityDetailsComponent !== undefined &&
                            entityDetailsProps !== undefined &&
                            entityDetailsComponent(entityDetailsProps)
                    }
                    </DialogContent>
                </Dialog>
            }
        </div>
    );
};