import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "./UserContext";
// This function will allow users to signout
const UserSignOut = () => {
  let [user, setUser] = useContext(UserContext);
  React.useEffect(() => {
    if (user) {
      setUser(null);
    }
  }, [user, setUser]); //will redirect to home screen
  return <Redirect to={"/"} />;
};

export default UserSignOut;
