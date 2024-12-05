import React from "react";
import "./QuizDisplay.css";

interface MultipleChoiceDisplayProps {
  question: any;
  questionId: number;
  selectedAnswer: any;
  correctAnswer: any;
  setMultipleChoiceAnswerIndex: (
    questionId: number,
    multipleChoiceAnswerIndex: number
  ) => void;
  resultMode: boolean;
}

const MultipleChoiceDisplay: React.FC<MultipleChoiceDisplayProps> = ({
  question,
  questionId,
  selectedAnswer,
  correctAnswer,
  setMultipleChoiceAnswerIndex,
  resultMode,
}) => {
  const correctMultipleChoiceText = question.multipleChoices.find(
    (multipleChoice: any) => multipleChoice.correct
  )?.text;
  return (
    <div>
      <hr />
      {question.multipleChoices?.map((multipleChoice: any, index: number) => {
        const isCorrect = correctMultipleChoiceText === multipleChoice.text;
        return (
          <div key={index}>
            <div
              className={`${
                resultMode &&
                isCorrect &&
                correctMultipleChoiceText === multipleChoice.text
                  ? "quiz-custom-border-correct p-3 rounded"
                  : resultMode &&
                    isCorrect &&
                    correctMultipleChoiceText !== multipleChoice.text
                  ? ""
                  : resultMode &&
                    !isCorrect &&
                    correctMultipleChoiceText === multipleChoice.text
                  ? "quiz-custom-border-incorrect p-3 rounded"
                  : resultMode &&
                    !isCorrect &&
                    correctMultipleChoiceText !== multipleChoice.text &&
                    selectedAnswer === index
                  ? "quiz-custom-border-incorrect p-3 rounded"
                  : ""
              }`}
            >
              <input
                type="radio"
                checked={selectedAnswer === index}
                onChange={() => setMultipleChoiceAnswerIndex(questionId, index)}
              />{" "}
              <label>{multipleChoice.text}</label>
            </div>
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default MultipleChoiceDisplay;
