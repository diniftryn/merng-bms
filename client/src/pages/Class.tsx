import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_CLASS } from "../queries/classQueries";

export default function Class() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_CLASS, { variables: { id } });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something Went Wrong</p>;

  return (
    <>
      {!loading && !error && (
        <div className="mx-auto w-75 card p-5">
          <Link to="/" className="btn btn-light btn-sm w-25 d-inline ms-auto">
            Back
          </Link>

          <h1>{data.class.name}</h1>
          <p>{data.class.description}</p>

          <h5 className="mt-3">Class Status</h5>
          <p className="lead">{data.class.status}</p>

          <InstructorInfo instructor={data.class.instructor} />
        </div>
      )}
    </>
  );
}

function InstructorInfo({ instructor }: { instructor: { name: string; phone: string; email: string } }) {
  return (
    <div>
      <h1>taught by: {instructor.name}</h1>
      <h2>
        {instructor.phone} {instructor.email}
      </h2>
    </div>
  );
}
