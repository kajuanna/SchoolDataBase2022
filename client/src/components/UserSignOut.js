import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "./UserContext";
// This function will allow users to signout
const UserSignOut = () => {
  let value = useContext(UserContext);
  React.useEffect(() => {
    value.signOut();
  }); //will redirect to home screen
  return <Redirect to={"/"} />;
};

export default UserSignOut;
