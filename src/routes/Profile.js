import { authService, dbService, storageService } from "fbsetting";
import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { userState } from "state/atom";
import { useRecoilState } from "recoil";
import { v4 as uuidv4 } from "uuid";

const Profile = () => {
    const fileInput = useRef();
    const [userObj, setUserObj] = useRecoilState(userState);

    const [attachment, setAttachment] = useState("");
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

    const refreshUser = () => {
        const user = authService.currentUser;
        setUserObj(Object.assign({}, user));

        //강제 렌더링을 위해 {} 비어있는 obj에 사본의 새 obj를 생성하는 형태
    };

    const history = useHistory();
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    };

    const getMyNweets = async () => {
        const nweets = await dbService
            .collection("nweets")
            .where("creatorId", "==", userObj.uid)
            .orderBy("createdAt")
            .get();
        console.log(
            "Profile의",
            nweets.docs.map((doc, index) => doc.data())
        );
    };

    useEffect(() => {
        getMyNweets();
    });

    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNewDisplayName(value);
    };

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
        console.log(attachmentUrl);

        if (userObj.displayName !== newDisplayName) {
            await userObj.updateProfile({
                displayName: newDisplayName,
                photoURL: attachmentUrl,
            });
            refreshUser();
        }
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
        <>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="Display name"
                    onChange={onChange}
                    value={newDisplayName}
                />
                <input type="submit" value="Update Profile" />

                <div>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={onFileChange}
                        ref={fileInput}
                    />

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
                </div>
            </form>

            <button onClick={onLogOutClick}>Log Out</button>
        </>
    );
};
export default Profile;
