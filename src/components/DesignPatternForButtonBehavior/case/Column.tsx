import * as React from "react";

export interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const Column: React.FC<Props> = (props: Props) => {
  return <div className="col-sm" {...props} />;
};

export { Column as Component };
