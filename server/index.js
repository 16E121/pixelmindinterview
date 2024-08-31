const express=require('express');
const app=express();
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const cors=require('cors');
const path=require('path')
require('dotenv').config()
app.use(cors({
  origin:true
}))

app.use(express.json())
app.use(express.urlencoded({extended:true}) )
app.use(express.static(path.join(__dirname, 'public/')));


mongoose.connect(process.env.DB_CONNECTION).then(()=>console.log('DB connected'))
.catch(err=>console.log(err))


const staffRoutes=require('./routes/staffRoutes');
app.use('/',staffRoutes)

const schedulesRoutes=require('./routes/scheduleRoutes');
app.use('/',schedulesRoutes)

const branchRoutes=require('./routes/branchRoutes');
app.use('/',branchRoutes)


const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');
app.use('/apidocs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))



app.listen(process.env.PORT,()=>{
  console.log(`Server running on the port ${process.env.PORT}`)
  console.log(`swagger available at http://localhost:${process.env.PORT}/apidocs`)
})