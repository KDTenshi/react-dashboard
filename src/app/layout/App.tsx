import type { FC } from "react";
import "../style/App.css";
import { Header } from "../../components/Header";

const App: FC = () => {
  return (
    <div className="App">
      <Header />
    </div>
  );
};

export default App;
