import { useParams, useLocation, Link } from "react-router-dom";
import "./index.css";

export default function CoursesNavigation() {
  const { cid } = useParams();
  const { pathname } = useLocation();
  const links = [
    "Home",
    "Modules",
    "Piazza",
    "Zoom",
    "Assignments",
    "Quizzes",
    "Grades",
    "People",
  ];
  return (
    <div id="wd-courses-navigation" className="list-group fs-5 rounded-0">
      {links.map((link) => (
        <a
          id="wd-course-home-link"
          href={`#/Kanbas/Courses/${cid}/${link}`}
          className={`list-group-item border border-0
                    ${pathname.includes(link) ? "active" : "text-danger"}`}
        >
          {" "}
          {link}{" "}
        </a>
      ))}
    </div>
  );
}
