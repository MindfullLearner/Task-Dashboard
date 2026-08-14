// routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// CREATE a new task
router.post('/', async (req, res) => {
  try {
    const newTask = new Task({
      title: req.body.title,
      description: req.body.description,
    });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
