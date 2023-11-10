import mongoose from "mongoose";

const attendenceSchema = new mongoose.Schema({
  employeeId: { type: String, required: true },
  employeeName: { type: String, required: true },
  date: { type: String, required: true },
  status: { type: String, required: true },
});

export const Attendance = mongoose.model("Attendence", attendenceSchema);
