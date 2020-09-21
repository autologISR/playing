import React, {Dispatch} from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

export interface AutologToolbarMenuProps {
    tableNames: string[];
    setTable: Dispatch<any>;
    entitySelected: string
}

export interface TableMenuItemProps {
    key: string;
    handleChange: (event: React.MouseEvent<HTMLElement>, tableName: string) => void;
    tableName: string;
    index: number;
}

export interface TableMenuSelectProps {
    anchorEl: null | HTMLElement,
    handleClose: (event: React.MouseEvent<HTMLElement>) => void,
    tableNames: string[],
    handleChange: (event: React.MouseEvent<HTMLElement>, tableName: string) => void
}

export interface ToolbarMenuButtonProps {
    handleSetTableClick: (event: React.MouseEvent<HTMLElement>) => void,
    entitySelected: string
}

export const useToolbarStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            verticalAlign: 'middle',
            padding: 0,
            border: 0,
            elevation: 0,
            width: '100%',

        },
        appBar: {
            top: '66px',
            color: 'white'
        },

        highlight: {
            color: theme.palette.text.primary,
            backgroundColor: 'primary',
        },
        expansionPanelSummary: {
            height: 85,

        },
        button: {
            textTransform: 'none',
        },

    }),
);