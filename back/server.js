const express =require('express');
const app = express();
require('./config/connect');
const cors = require('cors');

const authRoutes = require('./routes/authRoute.js');
const serviceRoutes = require('./routes/serviceRoute.js');
const avieRoutes = require ('./routes/avieRoute.js');
const userServiceRoutes = require ('./routes/userServiceRoute.js');
const entrepriseRoutes = require ('./routes/entrepriseRoute.js');
const alarmRoutes = require ('./routes/alarmRoute.js');



//middlwaere :
app.use(express.json());
app.use(cors());




// routes : 
app.use('/api/auth',authRoutes);
app.use('/api/service',serviceRoutes);
app.use('/api/avie',avieRoutes);
app.use('/api/user',userServiceRoutes);
app.use('/api/entreprise',entrepriseRoutes);
app.use('/api/alarm',alarmRoutes);




app.listen(5050,()=>console.log('Server is active *_*'))