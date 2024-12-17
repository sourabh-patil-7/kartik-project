import React from "react";

const CategoryNavigator = ({ categories, onSelectCategory }) => {
    return (
        <div className="w-64 bg-gray-100 p-4">
            <h3 className="text-xl font-bold mb-2">Categories</h3>
            <ul>
                {categories.map((category) => (
                    <li
                        key={category._id}
                        onClick={() => onSelectCategory(category)}
                        className="cursor-pointer hover:text-blue-500 mb-1"
                    >
                        {category.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryNavigator;
