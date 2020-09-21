import React, { useState } from "react";
// import Amplify, { Auth, API, graphqlOperation } from "aws-amplify";
import { Auth } from "aws-amplify";

interface user {
  setCognitoUser: any;
  setIslogged: any;
  username: string;
  mailFirstLogin: string;
  phoneFirstLogin: string;
}
export const NewPasswordUp: React.FC<user> = ({
  setCognitoUser,
  setIslogged,
  username,
  mailFirstLogin,
  phoneFirstLogin,
}: user) => {
  const [newPass, setNewPass] = useState("");

  async function handleSubmit() {
    Auth.signIn(username, "12345678")
      .then((user) => {
        if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
          const { requiredAttributes } = user.challengeParam;
          console.log("requiredAttributes -> ", requiredAttributes); // the array of required attributes, e.g ['email', 'phone_number']
          Auth.completeNewPassword(
            user, // the Cognito User Object
            newPass, // the new password
            // OPTIONAL, the required attributes
            {
              email: mailFirstLogin,
              phone_number: phoneFirstLogin,
            }
          )
            .then((user) => {
              // at this time the user is logged in if no MFA required
              console.log("suscces changing password ! ", user);
              setCognitoUser(user);
              setIslogged(true)
            })
            .catch((e) => {
              console.log(e);
            });
        } else {
          // other situations
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div>
      <input
        type="text"
        id="password"
        name="password"
        onChange={(e) => setNewPass(e.target.value)}
      />
      <button onClick={handleSubmit}>Set new password</button>
    </div>
  );
};
