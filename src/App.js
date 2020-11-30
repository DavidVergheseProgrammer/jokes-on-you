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

  useEffect(() => {
    const getJokes = async () => {
      const resp = await axios.get(baseURL, config);
      setJokes(resp.data.records);
    };
    getJokes();
  }, []);

  return (
    <div className="App">
      <Nav />
      <Route exact path="/">
        {jokes.map((joke) => (
          <Joke joke={joke} key={joke.id} />
        ))}
      </Route>
      <Route path="/new">
        <Form />
      </Route>
    </div>
  );
}

export default App;
