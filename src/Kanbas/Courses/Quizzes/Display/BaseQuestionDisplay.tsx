import React from "react";
import MultipleChoiceDisplay from "./MultipleChoiceDisplay";
import TrueFalseDisplay from "./TrueFalseDisplay";
import FillInTheBlankDisplay from "./FillInTheBlankDisplay";

interface BaseQuestionDisplayProps {
  question: any;
  questionId: number;
  selectedAnswer: any;
  setMultipleChoiceAnswerIndex: (
    questionId: number,
    multipleChoiceAnswerIndex: number
  ) => void;
  setTrueFalseAnswer: (questionId: number, trueFalseAnswer: string) => void;
  setFillInTheBlankAnswer: (
    questionId: number,
    fillInTheBlankAnswer: string
  ) => void;
  resultMode: boolean;
}

const BaseQuestionDisplay: React.FC<BaseQuestionDisplayProps> = ({
  question,
  questionId,
  selectedAnswer,
  setMultipleChoiceAnswerIndex,
  setTrueFalseAnswer,
  setFillInTheBlankAnswer,
  resultMode,
}) => {
  const isMultipleChoice = question.type === "Multiple Choice";
  const isTrueFalse = question.type === "True/False";
  const isFillInTheBlank = question.type === "Fill in the Blank";
  return (
    <div className="question-container mb-5 p-3 border rounded">
      <div
        className="question-text"
        dangerouslySetInnerHTML={{ __html: question.question }}
      />
      {isMultipleChoice && (
        <MultipleChoiceDisplay
          question={question}
          questionId={questionId}
          selectedAnswer={selectedAnswer?.multipleChoiceAnswerIndex}
          correctAnswer={question.multipleChoices}
          setMultipleChoiceAnswerIndex={setMultipleChoiceAnswerIndex}
          resultMode={resultMode}
        />
      )}
      {isTrueFalse && (
        <TrueFalseDisplay
          question={question}
          questionId={questionId}
          selectedAnswer={selectedAnswer?.trueFalseAnswer}
          correctAnswer={question.trueFalseCorrect}
          setTrueFalseAnswer={setTrueFalseAnswer}
          resultMode={resultMode}
        />
      )}
      {isFillInTheBlank && (
        <FillInTheBlankDisplay
          question={question}
          questionId={questionId}
          selectedAnswer={selectedAnswer?.fillInTheBlankAnswer}
          correctAnswer={question.fillInTheBlankCorrectAnswers}
          setFillInTheBlankAnswer={setFillInTheBlankAnswer}
          resultMode={resultMode}
        />
      )}
    </div>
  );
};

export default BaseQuestionDisplay;
