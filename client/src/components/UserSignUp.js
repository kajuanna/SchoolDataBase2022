import React, { useContext } from "react";
import Header from "./Header";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "./UserContext";
//This function will allow users to create an account
const UserSignUp = () => {
  let history = useHistory();
  let [firstName, setFirstName] = React.useState("");
  let [lastName, setLastName] = React.useState("");
  let [email, setEmail] = React.useState("");
  let [user, setUser] = useContext(UserContext);
  let [password, setPassword] = React.useState("");
  let [confirmPassword, setConfirmPassword] = React.useState("");
  let [errors, setErrors] = React.useState(null);
  const signUp = async (e) => {
    e.preventDefault();
    //all fields should be completed if not the return alert will show
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return alert("All fields are required");
    }
    //checks for password match
    if (password !== confirmPassword) {
      return alert("Passwords do not match");
    }
    //calls the api
    fetch(`http://localhost:5000/api/users`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        emailAddress: email,
        password: password,
      }),
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })

      .then((userData) => {
        if (userData.errors) {
          return setErrors(userData.errors);
        }
        setUser({
          id: userData.id,
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.emailAddress,
          password: password,
        });
        history.push("/");
      })
      .catch((error) => {});
  };
  return (
    <div id="root">
      <Header user={user} />
      <main>
        <div className="form--centered">
          <h2>Sign Up</h2>
          {errors && (
            <div className="validation--errors">
              <h3>Validation Errors</h3>
              <ul>
                {/* map errors */}
                {errors.map((error) => {
                  return <li>{error.message}</li>;
                })}
              </ul>
            </div>
          )}
          <form
            onSubmit={(e) => {
              signUp(e);
            }}
          >
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <label htmlFor="emailAddress">Email Address</label>
            <input
              id="emailAddress"
              name="emailAddress"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              mendLink="6"
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button className="button" type="submit">
              Sign Up
            </button>
            <button
              className="button button-secondary"
              onClick={() => {
                history.push("/");
              }}
            >
              Cancel
            </button>
          </form>
          <p>
            Already have a user account? Click here to{" "}
            <Link to="/signin">sign in</Link>!
          </p>
        </div>
      </main>
    </div>
  );
};

export default UserSignUp;
