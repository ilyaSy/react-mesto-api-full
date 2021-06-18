import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import { signinURL } from '../utils/constants';

export default function ProtectedRoute({component: Component, ...props}){
  return (
  <Route>
    {props.isLoggedIn ? <Component {...props} /> : <Redirect to={signinURL}/>}
  </Route>
  )
}