import * as React from "react";
import { observer } from "mobx-react";

import { IndexPage as View } from "../../components";
import { IndexPage as Store } from "../../stores";

export { Store };

export interface Props {
  store: Store;
}

const IndexPageContainer: React.VFC<Props> = ({ store }: Props) => {
  const props = store.generateProps();
  return <View.Component {...props} />;
};

export const Component = observer(IndexPageContainer);
