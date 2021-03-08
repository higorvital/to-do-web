import React from 'react';
import {Route as RouteDOM,
        RouteProps as RouteDOMProps,
        Redirect
} from 'react-router-dom';

import {useAuth} from '../hooks/auth';

interface RouteProps extends RouteDOMProps{
    isPrivate?: boolean;
    component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({component: Component, isPrivate = false, ...rest}) => {

    const {user} = useAuth();

  return (
      <RouteDOM {...rest} render={()=>{
         return isPrivate === !!user ? (
             <Component />  
         ) : (
             <Redirect to={{pathname: isPrivate ? '/' : '/dashboard'}} />
         )  
      }}/>
  );
}

export default Route;