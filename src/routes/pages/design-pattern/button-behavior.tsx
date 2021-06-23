import * as React from "react";
import { DeisgnPatternForButtonBehaviorPage as Page } from "../../../containers";
import type * as Types from "../../../stores/types/application";

const ObservableContainer = (props: Types.Stores) => {
  const store = new Page.Store(props);
  return <Page.Component store={store} />;
};

export { ObservableContainer as Component };
