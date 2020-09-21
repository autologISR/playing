import * as React from "react";
import {FunctionComponent} from "react";
import {LoginForm} from "../../../common/login/LoginForm";
import {Navbar} from "../../../common/navbar/Navbar";
import { useHistory } from "react-router-dom";


const LoginNavBar = <Navbar routes={[{name: 'Sign Up', path: '/#applyforanaccount'}]}/>;

export const Login: FunctionComponent = () => {
    const history = useHistory();

    const [islogged, setIslogged] = React.useState(false)
    console.log("islogged -> " + islogged)

    if (islogged){
        history.push("/Dashboard");    
    }
    
    return (
        <>
            {LoginNavBar},
            <LoginForm  onLogIn = { () =>  setIslogged(true)}/>
        </>
    );
};

