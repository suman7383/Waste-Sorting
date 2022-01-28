const express =require('express');
const dotenv=require('dotenv');
const cors = require('cors')
const app=express();

//<--------- middlewares ---------->

dotenv.config({ path: './config.env' });
app.options("*",cors())
require('./db/conn');

app.use(express.json());
app.use("/api",require("./routes/register"));
app.use("/api",require("./routes/login"));
app.use("/api", require("./routes/location"));
app.use("/api", require("./routes/send-data"));

//<---------------- end ------------------> 

app.listen(process.env.PORT,()=>{
  console.log(`Server listening on port ${process.env.PORT}`);
})