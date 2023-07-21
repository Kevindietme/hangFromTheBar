import { onRequest } from "firebase-functions/v2/https";
import express from "express";
import cors from "cors";
import { getAllExercises, addNewExercise, updateExerciseById } from "./src/exerciseLibrary.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/test", (req,res) => res.send("This is working"));

app.get("/exercise", getAllExercises);
app.post("/exercise", addNewExercise);
// app.get("/exercise", getAllExercises); //time (to log times after submit)
// app.post("/exercise", addNewExercise); // time (post times after submit)
app.patch("/exercise/:exerciseId", updateExerciseById);

export const api = onRequest(app)

