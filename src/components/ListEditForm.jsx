import { useCallback, useState } from "react";
import { updateList, deleteList } from "~/store/list";
import { useDispatch } from "react-redux";
import { useId } from "~/hooks/useId";
import { AppButton } from "~/components/AppButton";
import { TextField } from "~/components/TextField";
import "./ListEditForm.css";
export const ListEditForm = ({ listId, listTitle, handleClose, onDelete }) => {
  const id = useId();
  const dispatch = useDispatch();
  const [title, setTitle] = useState(listTitle);

  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();

      setIsSubmitting(true);

      void dispatch(updateList({ id: listId, title }))
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
    [title, listId],
  );
  const handleDelete = useCallback(() => {
    if (!window.confirm("Are you sure you want to delete this list?")) {
      return;
    }

    setIsSubmitting(true);

    void dispatch(deleteList({ id: listId }))
      .unwrap()
      .then(() => {
        onDelete();
      })
      .catch((err) => {
        setErrorMessage(err.message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }, []);
  return (
    <div className="edit_list">
      <h2 className="edit_list__title">Edit List</h2>
      <p className="edit_list__error">{errorMessage}</p>
      <form className="edit_list__form" onSubmit={onSubmit}>
        <fieldset className="edit_list__form_field">
          <label htmlFor={`${id}-title`} className="edit_list__form_label">
            Name
          </label>
          <TextField
            id={`${id}-title`}
            placeholder="Family"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </fieldset>
        <div className="edit_list__form_actions">
          <AppButton priority="secondary" onClick={handleClose}>
            Cancel
          </AppButton>
          <div className="edit_list__form_actions_spacer"></div>
          <AppButton type="button" disabled={isSubmitting} onClick={handleDelete} color="red">
            Delete
          </AppButton>
          <AppButton type="submit" className="app_button" disabled={isSubmitting}>
            Update
          </AppButton>
        </div>
      </form>
    </div>
  );
};
