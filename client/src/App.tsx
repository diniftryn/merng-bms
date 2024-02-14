import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Class from "./pages/Class";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        instructors: {
          merge(_existing, incoming) {
            return incoming;
          }
        },
        classes: {
          merge(_existing, incoming) {
            return incoming;
          }
        }
      }
    }
  }
});

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/classes/:id" element={<Class />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}
