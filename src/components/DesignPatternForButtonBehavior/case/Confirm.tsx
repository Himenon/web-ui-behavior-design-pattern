import * as React from "react";
import * as Button from "../base/Button";
import * as classNames from "./confirm.scss";

export interface Props {
  heading: React.HTMLAttributes<HTMLHeadingElement>;
  closeButton: Button.Props;
}

export const Component: React.VFC<Props> = ({ closeButton, heading, ...props }: Props) => {
  return (
    <section className={classNames.confirm} {...props}>
      <h2 className={classNames.heading} {...heading} />
      <Button.Component className={classNames.closeButton} {...closeButton} />
    </section>
  );
};
