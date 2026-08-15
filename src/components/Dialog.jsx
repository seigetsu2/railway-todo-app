import { BackButton } from "./BackButton";
import { useId } from "~/hooks/useId";
import { createPortal } from "react-dom";
import "./Dialog.css";
export const Dialog = ({ ref, children }) => {
  const id = useId();
  return createPortal(
    <>
      <style
        href={id}
        precedence={"default"}
      >{`html:has(#${CSS.escape(id)}[open]) { overflow: hidden; }`}</style>
      <dialog className="dialog_modal" id={id} ref={ref}>
        <BackButton onClick={() => ref.current?.close()} />
        {children}
      </dialog>
    </>,
    document.body,
  );
};
