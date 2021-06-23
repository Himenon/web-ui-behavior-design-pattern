import * as React from "react";
import * as PatternSection from "./case/PatternSection";
import * as classNames from "./button-pattern-section.scss";

export interface Props extends PatternSection.Props {}

const DebouncePatternSection: React.VFC<Props> = ({ ...props }: Props) => {
  return <PatternSection.Component className={classNames.patternSection} {...props} />;
};

export { DebouncePatternSection as Component };
