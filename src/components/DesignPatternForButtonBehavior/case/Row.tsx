import * as React from "react";

export interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export const Component: React.FC<Props> = (props: Props) => {
  return <div className="row" {...props} />;
};
