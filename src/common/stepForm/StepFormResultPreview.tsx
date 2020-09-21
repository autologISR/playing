import {IValues} from "../form/formTypes";
import {SpreadSheetReviewLinkToDialogue} from "./SpreadsheetPreviewTable";
import {Box, Container, Drawer, Grid, Typography} from "@material-ui/core";
import React from "react";
import {SpreadsheetTableReducerParams} from "./StepForm";
import {
    convertToReadOnly,
    MyReactDataSheet
} from "../inputFields/inputFieldComponents/spreadsheetInput/spreadsheetInputTypes";
import {
    defaultCellRenderer,
    defaultValueRenderer
} from "../inputFields/inputFieldComponents/spreadsheetInput/SpreadsheetInput";
import {Editor} from "../inputFields/FieldTypes";

export const deserializeSpreadsheet = (value: string) =>
    JSON.parse(value);

interface FormPreviewValueElementProps {
    classes: Record<any, any>;
    title: string;
    previewAndFieldValue: JSX.Element[];
}

const FormPreviewValueElement = (props: FormPreviewValueElementProps) =>
    <>
        <Typography color='primary' style={{fontSize: 22}}>
            {props.title}
        </Typography>
        {
            props.previewAndFieldValue.map(
                (fieldValue) => {
                    return <Box display='flex'>{fieldValue}</Box>;
                }
            )
        }
    </>;

export const PreviousResultField = (fieldType: string, fieldValue: any) =>
    <Box display='flex' padding={1}>
        <Box order={1} fontSize={20} fontWeight={600} m={1}>
            {fieldType}
        </Box>
        <Box order={2} fontSize={20} m={1}>
            {fieldValue}
        </Box>
    </Box>;

export function getKeyValueArray(values: IValues) {
    const keyValueArray = [];
    for (let key in values) {
        keyValueArray.push([key, values[key]])
    }
    return keyValueArray;
}

interface ReviewElementArrayProps {
    title: string;
    values: IValues;
    spreadsheetOpenMap: { openMap: Map<string, boolean> },
    dispatchOpenOrCloseSpreadsheet: React.Dispatch<SpreadsheetTableReducerParams>
    nextStepIsReview: boolean;
}

export function reviewElementArray(props: ReviewElementArrayProps) {
    const {title, values, spreadsheetOpenMap, dispatchOpenOrCloseSpreadsheet, nextStepIsReview} = props;
    const formStagePreview: [string, Editor | "", JSX.Element[]] = [title, "", []];
    const keyValueArray = getKeyValueArray(values);
    keyValueArray.forEach(
        (field) => {
             formStagePreview[1] = field[1][2];
            field[1][2] === 'spreadsheet' ?
                nextStepIsReview ?
                    (
                        formStagePreview[2].push(
                            <>
                                {
                                    deserializeSpreadsheet(field[1][1]).columnMetadataTable !== undefined &&
                                    <MyReactDataSheet
                                        data={convertToReadOnly(deserializeSpreadsheet(field[1][1]).columnMetadataTable)}
                                        valueRenderer={defaultValueRenderer}
                                        cellRenderer={defaultCellRenderer()}
                                    />
                                }
                                <MyReactDataSheet
                                    data={convertToReadOnly(deserializeSpreadsheet(field[1][1]).grid)}
                                    valueRenderer={defaultValueRenderer}
                                    cellRenderer={defaultCellRenderer()}
                                />
                            </>
                        )
                    ) :
                    formStagePreview[2].push(
                        <SpreadSheetReviewLinkToDialogue
                            title={title}
                            field={field[1][0]}
                            sheet={deserializeSpreadsheet(field[1][1])}
                            spreadsheetPreviewOpen={spreadsheetOpenMap}
                            dispatchOpenOrCloseSpreadsheet={dispatchOpenOrCloseSpreadsheet}
                        />
                    ) :
                formStagePreview[2].push(PreviousResultField(field[1][0], field[1][1]));
        });
    return formStagePreview;
}

interface FormResultPreviewProps {
    formResultPreview: [string, Editor | "", JSX.Element[]][],
    classes: Record<any, any>;

}

export const FormResultPreview = (props: FormResultPreviewProps) =>
    <Drawer
        classes={{paper: props.classes.drawerPaper,}}
        variant='permanent'
        anchor="left"
        className={props.classes.drawer}>

        <Grid
            container={true}
            direction="column"
            justify="center"
            alignItems="center"
        >
            <Container className={props.classes.formPreview}>
                {
                    props.formResultPreview.map(
                        ([title, editor, previewAndFieldValue]) =>
                            <FormPreviewValueElement
                                classes={props.classes}
                                title={title}
                                previewAndFieldValue={previewAndFieldValue}
                            />
                    )
                }
            </Container>
        </Grid>
    </Drawer>;