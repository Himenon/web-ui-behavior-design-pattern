import * as React from "react";
import * as Button from "../base/Button";
import * as StatusTable from "./StatusTable";
import * as Row from "./Row";
import * as Confirm from "./Confirm";
import * as Column from "./Column";
import * as classNames from "./pattern-section.scss";

export interface Props extends React.HTMLAttributes<HTMLElement> {
  confirm?: Confirm.Props;
  heading: React.HTMLAttributes<HTMLHeadingElement>;
  button: Button.Props;
  statusTable: StatusTable.Props;
}

const PatternSection: React.FC<Props> = ({ heading, confirm, button, statusTable, ...props }: Props) => {
  return (
    <section className={classNames.patternSection} {...props}>
      <h2 className={classNames.heading} {...heading} />
      <Row.Component className={["row-cols-1", classNames.row].join(" ")}>
        <Column.Component className={["position-relative", classNames.buttonColumn].join(" ")}>
          {confirm && <Confirm.Component {...confirm} />}
          <Button.Component className={["btn btn-primary position-absolute top-50 start-50 translate-middle", classNames.button].join(" ")} {...button} />
        </Column.Component>
        <Column.Component>
          <StatusTable.Component {...statusTable} />
        </Column.Component>
      </Row.Component>
    </section>
  );
};

export { PatternSection as Component };