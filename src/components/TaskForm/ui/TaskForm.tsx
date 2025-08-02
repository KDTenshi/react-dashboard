import { useState, type FC } from "react";

import style from "./TaskForm.module.css";
import { PriorityPicker } from "../../PriorityPicker";
import { InputWithWarning, Textarea } from "../../../shared/ui";
import type { TTask } from "../../../shared/types/types";
import { useAppDispatch } from "../../../app/store/appStore";
import { addTask, editSelectedTask, setIsAdding, unsetSelectedTask } from "../../../shared/store/boardSlice";
import { TaskDate } from "../../TaskDate";

interface TaskFromProps {
  task?: TTask;
}

const TaskForm: FC<TaskFromProps> = ({ task }) => {
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState(task ? task.title : "");
  const [description, setDescription] = useState(task ? task.description : "");
  const [deadline, setDeadline] = useState(task ? task.deadline : Date.now() + 24 * 60 * 60 * 1000);
  const [priority, setPriority] = useState(task ? task.priority : "low");

  const [isTitleWarning, setIsTitleWarning] = useState(false);
  const [isDateWarning, setIsDateWarning] = useState(false);

  const hideForm = () => {
    if (!task) dispatch(setIsAdding(false));

    if (task) dispatch(unsetSelectedTask());
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTitle = title.trim();

    if (deadline < Date.now()) setIsDateWarning(true);

    if (!newTitle) {
      setIsTitleWarning(true);
    }

    if (newTitle && !task) {
      dispatch(addTask({ title, description, deadline, priority }));
      hideForm();
    }

    if (newTitle && task) {
      dispatch(editSelectedTask({ title, description, deadline, priority }));
      hideForm();
    }
  };

  return (
    <form className={style.Form} autoComplete="off" onSubmit={handleSubmit}>
      <InputWithWarning
        label="Task title"
        warningMessage="Invalid title"
        isWarningShown={isTitleWarning}
        hideWarning={() => setIsTitleWarning(false)}
        placeholder="Task title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Textarea
        label="Task description"
        placeholder="No description..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <p className={style.Label}>Task priority</p>
      <PriorityPicker activePriority={priority} setPriority={setPriority} />
      <TaskDate
        taskDeadline={deadline}
        taskCreationDate={task && task.date}
        isWarningShown={isDateWarning}
        warningMessage="Invalid date"
        hideWarning={() => setIsDateWarning(false)}
        setDeadline={setDeadline}
      />
      <div className={style.Buttons}>
        <button className={style.Cancel} type="button" onClick={hideForm}>
          Cancel
        </button>
        <button className={style.Confirm}>Confirm</button>
      </div>
    </form>
  );
};

export default TaskForm;
