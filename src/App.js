import React, { useState } from "react";

function App() {
  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState([]);
  const changeIsDone = (id) => {
    const searchedTodo = todos.find((item) => item.id === id);
    const updatedTodo = {
      ...searchedTodo,
      isDone: !searchedTodo.isDone,
    };
    const filteredTodos = todos.filter((item) => item.id !== id);
    setTodos([updatedTodo, ...filteredTodos]);
    console.log(filteredTodos);
  };
  const doneText = (text) => {};
  const handleSubmit = (event) => {
    event.preventDefault();

    if (todoText === "") {
      alert("text cannot be empty");
      return;
    }
    const hasTodos = todos.find((item) => item.text === todoText);
    if (hasTodos !== undefined) {
      alert("You already have this todo!");
      return;
    }
    const newTodo = {
      id: new Date().getTime(),
      isDone: false,
      text: todoText,
      date: new Date(),
    };
    setTodos([newTodo, ...todos]);
    setTodoText("");

    /*const newTodoList=todos
    newTodoList.push(newTodo)
    setTodos(newTodoList)*/

    console.log(newTodo);
  };

  return (
    <div className="container">
      <h1 className="text-center my-5">Todo App </h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <input
            value={todoText}
            type="text"
            className="form-control"
            placeholder="Type Your Todo"
            onChange={(event) => setTodoText(event.target.value)}
          />
          <button className="btn btn-primary" type="submit">
            ADD
          </button>
        </div>
      </form>
      {todos.length <= 0 ? (
        <p className="text-center my-5">You don't have todos yet.</p>
      ) : (
        <>
          {todos.map((item) => (
            <div className="alert alert-secondary d-flex justify-content-between align-items-center">
              <p>{item.text}</p>
              <button
                onClick={() => changeIsDone(item.id)}
                className="btn btn-sm btn-success "
              >
                {item.isDone === false ? "Done" : "Undone"}
              </button>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default App;
