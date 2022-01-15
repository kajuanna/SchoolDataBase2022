import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "./UserContext";
// This function creates course  & fetch api
const CreateCourse = () => {
  let [user] = useContext(UserContext);
  let history = useHistory();
  let [errors, setErrors] = React.useState(null);
  let [title, setTitle] = React.useState("");
  let [description, setDescription] = React.useState("");
  let [estimatedTime, setEstimatedTime] = React.useState("");
  let [materialsNeeded, setMaterialsNeeded] = React.useState("");

  const createCourseData = (e) => {
    e.preventDefault();
    setErrors(null);

    if (!user) {
      return "You must be signed in to create a course";
    }
    //This statement will fetch api
    fetch(`http://localhost:5000/api/courses`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        Authorization: "Basic " + btoa(`${user.email}:${user.password}`),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user.id,
        title: title,
        description: description,
        estimatedTime: estimatedTime,
        materialsNeeded: materialsNeeded,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((course) => {
        console.log(course);
        if (course.errors) {
          return setErrors(course.errors);
        }
        history.push(`/courses/${course.id}`);
      })
      .catch((error) => {
        console.log(error);
        setErrors(error);
      });
  };

  return (
    <div>
      <main>
        <div className="wrap">
          <h2>Create Course</h2>

          {errors && (
            <div className="validation--errors">
              <h3>Validation Errors</h3>
              <ul>
                {errors.map((error, index) => {
                  return <li key={index}>{error.message}</li>;
                })}
              </ul>
            </div>
          )}
          {/* On submit will create the course*/}
          <form
            onSubmit={(e) => {
              createCourseData(e);
            }}
          >
            <div className="main--flex">
              <div>
                <label htmlFor="courseTitle">Course Title</label>
                <input
                  id="courseTitle"
                  name="courseTitle"
                  type="text"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
                {user && (
                  <p>
                    By {user.firstName} {user.lastName}
                  </p>
                )}

                <label htmlFor="courseDescription">Course Description</label>
                <textarea
                  id="courseDescription"
                  name="courseDescription"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                ></textarea>
              </div>
              <div>
                <label htmlFor="estimatedTime">Estimated Time</label>
                <input
                  id="estimatedTime"
                  name="estimatedTime"
                  type="text"
                  value={estimatedTime}
                  onChange={(e) => {
                    setEstimatedTime(e.target.value);
                  }}
                />

                <label htmlFor="materialsNeeded">Materials Needed</label>
                <textarea
                  id="materialsNeeded"
                  name="materialsNeeded"
                  value={materialsNeeded}
                  onChange={(e) => {
                    setMaterialsNeeded(e.target.value);
                  }}
                ></textarea>
              </div>
            </div>
            <button className="button" type="submit">
              Create Course
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
        </div>
      </main>
    </div>
  );
};

export default CreateCourse;
