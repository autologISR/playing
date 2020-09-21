import React from "react";
import {AutologTableToolbarProps} from "./AutologTableTypes";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import FilterListIcon from "@material-ui/icons/FilterList";
import {
    AppBar,
    Button, Card,
    ExpansionPanel, ExpansionPanelDetails,
    ExpansionPanelSummary,
    Grid,
    List,
    ListItem,
    ListItemText,
    Menu,
    MenuItem
} from "@material-ui/core";
import {useTableToolbarMenu} from "./useTableToolbarMenu";
import {
    AutologToolbarMenuProps,
    TableMenuItemProps,
    TableMenuSelectProps,
    ToolbarMenuButtonProps, useToolbarStyles
} from "./autologTableToolbarTypes";
import {EntityKeyPair} from "../entityKeyPair";
import {InputField} from "../inputFields/InputField";
import {ChipsArray, useChipStyles} from "../chipsArray/ChipsArray";


export const TableMenuItem = ({tableName, handleChange, index, key}: TableMenuItemProps) =>
    <MenuItem
        key={key}
        onClick={event =>
            handleChange(event, tableName)
        }
        tabIndex={index}
        value={tableName}
    >
        {tableName}
    </MenuItem>;

export const TableMenuSelect = ({anchorEl, handleChange, handleClose, tableNames}: TableMenuSelectProps) =>
    <Menu
        id="demo-simple-select"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
    >
        {
            tableNames.map(
                (tableName, index) =>
                    <TableMenuItem
                        key={`${index}-${tableName}`}
                        index={index}
                        handleChange={handleChange}
                        tableName={tableName}
                    />
            )
        }
    </Menu>;


export const ToolbarMenuButton = (props: ToolbarMenuButtonProps) =>
    <Button style={{textTransform: 'none', fontSize: 16}} onClick={props.handleSetTableClick} size='medium'>
        {props.entitySelected}
    </Button>;

export const AutologToolbarMenu = (props: AutologToolbarMenuProps) => {

    const {anchorEl, handleSetTableClick, handleChange, handleClose} = useTableToolbarMenu(props.setTable);

    return (
        <>
            <ToolbarMenuButton handleSetTableClick={handleSetTableClick} entitySelected={props.entitySelected}/>
            <TableMenuSelect anchorEl={anchorEl} handleChange={handleChange} handleClose={handleClose}
                             tableNames={props.tableNames}/>
        </>
    );
}

export function useNewEntity() {
    const [entityDialogueOpen, setEntityDialogueOpen] = React.useState(false);
    const [openClosingWarning, setOpenClosingWarning] = React.useState(false);

    const handleClickOpen = () => {
        setEntityDialogueOpen(true);
    };

    const handleDialogueBeforeClosing = () => {
        setOpenClosingWarning(true);
    }

    const handleClose = (command: 'close' | 'continue') => () => {
        command === 'close' && setEntityDialogueOpen(false);
        setOpenClosingWarning(false);
    };
    return {
        entityDialogueOpened: entityDialogueOpen,
        handleClickOpen,
        handleClose,
        openClosingWarning,
        handleDialogueBeforeClosing
    };
}


interface AddOrRemoveHeadCellsProps {
    headersToChooseFrom: string[];
    selectedFieldName: string;
    setSelectedHeaderName: React.Dispatch<string>;
    fieldsToDisplay: Set<string>;
    chipClasses: Record<any, any>;
    handleDelete: (chipToDelete: string) => () => void;
    handleAdding: (fieldLabel: string) => () => void;
}

const handleBlur = () => {

}

const AddOrRemoveHeadCells = (props: AddOrRemoveHeadCellsProps) => {
    const {
        headersToChooseFrom,
        setSelectedHeaderName,
        fieldsToDisplay,
        chipClasses,
        handleDelete,
        selectedFieldName,
        handleAdding
    } = props;

    return (
        <Grid item container md={12} direction={'row'} spacing={1}>
            <Grid container direction={'row'} alignContent={'flex-end'} justify={'center'} item md={6}>
                <Grid item md={10}>
                    <InputField
                        label={'Add Headers'}
                        name={"tableHeaders"}
                        editor={'dropdown'}
                        options={headersToChooseFrom}
                        handleBlur={handleBlur}
                        required={false}
                        handleChange={e => setSelectedHeaderName(e.target.value)}
                        fullWidth={true}
                    />
                </Grid>
                <Grid item md={10}>
                    <Button
                        style={{textTransform: 'none', fontSize: 16, margin: 8}}
                        variant="contained"
                        disableElevation
                        color="inherit"
                        onClick={handleAdding(selectedFieldName)}
                    >
                        Add to Table
                    </Button>
                </Grid>
            </Grid>

            <Grid item md={6}>
                <ChipsArray
                    dataArray={Array.from(fieldsToDisplay) as string[]}
                    classes={chipClasses}
                    label={'Visible fields'}
                    handleDelete={handleDelete}
                />
            </Grid>
        </Grid>
    );
}

export const AutologTableToolbar = <T extends EntityKeyPair>(props: AutologTableToolbarProps<T>) => {
    const classes = useToolbarStyles();
    const {tableNames, setEntitySelected, tableSelected, handleClickOpen, entitySingularName, setFieldsToDisplay, fieldsToDisplay} = props;
    const [openFilter, setOpenFilter] = React.useState<boolean>(false);
    const [headersToChooseFrom, setHeadersToChooseFrom] = React.useState<string[]>([]);
    const [selectedHeaderName, setSelectedHeaderName] = React.useState<string>();
    const chipClasses = useChipStyles();

    const handleDeleteHeadCells = (chipToDelete: string) => () => {
        setFieldsToDisplay(new Set(Array.from(fieldsToDisplay).filter(key => key !== chipToDelete)));
        setHeadersToChooseFrom([...headersToChooseFrom, chipToDelete]);
    };

    const handleAddingHeadCells = (headerLabel: string) => () => {
        selectedHeaderName && setFieldsToDisplay(new Set(Array.from(fieldsToDisplay.add(headerLabel))));
        setHeadersToChooseFrom(headersToChooseFrom.filter(header => header !== headerLabel));
    }

    return (
            <Toolbar className={classes.root} variant={'dense'} onMouseOver={e => e.preventDefault()}>
                <Grid container direction={'column'}>
                    <Grid item md={12}>
                        <ExpansionPanel expanded={openFilter} variant={'outlined'}>
                            <Grid item container md={12} direction={'column'}>
                                <ExpansionPanelSummary
                                    className={classes.expansionPanelSummary}
                                    expandIcon={
                                        <FilterListIcon
                                            onClick={
                                                () =>
                                                    openFilter ?
                                                        setOpenFilter(false) :
                                                        setOpenFilter(true)
                                            }
                                        />
                                    }
                                    aria-controls="additional-actions1-content"
                                >
                                    <Grid container item md={tableSelected !==undefined && tableSelected.length >= 10 ? 3 : 1} justify={'flex-start'}>
                                        <Grid item style={{marginLeft: 12}}>
                                            {
                                                tableNames && setEntitySelected && tableSelected &&
                                                <AutologToolbarMenu
                                                    tableNames={tableNames}
                                                    setTable={setEntitySelected}
                                                    entitySelected={tableSelected}
                                                />
                                            }
                                        </Grid>
                                    </Grid>
                                    {/* Grid Space */}
                                    <Grid item lg={12}/>

                                    {/* New Entity Button */}
                                    <Grid container item lg={4} justify={'flex-end'}>
                                        <Button style={{textTransform: 'none', fontSize: 16}} onClick={handleClickOpen}
                                                size='medium'>
                                            Create New {entitySingularName}
                                        </Button>
                                    </Grid>
                                </ExpansionPanelSummary>
                            </Grid>
                            <ExpansionPanelDetails>
                                <AddOrRemoveHeadCells
                                    headersToChooseFrom={headersToChooseFrom}
                                    selectedFieldName={selectedHeaderName as string}
                                    setSelectedHeaderName={setSelectedHeaderName}
                                    fieldsToDisplay={fieldsToDisplay}
                                    chipClasses={chipClasses}
                                    handleDelete={handleDeleteHeadCells}
                                    handleAdding={handleAddingHeadCells}
                                />
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </Grid>
                </Grid>
            </Toolbar>
    );
};
