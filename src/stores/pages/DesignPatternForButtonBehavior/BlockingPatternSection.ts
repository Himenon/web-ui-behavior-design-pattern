import { makeAutoObservable } from "mobx";
import type * as View from "../../../components/DesignPatternForButtonBehavior/BlockingPatternSection";
import type * as Types from "../../types/application";

export interface State {
  status: "standby" | "blocking";
  completeCount: number;
}

const DEFAULT_STATE: State = {
  status: "standby",
  completeCount: 0,
};

export class Store {
  constructor(private readonly stores: Types.Stores, private state: State = DEFAULT_STATE) {
    makeAutoObservable(this);
  }

  private blockingCallback = () => {
    this.state.status = "standby";
  };

  private onClick = async () => {
    this.state.status = "blocking";
    this.state.completeCount += 1;
    window.setTimeout(() => {
      this.blockingCallback();
    }, 1000);
  };

  private get isButtonDisable(): boolean {
    return this.state.status === "blocking";
  }
  public generateProps = (): View.Props => {
    return {
      statusTable: {
        items: [
          {
            name: "Status",
            value: this.state.status,
          },
          {
            name: "Clickable",
            value: `${this.state.status !== "blocking"}`,
          },
          {
            name: "Complete",
            value: `${this.state.completeCount}`,
          },
        ],
      },
      heading: {
        children: "Blocking Pattern",
        onClick: () => {
          this.stores.browser.router.push(
            this.stores.domain.site.getUrl("design-pattern/button-behavior", {
              hash: "blocking",
            }),
          );
        },
      },
      button: {
        children: "Click Me",
        onClick: this.onClick,
        "aria-disabled": this.isButtonDisable,
        disabled: this.isButtonDisable,
      },
    };
  };
}
