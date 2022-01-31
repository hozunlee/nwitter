import { dbService, storageService } from "fbsetting";
import React, { useState } from "react";

const Nweet = ({ nweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);
    const onDeleteClick = async () => {
        const ok = window.confirm("are you sure ?");
        console.log(ok);
        if (ok) {
            await dbService.doc(`nweets/${nweetObj.id}`).delete();
            if (nweetObj.attachmentUrl) {
                await storageService
                    .refFromURL(nweetObj.attachmentUrl)
                    .delete();
            }
        }
    };

    const toggleEditing = () => setEditing((prev) => !prev);

    const onSubmit = async (e) => {
        e.prventDefault();
        await dbService.doc(`nweets/${nweetObj.id}`).update({
            text: newNweet,
        });
    };

    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNewNweet(value);
    };

    return (
        <div>
            {editing ? (
                <>
                    <form onSubmit={onSubmit}>
                        <input
                            type="text"
                            placeholder="Edit whatever"
                            value={newNweet}
                            onChange={onChange}
                        />
                        <input type="submit" value="Update Nweet" />
                    </form>
                    <button
                        onClick={toggleEditing}
                        className="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-green-500 hover:bg-green-700"
                    >
                        cancel
                    </button>
                </>
            ) : (
                <>
                    <h4>{nweetObj.text}</h4>
                    {nweetObj.attachmentUrl && (
                        <img
                            src={nweetObj.attachmentUrl}
                            width="50px"
                            height="50px"
                            alt="attachmentimg"
                        />
                    )}
                    {isOwner && (
                        <>
                            <button
                                onClick={onDeleteClick}
                                className="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-green-500 hover:bg-green-700"
                            >
                                del
                            </button>
                            <button
                                onClick={toggleEditing}
                                className="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-green-500 hover:bg-green-700"
                            >
                                edit
                            </button>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default Nweet;
