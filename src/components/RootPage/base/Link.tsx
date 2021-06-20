import * as React from "react";

export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Component: React.VFC<Props> = ({ ...props }: Props) => {
  return <button {...props} />;
};
