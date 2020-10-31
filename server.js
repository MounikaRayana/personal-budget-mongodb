const express = require('express');
const cors = require('cors');
var mongoose=require("mongoose");
const app = express();
const port = 3000;
let bodyParser = require('body-parser');
let multer = require('multer');

const url = "mongodb://localhost:27017/personal_budget_db";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
let upload = multer();

const budgetModel = require('./models/budget');

//app.use(cors());
app.use('/', express.static('public'));
//'use strict';

app.post("/budget_data",upload.array(), (req, res)=> {
  let newData={
      "title":req.body.title,
      "budget": req.body.budget,
      "color":req.body.color
      };
  
  mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true })
      .then(()=>{
          console.log("MongoDB Connected")
           // Insert operation
          budgetModel.insertMany(newData)
              .then((data)=>{
                  res.send(data);
                  mongoose.connection.close()
              })
              .catch((connectionError)=>{
                  console.log(connectionError)
                  res.send(connectionError);
              })
      })
      .catch((connectionError)=>{
          console.log(connectionError)
      })
});

app.get("/budget_data",upload.array(), (req, res)=> {
mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true })
      .then(()=>{
          console.log("Connected to database")
          budgetModel.find({})
                  .then((data)=>{
                          res.json(data);
                      mongoose.connection.close()
                  })
                  .catch((connectionError)=>{
                      console.log(connectionError);
                      res.send(connectionError);
                  })
      })
      .catch((connectionError)=>{
          console.log(connectionError)
      })
});

//const budget = require('./budget.json');

// app.get('/budget', (req, res) => {
//     res.json(budget);
// });

app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`)
});