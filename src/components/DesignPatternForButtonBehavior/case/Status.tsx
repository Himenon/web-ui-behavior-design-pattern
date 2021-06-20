import * as React from "react";
import * as classNames from "./status.scss";

export interface Item {
  name: string;
  value: string;
}

export interface Props extends React.ButtonHTMLAttributes<HTMLElement> {
  items?: Item[];
}

export const Component: React.VFC<Props> = ({ items, ...props }: Props) => {
  const Rows = (items || []).map(item => {
    return (
      <tr key={item.name}>
        <th scope="row">{item.name}</th>
        <td>{item.value}</td>
      </tr>
    );
  });
  return (
    <div className={classNames.status} {...props}>
      <table className={classNames.table}>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Value</th>
          </tr>
        </thead>
        <tbody>{Rows}</tbody>
      </table>
    </div>
  );
};
