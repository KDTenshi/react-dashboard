import { useEffect, type FC } from "react";

const SettingsPage: FC = () => {
  useEffect(() => {
    document.title = "Settings | Project Dashboard App";
  }, []);

  return <div>Settings</div>;
};

export default SettingsPage;
