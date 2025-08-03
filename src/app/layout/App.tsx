import type { FC } from "react";

import { useAppSelector } from "../store/appStore";

import "../style/App.css";
import { Header } from "./components/Header";
import { SideBar } from "./components/SideBar";
import { Board } from "../../features/board/components/Board";
import { Task } from "../../features/tasks/components/Task";
import { AddTask } from "../../features/tasks/components/AddTask";

const App: FC = () => {
  const selectedTask = useAppSelector((state) => state.tasks.selectedTask);
  const isAddFormShown = useAppSelector((state) => state.ui.isAddTaskFormShown);

  return (
    <div className="App">
      <Header />
      <div className="Body">
        <SideBar />
        <Board />
      </div>
      {selectedTask && <Task task={selectedTask} />}
      {isAddFormShown && <AddTask />}
    </div>
  );
};

export default App;
