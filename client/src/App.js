import { BrowserRouter, Route, Routes } from "react-router-dom";   
import { ShowTodoList } from "./components/showTodoList";
import { CreateTodo } from "./components/createTodo";
import "./App.scss";
import Header from "./components/header";

function App() {
    return (
        <div className="app-contents">
            <Header />
            <BrowserRouter>          
                <Routes>   
                    <Route exact path="/" element={<ShowTodoList/>} />  
                    <Route path="/create-todo" element={<CreateTodo/>} /> 
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
