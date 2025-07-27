import type { FC } from "react";
import "../style/App.css";
import { Header } from "../../components/Header";
import { SideBar } from "../../components/SideBar";
import { Board } from "../../components/Board";
import { Task } from "../../components/Task";
import { AddTask } from "../../components/AddTask";
import { useAppSelector } from "../store/appStore";

const App: FC = () => {
  const selectedTask = useAppSelector((state) => state.board.selectedTask);
  const isAdding = useAppSelector((state) => state.board.isAdding);

  return (
    <div className="App">
      <SideBar />
      <div className="Body">
        <Header />
        <Board />
      </div>
      {selectedTask && <Task task={selectedTask} />}
      {isAdding && <AddTask />}
    </div>
  );
};

export default App;
