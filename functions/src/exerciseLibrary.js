import { db } from "./dbConnect.js";
import fido from "./exercises.js";
const coll = db.collection('exercises');

const toArray = (collection) => collection.docs.map(doc => ({ id: doc.id, ...doc.data() }))

//get(retrieve) all exercises
export async function getAllExercises(req, res) {
  try {
    const allExercises = await coll.get();
    //res.send(toArray(allExercises));
    res.send(fido)
  } catch (err) {
    res.status(500).send(err);
  }
}

//add a new exercise 
export async function addNewExercise(req, res) {
  try {
    const newExercise = req.body
    console.log(newExercise)
    await coll.add(newExercise)
    getAllExercises(req, res)
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function updateExerciseById(req, res) {
  try {
    const { exerciseId } = req.params
    const updatedInfo = req.body;
    await coll.doc(exerciseId).update(updatedInfo);
    getAllExercises(req, res);
  } catch (err) {
    res.status(500).send(err);
  }
}