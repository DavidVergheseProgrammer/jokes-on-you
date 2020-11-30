import { useState } from "react";
import axios from "axios";
import { baseURL, config } from "../services";

function Form(props) {
  const [setup, setSetup] = useState("");
  const [punchline, setPunchline] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // create a fields object, to send to airtable 😀
    const fields = {
      setup,
      punchline,
      author,
    };
    // make our axios request
    await axios.post(baseURL, { fields }, config);
    // ...what next?
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
