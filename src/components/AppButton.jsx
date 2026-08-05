import React from "react";
import "./AppButton.css";
function Slot({ children, ...props }) {
  if (React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...props,
      ...children.props,
    });
  }
  if (React.Children.count(children) > 1) {
    React.Children.only(null);
  }
  return null;
}

export const AppButton = ({ asChild, priority = "primary", color = "", ...props }) => {
  const Component = asChild ? Slot : "button";
  let accent = "";
  if (color === "red") {
    accent = "accent_red";
  }
  return <Component className={`app_button ${accent}`} data-variant={priority} {...props} />;
};
