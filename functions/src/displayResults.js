import { db } from "./dbConnect.js";

const toArray = (collection) => collection.docs.map(doc => ({ id: doc.id, ...doc.data() }))


//get results from initial get for display on results 
export async function getAllResults(req, res) {
  const coll = await db.collection('exercises').get()



    .catch(err => {
      res.status(500).send({ success: false, message: err })
      return
    })

  const resultsArray = coll.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  res.send(resultsArray)

}

//post the resulting selection of exercises and save them along with the time 
export async function addResults(req, res) {
  const newResult = req.body
  await db.collection('exercises').add(newResult)
    .catch(err => {
      res.status(500).send({ success: false, message: err })
      return
    })
  getAllResults(req, res)
}
