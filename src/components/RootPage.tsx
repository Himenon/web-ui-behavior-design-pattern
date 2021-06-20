import * as React from "react";
import * as BasePage from "./Common/BasePage";

import * as classNames from "./root-page.scss";

export interface Props extends BasePage.Props {
  heading: React.HTMLAttributes<HTMLHeadingElement>;
}

export const Component: React.VFC<Props> = (props: Props) => {
  return (
    <BasePage.Component {...props}>
      <div className={classNames.rootPage}>
        <h1 className={classNames.heading} {...props.heading} />
      </div>
    </BasePage.Component>
  );
};
