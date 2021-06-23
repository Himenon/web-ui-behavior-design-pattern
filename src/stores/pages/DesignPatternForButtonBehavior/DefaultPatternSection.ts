import { makeAutoObservable } from "mobx";
import type * as View from "../../../components/DesignPatternForButtonBehavior/DefaultPatternSection";
import type * as Types from "../../types/application";

export interface State {
  completeCount: number;
}

const DEFAULT_STATE: State = {
  completeCount: 0,
};

export class Store {
  constructor(private readonly stores: Types.Stores, private state: State = DEFAULT_STATE) {
    makeAutoObservable(this);
  }
  public onClick = () => {
    this.state.completeCount += 1;
  };

  public generateProps = (): View.Props => {
    return {
      heading: {
        children: "Default Pattern",
        onClick: () => {
          this.stores.browser.router.push(
            this.stores.domain.site.getUrl("design-pattern/button-behavior", {
              hash: "default",
            }),
          );
        },
      },
      statusTable: {
        items: [
          {
            name: "Status",
            value: "standby",
          },
          {
            name: "Clickable",
            value: `true`,
          },
          {
            name: "Complete",
            value: `${this.state.completeCount}`,
          },
        ],
      },
      button: {
        children: "Click Me",
        onClick: this.onClick,
      },
    };
  };
}
