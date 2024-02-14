import { useNavigate } from "react-router-dom";
import { DELETE_CLASS } from "../mutations/classMutations";
import { GET_CLASSES } from "../queries/classQueries";
import { useMutation } from "@apollo/client";
import { MouseEventHandler } from "react";

export default function DeleteClassButton({ classId }: { classId: string }) {
  const navigate = useNavigate();

  const [deleteClass] = useMutation(DELETE_CLASS, {
    variables: { id: classId },
    onCompleted: () => navigate("/"),
    refetchQueries: [{ query: GET_CLASSES }]
  });

  const handleDelete: MouseEventHandler<HTMLButtonElement> = e => {
    e.preventDefault();

    deleteClass();

    alert("Deleted successfully");
  };

  return <button onClick={handleDelete}>Delete</button>;
}
