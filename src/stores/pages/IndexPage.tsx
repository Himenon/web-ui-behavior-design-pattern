import { makeAutoObservable } from "mobx";
import type { IndexPage } from "../../components";
import type * as Types from "../types/application";

export class Store {
  constructor(private stores: Types.Stores) {
    makeAutoObservable(this);
  }

  public generateProps = (): IndexPage.Props => {
    return {
      navigation: this.stores.view.navigation.generateProps(),
      heading: {
        children: "Design Pattern for UI Behavior ",
      },
    };
  };
}
