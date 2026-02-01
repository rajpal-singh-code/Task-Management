const Note = require("../models/Note");


exports.createTask = async (req, res) => {
  try {
    const { title, content, status } = req.body;

    const task = await Note.create({
      userId: req.user.id,
      title,
      content,
      status,
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: "Task creation failed" });
  }
};


exports.getTasks = async (req, res) => {
  try {
    const tasks = await Note.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};


exports.updateTask = async (req, res) => {
  try {
    const task = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Task update failed" });
  }
};


exports.deleteTask = async (req, res) => {
  try {
    const task = await Note.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Task deletion failed" });
  }
};
