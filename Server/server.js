const express = require('express')
const cors = require('cors')
const { db } = require('./db/db');
const {readdirSync} = require('fs')
const app = express();
require('dotenv').config()
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const path = require('path');
const multer = require('multer');
const { error } = require('console');
const PORT=process.env.PORT
const JWT_SECRET =process.env.JWT_SECRET

app.use(cors({
  origin: 'http://localhost:5173'
}));
app.use(cors(
    {
        origin: ["http://localhost:5173"],
        methods: ["POST", "GET", "PUT"],
        credentials: true
    }
));


app.use(express.static('public'));
//MiddLeewares
app.use(express.json())
app.use(cors())
// Middleware to parse request bodies
app.use(bodyParser.json());

//Storage Setting
let storage = multer.diskStorage({
  destination:'./public/images', //directory (folder) setting
  filename:(req, file, cb)=>{
      cb(null, Date.now()+file.originalname) // file name setting
  }
})

//Upload Setting
let upload = multer({
 storage: storage,
 fileFilter:(req, file, cb)=>{
  if(
      file.mimetype == 'image/jpeg' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/gif'

  ){
      cb(null, true)
  }
  else{
      cb(null, false);
      cb(new Error('Only jpeg,  jpg , png, and gif Image allow'))
  }
 }
})



db()
require("./models/EmployeeDetails");
const Employee = mongoose.model("EmployeeInfo");

//Login page
app.post("/login", async (req, res) => {
  const { email, password,userType} = req.body;
  const user = await Employee.findOne({ email });
  if (!user) {
    return res.json({Status: "error", error: "Invalid email or password"  });
  }
  if (user.userType!==userType) {
    return res.json({ Status: "error",error: "Invalid email or password"  });
  }

  if (user.password!==password) {
      return res.status(400).json({Status: "error", error: 'Invalid email or password' });
  }

    return res.json({Status: "Success"});
  
});
////////
//delete employee
app.get('/delete/:id', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  const id = Number(req.params.id);
  try {
     await Employee.findOneAndDelete({id});
    return res.send({ Status: "Success"});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Delete employee error in MongoDB' });
  }
});
    

// create new employee
app.post("/create",upload.single('image') ,async(req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  const newEmployee =mongoose.model("EmployeeInfo") ({
      id: req.body.id,
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      password: req.body.password,
      userType: req.body.userType,
      address: req.body.address,
      salary: req.body.salary,
      image: req.file.filename
    });
   // ( *** must add if ID or Email is already exists)
    newEmployee.save()// Save new Employee document to MongoDB
  .then(() => {
    return res.send({ Status: 'Success' });
  })
  .catch((error) => {
    return res.status(500).json({ error: "Can't Add this employee" });
  });
  });

/*
//Get dashboard
app.get('/dashboard',verifyUser, (req, res) => {
  return res.json({Status: "Success", userType: req.userType, id: req.id})
})
*/

//Get Employees
app.get("/getEmployee", async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  try {
    const employee = await Employee.find({});
    return res.send({ Status: "Success", Result: employee });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ Status: "Error", Message: "Unable to retrieve employees" });
  }
});

 
app.get('/getInfo/:id', async(req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  const id = Number(req.params.id);
  try {
    const result = await Employee.findOne( { id } )
    return res.send({ Status: "Success", Result: result });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ Status: "Error", Message: "Unable to retrieve employees" });
  }
});


//Update employee info
app.get('/update/:id', async(req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  const id = Number(req.params.id);
  try {
   const updateEmployee =mongoose.model("EmployeeInfo") ({
    id: req.body.id,
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: req.body.password,
    userType: req.body.userType,
    address: req.body.address,
    salary: req.body.salary,
    image: req.body.image
  });
  Employee.findOneAndUpdate({ id }, updateEmployee, { new: true })
    return res.send({ Status: "Success"});
  } catch (error) {
    console.log(error);
    return res.status(500).send({ Status: "Error", Message: "Unable to retrieve employees" });
  }
});

//logout
app.get('/logout', (req, res) => {
  res.clearCookie('token');
  return res.json({Status: "Success"});
})

app.listen(PORT, () => {
  console.log('You are listening to port:',PORT);
})  
//testing branching 1