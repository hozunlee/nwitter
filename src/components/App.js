import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbsetting";
import { userState } from "state/atom";
import { useRecoilState } from "recoil";

// import { useRecoilValue } from "recoil";
// import { userState } from "state/atom";

function App() {
    const [init, setInit] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userObj, setUserObj] = useRecoilState(userState);

    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            if (user) {
                setIsLoggedIn(true);
                setUserObj(user);
                console.log(userObj);
            } else {
                setIsLoggedIn(false);
            }
            setInit(true);
        });
    });

    console.log(userObj);
    return (
        <>
            {init ? (
                <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} />
            ) : (
                "initial..."
            )}
            <footer>&copy; {new Date().getFullYear()} 호위터 </footer>
        </>
    );
}

export default App;
