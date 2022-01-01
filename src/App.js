import "./styles.css";
import { useState } from "react";

export const App = () => {
  const [todoText, setTodoText] = useState("");
  const [incompleteTodos, setIncompleteTotos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);

  const onChangeTodoText = (event) => {
    setTodoText(event.target.value);
  };

  const addIncompleteTodos = () => {
    if (todoText === "") return;
    const todos = [...incompleteTodos, todoText];
    setIncompleteTotos(todos);
    setTodoText("");
  };

  const deleteIncompleteTodos = (index) => {
    const todos = [...incompleteTodos];
    todos.splice(index, 1);
    setIncompleteTotos(todos);
  };

  const addCompleteTodos = (index) => {
    const todos = [...completeTodos, incompleteTodos[index]];
    setCompleteTodos(todos);
    deleteIncompleteTodos(index);
  };

  const returnCompleteTodos = (index) => {
    const tmpnewCompleteTodos = [...completeTodos];
    tmpnewCompleteTodos.splice(index, 1);
    setCompleteTodos(tmpnewCompleteTodos);

    const tmpnewInCompleteTodos = [...incompleteTodos, completeTodos[index]];
    setIncompleteTotos(tmpnewInCompleteTodos);
  };

  return (
    <>
      <div className="input-area">
        <input
          placeholder="TODO"
          value={todoText}
          onChange={onChangeTodoText}
        />
        <button onClick={addIncompleteTodos}>追加</button>
      </div>
      <div className="uncomplete-area">
        <p className="title">未完了のTODO</p>
        <ul>
          {incompleteTodos.map((todo, i) => {
            return (
              <div key={todo} className="list-row">
                <li>{todo}</li>
                <button onClick={() => addCompleteTodos(i)}>完了</button>
                <button onClick={() => deleteIncompleteTodos(i)}>削除</button>
              </div>
            );
          })}
        </ul>
      </div>
      <div className="complete-area">
        <p className="title">完了のTODO</p>
        <ul>
          {completeTodos.map((todo, i) => {
            return (
              <div className="list-row">
                <li>{todo}</li>
                <button onClick={() => returnCompleteTodos(i)}>戻す</button>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
};
