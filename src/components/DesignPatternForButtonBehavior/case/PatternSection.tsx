import * as React from "react";
import * as classNames from "./pattern-section.scss";

export interface Props extends React.HTMLAttributes<HTMLElement> {
  heading: React.HTMLAttributes<HTMLHeadingElement>;
}

export const Component: React.FC<Props> = ({ heading, ...props }: Props) => {
  return (
    <section className={classNames.patternSection} {...props}>
      <h2 className={classNames.heading} {...heading} />
      {props.children}
    </section>
  );
};
