import React, { useContext } from "react";
import Header from "./Header";
import { useHistory, useParams } from "react-router-dom";
import { UserContext } from "./UserContext";
// Function will update course and fetch api
const UpdateCourse = () => {
  let { id } = useParams();
  let history = useHistory();
  let [user] = useContext(UserContext);
  let [updateCourseData, setUpdateCourseData] = React.useState("");
  let [errors, setErrors] = React.useState(null);
  React.useEffect(() => {
    fetch(`http://localhost:5000/api/courses/${id}`, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((course) => {
        console.log(course);
        if (course.errors) {
          return setErrors(course.errors);
        }
        setUpdateCourseData(course);
      })
      .catch((error) => {
        // setErrors(error);
        console.log(error);
      });
    return () => {};
  }, [id]);

  const updateData = (e) => {
    e.preventDefault();
    if (!user) {
      return alert("You must be signed in to update a course");
    }

    fetch(`http://localhost:5000/api/courses/${id}`, {
      method: "PUT",
      mode: "cors",
      cache: "no-cache",
      headers: {
        Authorization: "Basic " + btoa(`${user.email}:${user.password}`),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateCourseData),
    })
      .then((res) => {
        if (res.status !== 204) {
          return res.json();
        }
        return res.text();
      })
      .then((data) => {
        if (typeof data === "object" && data.errors) {
          return setErrors(data.errors);
        } else {
          history.push(`/courses/${id}`);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div>
      <Header user={user} />
      <main>
        {updateCourseData && (
          <>
            <div class="wrap">
              <h2>Update Course</h2>
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
              <form
                onSubmit={(e) => {
                  updateData(e);
                }}
              >
                <div class="main--flex">
                  <div>
                    <label htmlFor="courseTitle">Title</label>
                    <input
                      id="courseTitle"
                      name="courseTitle"
                      type="text"
                      value={updateCourseData.title}
                      onChange={(e) => {
                        setUpdateCourseData({
                          ...updateCourseData,
                          title: e.target.value,
                        });
                      }}
                    />

                    <p>
                      By {user.firstName} {user.lastName}
                    </p>

                    <label htmlFor="courseDescription">
                      Course Description
                    </label>
                    <textarea
                      id="courseDescription"
                      name="courseDescription"
                      value={updateCourseData.description}
                      onChange={(e) => {
                        setUpdateCourseData({
                          ...updateCourseData,
                          description: e.target.value,
                        });
                      }}
                    ></textarea>
                  </div>
                  <div>
                    <label htmlFor="estimatedTime">Estimated Time</label>
                    <input
                      id="estimatedTime"
                      name="estimatedTime"
                      type="text"
                      value={updateCourseData.estimatedTime}
                      onChange={(e) => {
                        setUpdateCourseData({
                          ...updateCourseData,
                          estimatedTime: e.target.value,
                        });
                      }}
                    />

                    <label htmlFor="materialsNeeded">Materials Needed</label>
                    <textarea
                      id="materialsNeeded"
                      name="materialsNeeded"
                      value={updateCourseData.materialsNeeded}
                      onChange={(e) => {
                        setUpdateCourseData({
                          ...updateCourseData,
                          materialsNeeded: e.target.value,
                        });
                      }}
                    ></textarea>
                  </div>
                </div>
                <button class="button" type="submit">
                  Update Course
                </button>

                <button
                  class="button button-secondary"
                  onClick={() => {
                    history.push(`/courses/${id}`);
                  }}
                >
                  Cancel
                </button>
              </form>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default UpdateCourse;
