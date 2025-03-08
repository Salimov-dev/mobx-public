import axios from "axios";
import { action, makeAutoObservable, reaction, when } from "mobx";

interface ITodo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

class TodosStore {
  todos: ITodo[] = [];
  isLoading = false;

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.todos.length,
      (newLength) => {
        console.log(`Количество задач изменилось: ${newLength}`);
        if (newLength > 0) {
          console.log("Есть задачи");
        }
      }
    );

    when(
      () => !this.isLoading && this.todos.length > 0,
      () => console.log("Todos успешно загружены!")
    );
  }

  getAll = action(async () => {
    this.isLoading = true;

    try {
      const res = await axios.get("https://dummyjson.com/todos");
      this.todos = res.data.todos;
    } catch (error) {
      console.log("error", error);
    } finally {
      this.isLoading = false;
    }
  });
}

export default new TodosStore();
