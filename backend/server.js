const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const categoryRoutes = require('./routes/categoryRoutes');
const questionRoutes = require('./routes/questionRoutes');

const app = express();
app.use(express.json());
app.use(cors({
    origin: ["https://kartik-clumpcoder-task.vercel.app/", 'http://localhost:3000']
}));
app.use('/categories', categoryRoutes);
app.use('/questions', questionRoutes);

app.get('/', (req, res) => {
    res.send("Hello I am on Home PageJS");
})

// Connect to MongoDB
mongoose.connect('mongodb+srv://kartik:yTPUigf2HB98nze5@cluster0.zky1n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/kartik')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Server setup
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));