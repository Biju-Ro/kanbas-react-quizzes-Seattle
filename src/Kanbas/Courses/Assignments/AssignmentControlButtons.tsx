import { IoEllipsisVertical } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import GreenCheckmark from "../../Components/GreenCheckmark";
import { deleteAssignment, setAssignments } from "./reducer";
import * as client from "./client";
import { useDispatch } from "react-redux";

export default function AssignmentControlButtons({
  assignmentId,
}: {
  assignmentId: string;
}) {
  const dispatch = useDispatch();
  const removeAssignment = async () => {
    await client.deleteAssignment(assignmentId);
    dispatch(deleteAssignment(assignmentId));
  };
  return (
    <div className="float-end">
      <FaTrash
        className="text-danger me-2 mb-1"
        onClick={() => {
          const remove = window.confirm(
            "Would you like to delete this assignment?"
          );
          if (remove) {
            removeAssignment();
          }
        }}
      />
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
