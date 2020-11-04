import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { Home } from '../pages/Home/Home';
import { Survivor } from '../pages/Survivor/Survivor';
import { Navbar } from '../components/UI/Navbar/Navbar';

export const Routes = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/survivor" component={Survivor} />
        <Redirect to="/home" />
      </Switch>
    </BrowserRouter>
  );
};
