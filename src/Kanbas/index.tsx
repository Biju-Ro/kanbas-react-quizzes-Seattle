import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import { Routes, Route, Navigate, useNavigate } from "react-router";
import Courses from "./Courses";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./styles.css";
import * as client from "./Courses/client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Account from "./Account";
import ProtectedRoute from "./ProtectedRoute";
import Session from "./Account/Session";
import Enroll from "./Dashboard/Enroll";
import { setCurrentUser } from "./Account/reducer";
import * as peopleClient from "./Courses/People/client";

export default function Kanbas() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();
  const [courses, setCourses] = useState<any[]>([]);
  const [course, setCourse] = useState<any>({
    _id: "",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    description: "New Description",
    image: "reactjs.jpg",
  });

  const addNewCourse = async () => {
    const newCourse = await client.createCourse(course);
    setCourses([...courses, newCourse]);
    enrollInCourse(newCourse._id);
  };

  const deleteCourse = async (courseId: string) => {
    await client.deleteCourse(courseId);
    setCourses(courses.filter((c) => c._id !== courseId));
  };

  const updateCourse = async () => {
    await client.updateCourse(course);
    setCourses(
      courses.map((c) => {
        if (c._id === course._id) {
          return course;
        } else {
          return c;
        }
      })
    );
  };

  const fetchCourses = async () => {
    const courses = await client.fetchAllCourses();
    setCourses(courses);
  };

  const enrollInCourse = async (courseId: string) => {
    const updatedUser = {
      ...currentUser,
      courses: [...currentUser.courses, courseId],
    };
    await peopleClient.updateUser(updatedUser);
    dispatch(setCurrentUser(updatedUser));
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <Session>
      <div id="wd-kanbas" className="h-100">
        <div className="d-flex h-100">
          <div className="d-none d-md-block bg-black">
            <KanbasNavigation />
          </div>
          <div className="flex-fill p-4">
            <Routes>
              <Route path="/Account/*" element={<Account />} />
              <Route path="/" element={<Navigate to="Dashboard" />} />
              <Route
                path="Dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard
                      allCourses={courses}
                      course={course}
                      setCourse={setCourse}
                      addNewCourse={addNewCourse}
                      deleteCourse={deleteCourse}
                      updateCourse={updateCourse}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path="Dashboard/Enroll"
                element={
                  <ProtectedRoute>
                    <Enroll
                      enrollInCourse={enrollInCourse}
                      allCourses={courses}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path="Courses/:cid/*"
                element={
                  <ProtectedRoute>
                    <Courses courses={courses} />
                  </ProtectedRoute>
                }
              />
              <Route path="Calendar" element={<h1>Calendar</h1>} />
              <Route path="Inbox" element={<h1>Inbox</h1>} />
            </Routes>
          </div>
        </div>
      </div>
    </Session>
  );
}
