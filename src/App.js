import { useEffect, useState } from "react";
import axios from "axios";
import { Route } from "react-router-dom";
import Form from "./components/Form";
import Joke from "./components/Joke";
import Nav from "./components/Nav";
import { baseURL, config } from "./services";
import "./App.css";

function App() {
  const [jokes, setJokes] = useState([]);
  const [toggleFetch, setToggleFetch] = useState(false);

  useEffect(() => {
    const getJokes = async () => {
      const resp = await axios.get(baseURL, config);
      setJokes(resp.data.records);
    };
    getJokes();
  }, [toggleFetch]);

  return (
    <div className="App">
      <Nav />
      <Route exact path="/">
        {jokes.map((joke) => (
          <Joke joke={joke} key={joke.id} setToggleFetch={setToggleFetch} />
        ))}
      </Route>
      <Route path="/new">
        <Form setToggleFetch={setToggleFetch} />
      </Route>
    </div>
  );
}

export default App;
