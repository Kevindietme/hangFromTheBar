import { db } from "./dbConnect.js";

export async function getAllResults(req, res) {
  const coll = await db.collection('exercises').get()
    .catch(err => {
      res.status(500).send({ success: false, message: err })
      return
    })

  const resultsArray = coll.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  res.send(resultsArray)

}

export async function addResults(req, res) {
  const newResult = req.body
  await db.collection('exercises').add(newResult)
    .catch(err => {
      res.status(500).send({ success: false, message: err })
      return
    })
  getAllResults(req, res)
}
