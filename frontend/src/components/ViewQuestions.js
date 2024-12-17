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
                const response = await axios.get("https://kartik-project.onrender.com/categories");
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
        setQuestions([]); // Reset questions immediately when a new category is selected
        setSelectedCategory(category); // Set the selected category

        try {
            const response = await axios.get(
                `https://kartik-project.onrender.com/questions/${category._id}`
            );

            // Update questions state after fetch completes
            setQuestions(response.data);
        } catch (error) {
            console.error("Error fetching questions:", error);
            setQuestions([]); // Ensure questions remain empty on error
        }
    };


    return (
        <div className="flex">
            {/* Category Navigator */}
            <CategoryNavigator
                categories={categories}
                onSelectCategory={fetchQuestions}
            />

            {/* Display Questions */}
            <div className="flex-1 p-6">
                <h2 className="text-2xl font-bold mb-4">
                    Questions in {selectedCategory.name || "Select a category"}
                </h2>
                {questions.length > 0 ? (
                    <ul className="list-disc pl-5">
                        {questions.map((q, index) => (
                            <li key={index} className="mb-2">
                                {q.questionText}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No questions found for this category.</p>
                )}
            </div>
        </div>
    );
};

export default ViewQuestions;
