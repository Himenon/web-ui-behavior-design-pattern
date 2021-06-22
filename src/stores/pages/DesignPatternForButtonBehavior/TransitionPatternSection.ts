import { makeAutoObservable } from "mobx";
import type * as View from "../../../components/DesignPatternForButtonBehavior/TransitionPatternSection";
import type * as Types from "../../types/application";

export interface State {
  isVisibleConfirm: boolean;
  completeCount: number;
}

const DEFAULT_STATE: State = {
  isVisibleConfirm: false,
  completeCount: 0,
};

export class Store {
  constructor(private readonly stores: Types.Stores, private state: State = DEFAULT_STATE) {
    makeAutoObservable(this);
  }

  private onClick = () => {
    this.state.completeCount += 1;
    this.state.isVisibleConfirm = true;
  };

  private onClickConfirmCloseButton = () => {
    this.state.isVisibleConfirm = false;
  };

  private get confirm(): View.Props["confirm"] {
    if (!this.state.isVisibleConfirm) {
      return undefined;
    }
    return {
      heading: {
        children: "You clicked!",
      },
      closeButton: {
        children: "close",
        onClick: this.onClickConfirmCloseButton,
      },
    };
  }

  public generateProps = (): View.Props => {
    return {
      heading: {
        children: "Transition Pattern",
        onClick: () => {
          this.stores.browser.router.replace(
            this.stores.domain.site.getUrl("design-pattern/button-behavior", {
              hash: "transition",
            }),
          );
        },
      },
      confirm: this.confirm,
      statusTable: {
        items: [
          {
            name: "Status",
            value: "standby",
          },
          {
            name: "Clickable",
            value: `${!this.state.isVisibleConfirm}`,
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
