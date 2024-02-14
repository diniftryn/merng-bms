import { FormEvent, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_CLASS } from "../mutations/classMutations";
import { GET_CLASSES } from "../queries/classQueries";
import { GET_INSTRUCTORS } from "../queries/instructorQueries";

export default function AddClassModal() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [instructorId, setInstructorId] = useState("");
  const [status, setStatus] = useState("new");

  const [addClass] = useMutation(ADD_CLASS, {
    variables: { name, description, instructorId, status },
    update(cache, { data: { addClass } }) {
      const { classes } = cache.readQuery({ query: GET_CLASSES });
      cache.writeQuery({
        query: GET_CLASSES,
        data: { classes: [...classes, addClass] }
      });
    }
  });

  // Get Instructors for select
  const { loading, error, data } = useQuery(GET_INSTRUCTORS);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !description || !status || !instructorId) {
      return alert("Please fill in all fields");
    }

    addClass();

    setName("");
    setDescription("");
    setStatus("new");
    setInstructorId("");
  };

  if (loading) return null;
  if (error) return "Something Went Wrong";

  return (
    <div>
      {!loading && !error && (
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

          <label className="form-label">Instructor</label>
          <select id="instructorId" value={instructorId} onChange={e => setInstructorId(e.target.value)}>
            <option value="">Select Instructor</option>
            {data.instructors.map((instructor: { id: string; name: string }) => (
              <option key={instructor.id} value={instructor.id}>
                {instructor.name}
              </option>
            ))}
          </select>

          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}
