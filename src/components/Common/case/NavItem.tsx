import * as React from "react";
import * as classNames from "./nav-item.scss";

export interface Props {
  className?: string;
  linkText: string;
  onClick?: () => void;
}

const NavItem: React.VFC<Props> = ({ ...props }: Props) => {
  return (
    <li className={["navbar", "navbar-expand-lg", classNames.navItem].join(" ")}>
      <a className={["nav-link", classNames.navLink].join(" ")} onClick={props.onClick}>
        {props.linkText}
      </a>
    </li>
  );
};

export { NavItem as Component };