const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  content: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    id: mongoose.SchemaTypes.ObjectId,
    name: String,
  },
});

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    min: 6,
  },
  category: {
    type: String,
    required: true,
  },
  upvotes: Number,
  status: String,
  description: {
    type: String,
    required: true,
    min: 6,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  comments: [commentSchema],
});

module.exports = mongoose.model("Task", taskSchema);
