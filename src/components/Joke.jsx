import axios from "axios";
import { baseURL, config } from "../services";

function Joke(props) {
  const handleDelete = async () => {
    const jokeURL = `${baseURL}/${props.joke.id}`;
    await axios.delete(jokeURL, config);
    props.setToggleFetch((prev) => !prev);
  };

  return (
    <div>
      <p>{props.joke.fields.setup}</p>
      <em>
        <p>{props.joke.fields.punchline}</p>
      </em>
      <strong>
        <p>{props.joke.fields.author}</p>
      </strong>
      <button onClick={handleDelete}>YEET</button>
    </div>
  );
}

export default Joke;
