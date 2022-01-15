import { Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./UserContext";

const PrivateRoute = ({ children, ...otherProps }) => {
  let [user] = useContext(UserContext);
  return (
    <Route
      {...otherProps}
      render={(props) => (user !== null ? children : <Redirect to="/signin" />)}
    />
  );
};

export default PrivateRoute;
