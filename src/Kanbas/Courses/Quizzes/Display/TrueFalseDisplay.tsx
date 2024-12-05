import React from "react";
import "./QuizDisplay.css";

interface TrueFalseDisplayProps {
  question: any;
  questionId: number;
  selectedAnswer: string;
  correctAnswer: string;
  setTrueFalseAnswer: (questionId: number, trueFalseAnswer: string) => void;
  resultMode: boolean;
}

const TrueFalseDisplay: React.FC<TrueFalseDisplayProps> = ({
  question,
  questionId,
  selectedAnswer,
  correctAnswer,
  setTrueFalseAnswer,
  resultMode,
}) => {
  const isCorrect = correctAnswer === selectedAnswer;
  return (
    <div>
      <hr />
      <div
        className={`${
          resultMode && isCorrect && selectedAnswer === "true"
            ? "quiz-custom-border-correct p-3 rounded"
            : resultMode && isCorrect && selectedAnswer !== "true"
            ? ""
            : resultMode && !isCorrect && selectedAnswer === "true"
            ? "quiz-custom-border-incorrect p-3 rounded"
            : resultMode && !isCorrect && selectedAnswer !== "true"
            ? "quiz-custom-border-correct p-3 rounded"
            : ""
        }`}
      >
        <input
          type="radio"
          checked={selectedAnswer === "true"}
          onChange={() => setTrueFalseAnswer(questionId, "true")}
        />{" "}
        <label>True</label>
      </div>
      <hr />
      <div
        className={`${
          resultMode && isCorrect && selectedAnswer === "false"
            ? "quiz-custom-border-correct p-3 rounded"
            : resultMode && isCorrect && selectedAnswer !== "false"
            ? ""
            : resultMode && !isCorrect && selectedAnswer === "false"
            ? "quiz-custom-border-incorrect p-3 rounded"
            : resultMode && !isCorrect && selectedAnswer !== "false"
            ? "quiz-custom-border-correct p-3 rounded"
            : ""
        }`}
      >
        <input
          type="radio"
          checked={selectedAnswer === "false"}
          onChange={() => setTrueFalseAnswer(questionId, "false")}
        />{" "}
        <label>False</label>
      </div>
    </div>
  );
};

export default TrueFalseDisplay;
