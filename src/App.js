import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Root from './root';
import { Switch, Route, withRouter } from 'react-router-dom';
import ResetPassword from './components/Auth/ResetPassword';
import VerifyEmailLink from './components/Auth/VerifyEmailLink';
import routes from './utils/routes';
import { useDispatch } from 'react-redux';
import { loadUser } from './_actions/authActions';
import LoginPage from './pages/login';
import SignupPage from './pages/signup';
import DashboardPage from './pages/dashboard';
import SubscriptionsPage from './pages/subscriptions';
import NavBar from './components/NavBar';
import './App.css'

const App = (props) => {
    const dispatch = useDispatch();
    const pathName = props.location.pathname;

    useEffect(() => {
        if (
            !pathName.includes('/resetPassword') &&
            !pathName.includes('/verifyEmail')
        ) {
            dispatch(loadUser());
        }
    }, []);

    return (
        <div className="app">
            <NavBar />
            <Switch>
                <Route exact path="/" component={Root}></Route>
                <Route
                    exact
                    path={routes.LOGIN_PAGE}
                    component={LoginPage}
                ></Route>

                <Route
                    path={routes.RESET_PASSWORD}
                    component={ResetPassword}
                ></Route>
                <Route
                    path={routes.VERIFY_EMAIL}
                    component={VerifyEmailLink}
                ></Route>

                <Route
                    exact
                    path={routes.SIGNUP_PAGE}
                    component={SignupPage}
                ></Route>

                <Route
                    exact
                    path={routes.DASHBOARD_PAGE}
                    component={DashboardPage}
                ></Route>
                <Route
                    exact
                    path={routes.SUBSCRIPTIONS_PAGE}
                    component={SubscriptionsPage}
                ></Route>

                <Route render={() => <h1>404 Not Found</h1>} />
            </Switch>
        </div>
    );
};

export default withRouter(App);
