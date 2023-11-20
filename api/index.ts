import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import bodyParser from "body-parser";

const app: Express = express(); 
const port = 7001;
import cors from "cors";

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

config();
mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error: Error) => {
    console.log("Error connecting to mongoDB", error);
  });

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

import { Employee } from "./models/employee";
import { Attendance } from "./models/attendance";

app.post("/addEmployee", async (req: Request, res: Response) => {
  try {
    const {
      employeeName,
      employeeId,
      designation,
      phoneNumber,
      dateOfBirth,
      joiningDate,
      activeEmployee,
      salary,
      address,
    } = req.body;

    // create a new employee
    const newEmployee = new Employee({
      employeeName,
      employeeId,
      designation,
      phoneNumber,
      dateOfBirth,
      joiningDate,
      activeEmployee,
      salary,
      address,
    });

    await newEmployee.save();

    res
      .status(201)
      .json({ message: "Employee saved successfully", employee: newEmployee });
  } catch (err) {
    console.log("Error creating employee", err);
    res.status(500).json({ message: "Failed to add employee" });
  }
});

//endpoint to fetch all the employees

app.get("/employees", async (req: Request, res: Response) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ message: "Failed to retrive the employee" });
  }
});
