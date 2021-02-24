import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import CharactersList from "../views/CharactersList";

const CustomRouter = () => (
  <Router>
    <Route exact path="/">
      <Redirect to="/characters-list" />
    </Route>

    <Route path="/characters-list" component={CharactersList} />
  </Router>
);

export default CustomRouter;
