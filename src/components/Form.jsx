import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { baseURL, config } from "../services";

function Form(props) {
  const [setup, setSetup] = useState("");
  const [punchline, setPunchline] = useState("");
  const [author, setAuthor] = useState("");

  const history = useHistory();
  const params = useParams();

  // whenever we need to find a new joke to edit
  // 1. on page load
  // 2. once jokes is fetched
  // 3. whenever we change the id of the joke we're looking for
  useEffect(() => {
    if (params.id && props.jokes.length > 0) {
      const joke = props.jokes.find((joke) => joke.id === params.id);
      setSetup(joke.fields.setup);
      setPunchline(joke.fields.punchline);
      setAuthor(joke.fields.author);
    }
  }, [props.jokes, params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // create a fields object, to send to airtable 😀
    const fields = {
      setup,
      punchline,
      author,
    };
    // make our axios request
    if (params.id) {
      const jokeURL = `${baseURL}/${params.id}`;
      await axios.put(jokeURL, { fields }, config);
    } else {
      await axios.post(baseURL, { fields }, config);
    }
    // ...what next?
    props.setToggleFetch((prev) => !prev);
    history.push("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="setup">Setup</label>
      <input
        name="setup"
        type="text"
        value={setup}
        onChange={(e) => setSetup(e.target.value)}
      />
      <label htmlFor="punchline">Punchline</label>
      <input
        name="punchline"
        type="text"
        value={punchline}
        onChange={(e) => setPunchline(e.target.value)}
      />
      <label htmlFor="author">Author</label>
      <input
        name="author"
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <button type="submit">HAHA</button>
    </form>
  );
}

export default Form;
