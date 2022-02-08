import React from "react";
import {
    HashRouter as Router,
    Redirect,
    Route,
    Switch,
} from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Nav from "components/Nav";

function AppRouter({ isLoggedIn }) {
    return (
        <Router>
            {isLoggedIn && <Nav />}
            <Switch>
                {isLoggedIn ? (
                    <>
                        <Route path="/" exact render={() => <Home />} />
                        <Route
                            path="/profile"
                            exact
                            render={() => <Profile />}
                        />
                        <Redirect from="*" to="/" />
                    </>
                ) : (
                    <>
                        <Route>
                            <Route path="/" exact component={Auth} />
                        </Route>
                        <Redirect from="*" to="/" />
                    </>
                )}
            </Switch>
        </Router>
    );
}

export default AppRouter;
