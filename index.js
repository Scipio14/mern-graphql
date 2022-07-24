require('dotenv').config();
const path = require("path");
const colors = require('colors');
const cors = require('cors');
const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./server/schema/schema');
const connectDB = require('./server/config/db');
const port = process.env.PORT || 8000;

const app = express();

//connect to db
connectDB();

app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql:true
}));


  app.use(express.static('public'));
  
  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"public","index.html"));
  })




app.listen(port,()=>{
  console.log(`Server is running on port ${port}`);
});