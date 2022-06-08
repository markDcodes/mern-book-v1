//Creates new database document via POST request to server using axios

import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";


export function CreateTodo() {
    const [data, setData] = useState({ title: "", description: "" });

    //update "data" when input changes
    function handleChange(e) {
        setData((data) => ({ ...data, [e.target.name]: e.target.value }));
    }

    //Send POST req to server w/ data, then reset state "data"
    function handleSubmit(e) {
        e.preventDefault(); // prevent page from reloading when submit pressed

        const todo = {
            title: data.title,
            description: data.description,
        };

        console.log({ todo });
        axios
            .post("http://localhost:8000/api/todo", data)
            .then((res) => {
                setData({ title: "", description: "" });
                console.log(res.data.message);
            })
            .catch((err) => {
                console.log("Error couldn't create TODO");
                console.log(err.message);
            });
    }

    return (
        <section className="container">
            <Link to="/" className="button-back">
                <button type="button" className="button">
                    <FaArrowAltCircleLeft/>
                </button>
            </Link>
            <section className="contents">
                <form
                    onSubmit={handleSubmit}
                    className="form-container"
                    noValidate
                >
                    <label className="label" htmlFor="title">
                        Book Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={data.title}
                        onChange={handleChange}
                        className="input"
                    />
                    <label className="label" htmlFor="description">
                        Description
                    </label>
                    <input
                        type="text"
                        name="description"
                        value={data.description}
                        onChange={handleChange}
                        className="input"
                    />
                    <button type="submit" className="button">
                        <FaPlusCircle/>
                    </button>
                </form>
            </section>
        </section>
    );
}