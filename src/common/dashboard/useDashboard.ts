import React from "react";
import {makeStyles, Theme} from "@material-ui/core/styles";


const drawerWidth = 175;

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        overflow: "visible",
        whiteSpace: "normal",
        textTransform: 'none',
        fontWeight: theme.typography.fontWeightRegular,

    },
    tabs: {
        width: drawerWidth,
        marginTop: 96,
        height: 'calc(100% - 64px)',
    },
    drawer: {
        flexContainerVertical: 'true',
        width: drawerWidth,
        height: 'calc(100% - 64px)'
    },
    drawerPaper: {
        width: drawerWidth,
    },
}));


export function useDashboard() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return {
        classes,
        value,
        handleChange
    }
}