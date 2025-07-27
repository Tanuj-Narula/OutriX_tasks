import { Router } from "express";
import taskModel from "../models/task.js";
import { verifyToken } from "../middleware/auth.js";

const router = Router();

router.get("/", verifyToken, async (req, res) => {
  const userId = req.user.id;

  try {
    const tasks = await taskModel.find({userId});
    res.status(200).send({tasks});
  } catch (err) {
    res.status(500).send({ message: "Failed to fetch tasks", error: err });
  }
});

router.post("/", verifyToken, async (req, res) => {
  const userId = req.user.id;
  const { title, description, category, dueDate } = req.body;

  try {
    const newTask = new taskModel({
      userId,
      title,
      description,
      category,
      dueDate,
    });

    await newTask.save();
    res.status(200).send({ message: "Task created", task: newTask });
  } catch (err) {
    res.status(500).send({ message: "Failed to create task", error: err });
  }
});

router.put("/:id", verifyToken, async (req, res) => {
  const taskId = req.params.id;

  try {
    const task = await taskModel.findOne({ _id: taskId});
    if (!task) return res.status(404).send({ message: "Task not found" });

    const updates = req.body;
    Object.assign(task, updates);

    await task.save();
    res.status(200).send({ message: "Task updated", task });
  } catch (err) {
    res.status(500).send({ message: "Failed to update task", error: err });
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  const taskId = req.params.id;

  try {
    const task = await taskModel.findOneAndDelete({ _id: taskId });
    if (!task) return res.status(404).send({ message: "Task not found or not yours" });

    res.status(200).send({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).send({ message: "Failed to delete task", error: err });
  }
});

router.patch("/:id/toggle", verifyToken, async (req, res) => {
  const userId = req.user.id;
  const taskId = req.params.id;

  try {
    const task = await taskModel.findOne({ _id: taskId, userId });
    if (!task) return res.status(404).send({ message: "Task not found" });

    task.completed = !task.completed;
    await task.save();

    res.status(200).send({ message: "Task completion toggled", task });
  } catch (err) {
    res.status(500).send({ message: "Failed to toggle task", error: err });
  }
});

export default router;
