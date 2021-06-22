import { makeAutoObservable } from "mobx";
import type { History, Location, LocationDescriptor } from "history";

export interface State {
  history: History;
  location: Location;
}

export class Store {
  constructor(private state: State) {
    makeAutoObservable(this);
    this.updateLocation({
      ...state.location, // this.stateにするとwarningがでる
      hash: window.location.hash,
    });
    this.initialize();
  }

  private updateLocation(newLocation: Location) {
    this.state.location = newLocation;
  }

  public get location() {
    return this.state.location;
  }

  private initialize = () => {
    this.state.history.listen(newLocation => {
      this.updateLocation(newLocation);
    });
  };

  public push = (newPath: LocationDescriptor<object>) => {
    this.state.history.push(newPath);
  };
  public replace = (newLocation: History.Path, state?: object) => {
    this.state.history.replace(newLocation, state);
  };
  public go = (n: number) => {
    this.state.history.go(n);
  };
  public goBack = () => {
    this.state.history.goBack();
  };
  public goForward = () => {
    this.state.history.goForward();
  };
}
