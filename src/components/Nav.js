import React from "react";
import { Link } from "react-router-dom";
import { userState } from "state/atom";
import { useRecoilValue } from "recoil";
import { useEffect } from "react/cjs/react.development";

const Nav = () => {
    const userObj = useRecoilValue(userState);

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/"> HOME </Link>
                </li>
            </ul>
            <ul>
                <li>
                    <Link to="/profile">{userObj.displayName}의 Profile</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Nav;
