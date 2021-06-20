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

export const Component: React.VFC<Props> = ({
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
      <div className={classNames.catalogPage}>
        <h1 className={classNames.heading} {...heading} />
        <div className={classNames.wrapper}>
          {defaultPatternSection && <DefaultPatternSection.Component className={classNames.defaultPatternSection} {...defaultPatternSection} />}
          {blockingPatternSection && <BlockingPatternSection.Component className={classNames.blockingPatternSection} {...blockingPatternSection} />}
          {debouncePatternSection && <DebouncePatternSection.Component className={classNames.debouncePatternSection} {...debouncePatternSection} />}
          {throttlePatternSection && <ThrottlePatternSection.Component className={classNames.throttlePatternSection} {...throttlePatternSection} />}
          {transitionPatternSection && <TransitionPatternSection.Component className={classNames.transitionPatternSection} {...transitionPatternSection} />}
        </div>
      </div>
    </BasePage.Component>
  );
};
