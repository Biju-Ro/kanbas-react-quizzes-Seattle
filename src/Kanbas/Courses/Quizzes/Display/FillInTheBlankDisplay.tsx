import React from "react";
import "./QuizDisplay.css";

interface FillInTheBlankDisplayProps {
  question: any;
  questionId: number;
  selectedAnswer: string;
  correctAnswer: string;
  setFillInTheBlankAnswer: (
    questionId: number,
    fillInTheBlankAnswer: string
  ) => void;
  resultMode: boolean;
}

const FillInTheBlankDisplay: React.FC<FillInTheBlankDisplayProps> = ({
  question,
  questionId,
  selectedAnswer,
  correctAnswer,
  setFillInTheBlankAnswer,
  resultMode,
}) => {
  let isCorrect = false;
  for (let i = 0; i < question.fillInTheBlankCorrectAnswers.length; i++) {
    let correctAnswer = question.fillInTheBlankCorrectAnswers[i];
    if (correctAnswer.text === selectedAnswer) {
      isCorrect = true;
    }
  }
  return (
    <div>
      <hr />
      <div
        className={`${
          resultMode && isCorrect
            ? "quiz-custom-border-correct p-3 rounded"
            : resultMode && !isCorrect
            ? "quiz-custom-border-incorrect p-3 rounded"
            : ""
        }`}
      >
        <input
          type="text"
          value={selectedAnswer}
          onChange={(e) => setFillInTheBlankAnswer(questionId, e.target.value)}
        />
      </div>
    </div>
  );
};

export default FillInTheBlankDisplay;
