import React, { useContext } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { UserContext } from "./UserContext";
import Header from "./Header";
const ReactMarkdown = require("react-markdown");

//Function get course detail
const CourseDetail = () => {
  let value = useContext(UserContext);
  let user = value.user;
  let { id } = useParams();
  let history = useHistory();
  let [course, setCourse] = React.useState(null);
  //Fetch api
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
        setCourse(course);
      })
      .catch((error) => {
        history.push("/");
        console.log(error);
      });
  }, [id, history]);
  //Delete course function with alert
  const deleteCourse = () => {
    if (!user) {
      return alert("You must be signed in to delete a course");
    }

    fetch(`http://localhost:5000/api/courses/${id}`, {
      method: "DELETE",
      mode: "cors",
      cache: "no-cache",
      headers: {
        Authorization: "Basic " + btoa(`${user.email}:${user.password}`),
        "Content-Type": "application/json",
      },
    })
      .then((course) => {
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // Couse details
  return (
    <div id="root">
      <Header user={user} />
      <main>
        <div className="actions--bar">
          <div className="wrap">
            {user && course && (
              <>
                {user.id === course.User.id && (
                  <>
                    <Link to={`/courses/${id}/update`} className="button">
                      Update Course
                    </Link>
                    <button
                      className="button"
                      onClick={() => {
                        deleteCourse();
                      }}
                    >
                      Delete Course
                    </button>
                  </>
                )}
              </>
            )}
            <Link className="button button-secondary" to={"/"}>
              Return to List
            </Link>
          </div>
        </div>

        {course && (
          <div className="wrap">
            <h2>Course Detail</h2>
            <form>
              <div className="main--flex">
                <div>
                  <h3 className="course--detail--title">Course</h3>
                  <h4 className="course--name">{course.title}</h4>
                  {course.User && (
                    <p>
                      By {course.User.firstName} {course.User.lastName}
                    </p>
                  )}
                  <ReactMarkdown children={course.description} />
                </div>
                <div>
                  <h3 className="course--detail--title">Estimated Time</h3>
                  <p>
                    {course.estimatedTime
                      ? course.estimatedTime
                      : "Estimated Time Not Provided"}

                    <h3 className="course--detail--title">Materials Needed</h3>

                    {course.materialsNeeded ? (
                      <ReactMarkdown
                        className="course--detail--list"
                        children={course.materialsNeeded}
                      />
                    ) : (
                      <p>No Materials Needed</p>
                    )}
                  </p>
                </div>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default CourseDetail;
