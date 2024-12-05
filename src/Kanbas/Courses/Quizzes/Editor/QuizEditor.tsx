import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch } from "react-redux";
import { updateQuiz, addQuiz, setQuizzes } from "../reducer";
import * as client from "../client";
import QuizDetailsEditor from "./QuizDetailsEditor";
import QuizQuestionsEditor from "./QuizQuestionsEditor";

export default function QuizEditor() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("details");
  const { qid, cid } = useParams();
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
  const [error, setError] = useState<string | null>(null);

  const validateQuiz = () => {
    if (!quiz.dueDate || !quiz.availableDate || !quiz.untilDate) {
      setError("Please fill out all date fields before saving.");
      return false;
    }
    setError(null);
    return true;
  };

  const saveQuiz = async (quiz: any) => {
    await client.updateQuiz(quiz);
    dispatch(updateQuiz(quiz));
  };

  const createQuiz = async (quiz: any) => {
    const newQuiz = await client.createQuiz(cid as string, quiz);
    dispatch(addQuiz(newQuiz));
  };

  const saveOrUpdateQuiz = (navigateToQuizList: boolean) => {
    if (!validateQuiz()) return;

    if (qid === "New") {
      createQuiz(quiz);
    } else {
      saveQuiz(quiz);
    }

    if (navigateToQuizList || qid === "New") {
      navigate(`/Kanbas/Courses/${cid}/Quizzes`);
    }
  };

  const setQuestionPoints = (questionIndex: number, questionPoints: number) => {
    const totalPoints = quiz.questions.reduce(
      (acc: number, question: any, index: number) => {
        if (index === questionIndex) {
          return acc + questionPoints;
        }
        return acc + question.points;
      },
      0
    );
    setQuiz({
      ...quiz,
      points: totalPoints,
      questions: quiz.questions.map((question: any, index: number) => {
        if (index === questionIndex) {
          return {
            ...question,
            points: questionPoints,
          };
        }
        return question;
      }),
    });
  };

  const saveAndPublishQuiz = () => {
    if (!validateQuiz()) return;

    if (qid === "New") {
      createQuiz({ ...quiz, published: true });
    } else {
      saveQuiz({ ...quiz, published: true });
    }
    navigate(`/Kanbas/Courses/${cid}/Quizzes`);
  };

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setQuiz({
      ...quiz,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleDescriptionChange = (value: string) => {
    setQuiz({
      ...quiz,
      description: value,
    });
  };

  const setQuestionTitle = (questionIndex: number, questionTitle: string) => {
    setQuiz({
      ...quiz,
      questions: quiz.questions.map((question: any, index: number) => {
        if (index === questionIndex) {
          return {
            ...question,
            title: questionTitle,
          };
        }
        return question;
      }),
    });
  };

  const setQuestionType = (questionIndex: number, questionType: string) => {
    setQuiz({
      ...quiz,
      questions: quiz.questions.map((question: any, index: number) => {
        if (index === questionIndex) {
          return {
            ...question,
            type: questionType,
          };
        }
        return question;
      }),
    });
  };

  const setMultipleChoiceAnswerCorrect = (
    questionIndex: number,
    answerIndex: number
  ) => {
    setQuiz({
      ...quiz,
      questions: quiz.questions.map((question: any, index: number) => {
        if (index === questionIndex) {
          return {
            ...question,
            multipleChoices: question.multipleChoices.map(
              (multipleChoice: any, i: number) => {
                return {
                  ...multipleChoice,
                  correct: i === answerIndex,
                };
              }
            ),
          };
        }
        return question;
      }),
    });
  };

  const setMultipleChoiceAnswerText = (
    questionIndex: number,
    answerIndex: number,
    answerText: string
  ) => {
    setQuiz({
      ...quiz,
      questions: quiz.questions.map((question: any, index: number) => {
        if (index === questionIndex) {
          return {
            ...question,
            multipleChoices: question.multipleChoices.map(
              (multipleChoice: any, i: number) => {
                if (i === answerIndex) {
                  return {
                    ...multipleChoice,
                    text: answerText,
                  };
                }
                return multipleChoice;
              }
            ),
          };
        }
        return question;
      }),
    });
  };

  const addMultipleChoiceAnswer = (questionIndex: number) => {
    setQuiz({
      ...quiz,
      questions: quiz.questions.map((question: any, index: number) => {
        if (index === questionIndex) {
          return {
            ...question,
            multipleChoices: [
              ...question.multipleChoices,
              { text: "New Answer", correct: false },
            ],
          };
        }
        return question;
      }),
    });
  };

  const removeMultipleChoiceAnswer = (
    questionIndex: number,
    answerIndex: number
  ) => {
    setQuiz({
      ...quiz,
      questions: quiz.questions.map((question: any, index: number) => {
        if (index === questionIndex) {
          return {
            ...question,
            multipleChoices: question.multipleChoices.filter(
              (multipleChoice: any, i: number) => i !== answerIndex
            ),
          };
        }
        return question;
      }),
    });
  };

  const setQuestionTrueFalseCorrect = (
    questionIndex: number,
    correct: boolean
  ) => {
    setQuiz({
      ...quiz,
      questions: quiz.questions.map((question: any, index: number) => {
        if (index === questionIndex) {
          return {
            ...question,
            trueFalseCorrect: correct,
          };
        }
        return question;
      }),
    });
  };

  const addFillInTheBlankAnswer = (questionIndex: number) => {
    setQuiz({
      ...quiz,
      questions: quiz.questions.map((question: any, index: number) => {
        if (index === questionIndex) {
          return {
            ...question,
            fillInTheBlankCorrectAnswers: [
              ...question.fillInTheBlankCorrectAnswers,
              { text: "New Answer" },
            ],
          };
        }
        return question;
      }),
    });
  };

  const removeFillInTheBlankAnswer = (
    questionIndex: number,
    answerIndex: number
  ) => {
    setQuiz({
      ...quiz,
      questions: quiz.questions.map((question: any, index: number) => {
        if (index === questionIndex) {
          return {
            ...question,
            fillInTheBlankCorrectAnswers:
              question.fillInTheBlankCorrectAnswers.filter(
                (fillInTheBlankCorrectAnswer: any, i: number) =>
                  i !== answerIndex
              ),
          };
        }
        return question;
      }),
    });
  };

  const setFillInTheBlankAnswerText = (
    questionIndex: number,
    answerIndex: number,
    answerText: string
  ) => {
    setQuiz({
      ...quiz,
      questions: quiz.questions.map((question: any, index: number) => {
        if (index === questionIndex) {
          return {
            ...question,
            fillInTheBlankCorrectAnswers:
              question.fillInTheBlankCorrectAnswers.map(
                (fillInTheBlankCorrectAnswer: any, i: number) => {
                  if (i === answerIndex) {
                    return {
                      ...fillInTheBlankCorrectAnswer,
                      text: answerText,
                    };
                  }
                  return fillInTheBlankCorrectAnswer;
                }
              ),
          };
        }
        return question;
      }),
    });
  };

  const setQuestionText = (questionIndex: number, questionText: string) => {
    setQuiz({
      ...quiz,
      questions: quiz.questions.map((question: any, index: number) => {
        if (index === questionIndex) {
          return {
            ...question,
            question: questionText,
          };
        }
        return question;
      }),
    });
  };

  const addQuestion = () => {
    const newQuestion = {
      title: "New Question",
      type: "Multiple Choice",
      question: "New Question",
      points: 0,
      multipleChoices: [
        {
          text: "A",
          correct: true,
        },
        {
          text: "B",
          correct: false,
        },
      ],
      trueFalseCorrect: true,
      fillInTheBlankCorrectAnswers: [
        {
          text: "New Answer",
        },
      ],
    };
    setQuiz({
      ...quiz,
      questions: [...quiz.questions, newQuestion],
    });
  };

  const removeQuestion = (questionIndex: number) => {
    const newQuiz = {
      ...quiz,
      questions: quiz.questions.filter(
        (question: any, index: number) => index !== questionIndex
      ),
    };
    setQuiz(newQuiz);
  };

  useEffect(() => {
    if (qid !== "New") {
      fetchQuizzes();
    }
  }, [qid]);

  const fetchQuizzes = async () => {
    const quizzes = await client.findQuizzesForCourse(cid as string);
    dispatch(setQuizzes(quizzes));
    const quiz = quizzes.find((q: any) => q._id === qid);
    setQuiz(quiz);
  };

  useEffect(() => {
    if (qid !== "New") {
      fetchQuizzes();
    }
  }, [qid]);

  return (
    <div id="wd-quiz-details">
      <div className="row">
        <div className="col">
          <h5 className="float-end me-2">
            {quiz.published ? "✅ Published" : "🚫 Not Published"}
          </h5>
          {activeTab === "questions" && (
            <h5 className="float-end me-2">Points {quiz.points}</h5>
          )}
        </div>
      </div>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === "details" ? "active" : ""}`}
            href="#details"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab("details");
            }}
          >
            Details
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === "questions" ? "active" : ""}`}
            href="#questions"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab("questions");
            }}
          >
            Questions
          </a>
        </li>
      </ul>
      {activeTab === "details" && (
        <QuizDetailsEditor
          quiz={quiz}
          handleChange={handleChange}
          handleDescriptionChange={handleDescriptionChange}
        />
      )}
      {activeTab === "questions" && (
        <QuizQuestionsEditor
          quiz={quiz}
          saveOrUpdateQuiz={saveOrUpdateQuiz}
          removeQuestion={removeQuestion}
          setQuestionTitle={setQuestionTitle}
          setQuestionType={setQuestionType}
          setQuestionText={setQuestionText}
          setQuestionPoints={setQuestionPoints}
          addQuestion={addQuestion}
          setMultipleChoiceAnswerCorrect={setMultipleChoiceAnswerCorrect}
          setMultipleChoiceAnswerText={setMultipleChoiceAnswerText}
          addMultipleChoiceAnswer={addMultipleChoiceAnswer}
          removeMultipleChoiceAnswer={removeMultipleChoiceAnswer}
          setQuestionTrueFalseCorrect={setQuestionTrueFalseCorrect}
          addFillInTheBlankAnswer={addFillInTheBlankAnswer}
          removeFillInTheBlankAnswer={removeFillInTheBlankAnswer}
          setFillInTheBlankAnswerText={setFillInTheBlankAnswerText}
        />
      )}
      <button
        className="btn btn-danger btn-primary me-2"
        onClick={() => saveOrUpdateQuiz(true)}
      >
        Save
      </button>
      <button className="btn btn-success me-2" onClick={saveAndPublishQuiz}>
        Save and Publish
      </button>
      <button
        className="btn btn-secondary"
        onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes`)}
      >
        Cancel
      </button>
      <br />
      <br />
      <br />
    </div>
  );
}
