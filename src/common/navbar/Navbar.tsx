import {AppBar, Button, createStyles, makeStyles, Theme, Toolbar, Link, Typography, Grid} from "@material-ui/core";
import * as React from "react";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            // flexGrow: 2,
            marginBottom: theme.spacing(7),
        },
        menuButton: {
            marginRight: theme.spacing(2),
            textTransform: 'none',
            fontSize: 18
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            width: '100%',
            verticalAlign: 'middle'
        },

    }),
);


export interface IRoute {
    name: string;
    path: string;
}

export interface IWithNavigationProps {
    /** attached through withRoutes: a list of all the specified <Route /> components in our app */
    routes: Array<IRoute>
    homeRoute?: IRoute
}

export const Navbar: React.FunctionComponent<IWithNavigationProps> = ({routes, homeRoute}) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar variant='outlined' position="fixed" color="inherit" className={classes.appBar}>
                <Toolbar>
                    <Grid container direction={'row'} spacing={8}>
                        <Grid item xs={2}>
                            <Link underline='none' href={homeRoute ? `${homeRoute.path}` : "/"}>
                                <Typography variant='h6' gutterBottom>
                                    {homeRoute ? homeRoute.name : 'Autolog'}
                                </Typography>
                            </Link>
                        </Grid>
                        <Grid item lg={8}/>
                        <Grid container item md={2} justify={'space-evenly'}>
                            {
                                routes.map(
                                    (route, index) =>
                                        <Grid item>
                                            <Button key={"Route_" + index} className={classes.menuButton} href={route.path}>
                                                {
                                                    /** display the name of the <Button /> component*/
                                                    route.name
                                                }
                                            </Button>
                                        </Grid>

                                )
                            }
                        </Grid>

                    </Grid>
                </Toolbar>

            </AppBar>
        </div>
    );
};


