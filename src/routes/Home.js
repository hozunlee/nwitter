import Nweet from "components/Nweet";
import { dbService, storageService } from "fbsetting";
import { v4 as uuidv4 } from "uuid";
import React, { useEffect, useRef, useState } from "react";
import { userState } from "state/atom";
import { useRecoilValue } from "recoil";

const Home = () => {
    const userObj = useRecoilValue(userState);
    const fileInput = useRef();

    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const [attachment, setAttachment] = useState("");

    // 구시대방식
    // const getNweets = async () => {
    //     const dbNweets = await dbService.collection("nweets").get();
    //     dbNweets.forEach((document) => {
    //         const nweetObject = {
    //             ...document.data(),
    //             id: document.id,
    //         };
    //         setNweets((prev) => [nweetObject, ...prev]);
    //     });
    // };

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

    const onSubmit = async (event) => {
        event.preventDefault();

        let attachmentUrl = "";
        if (attachment !== "") {
            const attachmentRef = storageService
                .ref()
                .child(`${userObj.uid}/${uuidv4()}`);
            const response = await attachmentRef.putString(
                attachment,
                "data_url"
            );
            attachmentUrl = await response.ref.getDownloadURL(); //await를 안주면 pending 상태가 됨
        }

        const nweetObj = {
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl,
        };

        await dbService.collection("nweets").add(nweetObj);
        setNweet("");
        setAttachment("");
        fileInput.current.value = null;
    };

    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNweet(value);
    };
    const onFileChange = (event) => {
        // console.log(event.target.files);
        const {
            target: { files },
        } = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {
                currentTarget: { result },
            } = finishedEvent;
            setAttachment(result);
        };
        reader.readAsDataURL(theFile);
    };
    const onClearAttachment = () => {
        setAttachment("");
        fileInput.current.value = null;
    };
    return (
        <div>
            <form action="">
                <input
                    value={nweet}
                    onChange={onChange}
                    type="text"
                    placeholder="What's on yout mind?"
                    maxLength={120}
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={onFileChange}
                    ref={fileInput}
                />
                <input onClick={onSubmit} type="submit" value="Nweet" />
                {attachment && (
                    <>
                        <img
                            src={attachment}
                            width="50px"
                            height="50px"
                            alt="profile"
                        />
                        <button onClick={onClearAttachment}>Clear</button>
                    </>
                )}
            </form>
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
