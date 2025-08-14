import type { FC } from "react";

import { useAppSelector } from "../store/appStore";

import "../style/App.css";
import { Header } from "./components/Header";
import { SideBar } from "./components/SideBar";
import { BrowserRouter, Route, Routes } from "react-router";
import { HomePage } from "../../pages/HomePage";
import { ProjectsPage } from "../../pages/ProjectsPage";
import { SettingsPage } from "../../pages/SettingsPage";
import { AddProject } from "../../features/projects/components/AddProject";
import { ProjectPage } from "../../pages/ProjectPage";

const App: FC = () => {
  const isAddProjectFormShown = useAppSelector((state) => state.ui.isAddProjectFormShown);

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className="Body">
          <SideBar />
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="project" element={<ProjectPage />} />
          </Routes>
        </div>
        {isAddProjectFormShown && <AddProject />}
      </div>
    </BrowserRouter>
  );
};

export default App;
