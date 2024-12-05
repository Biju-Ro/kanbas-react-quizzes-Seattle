import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateAssignment, addAssignment } from "../reducer";
import * as client from "../client";

export default function AssignmentEditor() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { aid, cid } = useParams();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const [assignment, setAssignment] = useState<any>({
    title: "New Assignment",
    description: "Assignment Description",
    course: cid,
  });
  const saveAssignment = async (assignment: any) => {
    const status = await client.updateAssignment(assignment);
    dispatch(updateAssignment(module));
  };
  const createAssignment = async (assignment: any) => {
    const newAssignment = await client.createAssignment(
      cid as string,
      assignment
    );
    dispatch(addAssignment(newAssignment));
  };
  const saveOrUpdateAssignment = () => {
    if (aid === "New") {
      createAssignment(assignment);
    } else {
      saveAssignment(assignment);
    }
    navigate(`/Kanbas/Courses/${cid}/Assignments`);
  };
  useEffect(() => {
    if (aid !== "New") {
      const a = assignments.find((a: any) => a._id === aid);
      setAssignment(a);
    }
  }, [aid]);

  return (
    <div id="wd-assignments-editor">
      <div className="row">
        <div className="col">
          <label htmlFor="wd-name">{aid}</label>
          <br />
          <br />
          <input
            id="wd-name"
            value={assignment?.title}
            className="form-control"
            onChange={(e) =>
              setAssignment({
                ...assignment,
                title: e.target.value,
              })
            }
          />
        </div>
      </div>
      <br />
      <br />
      <div className="row">
        <div className="col">
          <textarea
            id="wd-description"
            style={{ width: "100%" }}
            className="form-control"
            value={assignment?.description}
            onChange={(e) =>
              setAssignment({
                ...assignment,
                description: e.target.value,
              })
            }
          />
        </div>
      </div>
      <br />
      <br />
      <div className="row">
        <label htmlFor="wd-points" className="col text-end">
          Points
        </label>
        <input
          id="wd-points"
          value={assignment?.points}
          className="form-control col"
          onChange={(e) =>
            setAssignment({
              ...assignment,
              points: e.target.value,
            })
          }
        />
      </div>
      <br />
      <div className="row">
        <label htmlFor="wd-group" className="col text-end">
          Assignment Group
        </label>
        <select id="wd-group" className="form-control col">
          <option selected value="ASSIGNMENTS">
            ASSIGNMENTS
          </option>
          <option value="QUIZZES">QUIZZES</option>
          <option value="TESTS">TESTS</option>
          <option value="LABS">LABS</option>
        </select>
      </div>
      <br />
      <div className="row">
        <label htmlFor="wd-display-grade-as" className="col text-end">
          Display Grade as
        </label>
        <select id="wd-display-grade-as" className="form-control col">
          <option selected value="Percentage">
            Percentage
          </option>
          <option value="Value">Value</option>
        </select>
      </div>
      <br />
      <div className="row">
        <label htmlFor="wd-submission-type" className="col text-end">
          Submission Type
        </label>
        <div
          className="col"
          style={{
            border: "1px solid grey",
            borderRadius: "3px",
            padding: "10px",
          }}
        >
          <select id="wd-submission-type" className="form-control">
            <option selected value="ONLINE">
              Online
            </option>
            <option value="IN-PERSON">In-person</option>
          </select>
          <br />
          <br />
          <label htmlFor="wd-online-entry-options">Online Entry Options:</label>
          <br />
          <div className="form-check">
            <input
              type="checkbox"
              name="wd-online-entry-options"
              id="wd-text-entry"
              className="form-check-input"
            />
            <label htmlFor="wd-text-entry">Text Entry</label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              name="wd-online-entry-options"
              id="wd-website-url"
              className="form-check-input"
            />
            <label htmlFor="wd-website-url">Website URL</label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              name="wd-online-entry-options"
              id="wd-media-recordings"
              className="form-check-input"
            />
            <label htmlFor="wd-media-recordings">Media Recordings</label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              name="w d-online-entry-options"
              id="wd-student-annotations"
              className="form-check-input"
            />
            <label htmlFor="wd-student-annotations">Student Annotations</label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              name="wd-online-entry-options"
              id="wd-file-upload"
              className="form-check-input"
            />
            <label htmlFor="wd-file-upload">File Uploads</label>
          </div>
        </div>
      </div>
      <br />
      <br />
      <div className="row">
        <div className="col text-end">
          <label htmlFor="wd-assign-to">Assign</label>
        </div>
        <div
          className="col"
          style={{
            border: "1px solid grey",
            borderRadius: "3px",
            padding: "10px",
          }}
        >
          <label htmlFor="wd-assign-to">Assign to</label>
          <br />
          <input id="wd-assign-to" value="Everyone" className="form-control" />
          <br />
          <label htmlFor="wd-due-date">Due Date</label>
          <br />
          <input
            type="date"
            id="wd-due-date"
            value={assignment?.due}
            className="form-control"
            onChange={(e) =>
              setAssignment({
                ...assignment,
                due: e.target.value,
              })
            }
          />
          <br />
          <div className="row">
            <div className="col">
              <label htmlFor="wd-available-from">Available from</label>
              <br />
              <input
                type="date"
                id="wd-available-from"
                value={assignment?.available}
                className="form-control"
                onChange={(e) =>
                  setAssignment({
                    ...assignment,
                    available: e.target.value,
                  })
                }
              />
            </div>
            <div className="col">
              <label htmlFor="wd-available-until">Until</label>
              <br />
              <input
                type="date"
                id="wd-available-until"
                value={assignment?.due}
                className="form-control"
                onChange={(e) =>
                  setAssignment({
                    ...assignment,
                    due: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col">
          <Link to={`/Kanbas/Courses/${cid}/Assignments`}>
            {" "}
            <button id="wd-save" className="btn btn-primary float-end me-2">
              Cancel
            </button>
          </Link>
          <button
            id="wd-save"
            className="btn btn-primary float-end me-2"
            onClick={saveOrUpdateAssignment}
          >
            Save
          </button>
        </div>
      </div>
      <br />
    </div>
  );
}
