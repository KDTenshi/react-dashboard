import { useState, type FC } from "react";

import style from "./TaskForm.module.css";
import { PriorityPicker } from "../../PriorityPicker";
import { TaskDate } from "../../TaskDate";
import type { TTask } from "../../../../../shared/types/types";
import { useAppDispatch } from "../../../../../app/store/appStore";
import { Button, InputWithWarning, Textarea } from "../../../../../shared/ui";
import { addTaskThunk } from "../../../../../services/thunks/tasks";

interface TaskFromProps {
  task?: TTask;
  hideForm: () => void;
}

const TaskForm: FC<TaskFromProps> = ({ task, hideForm }) => {
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState(task ? task.title : "");
  const [description, setDescription] = useState(task ? task.description : "");
  const [deadline, setDeadline] = useState(task ? task.deadline : Date.now() + 24 * 60 * 60 * 1000);
  const [priority, setPriority] = useState(task ? task.priority : "low");

  const [isTitleWarning, setIsTitleWarning] = useState(false);
  const [isDateWarning, setIsDateWarning] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTitle = title.trim();

    if (deadline < Date.now()) setIsDateWarning(true);

    if (!newTitle) {
      setIsTitleWarning(true);
      return;
    }

    if (task && task.date > deadline) {
      setIsDateWarning(true);
      return;
    }

    if (newTitle && !task) {
      dispatch(addTaskThunk({ title: newTitle, description, deadline, priority }));
      hideForm();
      return;
    }

    if (newTitle && task) {
      hideForm();
      return;
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
        <Button onClick={hideForm} color="light">
          Cancel
        </Button>
        <Button type="submit" color="dark">
          Confirm
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;
