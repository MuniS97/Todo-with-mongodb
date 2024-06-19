import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please write task's title!"],
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: false,
    unique: false,
    trim: true,
  },
  userId: {
    type: String,
    required: [true, "Please write task's owner id!"],
    unique: true,
    trim: true,
  }
});

export default mongoose.models.Task || mongoose.model("Task", TaskSchema);
