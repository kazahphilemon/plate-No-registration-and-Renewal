const express = require("express");
const app = express()
app.use(express.json());
app.use(express.urlencoded({extended: true}))
const userRouter = require('./Router/users');
const ownerRouter = require('./Router/owner');
const connectDb = require("./confi/db");
const cors = require("cors")


app.use(cors())
require("./Router/index")(app)
app.use('/uploads', express.static('uploads'))


  
connectDb()

const PORT = 3000
// const helloworld =(req, res)=>{
//     res.send('hello word, welcome back')
// }

app.use("/users", userRouter )
app.use("/", ownerRouter )

const server = app.listen(
    PORT,
    console.log(
        `Server is runing on port ${PORT}`
    )
)

