import type { FC } from "react";

import style from "./PriorityPicker.module.css";
import type { TTaskPriority } from "../../../shared/types/types";

interface PriorityPickerProps {
  activePriority: TTaskPriority;
  setPriority: (arg: TTaskPriority) => void;
}

const PriorityPicker: FC<PriorityPickerProps> = ({ activePriority, setPriority }) => {
  const getPriorityClassName = (priority: TTaskPriority) => {
    if (priority === "low") {
      return activePriority === "low" ? [style.Low, style.Active].join(" ") : style.Low;
    }

    if (priority === "moderate") {
      return activePriority === "moderate" ? [style.Moderate, style.Active].join(" ") : style.Moderate;
    }

    if (priority === "high") {
      return activePriority === "high" ? [style.High, style.Active].join(" ") : style.High;
    }
  };

  return (
    <div className={style.Picker}>
      <button className={getPriorityClassName("low")} onClick={() => setPriority("low")} type="button">
        Low
      </button>
      <button className={getPriorityClassName("moderate")} onClick={() => setPriority("moderate")} type="button">
        Moderate
      </button>
      <button className={getPriorityClassName("high")} onClick={() => setPriority("high")} type="button">
        High
      </button>
    </div>
  );
};

export default PriorityPicker;
