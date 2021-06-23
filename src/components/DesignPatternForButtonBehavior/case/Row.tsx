import * as React from "react";

export interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const Row: React.FC<Props> = (props: Props) => {
  return <div className="row" {...props} />;
};

export { Row as Component };
