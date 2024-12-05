import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { GoTrash } from "react-icons/go";

export default function MultipleChoiceEditor({
    question,
    questionIndex,
    multipleChoices,
    setQuestionText,
    setMultipleChoiceAnswerCorrect,
    setMultipleChoiceAnswerText,
    addMultipleChoiceAnswer,
    removeMultipleChoiceAnswer,
}: {
    question: any;
    questionIndex: number;
    multipleChoices: any;
    setQuestionText: (questionIndex: number, questionText: string) => void;
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
    removeMultipleChoiceAnswer: (questionIndex: number, answerIndex: number) => void;
}) {
    return (
        <div>
            Enter your question and multiple answers, then select the one
            correct answer.
            <br />
            <br />
            <h4>Question:</h4>
            <ReactQuill
                className="border-0 mt-2"
                value={question.question}
                onChange={(value) => setQuestionText(questionIndex, value)}
            />
            <br />
            <h4>Answers:</h4>
            {multipleChoices.map((multipleChoice: any, index: number) => {
                return (
                    <div
                        key={multipleChoice._id}
                        className="d-flex align-items-center mb-2"
                    >
                        <input
                            type="radio"
                            className="me-2"
                            checked={multipleChoice.correct}
                            value={multipleChoice.text}
                            onChange={(e) =>
                                setMultipleChoiceAnswerCorrect(
                                    questionIndex,
                                    index
                                )
                            }
                        />
                        <input
                            type="text"
                            className="form-control"
                            value={multipleChoice.text}
                            onChange={(e) =>
                                setMultipleChoiceAnswerText(
                                    questionIndex,
                                    index,
                                    e.target.value
                                )
                            }
                        />
                        <GoTrash
                            className="ms-2"
                            onClick={() =>
                                removeMultipleChoiceAnswer(
                                    questionIndex,
                                    index
                                )
                            }
                        />
                    </div>
                );
            })}
            <button
                className="btn btn-secondary mt-2 float-end"
                onClick={() => addMultipleChoiceAnswer(questionIndex)}
            >
                + Add Another Answer
            </button>
        </div>
    );
}
