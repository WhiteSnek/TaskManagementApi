const { Task } = require('../models/task.models.js');

const addTask = async (req, res) => {
    try {
        const { content } = req.body;
        const newTask = await Task.create({
            content,
            owner: req.user._id
        });
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add task' });
    }
};

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete task' });
    }
};

const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        const updatedTask = await Task.findByIdAndUpdate(id, { content }, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update task' });
    }
};

const getUserTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ owner: req.user._id });
        if(!tasks || tasks.length === 0) res.status(200).json({message: "No tasks found!"})
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve tasks' });
    }
};

module.exports = {
    addTask,
    deleteTask,
    updateTask,
    getUserTasks
};
