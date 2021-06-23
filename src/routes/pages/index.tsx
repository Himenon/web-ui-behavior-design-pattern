import * as React from "react";
import { IndexPage as Page } from "../../containers";
import type * as Types from "../../stores/types/application";

export const ObservableContainer = (props: Types.Stores) => {
  const store = new Page.Store(props);
  return <Page.Component store={store} />;
};

export { ObservableContainer as Component };
