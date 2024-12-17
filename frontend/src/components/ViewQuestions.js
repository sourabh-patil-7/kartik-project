import React, { useEffect, useState } from "react";
import axios from "axios";
import CategoryNavigator from "./CategoryNavigator";

const ViewQuestions = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [questions, setQuestions] = useState([]);

    // Fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(
                    "https://kartik-project.onrender.com/categories"
                );
                console.log(response.data);
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    // Fetch questions by category
    const fetchQuestions = async (category) => {
        setQuestions([]);
        setSelectedCategory(category);

        try {
            const response = await axios.get(
                `https://kartik-project.onrender.com/questions/${category._id}`
            );
            setQuestions(response.data);
        } catch (error) {
            console.error("Error fetching questions:", error);
            setQuestions([]);
        }
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
            {/* Category Navigator */}
            <div className="w-full md:w-1/4 bg-white shadow-md p-4">
                <h2 className="text-lg font-semibold mb-4 text-gray-700">Categories</h2>
                <CategoryNavigator
                    categories={categories}
                    onSelectCategory={fetchQuestions}
                />
            </div>

            {/* Questions Section */}
            <div className="flex-1 p-6">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">
                        {selectedCategory.name
                            ? `Questions in ${selectedCategory.name}`
                            : "Select a Category"}
                    </h2>

                    {questions.length > 0 ? (
                        <ul className="list-none space-y-3">
                            {questions.map((q, index) => (
                                <li
                                    key={index}
                                    className="bg-gray-50 p-4 border rounded-md shadow-sm hover:bg-gray-100 transition duration-300"
                                >
                                    <span className="text-gray-700 font-medium">
                                        {q.questionText}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500 text-center">
                            No questions found for this category.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ViewQuestions;
