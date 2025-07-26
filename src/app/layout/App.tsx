import type { FC } from "react";
import "../style/App.css";
import { Header } from "../../components/Header";
import { SideBar } from "../../components/SideBar";
import { Board } from "../../components/Board";
import { TaskInfo } from "../../components/TaskInfo";

const App: FC = () => {
  return (
    <div className="App">
      <SideBar />
      <div className="Body">
        <Header />
        <Board />
      </div>
      <TaskInfo />
    </div>
  );
};

export default App;
