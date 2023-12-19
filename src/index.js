const express = require("express")
const Collection = require("./mongo")
// const RegisterCollection = require('./mongo')

const app = express()
const path = require("path")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
const bcryptjs = require("bcryptjs")
// const async = require("hbs/lib/async")

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))

const templatePath = path.join(__dirname, "../templates")
const publicPath = path.join(__dirname, "../public")

app.set('view engine', 'hbs')
app.set("views", templatePath)
app.use(express.static(publicPath))


async function hashPass(password){
    const res = await bcryptjs.hash(password,10)
    return res
}

async function compare(userPass, password){
    const res = await bcryptjs.compare(userPass, password)
    return res
}


app.get("/", (req, res) => {
    // res.render("login")
    if(req.cookies.jwt){
        const verify = jwt.verify(req.cookies.jwt,"hellomynameisrishabhkumarmyhometownisutterradeshinsideadistrictinchaudharyshahab")
    res.render("home",{name:verify.name})
    }
    else{
        res.render("login")
    }
})

app.get("/signup", (req, res) => {
    res.render("signup")
})

app.get("/about", (req, res)=>{
    res.render("about")
})
app.get("/contact", (req, res)=>{
    res.render("contact1")
})

app.get("/login", (req, res) => {
    res.render("login")
    // res.redirect('/');
})




app.post("/signup", async (req, res) => {
    try {
        const check = await Collection.findOne({ name: req.body.name })

        if (check) {
            res.send("user already exist")
        }
        else {
            const token = jwt.sign({ name: req.body.name }, "hellomynameisrishabhkumarmyhometownisutterradeshinsideadistrictinchaudharyshahab")
            res.cookie("jwt",token,{
                maxAge:6000000,
                httpOnly:true
            })

            const data = {
                name: req.body.name,
                password:await hashPass(req.body.password),
                token: token
            }
            res.render("home", {name:req.body.name})
            // res.redirect('/login');
            await Collection.insertMany([data])
            // res.send("hello")
        }
    }
    catch {
        res.send("wrong details")
    }
})

app.post("/signup", async (req, res) => {
    try {
        const check = await Collection.findOne({ name: req.body.name })
        const passCheck = await compare(req.body.password,check.password)

        if (check && passCheck) {
            res.cookie("jwt",check.token,{
                maxAge:600000,
                httpOnly:true
            })

            res.render("home", {name:req.body.name})
        }
        else {
            res.send("user already exist")        
            // res.send("hello")
        }
    }
    catch {
        res.send("wrong details exist")
    }
})


// app.post('/submit_registration', async (req, res) => {
//     try {
//         const newRegistration = new RegisterCollection({
//             name: req.body.username,
//             lastName: req.body.lastName,
//             email: req.body.email,
//             Message: req.body.Message
//         });
//         await newRegistration.save();
 
//         res.send('We will contact you soon');
//     } catch (error) {
//         res.send('Error in registration');
//         console.error(error);
//     }
// });

app.listen(3000, () => {
    console.log("port connected");
})