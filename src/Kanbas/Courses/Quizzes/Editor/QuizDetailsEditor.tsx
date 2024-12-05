import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function QuizDetailsEditor({
    quiz,
    handleChange,
    handleDescriptionChange,
}: {
    quiz: any;
    handleChange: (e: any) => void;
    handleDescriptionChange: (value: string) => void;
}) {
    return (
        <div className="tab-content mt-3">
            <div className="mb-3">
                <input
                    name="name"
                    type="text"
                    value={quiz.name}
                    onChange={handleChange}
                    className="form-control"
                />
            </div>
            <div className="mb-3">
                <label>Quiz Instructions:</label>
                <ReactQuill
                    value={quiz.description}
                    onChange={handleDescriptionChange}
                    className="border-0 mt-2"
                />
            </div>
            <div className="mb-6">
                <label>Quiz Type</label>
                <select
                    name="quizType"
                    value={quiz.quizType}
                    onChange={handleChange}
                    className="form-control"
                >
                    <option value="Graded Quiz">Graded Quiz</option>
                    <option value="Practice Quiz">Practice Quiz</option>
                    <option value="Graded Survey">Graded Survey</option>
                    <option value="Ungraded Survey">Ungraded Survey</option>
                </select>
            </div>
            <div className="mb-3">
                <label>Points</label>
                <input
                    name="points"
                    type="number"
                    value={quiz.points}
                    onChange={handleChange}
                    className="form-control"
                />
            </div>
            <div className="mb-3">
                <label>Assignment Group</label>
                <select
                    name="assignmentGroup"
                    value={quiz.assignmentGroup}
                    onChange={handleChange}
                    className="form-control"
                >
                    <option value="Quizzes">Quizzes</option>
                    <option value="Exams">Exams</option>
                    <option value="Assignments">Assignments</option>
                    <option value="Project">Project</option>
                </select>
            </div>
            <div className="mb-3">
                <label>
                    <input
                        name="shuffleAnswers"
                        type="checkbox"
                        checked={quiz.shuffleAnswers}
                        onChange={handleChange}
                    />{" "}
                    Shuffle Answers
                </label>
            </div>
            <div className="mb-3">
                <label>Time Limit (Minutes)</label>
                <input
                    name="timeLimit"
                    type="number"
                    value={quiz.timeLimit}
                    onChange={handleChange}
                    className="form-control"
                />
            </div>
            <div className="mb-3">
                <label>
                    <input
                        name="multipleAttempts"
                        type="checkbox"
                        checked={quiz.multipleAttempts}
                        onChange={handleChange}
                    />{" "}
                    Multiple Attempts
                </label>
            </div>
            {quiz.multipleAttempts && (
                <div className="mb-3">
                    <label>How Many Attempts</label>
                    <input
                        name="attempts"
                        type="number"
                        value={quiz.attempts}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
            )}
            <div className="mb-3">
                <label>
                    <input
                        name="showCorrectAnswers"
                        type="checkbox"
                        checked={quiz.showCorrectAnswers}
                        onChange={handleChange}
                    />{" "}
                    Show Correct Answers
                </label>
            </div>
            <div className="mb-3">
                <label>Access Code</label>
                <input
                    name="accessCode"
                    type="text"
                    value={quiz.accessCode}
                    onChange={handleChange}
                    className="form-control"
                />
            </div>
            <div className="mb-3">
                <label>
                    <input
                        name="oneQuestionAtATime"
                        type="checkbox"
                        checked={quiz.oneQuestionAtATime}
                        onChange={handleChange}
                    />{" "}
                    One Question at a Time
                </label>
            </div>
            <div className="mb-3">
                <label>
                    <input
                        name="webcamRequired"
                        type="checkbox"
                        checked={quiz.webcamRequired}
                        onChange={handleChange}
                    />{" "}
                    Webcam Required
                </label>
            </div>
            <div className="mb-3">
                <label>
                    <input
                        name="lockQuestions"
                        type="checkbox"
                        checked={quiz.lockQuestions}
                        onChange={handleChange}
                    />{" "}
                    Lock Questions After Answering
                </label>
            </div>
            <div className="mb-3">
                <label>Due Date</label>
                <input
                    name="dueDate"
                    type="datetime-local"
                    value={quiz.dueDate}
                    onChange={handleChange}
                    className="form-control"
                />
            </div>
            <div className="mb-3">
                <label>Available Date</label>
                <input
                    name="availableDate"
                    type="datetime-local"
                    value={quiz.availableDate}
                    onChange={handleChange}
                    className="form-control"
                />
            </div>
            <div className="mb-3">
                <label>Until Date</label>
                <input
                    name="untilDate"
                    type="datetime-local"
                    value={quiz.untilDate}
                    onChange={handleChange}
                    className="form-control"
                />
            </div>
        </div>
    );
}
