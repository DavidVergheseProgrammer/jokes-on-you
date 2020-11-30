import { useEffect, useState } from "react";
import axios from "axios";
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
      {jokes.map((joke) => (
        <p>{joke.fields.setup}</p>
      ))}
    </div>
  );
}

export default App;
