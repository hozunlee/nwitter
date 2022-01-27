import React from "react";

const Auth = () => {
    return (
        <div>
            <div className="sm:bg-indigo-800 lg:bg-red-400 flex-auto items-center text-center justify-center">
                Auth
                <h1 className="text-3xl font-bold underline text">바이</h1>
                <button className="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-green-500 hover:bg-green-700 border-x-fuchsia-300 cursor-help ">
                    Hello, Tailwind CSS!
                </button>
                <div className="bg-green-100 h-10 w-10 hover:bg-indigo-800 my-0 mx-auto relative">
                    하이루
                </div>
                <button className="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-green-500 hover:bg-green-700">
                    Hello, Tailwind CSS!
                </button>
            </div>
        </div>
    );
};

export default Auth;
