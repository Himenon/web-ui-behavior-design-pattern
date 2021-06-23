import * as React from "react";
import * as DefaultPatternSection from "./DesignPatternForButtonBehavior/DefaultPatternSection";
import * as BlockingPatternSection from "./DesignPatternForButtonBehavior/BlockingPatternSection";
import * as ThrottlePatternSection from "./DesignPatternForButtonBehavior/ThrottlePatternSection";
import * as DebouncePatternSection from "./DesignPatternForButtonBehavior/DebouncePatternSection";
import * as TransitionPatternSection from "./DesignPatternForButtonBehavior/TransitionPatternSection";
import * as BasePage from "./Common/BasePage";

import * as classNames from "./design-pattern-for-button-behavior-page.scss";

export interface Props extends BasePage.Props {
  heading: React.HTMLAttributes<HTMLHeadingElement>;
  defaultPatternSection?: DefaultPatternSection.Props;
  blockingPatternSection?: BlockingPatternSection.Props;
  debouncePatternSection?: DebouncePatternSection.Props;
  throttlePatternSection?: ThrottlePatternSection.Props;
  transitionPatternSection?: TransitionPatternSection.Props;
}

const DesignPatternForButtonBehaviorPage: React.VFC<Props> = ({
  heading,
  defaultPatternSection,
  blockingPatternSection,
  debouncePatternSection,
  throttlePatternSection,
  transitionPatternSection,
  ...props
}: Props) => {
  return (
    <BasePage.Component {...props}>
      <div className={["container", classNames.catalogPage].join(" ")}>
        <h1 className={classNames.heading} {...heading} />
        <div className={"row gx-5 align-items-start"}>
          {defaultPatternSection && (
            <DefaultPatternSection.Component className={["col", classNames.defaultPatternSection].join(" ")} {...defaultPatternSection} />
          )}
          {blockingPatternSection && (
            <BlockingPatternSection.Component className={["col", classNames.blockingPatternSection].join(" ")} {...blockingPatternSection} />
          )}
          {debouncePatternSection && (
            <DebouncePatternSection.Component className={["col", classNames.debouncePatternSection].join(" ")} {...debouncePatternSection} />
          )}
          {throttlePatternSection && (
            <ThrottlePatternSection.Component className={["col", classNames.throttlePatternSection].join(" ")} {...throttlePatternSection} />
          )}
          {transitionPatternSection && (
            <TransitionPatternSection.Component className={["col", classNames.transitionPatternSection].join(" ")} {...transitionPatternSection} />
          )}
        </div>
      </div>
    </BasePage.Component>
  );
};

export { DesignPatternForButtonBehaviorPage as Component };