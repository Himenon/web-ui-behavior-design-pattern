import type * as Browser from "../browser";
import type * as Domain from "../domain";

export interface Stores {
  browser: Browser.Stores;
  domain: Domain.Stores;
}
