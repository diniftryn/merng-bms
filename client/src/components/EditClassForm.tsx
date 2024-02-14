import { FormEvent, useState } from "react";
import { useMutation } from "@apollo/client";
import { GET_CLASS } from "../queries/classQueries";
import { UPDATE_CLASS } from "../mutations/classMutations";

export default function EditClassForm({ skatingClass }) {
  const [name, setName] = useState(skatingClass.name);
  const [description, setDescription] = useState(skatingClass.description);
  const [status, setStatus] = useState(() => {
    switch (skatingClass.status) {
      case "Coming Soon":
        return "new";
      case "In Progress":
        return "progress";
      case "Enrolment":
        return "enrolment";
      case "Completed":
        return "completed";
      default:
        throw new Error(`Unknown status: ${skatingClass.status}`);
    }
  });

  const [updateClass] = useMutation(UPDATE_CLASS, {
    variables: { id: skatingClass.id, name, description, status },
    refetchQueries: [{ query: GET_CLASS, variables: { id: skatingClass.id } }]
  });

  const onSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!name || !description || !status) {
      return alert("Please fill out all fields");
    }

    updateClass();

    alert("Class details updated");
  };

  return (
    <div>
      <h1>Edit Class Details</h1>

      <form onSubmit={onSubmit}>
        <label>Name</label>
        <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} />

        <label>Description</label>
        <textarea id="description" value={description} onChange={e => setDescription(e.target.value)}></textarea>

        <label>Status</label>
        <select id="status" value={status} onChange={e => setStatus(e.target.value)}>
          <option value="new">Coming Soon</option>
          <option value="enrolment">Enrolment</option>
          <option value="progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <button type="submit">Update</button>
      </form>
    </div>
  );
}
