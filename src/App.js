import './App.css';
import React, {lazy, Suspense } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import useAuthlistener from './hooks/use-auth-listener';
import UserContext from './context/user';
import ProtectedRoute from './helpers/protected.routes';


const Main = lazy(() => import('./Pages/main'));
const Login = lazy(() => import('./Pages/login'));
const Register = lazy(() => import('./Pages/register'));
const Recipes = lazy(() => import('./Pages/Recipes'));
const Profile = lazy(() => import('./Pages/profile'));
const NotFound = lazy(() => import('./Pages/notFound'));
const Recipe = lazy(() => import('./Components/recipe/recipe'));
const EditRecipe = lazy(() => import('./Components/recipe/EditRecipe'));


export default function App() {
  const { user } = useAuthlistener();

  return (
    <UserContext.Provider value={{user}}>
        <Router>
          <Suspense fallback={<p>Loading ...</p>}>
            <Switch>
              
              <Route exact path={ ROUTES.MAIN } component={Main}/>
              <Route exact path={ ROUTES.LOGIN } component={Login}/>
              <Route exact path={ ROUTES.REGISTER } component={Register}/>
              <Route exact path={ ROUTES.PROFILE } component={Profile}/>
              <Route exact path={ ROUTES.RECIPE } component={Recipe}/>
              <Route exact path={ ROUTES.EDITRECIPES } component={EditRecipe}/>
              <ProtectedRoute user={user} path={ ROUTES.RECIPES } exact>
              <Recipes/>
              </ProtectedRoute>
              <Route  component={NotFound}/>
            </Switch>
          </Suspense>
        </Router>
    </UserContext.Provider>
    
    
  );
}