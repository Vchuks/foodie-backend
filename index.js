const express = require("express")
const mongoose = require("mongoose")
const signupRoute = require("./routes/auth/signUp")
const loginRoute = require("./routes/auth/login")
const allRoutes = require("./routes/users/users")
const cors = require("cors")
const app = express()
const config = require("config")

app.use(express.json())
app.use(cors())
app.use("/signup", signupRoute)
app.use("/login", loginRoute)
app.use("/user", allRoutes )

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: err.message 
  });
});


const jwtSecret = process.env.foodie_jwt || config.get('jwtSecretKey');
if (!jwtSecret){
    console.log("No jwt Key")
    process.exit(1)
}


const db = process.env.dbConnect || "mongodb://localhost/foodie"
mongoose.connect(db)
.then(()=> console.log("Connected to DB"))
.catch((ex) => console.log(`Error connecting to DB ${ex}`))



const port = process.env.PORT || 7000
app.listen(port, ()=> console.log(`listening to port ${port}`))