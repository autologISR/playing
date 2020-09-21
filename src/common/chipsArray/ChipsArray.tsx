import {makeStyles} from "@material-ui/core/styles";
import {Box, Chip, createStyles, Grid, Paper, Theme} from "@material-ui/core";
import * as React from "react";

export const useChipStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            justifyContent: 'flex-start',
            flexWrap: 'wrap',
            listStyle: 'none',
            padding: theme.spacing(0.5),
            margin: 0,
            height: '35px'
        },
        chip: {
            margin: theme.spacing(0.5),
        },
    }),
);

export interface ChipsArrayProps {
    dataArray: any[],
    classes: Record<string, string>,
    label: string,
    handleDelete: (chipToDelete: string) => () => void,
}

export const filterDuplicateMembers = (dataArray: any[]) => Array.from(
    new Set(
        dataArray.map(value => value)
    )
);

export function ChipsArray(props: ChipsArrayProps) {
    const {classes, dataArray, handleDelete, label} = props;

    const chipsData = filterDuplicateMembers(dataArray).map(
        (data, index) => {
            return {key: index, label: data};
        }
    );

    return (
        <Grid container alignItems={'flex-start'} direction={'row'}>
            <Grid item xs={12}>
                <Box m={2} className={classes.chip}>{label}</Box>
            </Grid>
            <Grid item xs={12}>
                <Paper component="ul" variant={'outlined'} className={classes.root}>
                    {
                        chipsData.length > 0 &&
                        chipsData.map(
                            (data) => {
                                return (
                                    <li key={data.key}>
                                        <Chip
                                            className={classes.chip}
                                            label={data.label}
                                            onDelete={handleDelete(data.label)}
                                        />
                                    </li>
                                );
                            }
                        )
                    }
                </Paper>
            </Grid>
        </Grid>
    );
}

