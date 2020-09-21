import {
    Box,
    Dialog, Grid,
    Link,
    Slide,
} from "@material-ui/core";
import React from "react";
import {TransitionProps} from "@material-ui/core/transitions";
import {DialogueAppBar} from "../entityDialogue/DialogueAppBar";
import {SpreadsheetTableReducerParams} from "./StepForm";
import {
    defaultCellRenderer,
    defaultValueRenderer,
} from "../inputFields/inputFieldComponents/spreadsheetInput/SpreadsheetInput";
import {
    convertToReadOnly,
    GridElement,
    MyReactDataSheet
} from "../inputFields/inputFieldComponents/spreadsheetInput/spreadsheetInputTypes";
import {deserializeSpreadsheet} from "./StepFormResultPreview";

interface SpreadSheetPreviewTable {
    title: string;
    sheet: { grid: GridElement[][], columnMetadataTable?: GridElement[][] };
    open: boolean;
    handleClose: () => void
}

const Transition = React.forwardRef<unknown, TransitionProps>(
    function Transition(
        props,
        ref
    ) {
        return <Slide direction="up" ref={ref} {...(props as React.PropsWithChildren<any>)} />;
    });


const SpreadSheetPreviewTable = (props: SpreadSheetPreviewTable) => {
    const {title, sheet, open, handleClose} = props;


    return (
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <DialogueAppBar title={title} handleClose={handleClose}/>
            <Grid container direction={'row'} justify={'center'} spacing={2}
                  style={{padding: 50, verticalAlign: 'middle'}}>
                {
                    sheet.columnMetadataTable !== undefined &&
                    <Grid xs={8} justify={'center'} item>
                        <MyReactDataSheet
                            data={convertToReadOnly(sheet.columnMetadataTable)}
                            valueRenderer={defaultValueRenderer}
                            cellRenderer={defaultCellRenderer()}
                        />
                    </Grid>
                }
                <Grid xs={8} justify={'center'} item>
                    <MyReactDataSheet
                        data={convertToReadOnly(sheet.grid)}
                        valueRenderer={defaultValueRenderer}
                        cellRenderer={defaultCellRenderer()}
                    />
                </Grid>
            </Grid>
        </Dialog>
    )
};

export interface SpreadsheetReviewLinkToDialogue {
    title: string;
    field: string;
    sheet: { grid: GridElement[][], columnMetadataTable?: GridElement[][] };
    spreadsheetPreviewOpen: { openMap: Map<string, boolean> };
    dispatchOpenOrCloseSpreadsheet: React.Dispatch<SpreadsheetTableReducerParams>
}

export const SpreadSheetReviewLinkToDialogue = (props: SpreadsheetReviewLinkToDialogue) => {
    const {title, field, sheet, spreadsheetPreviewOpen, dispatchOpenOrCloseSpreadsheet} = props;
    const previewBool =
        spreadsheetPreviewOpen.openMap !== undefined &&
        spreadsheetPreviewOpen.openMap.get(field);

    return (
        <>
            {
                previewBool &&

                <SpreadSheetPreviewTable
                    handleClose={
                        () => dispatchOpenOrCloseSpreadsheet(
                            {
                                actionName: 'close',
                                spreadsheetName: field,
                                stepMap: undefined,
                                steps: undefined
                            }
                        )
                    }
                    title={title}
                    sheet={sheet}
                    open={previewBool}
                />
            }
            <Box display='flex' padding={1}>
                <Box m={1}>
                    <Link
                        onClick={
                            () => dispatchOpenOrCloseSpreadsheet({
                                actionName: 'open',
                                spreadsheetName: field,
                                stepMap: undefined,
                                steps: undefined
                            })
                        }
                        underline='always'>
                        {field}
                    </Link>
                </Box>
            </Box>
        </>)
};
