import { useState, type FC } from "react";

import style from "./TaskInfo.module.css";

const TaskInfo: FC = () => {
  const [isShown, setIsShown] = useState(true);

  const [title, setTitle] = useState("Task title");
  const [desc, setDesc] = useState(
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab libero quia sed itaque voluptas? Sed ipsa quam optio minus consequatur porro quis magni, tempora nostrum quisquam doloremque magnam quidem exercitationem. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab libero quia sed itaque voluptas? Sed ipsa quam optio minus consequatur porro quis magni, tempora nostrum quisquam doloremque magnam quidem exercitationem."
  );

  const [isTitleEdit, setIsTitleEdit] = useState(false);
  const [editTitleValue, setEditTitleValue] = useState(title);
  const [editDescHeight, setEditDescHeight] = useState(0);

  const [isDescEdit, setIsDescEdit] = useState(false);
  const [editDescValue, setEditDescValue] = useState(desc);

  const handelClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;

    if (target.classList.contains(style.Wrapper)) {
      setIsShown(false);
    }
  };

  const handleEditTitle = () => {
    const newTitle = editTitleValue.trim();

    if (newTitle) {
      setTitle(newTitle);
    } else {
      setEditTitleValue(title);
    }

    setIsTitleEdit(false);
  };

  const handleEditTitleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handleEditTitle();
  };

  const handleEditDescClick = (e: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => {
    const target = e.target as HTMLElement;

    const height = target.scrollHeight;

    setEditDescHeight(height);
    setIsDescEdit(true);
  };

  const handleEditDesc = () => {
    const newDesc = editDescValue.trim();

    if (newDesc) {
      setDesc(newDesc);
    } else {
      setEditDescValue(title);
    }

    setIsDescEdit(false);
  };

  return (
    <div className={isShown ? style.Wrapper : style.Hidden} onClick={handelClick}>
      <div className={style.Info}>
        <button className={style.Delete}>
          <span className="material-symbols-outlined">delete</span>Delete
        </button>
        <div className={style.Text}>
          {!isTitleEdit && (
            <h4 className={style.Title} onClick={() => setIsTitleEdit(true)}>
              {title}
            </h4>
          )}
          {isTitleEdit && (
            <form className={style.TitleEdit} onSubmit={handleEditTitleSubmit}>
              <input
                type="text"
                className={style.TitleInput}
                value={editTitleValue}
                onChange={(e) => setEditTitleValue(e.target.value)}
                onBlur={handleEditTitle}
                autoFocus
                placeholder="Task title..."
              />
            </form>
          )}
          {!isDescEdit && (
            <p className={style.Desc} onClick={handleEditDescClick}>
              {desc}
            </p>
          )}
          {isDescEdit && (
            <textarea
              className={style.DescEdit}
              value={editDescValue}
              onChange={(e) => setEditDescValue(e.target.value)}
              onBlur={handleEditDesc}
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
            <div className={style.Note}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt hic ex necessitatibus quos quae fuga
              aut quam saepe, incidunt facilis qui nulla praesentium tempore sit obcaecati possimus sunt provident
              aperiam.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskInfo;
