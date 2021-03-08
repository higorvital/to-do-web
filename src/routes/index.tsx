import React from 'react';
import {Switch} from 'react-router-dom';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';

import Route from './routes';

const Routes: React.FC = () => {

    return (
        <Switch>
            <Route path="/" exact component={SignIn} />
            <Route path="/sign-up" exact component={SignUp} />

            <Route path="/dashboard" exact component={Dashboard} isPrivate />
            <Route path="/profile" exact component={Profile} isPrivate />
        </Switch>
    )
}

export default Routes;