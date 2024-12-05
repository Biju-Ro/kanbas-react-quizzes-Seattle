import { useNavigate } from "react-router";

export default function Enroll({
  enrollInCourse,
  allCourses,
}: {
  enrollInCourse: (courseId: string) => void;
  allCourses: any[];
}) {
  const navigate = useNavigate();
  return (
    <div id="wd-enroll">
      <h1 id="wd-enroll-title">Enroll</h1> <hr />
      <h2>Available Courses ({allCourses.length})</h2>
      <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {allCourses.map((course) => (
            <div className="wd-dashboard-course col" style={{ width: "300px" }}>
              <div className="card rounded-3 overflow-hidden">
                <img
                  src={`/images/organicchemistry.jpg`}
                  style={{
                    width: "auto",
                    height: "146px",
                  }}
                />
                <div className="card-body">
                  <span
                    className="wd-dashboard-course-link"
                    style={{
                      textDecoration: "none",
                      color: "navy",
                      fontWeight: "bold",
                    }}
                  >
                    {course.name}
                  </span>
                  <p
                    className="wd-dashboard-course-title card-text"
                    style={{
                      maxHeight: 53,
                      overflow: "hidden",
                    }}
                  >
                    {course.description}
                  </p>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      enrollInCourse(course._id);
                      navigate("/Kanbas/Dashboard");
                    }}
                  >
                    Enroll
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
