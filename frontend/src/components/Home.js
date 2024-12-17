import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-6">Welcome to the Question App</h1>
            <div className="space-x-4">
                <button
                    onClick={() => navigate("/add-question")}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Add Questions
                </button>
                <button
                    onClick={() => navigate("/view-questions")}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                    View Questions
                </button>
            </div>
        </div>
    );
};

export default Home;
