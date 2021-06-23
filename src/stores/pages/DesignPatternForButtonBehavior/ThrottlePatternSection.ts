import { makeAutoObservable } from "mobx";
import type * as View from "../../../components/DesignPatternForButtonBehavior/ThrottlePatternSection";
import type * as Types from "../../types/application";

export interface State {
  status: "standby" | "cooling";
  completeCount: number;
}

const DEFAULT_STATE: State = {
  status: "standby",
  completeCount: 0,
};

export class Store {
  private coolingTimeMs = 500;
  constructor(private readonly stores: Types.Stores, private state: State = DEFAULT_STATE) {
    makeAutoObservable(this);
  }

  private throttleCallback = () => {
    this.state.status = "standby";
    this.state.completeCount += 1;
  };

  private onClick = async () => {
    if (this.state.status === "cooling") {
      return;
    }
    if (this.state.status === "standby") {
      this.state.status = "cooling";
      window.setTimeout(() => {
        this.throttleCallback();
      }, this.coolingTimeMs);
    }
  };

  public generateProps = (): View.Props => {
    return {
      heading: {
        children: "Throttle Pattern",
        onClick: () => {
          this.stores.browser.router.push(
            this.stores.domain.site.getUrl("design-pattern/button-behavior", {
              hash: "throttle",
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
        ],
      },
      button: {
        children: `Click Me`,
        onClick: this.onClick,
      },
    };
  };
}
