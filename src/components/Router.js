import React, { useState } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";

function AppRouter({ isLoggedIn }) {
    return (
        <Router>
            <Switch>
                {isLoggedIn ? (
                    <>
                        <Route path="/" exact component={Home} />
                    </>
                ) : (
                    <>
                        <Route>
                            <Route path="/" exact component={Auth} />
                        </Route>
                    </>
                )}
            </Switch>
        </Router>
    );
}

export default AppRouter;
