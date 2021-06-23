// import { observer } from "mobx-react";
import * as React from "react";
import { RootPage as Page } from "../containers";
import type * as Types from "../stores/types/application";

export const PageContainer = (props: Types.Stores) => {
  const store = new Page.Store(props);
  return <Page.Component store={store} />;
};

export { PageContainer as Component };
