import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

// import requireAuth from "../utils/requireAuth";
import Layout from "../views/layout";
import Home from "../views/home";
import Dashboard from "../views/home/dashboard";
import QuoteShow from "../views/quotes/show";

export default class AppRouter extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <Layout>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/quotes/:id" component={QuoteShow} />
        </Switch>
      </Layout>
    );
  }
}
