import type { FC } from "react";
import "../style/App.css";
import { Header } from "../../components/Header";
import { SideBar } from "../../components/SideBar";
import { Board } from "../../components/Board";
import { Task } from "../../components/Task";

const App: FC = () => {
  return (
    <div className="App">
      <SideBar />
      <div className="Body">
        <Header />
        <Board />
      </div>
      <Task />
    </div>
  );
};

export default App;
