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

const Navigation: React.VFC<Props> = ({ ...props }: Props) => {
  return (
    <nav className={["navbar", "navbar-expand-lg", "navbar-light", "bg-light", classNames.navigationBar].join(" ")}>
      <div className="container-fluid">
        <a className={["navbar-brand", classNames.navbarBrand].join(" ")} onClick={props.brand.onClick}>
          {props.brand.linkText}
        </a>
        <div className={"navbar-collapse"} id="navbarNav">
          <ul className={"navbar-nav"}>
            {props.items.map(itemProps => (
              <NavItem.Component key={itemProps.linkText} {...itemProps} />
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export { Navigation as Component };
