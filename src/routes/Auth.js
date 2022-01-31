import { authService, firebaseInstance } from "fbsetting";
import React, { useState } from "react";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setANewaAccount] = useState(true);
    const [error, setError] = useState("");

    const onChange = (e) => {
        const {
            target: { name, value },
        } = e;
        // const {name, value} = event.target  상동!!!
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        let data;
        try {
            if (newAccount) {
                data = await authService.createUserWithEmailAndPassword(
                    email,
                    password
                );
            } else {
                data = await authService.signInWithEmailAndPassword(
                    email,
                    password
                );
            }
            console.log(data);
        } catch (error) {
            setError(error.message);
        }
    };
    const toggleAccount = () => setANewaAccount((prev) => !prev);

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
        <div className="sm:bg-indigo-800 lg:bg-red-400 flex-auto items-center text-center justify-center">
            Auth
            <form onSubmit={onSubmit}>
                <input
                    name="email"
                    type="text"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={onChange}
                    className="underline"
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={onChange}
                    className="underline"
                />
                <input
                    type="submit"
                    value={newAccount ? "Create Account" : "Log In"}
                    className="cursor-pointer"
                />
            </form>
            <span onClick={toggleAccount}>
                {newAccount ? "Sign in" : "Sign up"}{" "}
            </span>
            <div>
                <button
                    onClick={onClickSocial}
                    name="google"
                    className="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-green-500 hover:bg-green-700"
                >
                    Continue with Google
                </button>
                <button
                    onClick={onClickSocial}
                    name="github"
                    className="py-2 px-4 font-bold rounded-lg shadow-md text-white bg-green-500 hover:bg-green-700"
                >
                    Continue with GitHub
                </button>
            </div>
            {error}
        </div>
    );
};

export default Auth;
