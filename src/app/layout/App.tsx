import type { FC } from "react";

import { useAppSelector } from "../store/appStore";

import "../style/App.css";
import { Header } from "./components/Header";
import { SideBar } from "./components/SideBar";
import { Board } from "../../features/board/components/Board";
import { Task } from "../../features/tasks/components/Task";
import { AddTask } from "../../features/tasks/components/AddTask";

const App: FC = () => {
  const selectedTaskID = useAppSelector((state) => state.tasks.selectedTaskID);
  const isAddTaskFormShown = useAppSelector((state) => state.ui.isAddTaskFormShown);
  const isTaskPopupShown = useAppSelector((state) => state.ui.isTaskPopupShown);

  return (
    <div className="App">
      <Header />
      <div className="Body">
        <SideBar />
        <Board />
      </div>
      {selectedTaskID && isTaskPopupShown && <Task taskID={selectedTaskID} />}
      {isAddTaskFormShown && <AddTask />}
    </div>
  );
};

export default App;
