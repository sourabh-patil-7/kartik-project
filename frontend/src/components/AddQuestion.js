// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const AddQuestion = () => {
//     const [categories, setCategories] = useState([]);
//     const [questionText, setQuestionText] = useState('');
//     const [categoryId, setCategoryId] = useState('');

//     useEffect(() => {
//         axios.get('http://localhost:5000/categories').then((res) => {
//             console.log(res.data);
//             setCategories(res.data);

//         });
//     }, [categories]);

//     const handleSubmit = async () => {
//         await axios.post('http://localhost:5000/questions/add', { questionText, categoryId });
//         alert('Question Added!');
//     };

//     return (
//         <div>
//             <h3>Add Question</h3>
//             <input
//                 type="text"
//                 placeholder="Question"
//                 onChange={(e) => setQuestionText(e.target.value)}
//             />
//             <select onChange={(e) => setCategoryId(e.target.value)}>
//                 <option>Select Category</option>
//                 {categories.map((cat) => (
//                     <option key={cat._id} value={cat._id}>
//                         {cat.name}
//                     </option>
//                 ))}
//             </select>
//             <button onClick={handleSubmit}>Add Question</button>
//         </div>
//     );
// };

// export default AddQuestion;


import React, { useState, useEffect } from "react";
import axios from "axios";

const AddQuestion = () => {
    const [categories, setCategories] = useState([]); // State to store categories
    const [questionText, setQuestionText] = useState(""); // State to store question input
    const [categoryId, setCategoryId] = useState(""); // State to store selected category ID
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(""); // Error state

    // Fetch categories from backend API
    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            try {
                const res = await axios.get("http://localhost:5000/categories");
                setCategories(res.data); // Update categories state
            } catch (err) {
                console.error("Error fetching categories:", err);
                setError("Failed to load categories");
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []); // Runs only once when the component mounts

    // Handle form submission
    const handleSubmit = async () => {
        if (!questionText || !categoryId) {
            alert("Please enter a question and select a category!");
            return;
        }

        try {
            await axios.post("http://localhost:5000/questions/add", {
                questionText,
                categoryId,
            });
            alert("Question Added Successfully!");
            setQuestionText(""); // Reset the question input
            setCategoryId(""); // Reset the category selection
        } catch (error) {
            console.error("Error adding question:", error);
            alert("Failed to add question!");
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4 text-center">Add Question</h3>

            {/* Input for Question */}
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">
                    Question Text
                </label>
                <input
                    type="text"
                    placeholder="Enter your question"
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                />
            </div>

            {/* Category Dropdown */}
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">
                    Select Category
                </label>
                {loading ? (
                    <p>Loading categories...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    <select
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md bg-white focus:outline-none focus:ring focus:ring-blue-300"
                    >
                        <option value="">-- Select a Category --</option>
                        {categories.map((cat) => (
                            <option key={cat._id} value={cat._id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                )}
            </div>

            {/* Submit Button */}
            <div className="text-center">
                <button
                    onClick={handleSubmit}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                >
                    Add Question
                </button>
            </div>
        </div>
    );
};

export default AddQuestion;
