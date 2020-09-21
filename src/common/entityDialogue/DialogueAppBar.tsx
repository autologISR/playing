import React from "react";
import {AppBar, createStyles, IconButton, makeStyles, Theme, Toolbar, Typography} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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


export interface DialogueAppBarProps {
    title: string;
    handleClose: () => void;
}

export const DialogueAppBar = (props: DialogueAppBarProps) => {
    const {handleClose, title} = props;
    const classes = useStyles();
    return (
        <AppBar variant='outlined' position="static" color="inherit" className={classes.appBar}>
            <Toolbar>
                <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                    <CloseIcon/>
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    {title}
                </Typography>
            </Toolbar>
        </AppBar>
    )
};