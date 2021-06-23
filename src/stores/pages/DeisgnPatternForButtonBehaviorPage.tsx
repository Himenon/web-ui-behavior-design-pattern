import type { DeisgnPatternForButtonBehaviorPage } from "../../components";
import type * as Types from "../types/application";
import * as BlockingPatternSection from "./DesignPatternForButtonBehavior/BlockingPatternSection";
import * as DefaultPatternSection from "./DesignPatternForButtonBehavior/DefaultPatternSection";
import * as DebouncePatternSection from "./DesignPatternForButtonBehavior/DebouncePatternSection";
import * as ThrottlePatternSection from "./DesignPatternForButtonBehavior/ThrottlePatternSection";
import * as TransitionPatternSection from "./DesignPatternForButtonBehavior/TransitionPatternSection";


export class Store {
  private readonly blockingPatternSection: BlockingPatternSection.Store;
  private readonly debouncePatternSection: DebouncePatternSection.Store;
  private readonly defaultPatternSection: DefaultPatternSection.Store;
  private readonly throttlePatternSection: ThrottlePatternSection.Store;
  private readonly transitionPatternSection: TransitionPatternSection.Store;
  private hashMap = {
    deafult: "#default",
    blocking: "#blocking",
    debounce: "#debounce",
    throttle: "#throttle",
    transition: "#transition",
  };
  constructor(private readonly stores: Types.Stores) {
    this.defaultPatternSection = new DefaultPatternSection.Store(stores);
    this.blockingPatternSection = new BlockingPatternSection.Store(stores);
    this.debouncePatternSection = new DebouncePatternSection.Store(stores);
    this.throttlePatternSection = new ThrottlePatternSection.Store(stores);
    this.transitionPatternSection = new TransitionPatternSection.Store(stores);
  }

  public generateProps = (): DeisgnPatternForButtonBehaviorPage.Props => {
    const hash = this.stores.browser.router.location.hash;
    const isTargetHash = Object.values(this.hashMap).includes(hash);
    return {
      navigation: this.stores.view.navigation.generateProps(),
      heading: {
        children: isTargetHash ? `Button${hash}` : "Design Pattern for Button Behavior",
      },
      defaultPatternSection: !isTargetHash || hash === this.hashMap.deafult ? this.defaultPatternSection.generateProps() : undefined,
      blockingPatternSection: !isTargetHash || hash === this.hashMap.blocking ? this.blockingPatternSection.generateProps() : undefined,
      debouncePatternSection: !isTargetHash || hash === this.hashMap.debounce ? this.debouncePatternSection.generateProps() : undefined,
      throttlePatternSection: !isTargetHash || hash === this.hashMap.throttle ? this.throttlePatternSection.generateProps() : undefined,
      transitionPatternSection: !isTargetHash || hash === this.hashMap.transition ? this.transitionPatternSection.generateProps() : undefined,
    };
  };
}
