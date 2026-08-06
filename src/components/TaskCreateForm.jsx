import { useCallback, useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import "./TaskCreateForm.css";
import { createTask } from "~/store/task";
import { AppButton } from "./AppButton";
import { ToggleButton } from "./ToggleButton";

export const TaskCreateForm = () => {
  const dispatch = useDispatch();

  const refForm = useRef(null);
  const [elemTextarea, setElemTextarea] = useState(null);

  const [formState, setFormState] = useState("initial");

  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [done, setDone] = useState(false);

  const handleToggle = useCallback(() => {
    setDone((prev) => !prev);
  }, []);

  const handleFocus = useCallback(() => {
    setFormState("focused");
  }, []);

  const handleBlur = useCallback(() => {
    if (title || detail) {
      return;
    }

    setTimeout(() => {
      // フォーム内の要素がフォーカスされている場合は何もしない
      const formElement = refForm.current;
      if (formElement && formElement.contains(document.activeElement)) {
        return;
      }

      setFormState("initial");
      setDone(false);
    }, 100);
  }, [title, detail]);

  const handleDiscard = useCallback(() => {
    setTitle("");
    setDetail("");
    setFormState("initial");
    setDone(false);
  }, []);

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();

      setFormState("submitting");

      void dispatch(createTask({ title, detail, done }))
        .unwrap()
        .then(() => {
          handleDiscard();
        })
        .catch((err) => {
          alert(err.message);
          setFormState("focused");
        });
    },
    [title, detail, done],
  );

  useEffect(() => {
    if (!elemTextarea) {
      return;
    }

    const recalcHeight = () => {
      elemTextarea.style.height = "auto";
      elemTextarea.style.height = `${elemTextarea.scrollHeight}px`;
    };

    elemTextarea.addEventListener("input", recalcHeight);
    recalcHeight();

    return () => {
      elemTextarea.removeEventListener("input", recalcHeight);
    };
  }, [elemTextarea]);

  return (
    <form ref={refForm} className="task_create_form" onSubmit={onSubmit} data-state={formState}>
      <div className="task_create_form__title_container">
        <ToggleButton
          onClick={handleToggle}
          onFocus={handleFocus}
          onBlur={handleBlur}
          done={done}
        ></ToggleButton>
        <input
          type="text"
          className="task_create_form__title"
          placeholder="Add a new task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={formState === "submitting"}
        />
      </div>
      {formState !== "initial" && (
        <div>
          <textarea
            ref={setElemTextarea}
            rows={1}
            className="task_create_form__detail"
            placeholder="Add a description here..."
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            onBlur={handleBlur}
            disabled={formState === "submitting"}
          />
          <div className="task_create_form__actions">
            <AppButton
              type="button"
              data-variant="secondary"
              onBlur={handleBlur}
              onClick={handleDiscard}
              disabled={(!title && !detail) || formState === "submitting"}
            >
              Discard
            </AppButton>
            <div className="task_create_form__spacer"></div>
            <AppButton
              type="submit"
              className="app_button"
              onBlur={handleBlur}
              disabled={!title || !detail || formState === "submitting"}
            >
              Add
            </AppButton>
          </div>
        </div>
      )}
    </form>
  );
};
