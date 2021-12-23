const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 5000;

const app = express();

//middlewire
app.use(cors());
app.use(express.json());

const uri =
  `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.zf2qb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    // connect database
    await client.connect();
    const database = client.db("our-university");
    const studentsCollection = database.collection("students");
    const courseCollection = database.collection("courses");

    app.get('/students', async(req,res)=>{
      const cursor= studentsCollection.find({})
      const students=await cursor.toArray();
      res.json(students)
   })
    app.get('/students/:id', async(req,res)=>{
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const cursor= studentsCollection.find(query)
      const studentDetails=await cursor.toArray();
      res.json(studentDetails)
   })

    app.post('/addstudent',async(req,res)=>{
        const studentInfo =  req.body;
        const result = await studentsCollection.insertOne(studentInfo);
        res.json(result)
    })
    app.post('/course',async(req,res)=>{
        const courseName =  req.body;
        const result = await courseCollection.insertOne(courseName);
        res.json(result)
    })
    app.get('/course', async(req,res)=>{
      const cursor= courseCollection.find({})
      const courses=await cursor.toArray();
      res.json(courses)
   })

    app.put('/addcourse/:id', async (req, res) => {
        const courses = req.body;
        const filter = { _id:ObjectId(req.params.id) };
        const options = { upsert: true };
        const updateDoc = { $push: courses };
        const result = await studentsCollection.updateOne(filter, updateDoc, options);
        res.json(result);
    });



  } finally {
  }
}
run().catch(console.dir);
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log("Server Running at ", port);
});
