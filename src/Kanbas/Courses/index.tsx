import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentsEditor from "./Assignments/Editor";
import QuizEditor from "./Quizzes/Editor/QuizEditor";
import Quizzes from "./Quizzes";
import { Navigate, Route, Routes, useParams, useLocation } from "react-router";
import { FaAlignJustify } from "react-icons/fa6";

import PeopleTable from "./People/Table";
import QuizDetails from "./Quizzes/QuizDetails";
import { useSelector } from "react-redux";
import StudentQuiz from "./Quizzes/StudentQuiz";
import QuizPreview from "./Quizzes/QuizPreview";
import QuizResults from "./Quizzes/QuizResults";
import Grades from "./Grades";

export default function Courses({ courses }: { courses: any[] }) {
  const { cid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isStudent = currentUser.role === "STUDENT";
  const course = courses.find((course) => course._id === cid);
  const { pathname } = useLocation();
  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course && course.name} &gt; {pathname.split("/")[4]}
      </h2>
      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CoursesNavigation />
        </div>
        <div className="flex-fill">
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Assignments/:aid" element={<AssignmentsEditor />} />
            <Route path="Quizzes" element={<Quizzes />} />
            <Route
              path="Quizzes/:qid"
              element={isStudent ? <StudentQuiz /> : <QuizDetails />}
            />
            <Route path="Quizzes/:qid/edit" element={<QuizEditor />} />
            <Route path="Quizzes/:qid/preview" element={<QuizPreview />} />
            <Route path="Quizzes/:qid/results" element={<QuizResults />} />
            <Route path="Grades" element={<Grades />} />
            <Route path="People" element={<PeopleTable />} />
            <Route path="People/:uid" element={<PeopleTable />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
