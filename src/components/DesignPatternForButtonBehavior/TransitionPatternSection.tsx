import * as React from "react";
import * as PatternSection from "./case/PatternSection";
import * as Button from "./base/Button";
import * as Status from "./case/Status";
import * as Confirm from "./case/Confirm";
import * as Column from "./case/Column";
import * as Row from "./case/Row";
import * as classNames from "./button-pattern-section.scss";

export interface Props extends PatternSection.Props {
  confirm?: Confirm.Props;
  button: Button.Props;
  status: Status.Props;
}

export const Component: React.VFC<Props> = ({ button, status, confirm, ...props }: Props) => {
  return (
    <PatternSection.Component className={classNames.patternSection} {...props}>
      <Row.Component className={classNames.row}>
        <Column.Component className={classNames.buttonColumn}>
          {confirm && <Confirm.Component {...confirm} />}
          <Button.Component className={classNames.button} {...button} />
        </Column.Component>
        <Column.Component>
          <Status.Component className={classNames.status} {...status} />
        </Column.Component>
      </Row.Component>
    </PatternSection.Component>
  );
};
