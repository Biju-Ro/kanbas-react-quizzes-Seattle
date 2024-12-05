import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import * as client from "./client";
import * as peopleClient from "./../People/client";
import BaseQuestionDisplay from "./Display/BaseQuestionDisplay";
import { setCurrentUser } from "../../Account/reducer";

export default function QuizResults() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cid, qid } = useParams<string>();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isStudent = currentUser.role === "STUDENT";
  const [score, setScore] = useState(0);
  const [totalPossibleScore, setTotalPossibleScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [answers, setAnswers] = useState<any>([]);
  const [quiz, setQuiz] = useState<any>({
    attempts: 1,
    questions: [],
  });
  const [quizAttempts, setQuizAttempts] = useState(0);
  const [quizAttemptsLimit, setQuizAttemptsLimit] = useState(1);

  const fetchQuiz = async () => {
    const fetchedQuiz = await client.findQuiz(qid as string);
    setQuiz(fetchedQuiz);

    if (fetchedQuiz.attempts) {
      setQuizAttemptsLimit(fetchedQuiz.attempts);
    } else {
      setQuizAttemptsLimit(1);
    }
  };

  const fetchAnswers = async () => {
    const fetchedQuizAnswers = currentUser.quizAnswers.find(
      (quizAnswer: any) => quizAnswer.quizId === qid
    );

    if (fetchedQuizAnswers) {
      setAnswers(fetchedQuizAnswers.answers);

      const quizAttempts = fetchedQuizAnswers.attempts;
      setQuizAttempts(quizAttempts);
    } else {
      setAnswers([]);
    }

    const quiz = await client.findQuiz(qid as string);
    const questions = quiz.questions;

    let score = 0;
    let totalPossibleScore = 0;
    let correctAnswers = 0;

    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      totalPossibleScore += question.points;
      const answer = fetchedQuizAnswers.answers.find(
        (answer: any) => answer.questionId === question._id
      );

      if (answer) {
        if (question.type === "Multiple Choice") {
          if (
            question.multipleChoices[answer.multipleChoiceAnswerIndex].correct
          ) {
            score += question.points;
            correctAnswers++;
          }
        } else if (question.type === "True/False") {
          if (question.trueFalseCorrect == answer.trueFalseAnswer) {
            score += question.points;
            correctAnswers++;
          }
        } else if (question.type === "Fill in the Blank") {
          for (
            let i = 0;
            i < question.fillInTheBlankCorrectAnswers.length;
            i++
          ) {
            let correctAnswer = question.fillInTheBlankCorrectAnswers[i];
            if (correctAnswer.text.includes(answer.fillInTheBlankAnswer)) {
              score += question.points;
              correctAnswers++;
            }
          }
        }
      }
    }

    const quizAnswers = currentUser.quizAnswers.map((quizAnswer: any) => {
      if (quizAnswer.quizId === qid) {
        return {
          ...quizAnswer,
          score,
        };
      }
      return quizAnswer;
    });

    const updatedUser = {
      ...currentUser,
      quizAnswers,
    };

    await peopleClient.updateUser(updatedUser);
    dispatch(setCurrentUser(updatedUser));

    setScore(score);
    setCorrectAnswers(correctAnswers);
    setTotalPossibleScore(totalPossibleScore);
  };

  useEffect(() => {
    fetchQuiz();
    fetchAnswers();
  }, [qid]);

  return (
    <div>
      <h3>Quiz Results</h3>
      {!isStudent && (
        <div className="alert alert-danger">
          ❗ This is a preview of the published version of the quiz.
        </div>
      )}
      <div>
        <div className="alert alert-success">
          ✅ You scored {score} out of {totalPossibleScore} points.
        </div>
        <div className="alert alert-info">
          📝 You answered {correctAnswers} questions correctly.
        </div>
      </div>
      {(quizAttempts >= quizAttemptsLimit || !isStudent) &&
        quiz.questions.map((question: any, index: number) => (
          <div className="quiz-preview-question" key={index}>
            <div className="d-flex justify-content-between align-items-center">
              <h4 className="mb-0">Question {index + 1}</h4>
              <div className="quiz-preview-question-points">
                {question.points} pts
              </div>
            </div>
            <br />
            <BaseQuestionDisplay
              question={question}
              questionId={question._id}
              selectedAnswer={Object.values(answers).find(
                (answer: any) => answer.questionId === question._id
              )}
              setMultipleChoiceAnswerIndex={() => {}}
              setTrueFalseAnswer={() => {}}
              setFillInTheBlankAnswer={() => {}}
              resultMode={true}
            />
          </div>
        ))}
      {quizAttempts < quizAttemptsLimit && (
        <div className="d-flex justify-content-center mt-4 mb-4">
          <button
            className="btn btn-primary"
            onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}`)}
          >
            Retake Quiz
          </button>
        </div>
      )}
      {!isStudent && (
        <button
          className="btn btn-secondary"
          onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/edit`)}
        >
          Edit Quiz
        </button>
      )}
    </div>
  );
}
