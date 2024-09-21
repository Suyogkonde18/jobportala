
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const Userdb = require('./Model/model');
const port = 3001;

mongoose.connect("mongodb://localhost/JOBPORTAL").then(()=>{
    console.log("MongoDB Connected");
}).catch(err => console.log(err));
app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
    res.send("<h1>Home page of a Job portal </h1>")
});

app.post("/api/jobs", async (req, res) => {
    const { title,
        company,
        location,
        description, salary } = req.body;
    try {
        const newJob = new Userdb({
            title,
            company,
            location,
            description,
            salary
        });
        await newJob.save();
        res.status(201).json(newJob);
    } catch (error) {
        console.error('Error creating job:', error);
        res.status(500).json(
            { message: 'Server Error' }
        );
    }
});

app.get("/api/jobs", async (req, res) => {
    try {
        const jobs = await Userdb.find();
        res.json(jobs);
    } catch (error) {
        console.error('Error getting jobs:', error);
        res.status(500).json(
            { message: 'Server Error' }
        );
    }
});

    app.listen(port, () => {
    console.log(
        `Server is started at port no ${port}`);
});
