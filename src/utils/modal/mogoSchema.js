import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema(
  {
    title: { type: String, required: true },
    desc: { type: String, required: false },
    status: {
      type: String,
      required: true,
      enum: ["todo", "inprogress", "done"],
    },
    startdate: { type: String, required: false },
    enddate: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

export default Task;
