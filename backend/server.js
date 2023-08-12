require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/connectDB');

const taskRoutes = require("./routes/taskRoute");

const PORT = process.env.PORT || 5000;
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cors());
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
    res.send('Test API Express.js')
})

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`server on http://localhost:${PORT}`);
        })

    } catch (error) {
        console.log(error);
    }
}

startServer();