import * as React from "react";
import { Switch, Route, Router } from "react-router-dom";
import { createBrowserHistory, createLocation, History } from "history";
import * as DesignPatternButtonBehavior from "./pages/design-pattern/button-behavior";
import * as Index from "./pages";
import type * as BootstrapTypes from "../stores/types/bootstrap";
import type * as App from "../stores/types/application";
import * as Browser from "../stores/browser";
import * as Domain from "../stores/domain";
import * as View from "../stores/view";

const createApplicationStores = (history: History): App.Stores => {
  const routerStore = new Browser.Router.Store({
    history: history,
    location: createLocation(location.pathname),
  });
  const browserStores: App.Browser.Stores = {
    router: routerStore,
  };
  const domainStores: App.Domain.Stores = {
    site: new Domain.Site.Store(),
  };
  const bootstrapStore: BootstrapTypes.Stores = {
    browser: browserStores,
    domain: domainStores,
  };
  const viewStores = {
    navigation: new View.Navigation.Store(bootstrapStore),
  };
  const applicationStores: App.Stores = {
    view: viewStores,
    browser: browserStores,
    domain: domainStores,
  };
  return applicationStores;
};

export const Component = () => {
  const history = createBrowserHistory();
  const appStores = createApplicationStores(history);
  const routes = [
    {
      path: appStores.domain.site.getUrl("design-pattern/button-behavior"),
      render: () => <DesignPatternButtonBehavior.Component {...appStores} />,
    },
    {
      path: appStores.domain.site.getUrl("root"),
      render: () => <Index.Component {...appStores} />,
    },
  ];
  return (
    <Router history={history}>
      <Switch>
        {routes.map(route => (
          <Route key={route.path} {...route} />
        ))}
      </Switch>
    </Router>
  );
};
