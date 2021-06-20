import type * as Browser from "../browser";
import type * as Domain from "../domain";
import type * as View from "../view";

export type { Browser, Domain, View };

export interface Stores {
  browser: Browser.Stores;
  domain: Domain.Stores;
  view: View.Stores;
}
