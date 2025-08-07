// Date: 7/18/25
// Adapted From
// https://www.youtube.com/watch?v=V8dYGNfHjfk&t=1743s
// Incorporated backend login and signup with nodejs, express & mongodb

// Date: 7/18/25
// Adapted From
// https://dev.to/jakobjingleheimer/configuring-commonjs-es-modules-for-nodejs-12ed
//Learned how to configure commonJs for index.js to work

// Date: 7/19/25
// Adapted From
//https://www.geeksforgeeks.org/web-tech/express-js-res-render-function/
//Learned about render and using locals 

// Date: 7/25/25
// Adapted From
//https://www.geeksforgeeks.org/node-js/how-to-handle-sessions-in-express/
//Learned about express session and setting up app.use

// Date: 7/25/25
// Adapted From
//https://www.mongodb.com/docs/manual/core/document/
//Learned about _id and its usage in mongodb

// Date: 7/28/25
//Adapted From
// https://www.geeksforgeeks.org/mongodb/mongoose-document-model-create-api/\
// Learned about using create for mongoose

const express = require("express")
const app=express()
const path=require("path")
const hbs= require("hbs")
const session = require('express-session')
const { collection1, collection2} = require("./mongodb")

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json())
app.set("view engine","hbs")
app.set("views")
app.use(express.urlencoded({extended:false}))

app.get("/",(req,res) => {
    res.render("login")
})

app.get("/signup",(req,res) => {
    res.render("signup")
})


app.get("/home", (req, res) => {
     res.render("home")
})

app.get("/skills", async (req, res) => {
  const skills = await collection2.find({ userId: req.session.user._id });
  res.render("skills", { skills });
});

// Handle signup
app.post("/signup",async (req,res) =>{

const { firstname, lastname, email, password } = req.body;

 const user = new collection1({ firstname, lastname, email, password });
 await user.save();


    res.redirect("/");
})

// Handle login
app.post("/login",async (req,res) =>{

const data={
    email:req.body.email,
    password:req.body.password,

}

const user = await collection1.findOne({ email: data.email, password: data.password });

    if (user) {
        req.session.user = user;
        res.render("home",  { firstname: user.firstname })
    } else {
        res.send("Invalid email or password");
    }
})
// Handle skills
app.post("/skills", async (req, res) => {

    const data = {
        userId: req.session.user._id,
        type: req.body.type,
        level: req.body.level,
        category: req.body.category,
    };

    await collection2.create(data);
    res.redirect("/skills");
});


app.listen(3131,() => {
    console.log("port connected")
});
