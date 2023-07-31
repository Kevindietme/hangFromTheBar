import { onRequest } from "firebase-functions/v2/https";
import express from "express";
import cors from "cors";
import { getAllExercises, addNewExercise, updateExerciseById } from "./src/exerciseLibrary.js";
import { getAllResults } from "./src/displayResults.js";
import { addResults } from "./src/displayResults.js";

const app = express();
const PORT = 3000

app.use(cors());
app.use(express.json());

app.get("/test", (req,res) => res.send("This is working"));

app.get("/exercise", getAllExercises);
app.post("/exercise", addNewExercise);
app.patch("/exercise/:exerciseId", updateExerciseById);

app.get("/exercise-results", getAllResults);
app.post("/exercise-results", addResults);

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`)
})

export const api = onRequest(app)

