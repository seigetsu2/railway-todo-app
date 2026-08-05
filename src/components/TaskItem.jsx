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
  const { id, title, detail, done } = task;

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
    </div>
  );
};
