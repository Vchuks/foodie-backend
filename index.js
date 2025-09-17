const express = require("express")
const mongoose = require("mongoose")
const winston = require("winston")
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

app.use(function(err, req, res, next){
    res.status(500).json("something went wrong")
})

// const logger = winston.createLogger({
//   level: 'info',
//   format: winston.format.json(),
//   defaultMeta: { service: 'user-service' },
//   transports: [
//     //
//     // - Write all logs with importance level of `error` or higher to `error.log`
//     //   (i.e., error, fatal, but not other levels)
//     //
//     new winston.transports.File({ filename: 'logfile.log', level: 'error' }),
//     //
//     // - Write all logs with importance level of `info` or higher to `combined.log`
//     //   (i.e., fatal, error, warn, and info, but not trace)
//     //
//     new winston.transports.File({ filename: 'logfile.log' }),
//   ],
// });
// winston.add(winston.transports.File, {filename: "logfile.log"})
// if (process.env.NODE_ENV !== 'production') {
//   logger.add(new winston.transports.Console({
//     format: winston.format.simple(),
//   }));
// }

if (!config.get("jwtSecretKey")){
    console.log("No jwt Key")
    process.exit(1)
}


mongoose.connect("mongodb://localhost/foodie")
.then(()=> console.log("Connected to DB"))
.catch((ex) => console.log(`Error connecting to DB ${ex}`))



const port = process.env.PORT || 7000
app.listen(port, ()=> console.log(`listening to port ${port}`))