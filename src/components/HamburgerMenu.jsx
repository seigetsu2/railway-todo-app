import { HamburgerIcon } from "~/icons/HamburgerIcon";
import "./HamburgerMenu.css";
export const HamburgerMenu = ({ onClick }) => {
  return (
    <button className="hamburger_menu" onClick={onClick}>
      <HamburgerIcon />
    </button>
  );
};
