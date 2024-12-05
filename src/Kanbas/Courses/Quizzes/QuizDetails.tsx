import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as client from "./client";
import { setQuizzes } from "./reducer";

export default function QuizDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cid, qid } = useParams();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const [quiz, setQuiz] = useState<any>({
    name: "New Quiz",
    course: "",
    description: "",
    quizType: "Graded Quiz",
    published: false,
    points: 0,
    assignmentGroup: "Quizzes",
    shuffleAnswers: true,
    timeLimit: 20,
    multipleAttempts: false,
    attempts: 1,
    viewResponses: "Always",
    showCorrectAnswers: false,
    accessCode: "",
    oneQuestionAtATime: true,
    requireLockDownBrowser: false,
    requiredToViewResults: false,
    webcamRequired: false,
    lockQuestions: false,
    dueDate: "",
    availableDate: "",
    untilDate: "",
    questions: [],
  });

  const setPublished = async (published: boolean) => {
    const updatedQuiz = { ...quiz, published };
    await client.updateQuiz(updatedQuiz);
    dispatch(
      setQuizzes(quizzes.map((q: any) => (q._id === qid ? updatedQuiz : q)))
    );
    setQuiz(updatedQuiz);
  };

  const fetchQuizzes = async () => {
    const quizzes = await client.findQuizzesForCourse(cid as string);
    dispatch(setQuizzes(quizzes));
    const quiz = quizzes.find((q: any) => q._id === qid);
    if (quiz) {
      setQuiz(quiz);
    }
  };

  useEffect(() => {
    if (qid !== "New") {
      fetchQuizzes();
    }
  }, [qid]);

  return (
    <div className="quiz-details mt-2">
      <div className="d-flex justify-content-end align-items-center mb-4">
        <div>
          {quiz.published ? (
            <button
              className="btn btn-success me-2"
              onClick={() => setPublished(false)}
            >
              Published
            </button>
          ) : (
            <button
              className="btn btn-danger me-2"
              onClick={() => setPublished(true)}
            >
              Unpublished
            </button>
          )}
          <button
            className="btn btn-outline-secondary me-2"
            onClick={() =>
              navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/preview`)
            }
          >
            Preview
          </button>
          <button
            className="btn btn-primary"
            onClick={() =>
              navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/edit`)
            }
          >
            Edit
          </button>
        </div>
      </div>
      <hr />
      <h2 className="fw-bold">{quiz.name}</h2>
      <div className="card border-0">
        <div className="card-body">
          <div className="row">
            <div className="col-12 col-md-5">
              <table className="table table-borderless">
                <tbody>
                  <tr>
                    <td className="fw-bold text-end">Quiz Type</td>
                    <td className="text-start">{quiz.quizType}</td>
                  </tr>
                  <tr>
                    <td className="fw-bold text-end">Points</td>
                    <td className="text-start">{quiz.points}</td>
                  </tr>
                  <tr>
                    <td className="fw-bold text-end">Assignment Group</td>
                    <td className="text-start">{quiz.assignmentGroup}</td>
                  </tr>
                  <tr>
                    <td className="fw-bold text-end">Shuffle Answers</td>
                    <td className="text-start">
                      {quiz.shuffleAnswers ? "Yes" : "No"}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold text-end">Time Limit</td>
                    <td className="text-start">{quiz.timeLimit} Minutes</td>
                  </tr>
                  <tr>
                    <td className="fw-bold text-end">Multiple Attempts</td>
                    <td className="text-start">
                      {quiz.multipleAttempts ? "Yes" : "No"}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold text-end">View Responses</td>
                    <td className="text-start">{quiz.viewResponses}</td>
                  </tr>
                  <tr>
                    <td className="fw-bold text-end">Show Correct Answers</td>
                    <td className="text-start">
                      {quiz.showCorrectAnswers ? "Yes" : "No"}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold text-end">One Question at a Time</td>
                    <td className="text-start">
                      {quiz.oneQuestionAtATime ? "Yes" : "No"}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold text-end">
                      Require Respondus LockDown Browser
                    </td>
                    <td className="text-start">
                      {quiz.requireLockDownBrowser ? "Yes" : "No"}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold text-end">
                      Required to View Quiz Results
                    </td>
                    <td className="text-start">
                      {quiz.requiredToViewResults ? "Yes" : "No"}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold text-end">Webcam Required</td>
                    <td className="text-start">
                      {quiz.webcamRequired ? "Yes" : "No"}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold text-end">
                      Lock Questions After Answering
                    </td>
                    <td className="text-start">
                      {quiz.lockQuestions ? "Yes" : "No"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="container mt-4 border-0">
            <table className="table">
              <thead>
                <tr>
                  <th>Due</th>
                  <th>For</th>
                  <th>Available from</th>
                  <th>Until</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {new Date(quiz.dueDate).toLocaleString("en-US", {
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
                  </td>
                  <td>Everyone</td>
                  <td>
                    {new Date(quiz.availableDate).toLocaleString("en-US", {
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
                  </td>
                  <td>
                    {new Date(quiz.untilDate).toLocaleString("en-US", {
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div
            className="d-flex justify-content-center mt-4"
            onClick={() =>
              navigate(`/Kanbas/Courses/${quiz.course}/Quizzes/${qid}/preview`)
            }
          >
            <button className="btn btn-danger">Preview</button>
          </div>
        </div>
      </div>
    </div>
  );
}
