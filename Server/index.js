const express = require("express");
const app = express();
const port = 3030;
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
const multer = require('multer');
const fs = require('fs')
const { MongoClient, ServerApiVersion } = require("mongodb");
const { ServerAddr } = require('./apilinks.js');
// const uri = "mongodb+srv://uditjain:u1d2i3t4@lms-cluster.s5q8x.mongodb.net/?retryWrites=true&w=majority&appName=LMS-Cluster/ApplicationDB";
const uri =
  "mongodb+srv://uditjain:u1d2i3t4@lms-cluster.s5q8x.mongodb.net/ApplicationDB";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

app.use(express.json());
// app.use(bodyParser.json());
app.use(
  cors({
    origin: "*", // Allow only this origin
  })
);

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, "public")));

// Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/imagesDB', {
mongoose.connect(uri);

// Image Schema
const imageSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  imageUrl: { type: String, required: true },
});

// const courseScheme = new mongoose.Schema({
//     title:{type:String, required:true},
//     validity:{type:String},
//     description:{type:String, equired:true},
//     startdate:{type:String, required:true},
//     coursecontext:{type:String, required:true}
// })


const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  videos: {
    thumbnails: [String], // Array of URLs for video thumbnails
    videos: [String],     // Array of URLs for video files
    titles: [String],     // Array of titles for each video
  },
  courseId: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: String,  // Assuming you want the price as a string to store currency symbol
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  url: {
    type: String, // URL for course image/thumbnail
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically add creation timestamp
  }
});

// The model name should be capitalized and singular
const Image = mongoose.model("Image", imageSchema, "slider"); // Explicitly use 'slider' collection
const Courses = mongoose.model("Courses", courseSchema, "courses");
// Basic route to check if the server is running
app.get("/", (req, res) => {
  res.json({ msg: "server is running" });
});

// Route to retrieve all images from 'slider' collection
app.get("/addSliderImages", async (req, res) => {
  try {
    const images = await Image.find(); // Retrieve all images from the DB
    res.json(images); // Send the images in the response
    // console.log(images)
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// app.get("/changeSliderImages",async (req,res)=>{
//   try{

//     const image = await Image.findOne();
//   }
//   catch(error){
//     console.log(error)
//   }
// })


const storage = multer.diskStorage({
  destination: (req,file,cb) => {
    const uploadPath = path.join(__dirname, "/public/Web-Files");
    cb(null,uploadPath);
  },
  filename: (req,file,cb) => {
    cb(null,Date.now()+path.extname(file.originalname));
  }
})


const upload = multer({storage})



app.post("/changeSliderImages",upload.single("image") ,async (req,res) =>{
  console.log(req.body.idx)
  if (!req.file) {
    return res.status(400).json({message:"No File Uploaded."});
  }


  try{
    const imageDoc = await Image.findOne({id:req.body.idx})

    if(!imageDoc){
      return res.status(404).json({ message: "Image not found in database." });
    }

    const oldImageUrl = imageDoc.imageUrl;
    const oldFileName = path.basename(oldImageUrl);
    const oldFilePath =  path.join(__dirname, `/public/Web-Files/${oldFileName}`);
    console.log(oldFilePath)
    fs.unlink(oldFilePath,(err)=>{
      if(err){
        console.error("some error occured deleting old image",err)
      }else{
        console.log("Image deleted successfully")
      }
    })

  }
  catch(error){
    console.error(error)
  }


  const fileName = req.file.filename
  const result = await Image.updateOne(
    {id:req.body.idx},
    {imageUrl:`${ServerAddr}/Web-Files/${fileName}`}
  );

  if (result.nModified === 0) {
    console.log("image was unable to change in database")
    return res.status(404).json({ message: "Image not found." });
  }

  res.status(200).json({message:"File Uploaded nicely ;)"})
});

app.post('/changeCourseDetails', async (req,res)=>{
  console.log("kuch to hua")
  console.log(req.body.idx)
  const course = await Courses.updateOne(
    {courseId:req.body.idx},
    {$set:req.body.newContent}
  )
  // const updatedCourse = await Courses.findOne({ courseId: req.body.idx }); // Fetch the updated course
  // console.log("Updated Course Title:", updatedCourse.title); // Log the updated title
  if(course.nModified === 0){
    console.log("course details were unable to change")
    return res.status(404).json({message:"Course details were unable to change"})
  }

  res.status(200).json({message:"Course detail changed nicely ;)"})
  console.log("course details updated")
})
// app.use(express.json());  // This will parse JSON bodies for you

// app.post('/changeCourseDetails', async (req, res) => {
//   try {
//     console.log("Request received");

//     const { newContent, idx } = req.body;

//     const course = await Courses.updateOne(
//       { courseId: idx },
//       { $set: newContent }
//     );

//     if (course.nModified === 0) {
//       console.log("Course details were unable to change");
//       return res.status(404).json({ message: "Course details were unable to change" });
//     }

//     res.status(200).json({ message: "Course details changed successfully" });
//   } catch (error) {
//     console.error("Error updating course:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });





app.post("/signup", async (req, res) => {
  const rMail = req.body.rmail;
  const rNumber = req.body.rNumber;
});

app.get("admin-login", (req, res) => {});

//Auth system

const UserCreds = mongoose.model("userallcreds", {
  mail:  {
    type: String,
    required: true,
  },
  password:  {
    type: String,
    required: true,
  },
  date: String,
});

const Sessions = mongoose.model("sessions", {
  sessionid: String,
  email: String,
  password: String,
  otp: Number,
  date: String,
});

app.post("/register", async (req, res) => {
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;
  const date = req.body.date;
  console.log("email wagera milgya dekh", email);

  // Check if the user already exists
  const User = await UserCreds.findOne({ mail: email });
  if (User) {
    console.log("User already exists, you need to login");
    return res.send("User already exists, you need to login");
  }

  const otp = Math.floor(10000 + Math.random() * 90000);
  const sessionId = uuidv4();
  console.log("Ye session id bnayi use ke liye", sessionId);

  const newid = new Sessions({
    sessionid: sessionId,
    email: email,
    password: password,
    otp: otp,
    date: date,
  });

  try {
    await newid.save();
    console.log('New session id made');
    
    // Send email with OTP
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "uditj668@gmail.com",
        pass: "lilj hdgi opfe bxxs",
      },
    });

    var mailOptions = {
      from: "uditj668@gmail.com",
      to: email,
      subject: "One Time Password",
      text: "This is one-time OTP for veeram, don't share it with anybody - " + otp,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:" + info.response);

    // Send the session ID back to the client
    return res.send(sessionId);
  } catch (err) {
    console.error('Error creating user or sending email:', err);
    return res.status(500).send("Internal server error");
  }
});


app.post("/login", async (req, res) => {
  const { email, password, date } = req.body;

  const User = await UserCreds.findOne({ mail: email });

  if (User) {
    const ExistingUser = await UserCreds.findOne({
      mail: email,
      password: password,
      date: date,
    });
    if (ExistingUser) {
      res.send("Welcome Sir!")
      console.log("Welcome Sir!");
    } else {
      console.log("Email or Password is Incorrect");
      res.send("Email or Password is Incorrect")

    }
  } else {
    res.send("This email isn't registered")
    console.log("This email isn't registered");
  }
});

app.post("/otp-check", async (req, res) => {
  var { otp, sessionId, date } = req.body;

  otp = Number(otp);
  console.log("user ne ye session id di", sessionId, typeof sessionId);
  const sessioncheck = await Sessions.find({
    sessionid: sessionId,
    otp: otp,
    // date: date,
  });

  if (sessioncheck.length > 0) {
    console.log("Successfully registered 🥳🥳");
    const email = sessioncheck.email;
    const password = sessioncheck.password;
    console.log("lele sessoincheck se data ab")
    console.log(email)
    console.log(sessioncheck)
    console.log(password)
    const NewUser = new UserCreds({
      mail: "bakwas@gmail.com",
      password: "hihihih"
    });
    NewUser.save()
    .then(() => console.log('User created!'))
    .catch(err => console.error('Error creating user:', err));

    await Sessions.deleteOne({ sessionId: sessionId });
    res.send("Successfully registered 🥳🥳");
  } else {
    console.log("Maybe otp is wrong");
    console.log(otp);
    console.log(typeof otp);
    res.send("Otp entered is incorrect!");
  }
});

app.get("/courses", async (req, res) => {
  try {
    const courses = await Courses.find({});
    res.status(201).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving courses", error });
  }
})

const admincredsSchema = new mongoose.Schema({
  admin:{type:String,unique:true,required:true}
})
const admincreds = mongoose.model('admincreds',admincredsSchema)

app.post("/admin-login", async (req, res) => {
  console.log("admin data aaya hai ");
  console.log(req.body);
  const credcheck = await admincreds.findOne({admin:req.body.inputuser,password:req.body.inputpass})

  if(credcheck){
    res.status(200).json({
      message: "Login successful",
      token: "example-token",  // This could be a JWT or a session token
      // user: { username: admi },  // Send user info if necessary
  });
  console.log("Welcome Admin, access granted");

  }else{
    res.status(401).json({ message: "Invalid credentials" });
    console.log("nakli banda hai ye")
  }


});
// app.get('/courses/:id', async (req,res)=>{

//     try{
//     const Id= req.params.id
//     const course = Courses.find({courseId:Id})
//     res.json(course)

//     }
//     catch (error){

//     }

// })

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
