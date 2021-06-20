import { makeAutoObservable } from "mobx";

export interface State {
  root: string;
  "design-pattern/button-behavior": string;
}

const DEFAULT_STATE: State = {
  root: "/",
  "design-pattern/button-behavior": "/design-pattern/button-behavior",
};

export interface GetUrlOption {
  hash?: string;
}

export class Store {
  constructor(private state: State = DEFAULT_STATE) {
    makeAutoObservable(this);
  }

  public getUrl(key: keyof State, option?: GetUrlOption): string {
    const basepath = this.state[key];
    if (option) {
      return basepath + (option.hash ? `#${option.hash}` : "");
    }
    return basepath;
  }
}
