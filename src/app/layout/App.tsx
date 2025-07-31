import type { FC } from "react";

import { Header } from "../../components/Header";
import { SideBar } from "../../components/SideBar";
import { Board } from "../../components/Board";
import { useAppSelector } from "../store/appStore";

import "../style/App.css";
import { Task } from "../../components/Task";
import { AddTask } from "../../components/AddTask";

const App: FC = () => {
  const selectedTask = useAppSelector((state) => state.board.selectedTask);
  const isAdding = useAppSelector((state) => state.board.isAdding);

  return (
    <div className="App">
      <Header />
      <div className="Body">
        <SideBar />
        <Board />
      </div>
      {selectedTask && <Task task={selectedTask} />}
      {isAdding && <AddTask />}
    </div>
  );
};

export default App;
