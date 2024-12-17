import React, { useState } from 'react';
import axios from 'axios';

const AddCategory = () => {
    const [name, setName] = useState('');

    const handleSubmit = async () => {
        await axios.post('http://localhost:5000/categories/add', { name });
        alert('Category Added!');
    };

    return (
        <div>
            <h3>Add Category</h3>
            <input
                type="text"
                placeholder="Category Name"
                onChange={(e) => setName(e.target.value)}
            />
            <button onClick={handleSubmit}>Add</button>
        </div>
    );
};

export default AddCategory;