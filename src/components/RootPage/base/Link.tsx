import * as React from "react";

export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Link: React.VFC<Props> = ({ ...props }: Props) => {
  return <button {...props} />;
};

export { Link as Component };
