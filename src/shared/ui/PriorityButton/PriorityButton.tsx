import type { FC } from "react";
import type { TTaskPriority } from "../../types/types";

import style from "./PriorityButton.module.css";

interface PriorityButtonProps {
  priority: TTaskPriority;
  isActive: boolean;
  onClick: () => void;
}

const priorityColors: { [key in TTaskPriority]: string } = {
  low: style.Low,
  moderate: style.Moderate,
  high: style.High,
};

const PriorityButton: FC<PriorityButtonProps> = ({ priority, isActive, onClick }) => {
  const className = isActive ? [priorityColors[priority], style.Active].join(" ") : priorityColors[priority];

  return (
    <button type="button" className={className} onClick={onClick}>
      {priority}
    </button>
  );
};

export default PriorityButton;
