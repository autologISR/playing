import React from "react";


export function useTableRow() {
    const [entityDialogueOpened, setEntityDialogueOpened] = React.useState(false);

    const handleClickOpen = () => {
        setEntityDialogueOpened(true);
    };

    const handleClose = () => {
        setEntityDialogueOpened(false);
    };
    return { entityDialogueOpened, handleClickOpen, handleClose};
}