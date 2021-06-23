import * as React from "react";

import { DeisgnPatternForButtonBehaviorPage as View } from "../../components";
import { DeisgnPatternForButtonBehaviorPage as Store } from "../../stores";

export { Store };

export interface Props {
  store: Store;
}

export const DesignPatternForButtonBehaviorPageContainer: React.VFC<Props> = ({ store }: Props) => {
  const props = store.generateProps();
  return <View.Component {...props} />;
};

export { DesignPatternForButtonBehaviorPageContainer as Component };
