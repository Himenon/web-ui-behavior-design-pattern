import * as React from "react";
import * as classNames from "./row.scss";

export interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export const Component: React.FC<Props> = (props: Props) => {
  return <div className={classNames.row} {...props} />;
};
