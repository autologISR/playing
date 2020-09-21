import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import {Box, Drawer, Grid, Tab, Typography} from "@material-ui/core";
import {Navbar} from "../navbar/Navbar";
import {useDashboard} from "./useDashboard";
import {AutologDashboardProps, TabPanelProps} from "./autologDashboardTypes";

const TabPanel = (props: TabPanelProps) => {
    const {children, value, index, ...other} = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={2}>{children}</Box>}
        </Typography>
    );
}

function a11yProps(index: any) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const TableComponentRender = (props: { serviceComponents: Array<React.FunctionComponent<Array<any>>>, value: any, }) =>
    <>
        {
            props.serviceComponents.map(
                (AutologTableComponentArr, index) =>
                    <TabPanel key={`${index}-${props.value}`} value={props.value} index={index}>
                        {AutologTableComponentArr}
                    </TabPanel>
            )
        }
    </>;

interface DashboardTabProps {
    classes: Record<any, any>,
    value: number,
    handleChange: (event: React.ChangeEvent<{}>, newValue: number) => void,
    tabValues: string[]
}

const DashboardTabs = (props: DashboardTabProps) =>
    <Drawer
        className={props.classes.drawer}
        variant="permanent"
        classes={{paper: props.classes.drawerPaper,}}
        anchor="left"
    >
        <Tabs
            orientation="vertical"
            variant="fullWidth"
            value={props.value}
            onChange={props.handleChange}
            aria-label="Dashboard tabs"
            className={props.classes.tabs}
        >
            {
                props.tabValues.map(
                    (tabValue, index) =>
                        <Tab
                            key={`${index}-${tabValue}`}
                            style={{textTransform: 'none', fontSize:18}}
                            label={tabValue} {...a11yProps(index)}
                        />
                )
            }
        </Tabs>
    </Drawer>;

const routes = () => [{name: 'Account', path: 'account'}, {name: 'Logout', path: 'logout'}];

const homeRoute = () => {
    return {name: 'Autolog Dashboard', path: "/dashboard"};
};

export default function AutologDashboard({tabValues, serviceComponents}: AutologDashboardProps) {
    const {classes, value, handleChange} = useDashboard();



    return (
        <Grid container direction={'row'}>
            <Grid item lg={12}>
                <Navbar
                    routes={routes()}
                    homeRoute={homeRoute()}
                />
            </Grid>
            <Grid container item lg={12} direction={'row'}>
                <Grid item xs={1}>
                    <DashboardTabs
                        classes={classes}
                        value={value}
                        handleChange={handleChange}
                        tabValues={tabValues}
                    />
                </Grid>
                <Grid item md={11}>
                    <TableComponentRender serviceComponents={serviceComponents} value={value}/>
                </Grid>
            </Grid>
        </Grid>
    );
};

