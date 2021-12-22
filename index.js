const express =require('express')
const { MongoClient } = require('mongodb');
require('dotenv').config()
const cors= require('cors')
const port = process.env.PORT || 5000;

const app= express()

//middlewire
app.use(cors())
app.use(express.json())


async function run() {
    try{


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