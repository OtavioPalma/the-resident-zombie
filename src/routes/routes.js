import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { Home } from '../pages/Home/Home';
import { Survivor } from '../pages/Survivor/Survivor';
import { Location } from '../pages/Location/Location';
import { Navbar } from '../components/UI/Navbar/Navbar';

export const Routes = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/survivor" component={Survivor} />
        <Route path="/location" component={Location} />
        <Redirect to="/home" />
      </Switch>
    </BrowserRouter>
  );
};
