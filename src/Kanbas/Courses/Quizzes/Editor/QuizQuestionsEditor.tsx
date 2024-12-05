import BaseQuestionEditor from "./Question/BaseQuestionEditor";

export default function QuizDetailsEditor({
    quiz,
    saveOrUpdateQuiz,
    addQuestion,
    removeQuestion,
    setQuestionTitle,
    setQuestionType,
    setQuestionText,
    setQuestionPoints,
    setMultipleChoiceAnswerCorrect,
    setMultipleChoiceAnswerText,
    addMultipleChoiceAnswer,
    removeMultipleChoiceAnswer,
    setQuestionTrueFalseCorrect,
    addFillInTheBlankAnswer,
    removeFillInTheBlankAnswer,
    setFillInTheBlankAnswerText,
}: {
    quiz: any;
    saveOrUpdateQuiz: (navigateToQuizList: boolean) => void;
    addQuestion: () => void;
    removeQuestion: (questionIndex: number) => void;
    setQuestionTitle: (questionIndex: number, questionTitle: string) => void;
    setQuestionType: (questionIndex: number, questionType: string) => void;
    setQuestionText: (questionIndex: number, questionText: string) => void;
    setQuestionPoints: (questionIndex: number, questionPoints: number) => void;
    setMultipleChoiceAnswerCorrect: (
        questionIndex: number,
        answerIndex: number
    ) => void;
    setMultipleChoiceAnswerText: (
        questionIndex: number,
        answerIndex: number,
        answerText: string
    ) => void;
    addMultipleChoiceAnswer: (questionIndex: number) => void;
    removeMultipleChoiceAnswer: (
        questionIndex: number,
        answerIndex: number
    ) => void
    setQuestionTrueFalseCorrect: (
        questionIndex: number,
        correct: boolean
    ) => void;
    addFillInTheBlankAnswer: (questionIndex: number) => void;
    removeFillInTheBlankAnswer: (
        questionIndex: number,
        answerIndex: number
    ) => void;
    setFillInTheBlankAnswerText: (
        questionIndex: number,
        answerIndex: number,
        answerText: string
    ) => void;
}) {
    return (
        <div>
            <div className="text-center">
                <button
                    className="btn btn-primary m-4"
                    onClick={addQuestion}
                >
                    + New Question
                </button>
            </div>
            {quiz.questions &&
                quiz.questions.map((question: any, index: number) => {
                    return (
                        <BaseQuestionEditor
                            question={question}
                            questionIndex={index}
                            saveOrUpdateQuiz={saveOrUpdateQuiz}
                            removeQuestion={removeQuestion}
                            setQuestionTitle={setQuestionTitle}
                            setQuestionType={setQuestionType}
                            setQuestionText={setQuestionText}
                            setQuestionPoints={setQuestionPoints}
                            setMultipleChoiceAnswerCorrect={
                                setMultipleChoiceAnswerCorrect
                            }
                            setMultipleChoiceAnswerText={
                                setMultipleChoiceAnswerText
                            }
                            addMultipleChoiceAnswer={addMultipleChoiceAnswer}
                            removeMultipleChoiceAnswer={
                                removeMultipleChoiceAnswer
                            }
                            setQuestionTrueFalseCorrect={
                                setQuestionTrueFalseCorrect
                            }
                            addFillInTheBlankAnswer={
                                addFillInTheBlankAnswer
                            }
                            removeFillInTheBlankAnswer={
                                removeFillInTheBlankAnswer
                            }
                            setFillInTheBlankAnswerText={
                                setFillInTheBlankAnswerText
                            }
                        />
                    );
                })}
        </div>
    );
}
