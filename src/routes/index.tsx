import React from 'react';
import {Switch} from 'react-router-dom';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import Subcategory from '../pages/Subcategory';

import Route from './routes';

const Routes: React.FC = () => {

    return (
        <Switch>
            <Route path="/" exact component={SignIn} />
            <Route path="/sign-up" component={SignUp} />

            <Route path="/subcategory/:subcategory_id" isPrivate component={Subcategory} />
            <Route path="/dashboard" isPrivate component={Dashboard} />

        </Switch>
    )
}

export default Routes;