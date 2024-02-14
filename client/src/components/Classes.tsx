import { useQuery } from "@apollo/client";
import { GET_CLASSES } from "../queries/classQueries";
import AddClassModal from "./AddClassModal";

export default function Classes() {
  const { loading, error, data } = useQuery(GET_CLASSES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something Went Wrong. Error : {error.message}</p>;

  return (
    <>
      {data.classes.length > 0 ? (
        <div>
          <h1>Classes Available</h1>

          <AddClassModal />
          {data.classes.map(({ id, name, description, status }: { id: string; name: string; description: string; status: string }) => (
            <div key={id}>
              <h3>
                {name} {id}
              </h3>
              <br />
              <p>{description}</p>
              <p>{status}</p>
              <br />
              <a className="btn btn-light" href={`/classes/${id}`}>
                View
              </a>
            </div>
          ))}
        </div>
      ) : (
        <p>No Projects</p>
      )}
    </>
  );
}
