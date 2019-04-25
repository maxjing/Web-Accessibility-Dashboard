import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import OnDemand from "../components/OnDemand";
import Admin from "../components/Admin";
import Trend from "../components/TrendPage/Trend";
import Detail from "../components/Detail";

const AppRouter = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Trend} />
      <Route exact path="/trend" component={Trend} />
      <Route exact path="/prod" component={Detail} />
      <Route path="/beta" component={Detail} />
      <Route path="/betax" component={Detail} />
      <Route path="/ondemand/" component={OnDemand} />
      <Route exact path="/admin" component={Admin} />
      <Route path="/admin/:version" component={Admin} />
    </Switch>
  </BrowserRouter>
);

export default AppRouter;
