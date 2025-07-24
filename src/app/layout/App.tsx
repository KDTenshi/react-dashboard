import type { FC } from "react";
import "../style/App.css";
// import { Header } from "../../components/Header";
import { SideBar } from "../../components/SideBar";

const App: FC = () => {
  return (
    <div className="App">
      <SideBar />
      {/* <Header /> */}
    </div>
  );
};

export default App;
