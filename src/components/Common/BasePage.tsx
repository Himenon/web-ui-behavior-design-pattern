import * as React from "react";
import * as Navigation from "./Navigation";

export { Navigation };

export interface Props {
  navigation: Navigation.Props;
}

const BasePage: React.FC<Props> = ({ ...props }) => {
  return (
    <div>
      <Navigation.Component {...props.navigation} />
      {props.children}
    </div>
  );
};

export { BasePage as Component };