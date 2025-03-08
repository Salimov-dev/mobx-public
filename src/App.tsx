import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button, Flex, List, Spin, Typography } from "antd";
import counterStore from "./store/counter.store";
import { observer } from "mobx-react-lite";
import todosStore from "./store/todos.store";
import { useEffect } from "react";

const { Title } = Typography;

const App = observer(() => {
  const {
    count,
    decrement,
    increment,
    total,
    savedCount,
    saveCount,
    removeSavedCount
  } = counterStore;

  const { getAll, todos, isLoading } = todosStore;

  useEffect(() => {
    getAll();
  }, [getAll]);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <Title>Результат: {count}</Title>
        <Flex gap="6px" justify="center">
          <button onClick={() => increment(3)}>increment</button>
          <button onClick={() => decrement(2)}>decrement</button>
        </Flex>
        <Title>Сохраненное число: {savedCount}</Title>
        <Button type="primary" block onClick={saveCount}>
          Добавить число
        </Button>
        <Button type="dashed" danger block onClick={removeSavedCount}>
          Очистить число
        </Button>
        <Title>Итоговое число: {total}</Title>
        {!isLoading ? (
          <List
            bordered
            dataSource={todos}
            renderItem={(todo) => (
              <List.Item>
                <Typography.Text>
                  {todo.todo} - {todo.completed ? "Выполнено" : "В процессе"}
                </Typography.Text>
              </List.Item>
            )}
          />
        ) : (
          <Spin />
        )}
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
});

export default App;
