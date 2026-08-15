import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { updateTask, deleteTask } from "~/store/task";
import { AppButton } from "./AppButton";
import { TextField } from "./TextField";
import { DateInput } from "./DateInput";
import { useId } from "~/hooks/useId";
import { UTCToLocal } from "~/utils/dateUtils";
import "./TaskEditForm.css";

export const TaskEditForm = ({ task, handleClose }) => {
  const id = useId();
  const taskId = task.id;
  const dispatch = useDispatch();
  const [title, setTitle] = useState(task.title);
  const [detail, setDetail] = useState(task.detail);
  const [limit, setLimit] = useState(UTCToLocal(task.limit).toISOString().slice(0, 16));
  const [done, setDone] = useState(task.done);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();

      setIsSubmitting(true);

      void dispatch(
        updateTask({ id: taskId, title, detail, limit: new Date(limit).toISOString(), done }),
      )
        .unwrap()
        .then(() => {
          handleClose();
        })
        .catch((err) => {
          setErrorMessage(err.message);
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    },
    [title, detail, limit, done],
  );
  const handleDelete = useCallback(() => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }

    setIsSubmitting(true);

    void dispatch(deleteTask({ id: taskId }))
      .unwrap()
      .then(() => {
        handleClose();
      })
      .catch((err) => {
        setErrorMessage(err.message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }, [taskId]);
  return (
    <div className="edit_task">
      <h2 className="edit_list__title">Edit List</h2>
      <p className="edit_list__error">{errorMessage}</p>
      <form className="edit_list__form" onSubmit={onSubmit}>
        <fieldset className="edit_list__form_field">
          <label htmlFor={`${id}-title`} className="edit_list__form_label">
            Title
          </label>
          <TextField
            id={`${id}-title`}
            placeholder="Buy some milk"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </fieldset>
        <fieldset className="edit_list__form_field">
          <label htmlFor={`${id}-detail`} className="edit_list__form_label">
            Description
          </label>
          <TextField
            multiLine
            id={`${id}-detail`}
            placeholder="Blah blah blah"
            value={detail}
            onChange={(event) => setDetail(event.target.value)}
          />
        </fieldset>
        <fieldset className="edit_list__form_field">
          <label htmlFor={`${id}-limit`} className="edit_list__form_label">
            Limit
          </label>
          <div>
            <DateInput
              id={`${id}-limit`}
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
            />
          </div>
        </fieldset>
        <fieldset className="edit_list__form_field">
          <label htmlFor={`${id}-done`} className="edit_list__form_label">
            Is Done
          </label>
          <div>
            <input
              id={`${id}-done`}
              type="checkbox"
              checked={done}
              onChange={(event) => setDone(event.target.checked)}
            />
          </div>
        </fieldset>
        <div className="edit_list__form_actions">
          <AppButton priority="secondary" onClick={handleClose} asChild>
            Cancel
          </AppButton>
          <div className="edit_list__form_actions_spacer"></div>
          <AppButton type="button" disabled={isSubmitting} onClick={handleDelete} color="red">
            Delete
          </AppButton>
          <AppButton type="submit" disabled={isSubmitting}>
            Update
          </AppButton>
        </div>
      </form>
    </div>
  );
};
