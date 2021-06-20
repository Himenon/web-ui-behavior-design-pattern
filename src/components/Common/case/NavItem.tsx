import * as React from "react";
import * as classNames from "./nav-item.scss";

export interface Props {
  className?: string;
  linkText: string;
  onClick?: () => void;
}

export const Component: React.VFC<Props> = ({ ...props }: Props) => {
  return (
    <li className={classNames.navItem}>
      <a className={classNames.navLink} onClick={props.onClick}>
        {props.linkText}
      </a>
    </li>
  );
};
