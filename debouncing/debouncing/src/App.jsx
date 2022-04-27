import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
    // const [name, setName] = useState("");
    const [movieWaiting, setmovieWaiting] = useState(0);
    const [movies, setMovies] = useState([]);
    console.log(movies);
    // const handleChange = (e) => {
    //     setName(e.target.value);
    // };

    const apiCall = (e) => {
        axios
            .get(`http://www.omdbapi.com/?apikey=5eba1523&s=${e.target.value}`)
            .then(({ data }) => {
                console.log(data.Search);
                setMovies(data.Search);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const debounce = (e, func, delay) => {
        if (movieWaiting) {
            clearInterval(movieWaiting);
        }
        setmovieWaiting(
            setTimeout(function () {
                func(e);
            }, delay)
        );
    };

    return (
        <div className="App">
            <input
                onInput={(e) => {
                    // handleChange(e);
                    debounce(e, apiCall, 2000);
                }}
            ></input>

            <div className="displaydiv">
                {movies.map((ele) => {
                    return <p>{ele.Title}</p>;
                })}
            </div>
        </div>
    );
}

export default App;
