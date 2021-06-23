import * as React from "react";

export interface Item {
  name: string;
  value: string;
}

export interface Props extends React.ButtonHTMLAttributes<HTMLElement> {
  items?: Item[];
}

const StatusTable: React.VFC<Props> = ({ items, ...props }: Props) => {
  const Rows = (items || []).map(item => {
    return (
      <tr key={item.name}>
        <th scope="row">{item.name}</th>
        <td>{item.value}</td>
      </tr>
    );
  });
  return (
    <div {...props}>
      <table className={"table"}>
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

export { StatusTable as Component };
