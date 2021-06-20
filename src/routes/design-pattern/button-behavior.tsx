import * as React from "react";
import { DeisgnPatternForButtonBehaviorPage as Page } from "../../containers";
import type * as Types from "../../stores/types/application";

export const Component = (props: Types.Stores) => {
  const store = new Page.Store(props);
  return <Page.Component store={store} />;
};
