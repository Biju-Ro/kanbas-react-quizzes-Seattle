import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { GoTrash } from "react-icons/go";

export default function FillInTheBlankEditor({
    question,
    questionIndex,
    setQuestionText,
    addFillInTheBlankAnswer,
    removeFillInTheBlankAnswer,
    setFillInTheBlankAnswerText,
}: {
    question: any;
    questionIndex: number;
    setQuestionText: (questionIndex: number, questionText: string) => void;
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
            Enter your question text, then define all possible correct answers
            for the blank. Students will see the question followed by a small
            text box to type their answer.
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
            {question.fillInTheBlankCorrectAnswers.map(
                (fillInTheBlankCorrectAnswer: any, index: number) => {
                    return (
                        <div key={index} className="d-flex align-items-center">
                            <h5
                                style={{
                                    whiteSpace: "nowrap",
                                    marginTop: "auto",
                                    marginBottom: "auto",
                                    marginRight: "10px", // Add margin-right for space
                                }}
                            >
                                Possible Answer:
                            </h5>
                            <input
                                key={index}
                                type="text"
                                className="form-control mt-2"
                                value={fillInTheBlankCorrectAnswer.text}
                                onChange={(e) =>
                                    setFillInTheBlankAnswerText(
                                        questionIndex,
                                        index,
                                        e.target.value
                                    )
                                }
                            />
                            <GoTrash
                                className="ms-2"
                                onClick={() =>
                                    removeFillInTheBlankAnswer(
                                        questionIndex,
                                        index
                                    )
                                }
                            />
                        </div>
                    );
                }
            )}
            <button
                className="btn btn-primary mt-2"
                onClick={() => addFillInTheBlankAnswer(questionIndex)}
            >
                + Add Another Answer
            </button>
        </div>
    );
}
