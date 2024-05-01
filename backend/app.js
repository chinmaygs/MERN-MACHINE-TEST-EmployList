const connectDB = require("./Db/connext")
const cors = require('cors')
const express = require("express")
const cookieParser = require('cookie-parser');
require('dotenv').config()

const employrouter = require("./Router/employ")
const authrouter = require("./Router/auth")

const app = express()

app.use(cookieParser());
app.use(cors())
app.use(express.json())
app.use(express.static('Uploads'))
app.use('/api/List', employrouter.router)
app.use('/api/Auth', authrouter.router)


const start = async () => {
    try {
        await connectDB(process.env.DB_URL)
        console.log("DB Connected")
        app.listen(3000, console.log("server started!!"))

    }
    catch (error) {
        console.log('error')
    }
}
start()
