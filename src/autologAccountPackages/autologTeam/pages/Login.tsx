import * as React from "react";
import { GraphQLResult } from "@aws-amplify/api";
import { FunctionComponent } from "react";
import { LoginForm } from "../../../common/login/LoginForm";
import { Navbar } from "../../../common/navbar/Navbar";
import { useHistory } from "react-router-dom";
import Amplify, { Auth, API, graphqlOperation } from "aws-amplify";
import * as queries from "../../../graphql/queries";
import axios from "axios";
import { NewPasswordUp } from "./FirstLoginHandler";
const LoginNavBar = (
  <Navbar routes={[{ name: "Sign Up", path: "/#applyforanaccount" }]} />
);

interface authProps {
  // userMail: string;
  setCurUser: any;
}

//goes to LogHan Lambda function
async function getUserType(userName: string) {
  let loginHandlerURL =
    "https://gnxbsk31d7.execute-api.eu-west-1.amazonaws.com/default/loginHan-dev";

  try {
    return axios.post(loginHandlerURL, { userName });
  } catch (err) {
    console.log("error -> ", err);
  }
}

export const Login: FunctionComponent<authProps> = ({ setCurUser }) => {
  const history = useHistory();

  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [mailFirstLogin, setMailFirstLogin] = React.useState("");
  const [phoneFirstLogin, setPhoneFirstLogin] = React.useState("");

  const [islogged, setIslogged] = React.useState(false);
  const [cognitoUser, setCognitoUser] = React.useState(undefined);
  const [firstLogin, setFirstLogin] = React.useState(false);

  //Islogged is Positive Only after SuccesLogIn
  if (islogged) {
    if (cognitoUser !== undefined) {
      goToDashBoard();
    }
  }

  async function goToDashBoard() {
    if (cognitoUser !== undefined) {
      try {

        getUserType(userName).then((response) => {
          console.log("response from Lambda -> ", response);
          
          if (response?.status === 200) {
            switch (response.data) {
              case "Team":
                setCurUser({ userType: "Team", cognitoUser: cognitoUser });
                history.push("/dashboard");
                break;
              default:
                console.log("default!");
                break;
            }
          }
        });
      } catch (err) {
        console.log("error -> ", err);
      }
    }
  }

  const handleSubmit = async () => {
    let username = userName;
    try {
      Auth.signIn({
        username,
        password,
      }).then((user) => {
        console.log("login good, user -> ", user);

        if (user.challengeName) {
          if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
            //Setting for newPassword
            setMailFirstLogin(user.challengeParam.userAttributes.email);
            // setMailOfficial(user.challengeParam.userAttributes.email);
            setPhoneFirstLogin(user.challengeParam.userAttributes.phone_number);

            setFirstLogin(true);
          } else {
            console.log("no longer  NEW_PASSWORD_REQUIRED");
          }
        } else {
          setCognitoUser(user);
          setIslogged(true);
        }
      });
    } catch (err) {
      console.log("err login, -> ", err);
    }
  };

  const LoginFormEZ = (
    <div>
      <div className="field">
        <label htmlFor="name">UserName (email) </label>
        <input
          type="text"
          id="userName"
          name="userName"
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>{" "}
      <div className="field">
        <label htmlFor="name">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>{" "}
      <button onClick={handleSubmit}>Login</button>
    </div>
  );

  if (!firstLogin) {
    return (
      <div>
        {LoginNavBar}

        <br />
        <br />
        <br />
        {LoginFormEZ}
      </div>
    );
  } else {
    return (
      <NewPasswordUp
        setCognitoUser={setCognitoUser}
        setIslogged={setIslogged}
        username={userName}
        mailFirstLogin={mailFirstLogin}
        phoneFirstLogin={phoneFirstLogin}
      />
    );
  }
};

// const handleSubmit2 = async () => {
//   let username = userName;
//   try {
//     Auth.signIn({
//       username: "mail@gmail.com",
//       password: "12345678",
//     })
//       .then((user) => {
//         setMail(user.attributes.email);
//         setCognitoUser(user);
//         setIslogged(true);
//       })
//       .catch((err) => console.log(err));
//   } catch (err) {}
// };
