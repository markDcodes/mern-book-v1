// This component will READ all docs from database.
// Use axios to send GET req to backend to fetch data, store with "setTodo" in "todo" state.
// Use useEffect for GET to load data when page loads.

import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; 
import { UpdateTodo } from "./updateTodo"; 
import { FaPlusCircle } from "react-icons/fa";
import { FaCog } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

// TodoCard component - displays contents of todo. Use map to iterate over todo and pass contents to component.
function TodoCard({ data, handleEdit, handleDelete }) { 
    const { _id, title, description } = data;

    return (
        <li key={_id}>
            <div className="title-description">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>

            <div className="button-container">
               {/* Edit Button */}
               <button className="button" name={_id} onClick={handleEdit}> 
                    <FaCog />
                </button>
                {/* Delete Button */}
                <button className="button" name={_id} onClick={handleDelete}>
                    <FaTrash />
                </button>
            </div>
        </li>
    );
}

// ShowToDoList component - will fetch docs and store in state "todo".
export function ShowTodoList() {
    const [todo, setTodo] = useState([]);
    const [open, setOpen] = useState(false); // if edit button is clicked on any todo; open = true. This conditionally renders UpdateTodo
    const [id, setId] = useState(""); // passed as prop to UpdateTodo component
    const [update, setUpdate] = useState(false); // used to fetch all todo docs

    useEffect(
        function () {
            axios
                .get("http://localhost:8000/api/todo")
                .then((res) => {
                    console.log(res.data);
                    setTodo(res.data);
                })
                .catch((err) => {
                    console.log(err.message);
                });
        },
        [update]
    );

    //Update state "id" w/ _id of doc
    function handleEdit(e) { 
        setId(e.target.name); 
        setOpen(true);
    }

    //inverts that state of update causeing useEffect hook to update the todo array
    function handleUpdate() { 
        console.log("update:", update, !update);
        setUpdate(!update);
    }

    //Sends DELETE req to server, using _id of document to delete. and update array "todo" with filtered array
    function handleDelete(e) { 
        axios.delete(`http://localhost:8000/api/todo/${e.target.name}`);

        setTodo((data) => {
            return data.filter((todo) => todo._id !== e.target.name);
        });
    }

    function handleClose() { 
        setId("");
        setOpen(false);
    }

    return (
        <section className="container">
            
            <section className="contents">
                <h1 className="Subtitle">Share a favorite book of yours.</h1>
                
                {/* New Button */}
                <Link to="/create-todo" className="button-new">
                <button className="button"><FaPlusCircle/></button>
                </Link>
            
                <ul className="list-container">
                    {todo.map((data) => (
                        <TodoCard
                            data={data}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                        />
                    ))}
                </ul>
            </section>
            
            {open ? (
                <section className="update-container">
                    <div className="update-contents">
                        <p onClick={handleClose} className="close">
                            &times;
                        </p>

                        <UpdateTodo
                            _id={id}
                            handleClose={handleClose}
                            handleUpdate={handleUpdate}
                        />
                    </div>
                </section>
            ) : (
                ""
            )}
        </section>
    );
}







    