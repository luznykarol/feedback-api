const router = require("express").Router();
const Task = require("../modules/Task");

//create new task
router.post("/tasks", async (req, res) => {
  const task = new Task({
    title: req.body.title,
    category: req.body.category,
    description: req.body.description,
    upvotes: req.body.upvotes,
    comments: req.body.comments,
    status: req.body.status,
  });
  try {
    const savedTask = await task.save();
    res.send({
      id: task._id,
      title: task.title,
      category: task.category,
      description: task.category,
      upvotes: task.upvotes,
      comments: task.comments,
      status: task.status,
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

//get tasks
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.json(err);
  }
});

//get specific task
router.get("/tasks/:taskId", async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);
    res.json(task);
  } catch (err) {
    console.log(error);
  }
});

//delete specific task
router.delete("/tasks/:taskId", async (req, res) => {
  try {
    const removedTask = await Task.remove({ _id: req.params.taskId });
    res.json(removedTask);
  } catch (err) {
    console.log(error);
  }
});

//update specific task
router.put("/tasks/:taskId", async (req, res, next) => {
  Task.findByIdAndUpdate(req.params.taskId, req.body, function (err, doc) {
    if (err) return next(err);
    res.json(doc);
  });
});

module.exports = router;
