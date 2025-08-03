import { useState, type FC } from "react";

import style from "./TaskDate.module.css";
import { DatePicker, Warning } from "../../../../../shared/ui";
import { getDateString } from "../../../../../shared/utils/getDateString";

interface TaskDateProps {
  taskCreationDate?: number;
  taskDeadline: number;
  setDeadline: (arg: number) => void;
  warningMessage: string;
  isWarningShown: boolean;
  hideWarning: () => void;
}

const TaskDate: FC<TaskDateProps> = ({
  taskDeadline,
  taskCreationDate,
  warningMessage,
  isWarningShown,
  hideWarning,
  setDeadline,
}) => {
  const [isPickerShown, setIsPickerShown] = useState(false);

  return (
    <div className={style.Wrapper}>
      {isPickerShown && (
        <DatePicker timestamp={taskDeadline} setTimestamp={setDeadline} hidePicker={() => setIsPickerShown(false)} />
      )}
      {taskCreationDate && (
        <div className={style.Block}>
          <p className={style.Label}>Created at</p>
          <p className={style.Date}>{getDateString(taskCreationDate, "long")}</p>
        </div>
      )}
      <div className={style.Block}>
        <p className={style.Label}>Deadline</p>
        <div className={style.Deadline}>
          <p className={style.Date}>{getDateString(taskDeadline, "long")}</p>
          <button className={style.Button} type="button" onClick={() => setIsPickerShown(true)}>
            <span className="material-symbols-outlined">calendar_clock</span>
          </button>
        </div>
        {isWarningShown && <Warning message={warningMessage} isShown={isWarningShown} hideWarning={hideWarning} />}
      </div>
    </div>
  );
};

export default TaskDate;
