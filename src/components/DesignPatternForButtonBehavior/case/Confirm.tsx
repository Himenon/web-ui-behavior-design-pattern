import * as React from "react";
import * as Button from "../base/Button";
import * as classNames from "./confirm.scss";

export interface Props {
  heading: React.HTMLAttributes<HTMLHeadingElement>;
  closeButton: Button.Props;
}

const Confirm: React.VFC<Props> = ({ closeButton, heading, ...props }: Props) => {
  return (
    <section className={["position-absolute top-0 start-0", classNames.confirm].join(" ")} {...props}>
      <h2 className={["position-absolute start-50 translate-middle", classNames.heading].join(" ")} {...heading} />
      <Button.Component className={["btn btn-light position-absolute start-50 translate-middle", classNames.closeButton].join(" ")} {...closeButton} />
    </section>
  );
};

export { Confirm as Component };
