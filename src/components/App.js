import React, { useState } from "react";
import AppRouter from "components/Router";
import firebase from "fbsetting";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    return <AppRouter isLoggedIn={isLoggedIn} />;
}

export default App;
