import * as React from "react";
import * as classNames from "./button.scss";

export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Component: React.VFC<Props> = ({ ...props }: Props) => {
  return <button className={classNames.button} {...props} />;
};
