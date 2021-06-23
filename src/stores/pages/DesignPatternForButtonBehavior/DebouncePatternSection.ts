import { makeAutoObservable } from "mobx";
import type * as View from "../../../components/DesignPatternForButtonBehavior/DebouncePatternSection";
import type * as Types from "../../types/application";

export interface State {
  debounceTimer: number | undefined;
  debounceCounter: number;
  completeCount: number;
  status: "standby" | "debounce";
}

const DEFAULT_STATE: State = {
  debounceTimer: undefined,
  debounceCounter: 0,
  completeCount: 0,
  status: "standby",
};

export class Store {
  constructor(private readonly stores: Types.Stores, private state: State = DEFAULT_STATE) {
    makeAutoObservable(this);
  }

  private debounceCallback = () => {
    this.state.debounceCounter = 0;
    this.state.completeCount += 1;
    this.state.status = "standby";
  };

  private onClick = async () => {
    this.state.debounceCounter += 1;
    if (this.state.debounceTimer !== undefined) {
      window.clearTimeout(this.state.debounceTimer);
    }
    this.state.status = "debounce";
    this.state.debounceTimer = window.setTimeout(() => {
      this.debounceCallback();
    }, 300);
  };

  public generateProps = (): View.Props => {
    return {
      heading: {
        children: "Debounce Pattern",
        onClick: () => {
          this.stores.browser.router.push(
            this.stores.domain.site.getUrl("design-pattern/button-behavior", {
              hash: "debounce",
            }),
          );
        },
      },
      statusTable: {
        items: [
          {
            name: "Status",
            value: this.state.status,
          },
          {
            name: "Clickable",
            value: "true",
          },
          {
            name: "Complete",
            value: `${this.state.completeCount}`,
          },
          {
            name: "Debounce",
            value: `${this.state.debounceCounter}`,
          },
        ],
      },
      button: {
        children: `Click Me`,
        onClick: this.onClick,
      },
    };
  };
}
