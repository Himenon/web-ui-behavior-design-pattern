import * as React from "react";

export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.VFC<Props> = ({ ...props }: Props) => {
  return <button className="btn btn-primary" {...props} />;
};

export { Button as Component };
