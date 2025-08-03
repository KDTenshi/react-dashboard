import type { FC } from "react";

import style from "./PriorityPicker.module.css";
import { PriorityButton } from "../../../../../shared/ui";
import type { TTaskPriority } from "../../../../../shared/types/types";

interface PriorityPickerProps {
  activePriority: TTaskPriority;
  setPriority: (arg: TTaskPriority) => void;
}

const PriorityPicker: FC<PriorityPickerProps> = ({ activePriority, setPriority }) => {
  return (
    <div className={style.Picker}>
      <p className={style.Label}>Task priority</p>
      <div className={style.Buttons}>
        <PriorityButton priority="low" isActive={activePriority === "low"} onClick={() => setPriority("low")} />
        <PriorityButton
          priority="moderate"
          isActive={activePriority === "moderate"}
          onClick={() => setPriority("moderate")}
        />
        <PriorityButton priority="high" isActive={activePriority === "high"} onClick={() => setPriority("high")} />
      </div>
    </div>
  );
};

export default PriorityPicker;
