import * as React from "react";
import * as classNames from "./navigation.scss";
import * as NavItem from "./case/NavItem";

export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  brand: {
    linkText: string;
    onClick?: () => void;
  };
  items: NavItem.Props[];
}

export const Component: React.VFC<Props> = ({ ...props }: Props) => {
  return (
    <nav className={classNames.navigationBar}>
      <div className={classNames.containerFluid}>
        <a className={classNames.navbarBrand} onClick={props.brand.onClick}>
          {props.brand.linkText}
        </a>
        <div className={classNames.navbarCollapse} id="navbarNav">
          <ul className={classNames.navbarNav}>
            {props.items.map(itemProps => (
              <NavItem.Component key={itemProps.linkText} {...itemProps} />
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};
