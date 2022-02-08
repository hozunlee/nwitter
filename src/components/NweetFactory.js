import { dbService, storageService } from "fbsetting";
import { v4 as uuidv4 } from "uuid";
import React, { useRef, useState } from "react";
import { userState } from "state/atom";
import { useRecoilValue } from "recoil";

const NweetFactory = () => {
    const userObj = useRecoilValue(userState);
    const fileInput = useRef();
    const [nweet, setNweet] = useState("");
    const [attachment, setAttachment] = useState("");

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
            <form onSubmit={onSubmit}>
                <input
                    value={nweet}
                    onChange={onChange}
                    type="text"
                    placeholder="What's on your mind?"
                    maxLength={120}
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={onFileChange}
                    ref={fileInput}
                />
                <input type="submit" value="Nweet" />
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
        </div>
    );
};

export default NweetFactory;
