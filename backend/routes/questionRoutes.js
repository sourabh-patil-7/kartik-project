const express = require('express');
const router = express.Router();
const Question = require('../models/Question');
const Category = require('../models/Category');

// Add a new question
router.post('/add', async (req, res) => {
    const { questionText, categoryId } = req.body;
    try {
        const newQuestion = new Question({ questionText, categoryId });
        await newQuestion.save();
        res.status(201).json(newQuestion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/:category", async (req, res) => {
    const { category } = req.params;

    try {
        // Step 1: Find the category ObjectId using the category name
        // const categoryData = await Category.findOne({ name: category });

        // // If no category is found, return an error
        // if (!categoryData) {
        //     return res.status(404).json({ message: "Category not found." });
        // }

        // Step 2: Fetch questions using the category's ObjectId
        const questions = await Question.find({ categoryId: category });

        // If no questions are found, return an error
        if (!questions || questions.length === 0) {
            return res.status(404).json({ message: "No questions found for this category." });
        }

        // Send the questions as a response
        res.status(200).json(questions);
    } catch (err) {
        console.error("Error fetching questions:", err.message);
        res.status(500).json({ message: "Server Error. Unable to fetch questions." });
    }
});

module.exports = router;