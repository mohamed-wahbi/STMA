const express =require('express');
const app = express();
require('./Config/connect.js')
const cors = require('cors');





//middlwaere :
app.use(express.json());
app.use(cors());









app.listen(5050,()=>console.log('Server is active *_*'))