import { IoMdMore } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import * as client from "./client";
import { deleteQuiz } from "./reducer";

export default function QuizContextDropdown({
  qid,
  published,
  setPublished,
}: {
  qid: string;
  published: boolean;
  setPublished: (qid: string, published: boolean) => void;
}) {
  const dispatch = useDispatch();
  const { cid } = useParams();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);

  const removeQuiz = async (qid: string) => {
    const status = await client.deleteQuiz(qid);
    dispatch(deleteQuiz(qid));
  };

  return (
    <div className="dropdown d-inline me-1 float-end">
      <button
        id="wd-add-module-btn"
        className="btn btn-lg btn-light bg-transparent border-0 me-1"
        type="button"
        data-bs-toggle="dropdown"
      >
        <IoMdMore className="position-relative fs-4" />
      </button>
      <ul className="dropdown-menu">
        <li>
          <a
            id="wd-edit-quiz"
            className="dropdown-item"
            href={`#/Kanbas/Courses/${cid}/Quizzes/${qid}`}
          >
            Edit
          </a>
        </li>
        <li>
          <a
            id="wd-delete-quiz"
            className="dropdown-item"
            onClick={() => removeQuiz(qid)}
          >
            Delete
          </a>
        </li>
        <li>
          <a
            id="wd-publish-quiz"
            className="dropdown-item"
            onClick={() => setPublished(qid, !published)}
          >
            {published ? "Unpublish" : "Publish"}
          </a>
        </li>
        <li>
          <a id="wd-copy-quiz" className="dropdown-item">
            Copy
          </a>
        </li>
        <li>
          <a id="wd-sort-quiz" className="dropdown-item">
            Sort
          </a>
        </li>
      </ul>
    </div>
  );
}
