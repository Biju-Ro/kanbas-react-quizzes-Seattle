import QuizzesControls from "./QuizzesControls";
import QuizContextDropdown from "./QuizContextMenu";
import GreenCheckmark from "../../Components/GreenCheckmark";

import { IoCaretDownSharp } from "react-icons/io5";
import { RxRocket } from "react-icons/rx";

import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import * as client from "./client";
import { setQuizzes } from "./reducer";

import "./index.css";

export default function Quizzes() {
  const dispatch = useDispatch();
  const { cid } = useParams();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isStudent = currentUser.role === "STUDENT";
  const [quizAttempts, setQuizAttempts] = useState<any>({});
  const [quizScores, setQuizScores] = useState<any>({});

  const setPublished = async (qid: string, published: boolean) => {
    const quiz = quizzes.find((q: any) => q._id === qid);
    const updatedQuiz = { ...quiz, published };
    await client.updateQuiz(updatedQuiz);
    dispatch(
      setQuizzes(quizzes.map((q: any) => (q._id === qid ? updatedQuiz : q)))
    );
  };

  const fetchQuizzes = async () => {
    let quizzes = await client.findQuizzesForCourse(cid as string);
    if (isStudent) {
      quizzes = quizzes.filter((quiz: any) => quiz.published);
    }
    dispatch(setQuizzes(quizzes));

    const quizAttempts: { [key: string]: any } = {};
    currentUser.quizAnswers.forEach((quizAnswer: any) => {
      quizAttempts[quizAnswer.quizId] = quizAnswer.attempts;
    });

    setQuizAttempts(quizAttempts);

    const quizScores: { [key: string]: any } = {};
    currentUser.quizAnswers.forEach((quizAnswer: any) => {
      quizScores[quizAnswer.quizId] = quizAnswer.score;
    });

    setQuizScores(quizScores);

    console.log(quizScores);
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  return (
    <div id="wd-quizzes">
      <br />
      <QuizzesControls isStudent={isStudent} />
      <hr />
      <ul id="wd-quizzes" className="list-group rounded-0">
        <li className="wd-quizzes list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <IoCaretDownSharp className="me-2 fs-6" />

            <span
              style={{
                color: "#212529",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              Assignment Quizzes
            </span>
          </div>
          <ul
            id="wd-quizzes-list"
            className="wd-quizzes-list list-group rounded-0"
          >
            {quizzes.map((quiz: any) => {
              const currentDate = new Date();
              const dueDate = new Date(quiz.dueDate);
              const availableDate = new Date(quiz.availableDate);
              const isClosed = currentDate > dueDate;
              const isAvailable = currentDate > availableDate;
              const attempts = quizAttempts[quiz._id] || 0;
              const score = quizScores[quiz._id] || 0;

              return (
                <li
                  key={quiz._id}
                  className="wd-assignment-list-item list-group-item p-3 ps-1 d-flex align-items-center"
                >
                  <RxRocket
                    className="me-4 ms-4 fs-3 "
                    style={{ color: "green" }}
                  />
                  <div>
                    <a
                      className="wd-assignment-link"
                      href={
                        attempts > 0
                          ? `#/Kanbas/Courses/${cid}/Quizzes/${quiz._id}/results`
                          : `#/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`
                      }
                      style={{
                        color: "#212529",
                        fontWeight: "bold",
                        textDecoration: "none",
                      }}
                    >
                      {quiz.name}
                    </a>
                    <br />
                    <span
                      style={{
                        fontWeight: "bold",
                        color: "grey",
                      }}
                    >
                      {isClosed
                        ? "Closed"
                        : isAvailable
                        ? "Available"
                        : "Not Available until " +
                          availableDate.toLocaleString("en-US", {
                            month: "long",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true,
                          })}
                    </span>{" "}
                    |{" "}
                    <span
                      style={{
                        fontWeight: "bold",
                        color: "grey",
                      }}
                    >
                      Due
                    </span>{" "}
                    {dueDate.toLocaleString("en-US", {
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}{" "}
                    | {quiz.points} pts | {quiz.questions.length} Questions
                    {score > 0 && isStudent && (
                      <span>
                        {" "}
                        | <strong>Score: {score}</strong>
                      </span>
                    )}
                  </div>
                  {!isStudent && (
                    <div className="ms-auto d-flex align-items-center">
                      {!quiz.published ? (
                        <div
                          onClick={() => setPublished(quiz._id, true)}
                          className="text-danger cursor-pointer"
                          style={{ cursor: "pointer" }}
                        >
                          🚫
                        </div>
                      ) : (
                        <div
                          onClick={() => setPublished(quiz._id, false)}
                          className="text-success cursor-pointer"
                          style={{ cursor: "pointer" }}
                        >
                          <GreenCheckmark />
                        </div>
                      )}
                      <QuizContextDropdown
                        qid={quiz._id}
                        published={quiz.published}
                        setPublished={setPublished}
                      />
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </li>
      </ul>
    </div>
  );
}
