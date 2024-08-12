const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/Deco-Prj')
.then(()=>console.log('Connecting with DB *_*'))
.catch((error)=>console.log(error))

module.exports=mongoose;