import { FaPlus } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import { IoMdMore } from "react-icons/io";

export default function QuizzesControls({ isStudent }: { isStudent: boolean }) {
  const { cid } = useParams();
  return (
    <div
      id="wd-modules-controls"
      className="text-nowrap"
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      <div className="input-group" style={{ width: "330px" }}>
        <input
          type="text"
          className="form-control me-1"
          placeholder="Search for Quiz"
        />
      </div>
      {!isStudent && (
        <div>
          <Link to={`/Kanbas/Courses/${cid}/Quizzes/New/edit`}>
            <button
              id="wd-add-module-btn"
              className="btn btn-lg btn-danger me-1"
            >
              <FaPlus
                className="position-relative me-2"
                style={{ bottom: "1px" }}
              />
              Quiz
            </button>
          </Link>
          <button id="wd-add-module-btn" className="btn btn-lg btn-light me-1">
            <IoMdMore className="position-relative" />
          </button>
        </div>
      )}
    </div>
  );
}
