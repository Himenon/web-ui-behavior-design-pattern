import { makeAutoObservable } from "mobx";
import type { RootPage } from "../../components";
import type * as Types from "../types/application";

export class Store {
  constructor(private stores: Types.Stores) {
    makeAutoObservable(this);
  }

  public generateProps = (): RootPage.Props => {
    return {
      navigation: this.stores.view.navigation.generateProps(),
      heading: {
        children: "Design Pattern for UI Behavior ",
      },
    };
  };
}
