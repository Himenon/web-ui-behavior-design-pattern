import * as React from "react";
// import { observer } from "mobx-react";

import { RootPage as View } from "../../components";
import { RootPage as Store } from "../../stores";

export { Store };

export interface Props {
  store: Store;
}

const RootPageContainer: React.VFC<Props> = ({ store }: Props) => {
  const props = store.generateProps();
  return <View.Component {...props} />;
};

export { RootPageContainer as Component };
