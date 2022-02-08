import Nweet from "components/Nweet";
import { dbService, storageService } from "fbsetting";
import { v4 as uuidv4 } from "uuid";
import React, { useEffect, useRef, useState } from "react";
import { userState } from "state/atom";
import { useRecoilValue } from "recoil";
import NweetFactory from "components/NweetFactory";

const Home = () => {
    const userObj = useRecoilValue(userState);

    const [nweets, setNweets] = useState([]);

    //순서대로 보여주기 위해 orderby를 넣었음 시간순
    useEffect(() => {
        dbService
            .collection("nweets")
            .orderBy("createdAt")
            .onSnapshot((snapshot) => {
                const nweetArray = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setNweets(nweetArray);
            });
    }, []);

    return (
        <div className="w-full max-w-xs h-screen flex flex-col text-white ">
            <NweetFactory />
            <div>
                {nweets.map((nweet) => (
                    <Nweet
                        key={nweet.id}
                        nweetObj={nweet}
                        isOwner={nweet.creatorId === userObj.uid}
                    />
                ))}
            </div>
        </div>
    );
};

export default Home;
