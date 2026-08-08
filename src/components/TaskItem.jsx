import { useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { PencilIcon } from "~/icons/PencilIcon";
import { CheckIcon } from "~/icons/CheckIcon";
import { updateTask } from "~/store/task";
import { ToggleButton } from "./ToggleButton";
import "./TaskItem.css";

export const TaskItem = ({ task }) => {
  const dispatch = useDispatch();

  const { listId } = useParams();
  const { id, title, detail, limit, done } = task;
  function utcToLocalDateString(date) {
    return new Date(date).toLocaleString();
  }

  function calcRemainingTimes(limit) {
    let remain = new Date(limit).getTime() - Date.now();
    if (remain < 0) {
      return "Expired";
    }
    const remainDays = Math.floor(remain / (24 * 60 * 60 * 1000));
    remain = remain - remainDays * 24 * 60 * 60 * 1000;
    const remainHours = Math.floor(remain / (60 * 60 * 1000));
    remain = remain - remainHours * 60 * 60 * 1000;
    const remainMinutes = Math.floor(remain / (60 * 1000));
    return `${remainDays}days ${remainHours}:${remainMinutes.toString().padStart(2, "0")}`;
  }

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleToggle = useCallback(() => {
    setIsSubmitting(true);
    void dispatch(updateTask({ id, done: !done })).finally(() => {
      setIsSubmitting(false);
    });
  }, [id, done]);

  return (
    <div className="task_item">
      <div className="task_item__title_container">
        <ToggleButton onClick={handleToggle} disabled={isSubmitting} done={done}></ToggleButton>
        <div className="task_item__title" data-done={done}>
          {title}
        </div>
        <div aria-hidden className="task_item__title_spacer"></div>
        <Link to={`/lists/${listId}/tasks/${id}`} className="task_item__title_action">
          <PencilIcon aria-label="Edit" />
        </Link>
      </div>
      <div className="task_item__detail">{detail}</div>
      <div className="task_item__detail">
        <div>Limit:{utcToLocalDateString(limit)}</div>
        {!done && <div>Remain: {calcRemainingTimes(limit)}</div>}
      </div>
    </div>
  );
};
