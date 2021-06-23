import * as React from "react";
import * as BasePage from "./Common/BasePage";

import * as classNames from "./index-page.scss";

export interface Props extends BasePage.Props {
  heading: React.HTMLAttributes<HTMLHeadingElement>;
}

const IndexPage: React.VFC<Props> = (props: Props) => {
  return (
    <BasePage.Component {...props}>
      <div className={["container", classNames.indexPage].join(" ")}>
        <h1 className={classNames.heading} {...props.heading} />
      </div>
    </BasePage.Component>
  );
};


export { IndexPage as Component };
