import { authService, dbService } from "fbsetting";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { userState } from "state/atom";
import { useRecoilValue } from "recoil";

const Profile = () => {
    const userObj = useRecoilValue(userState);
    const history = useHistory();
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    };

    // const getMyNweets = async () => {
    //     const nweets = await dbService.collection("nweets").where()
    // };

    // useEffect(() => {
    //     getMynweets();
    // });
    return (
        <>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    );
};
export default Profile;
