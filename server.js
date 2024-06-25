const express = require('express')
const app = express()
app.use(express.json())
require('dotenv').config()
const db_config = require('./config/db_config')
const userRoutes = require('./Routes/userRoutes')
const foodRoutes = require('./Routes/foodRoutes')


const ports = process.env.port || 5000;


app.use('/api/user',userRoutes)



app.listen((ports),()=>{

console.log(`port is listning ${ports}`);

})