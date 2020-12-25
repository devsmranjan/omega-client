import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Nav, Navbar } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import routes from '../../utils/routes';
import { logOut } from '../../_actions/authActions';
import styles from './Navbar.module.css';
import Logo from '../../assets/logo/logo.svg';

const NavBar = (props) => {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logOut());
        props.history.push('/');
    };

    return (
        <div>
            {!auth.isLoading &&
            auth.isAuthenticated != null &&
            !props.location.pathname.includes(routes.LOGIN_PAGE) &&
            !props.location.pathname.includes(routes.SIGNUP_PAGE) ? (
                <Navbar
                    collapseOnSelect
                    // bg="light"
                    expand="lg"
                    fixed="top"
                    className={styles.navbar}
                >
                    <Navbar.Brand className={styles.navbarBrand} href="/">
                        <img src={Logo} alt="Ωmega" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ml-auto">
                            {props.location.pathname.includes(
                                routes.SUBSCRIPTIONS_PAGE
                            ) ? (
                                <Nav.Link
                                    eventKey={1}
                                    href={routes.DASHBOARD_PAGE}
                                    className={styles.navlink}
                                >
                                    Dashboard
                                </Nav.Link>
                            ) : (
                                <Nav.Link
                                    eventKey={1}
                                    href={routes.SUBSCRIPTIONS_PAGE}
                                    className={styles.navlink}
                                >
                                    Subscriptions
                                </Nav.Link>
                            )}

                            {/* <Nav.Link eventKey={2} href="#memes">
                                My Profile
                            </Nav.Link> */}
                            <Nav.Link
                                eventKey={3}
                                onClick={handleLogout}
                                className={styles.navlink}
                            >
                                Logout
                                {/* <FontAwesomeIcon icon={faSignOutAlt} /> */}
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            ) : null}
        </div>
    );
};

export default withRouter(NavBar);
