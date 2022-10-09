import React, { useState } from "react";

function App() {
  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [willUpdateTodo, setWillUpdateTodo] = useState("");

  const deleteTodo = (id) => {
    console.log("deleting id", id);
    const filteredTodos = todos.filter((item) => item.id !== id);
    setTodos(filteredTodos);
  };

  const changeIsDone = (id) => {
    const searchedTodo = todos.find((item) => item.id === id);
    const updatedTodo = {
      ...searchedTodo,
      isDone: !searchedTodo.isDone,
    };
    const filteredTodos = todos.filter((item) => item.id !== id);
    setTodos([updatedTodo, ...filteredTodos]);
    console.log("filtered todos", filteredTodos);
  };

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
    if (isEdit === true) {
      console.log(willUpdateTodo, "todo yu guncelleyecegiz");
      const searchedTodo = todos.find((item) => item.id === willUpdateTodo);
      const updatedTodo = {
        ...searchedTodo,
        text: todoText,
      };
      const filteredTodos = todos.filter((item) => item.id !== willUpdateTodo);
      setTodos([...filteredTodos, updatedTodo]);
      setTodoText("");
      setIsEdit(false);
      setWillUpdateTodo("");
    } else {
      const newTodo = {
        id: new Date().getTime(),
        isDone: false,
        text: todoText,
        date: new Date(),
      };
      setTodos([newTodo, ...todos]);
      setTodoText("");
      console.log("newtodo", newTodo);
    }
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
          <button
            className={`btn btn-${isEdit === true ? "warning" : "primary"}`}
            type="submit"
          >
            {isEdit === true ? "SAVE" : "ADD"}
          </button>
        </div>
      </form>
      {todos.length <= 0 ? (
        <p className="text-center my-5">You don't have todos yet.</p>
      ) : (
        <>
          {todos.map((item) => (
            <div
              style={{ textDecorationLine: "" }}
              className={`alert alert-${
                item.isDone === false ? "secondary" : "danger"
              } d-flex justify-content-between align-items-center`}
            >
              <p
                style={{
                  textDecorationLine: `${
                    item.isDone === true ? "line-through" : "none"
                  }`,
                }}
              >
                {item.text}
              </p>
              <div>
                <button
                  className="btn btn-sm btn-danger me-1"
                  onClick={(id) => deleteTodo(item.id)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-sm btn-warning me-1"
                  onClick={() => {
                    setIsEdit(true);
                    setWillUpdateTodo(item.id);
                    setTodoText(item.text);
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => changeIsDone(item.id)}
                  className="btn btn-sm btn-success "
                >
                  {item.isDone === false ? "Done" : "Undone"}
                </button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default App;
