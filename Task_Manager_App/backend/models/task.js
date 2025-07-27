import mongoose from "mongoose";

const taskModel = mongoose.model(
  "task",
  new mongoose.Schema(
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
      title: {
        type: String,
        required: true,
        trim: true,
      },
      description: {
        type: String,
        default: "",
      },
      category: {
        type: String,
        default: "General",
      },
      completed: {
        type: Boolean,
        default: false,
      },
      dueDate: {
        type: Date,
      },
    },
    {
      timestamps: true,
    }
  )
);

export default taskModel;
