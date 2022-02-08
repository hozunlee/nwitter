import { authService } from "fbsetting";
import React, { useState } from "react";

const AuthForm = () => {
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

    return (
        <>
            <div className="mb-4">
                <form onSubmit={onSubmit}>
                    <input
                        name="email"
                        type="text"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={onChange}
                        className="underline shadow appearance-none border rounded-2xl w-80 mx-1 py-2 px-3 mb-1.5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <input
                        required
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={onChange}
                        className="underline shadow appearance-none border rounded-2xl w-80 py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />

                    <input
                        type="submit"
                        value={newAccount ? "Create Account" : "Log In"}
                        className="cursor-pointer w-80 py-2 px-3 mb-3 rounded-2xl text-white inline-block shadow-lg bg-blue-500 hover:bg-blue-600 focus:bg-red-700"
                    />

                    <div className="mb-2 text-rose-500 font-medium text-xs">
                        {error}
                    </div>
                    <span
                        className="block text-blue-100 cursor-grabbing mb-7 underline text-sm "
                        onClick={toggleAccount}
                    >
                        {newAccount ? "Sign in" : "Sign up"}
                    </span>
                </form>
            </div>
        </>
    );
};

export default AuthForm;
