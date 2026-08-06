import "./TextField.css";
export const TextField = ({ multiLine, ...props }) => {
  const Component = multiLine ? "textarea" : "input";
  return <Component className="app_input" {...props} />;
};
