import React, {ChangeEvent} from "react";


export function useTableToolbarMenu(setTable: any) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const handleSetTableClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChange = (event: ChangeEvent<any>, tableName: string) => {
        setTable(tableName);
        handleClose();
    };
    return {
        anchorEl,
        handleSetTableClick ,
        handleChange,
        handleClose
    }
}