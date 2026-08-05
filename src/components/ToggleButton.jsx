import "./ToggleButton.css";
import { CheckIcon } from "~/icons/CheckIcon";
export const ToggleButton = ({ done, ...props }) => {
  return (
    <button type="button" className="task_create_form__mark_button" {...props}>
      {done ? (
        <div className="task_create_form__mark____complete" aria-label="Completed">
          <CheckIcon className="task_create_form__mark____complete_check" />
        </div>
      ) : (
        <div className="task_create_form__mark____incomplete" aria-label="Incomplete"></div>
      )}
    </button>
  );
};
