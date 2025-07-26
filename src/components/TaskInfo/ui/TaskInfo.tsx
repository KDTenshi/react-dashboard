import React, { useEffect, useState, type FC } from "react";

import style from "./TaskInfo.module.css";
import { useAppDispatch, useAppSelector } from "../../../app/store/appStore";
import {
  changeTaskDescription,
  changeTaskTitle,
  deleteTask,
  unsetSelectedTask,
} from "../../../shared/store/boardSlice";

const TaskInfo: FC = () => {
  const [isTitleEdit, setIsTitleEdit] = useState(false);
  const [editTitleValue, setEditTitleValue] = useState("");

  const [isDescEdit, setIsDescEdit] = useState(false);
  const [editDescValue, setEditDescValue] = useState("");
  const [editDescHeight, setEditDescHeight] = useState(0);

  const [className, setClassName] = useState(style.Idle);

  const selectedTask = useAppSelector((state) => state.board.selectedTask);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (selectedTask) setClassName(style.Wrapper);
  }, [selectedTask]);

  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;

    if (target.classList.contains(style.Wrapper)) {
      dispatch(unsetSelectedTask());
      setClassName(style.Hidden);
    }
  };

  const handleTitleClick = () => {
    if (!selectedTask) return;

    setIsTitleEdit(true);
    setEditTitleValue(selectedTask.title);
  };

  const handleTitleEdit = () => {
    if (!selectedTask) return;

    const newTitle = editTitleValue.trim();

    if (newTitle) {
      dispatch(changeTaskTitle({ selectedTask, title: newTitle }));
    } else {
      setEditTitleValue(selectedTask.title);
    }

    setIsTitleEdit(false);
  };

  const handleDescClick = (e: React.MouseEvent) => {
    if (!selectedTask) return;
    const target = e.target as HTMLElement;

    setIsDescEdit(true);
    setEditDescValue(selectedTask.description);
    setEditDescHeight(target.scrollHeight);
  };

  const handleDescEditChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLElement;
    target.style.height = "0";
    target.style.height = `${target.scrollHeight}px`;
    setEditDescValue(e.target.value);
  };

  const handleDescEdit = () => {
    if (!selectedTask) return;

    const newDesc = editDescValue.trim();

    if (newDesc) {
      dispatch(changeTaskDescription({ selectedTask, description: newDesc }));
    } else {
      setEditDescValue(selectedTask.description);
    }

    setIsDescEdit(false);
  };

  const handleDeleteTask = () => {
    if (!selectedTask) return;

    dispatch(deleteTask({ selectedTask }));
    setClassName(style.Hidden);
  };

  return (
    <div className={className} onClick={handleClick}>
      <div className={style.Info}>
        <button className={style.Delete} onClick={handleDeleteTask}>
          <span className="material-symbols-outlined">delete</span>Delete
        </button>
        {selectedTask && (
          <>
            <div className={style.Text}>
              {!isTitleEdit && (
                <h4 className={style.Title} onClick={handleTitleClick}>
                  {selectedTask.title}
                </h4>
              )}
              {isTitleEdit && (
                <form className={style.TitleEdit}>
                  <input
                    type="text"
                    className={style.TitleInput}
                    autoFocus
                    placeholder="Task title..."
                    value={editTitleValue}
                    onChange={(e) => setEditTitleValue(e.target.value)}
                    onBlur={handleTitleEdit}
                  />
                </form>
              )}
              {!isDescEdit && (
                <p className={style.Desc} onClick={handleDescClick}>
                  {selectedTask.description}
                </p>
              )}
              {isDescEdit && (
                <textarea
                  className={style.DescEdit}
                  value={editDescValue}
                  onChange={handleDescEditChange}
                  onBlur={handleDescEdit}
                  autoFocus
                  placeholder="Task description..."
                  style={{ height: editDescHeight }}
                ></textarea>
              )}
              <p className={style.Tip}>Click on title or description to edit</p>
            </div>
            <div className={style.Notes}>
              <textarea className={style.Textarea} placeholder="Enter note here..."></textarea>
              <div className={style.List}>
                {selectedTask.notes.map((note) => (
                  <div className={style.Note}>{note}</div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskInfo;
