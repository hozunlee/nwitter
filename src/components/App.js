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

                // setUserObj({
                //     displayName: user.displayName,
                //     uid: user.uid,
                //     updateProfile: (args) => user.updateProfile(args),
                // });
                console.log(userObj.displayName);
            } else {
                setIsLoggedIn(false);
                setUserObj(null);
            }
            setInit(true);
        });
    });

    return (
        <>
            <div className="bg-black min-h-full h-screen ">
                {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "initial..."}
                <footer className="p-4 bg-white rounded-lg shadow items-center relative text-center dark:bg-gray-800 text-gray-400">
                    &copy; {new Date().getFullYear()} 호위터
                </footer>
            </div>
        </>
    );
}

export default App;
