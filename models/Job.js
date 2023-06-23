import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Please provide a company name"],
      maxlength: 100,
      trim: true,
    },
    position: {
      type: String,
      required: [true, "Please provide a position"],
      maxlength: 100,
      trim: true,
    },
    status: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },
    jobType: {
      type: String,
      enum: ["full-time", "part-time", "remote", "internship"],
      default: "full-time",
    },
    jobLocation: {
      type: String,
      required: [true, "Please provide a location"],
      default: "my city",
      maxlength: 100,
      trim: true,
    },

    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide a user"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Job", JobSchema);
