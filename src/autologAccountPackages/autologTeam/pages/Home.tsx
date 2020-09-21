import * as React from "react";
import {FunctionComponent} from "react";
import {Navbar} from "../../../common/navbar/Navbar";
import {ApplyForAnAccountForm} from "../../../autologServices/users/onboarding/ApplyForAnAccount/components/ApplyForAnAccountForm";
import {ProductDescription} from "../../../autologServices/users/onboarding/ApplyForAnAccount/components/ProductDescription";
import {LoginForm} from "../../../common/login/LoginForm";
import {createStyles, Divider, Theme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },

        section1: {
            margin: theme.spacing(3, 2),
        },
        section2: {
            margin: theme.spacing(2),
        },
        section3: {
            margin: theme.spacing(3, 1, 1),
        },
    }),
);


export const Home: FunctionComponent = () => {
    const classes = useStyles();
    return (
        <>
            <Navbar routes={[{name: 'Login', path: 'login'}]}/>
            <div className={classes.section1}>
                {ProductDescription}
            </div>

            <div className={classes.section1}>
                <Divider light/>
            </div>
            <div className={classes.section1}>
                {ApplyForAnAccountForm}
            </div>
        </>
    );
};


