import AuthForm from "components/AuthForm";
import { authService, firebaseInstance } from "fbsetting";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTwitter,
    faGoogle,
    faGithub,
} from "@fortawesome/free-brands-svg-icons";

const Auth = () => {
    const onClickSocial = async (event) => {
        const { name } = event.target;
        let provider;
        if (name === "google") {
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        } else if (name === "github") {
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        const data = await authService.signInWithPopup(provider);
        console.log(data);
    };

    return (
        <div className="flex flex-col w-100 h-screen items-center text-center justify-center ">
            <FontAwesomeIcon
                icon={faTwitter}
                color={"#04AAFF"}
                size="3x"
                style={{ marginBottom: 30 }}
            />
            <div className="w-full max-w-md">
                <div className="text-white text-2xl flex justify-center border-b-2 py-2 mb-4">
                    Login
                </div>
                <AuthForm />
                <div className="flex justify-between w-100 ">
                    <button
                        onClick={onClickSocial}
                        name="google"
                        className="m-auto px-2 py-2 w-70 font-semibold rounded-3xl shadow-md text-white bg-gray-500 hover:bg-gray-700 text-sm"
                    >
                        <span className="block">
                            <FontAwesomeIcon
                                icon={faGoogle}
                                className="text-gray-200"
                            />
                        </span>
                        Continue with Google
                    </button>
                    <button
                        onClick={onClickSocial}
                        name="github"
                        className="m-auto px-2 py-2 w-70 font-bold rounded-3xl shadow-md text-white bg-gray-500 hover:bg-gray-700 text-sm"
                    >
                        <span className="block">
                            <FontAwesomeIcon
                                icon={faGithub}
                                className="text-gray-200"
                            />
                        </span>
                        Continue with GitHub
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Auth;
