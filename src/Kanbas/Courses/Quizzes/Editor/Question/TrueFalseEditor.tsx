import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function TrueFalseEditor({
    question,
    questionIndex,
    setQuestionText,
    setQuestionTrueFalseCorrect,
}: {
    question: any;
    questionIndex: number;
    setQuestionText: (questionIndex: number, questionText: string) => void;
    setQuestionTrueFalseCorrect: (questionIndex: number, correct: boolean) => void;
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
            <input
                type="radio"
                className="me-2"
                checked={question.trueFalseCorrect}
                onClick={() => setQuestionTrueFalseCorrect(questionIndex, true)}
            />
            <label>True</label>
            <br />
            <input
                type="radio"
                className="me-2"
                checked={!question.trueFalseCorrect}
                onClick={() => setQuestionTrueFalseCorrect(questionIndex, false)}
            />
            <label>False</label>
        </div>
    );
}
