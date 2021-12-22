const express =require('express')
const { MongoClient } = require('mongodb');
require('dotenv').config()
const cors= require('cors')
const port = process.env.PORT || 5000;

const app= express()

//middlewire
app.use(cors())
app.use(express.json())

const uri = "mongodb+srv://rokanuddin:1LhDb7cM0ctHKF18@cluster0.zf2qb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try{
                        // connect database 
                        await client.connect()
                        const database = client.db("our-university")
                        const studentssCollection = database.collection("students")
                        console.log("connected");

    }
    finally{

    }
}
run().catch(console.dir)
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(port,()=>{
    console.log("Server Running at ",port)
})