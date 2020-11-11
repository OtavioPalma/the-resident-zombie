import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { Survivor } from '../pages/Survivor/Survivor';
import { Location } from '../pages/Location/Location';
import { Flag } from '../pages/Flag/Flag';
import { Trade } from '../pages/Trade/Trade';
import { Report } from '../pages/Report/Report';
import { Navbar } from '../components/UI/Navbar/Navbar';

export const Routes = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path="/survivor" component={Survivor} />
        <Route path="/location" component={Location} />
        <Route path="/flag" component={Flag} />
        <Route path="/trade" component={Trade} />
        <Route path="/reports" component={Report} />
        <Redirect to="/survivor" />
      </Switch>
    </BrowserRouter>
  );
};
