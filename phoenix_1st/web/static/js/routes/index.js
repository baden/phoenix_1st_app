import { IndexRoute, Route }  from 'react-router';
import React                  from 'react';
import MainLayout             from '../layouts/main';
import View1                  from '../views/view1';

// console.log(["View1", View1]);

export default (
  <Route component={MainLayout}>
    <Route path="/" component={View1} />

  </Route>
);
// <Route path="/" component={RegistrationsNew} />
