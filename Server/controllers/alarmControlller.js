const asyncHandler = require("express-async-handler");
const {Alarm} = require ('../models/alarmModel')


/*--------------------------------------------------
* @desc    create Alarm
* @router  /api/alarm/create
* @methode POST
* @access  only technicien et admin
----------------------------------------------------*/
module.exports.createAlarmCtrl = asyncHandler(async (req, res) => {
    const dateTime = new Date(req.body.dateTime);

// Ajouter une heure à la date
dateTime.setHours(dateTime.getHours() + 1);

// Convertir en ISOString (UTC)
const dateTimeUTC = dateTime.toISOString();

 
    // Créer l'alarme en utilisant les données reçues
    const createAlarm = await Alarm.create({
      alarmDesc: req.body.alarmDesc,
      dateTime: dateTimeUTC,
      activated: req.body.activated ,
      client: req.body.client,
    });
  
    if (!createAlarm) {
      return res.status(400).json({ message: "Erreur lors de la création de l'alarme" });
    }
  
    res.status(201).json({ message: "Alarme créée avec succès"});
  });

/*--------------------------------------------------
* @desc    get Alarms
* @router  /api/alarm/getAll
* @methode GET
* @access  only technicien et admin
----------------------------------------------------*/
module.exports.getAllAlarmCtrl = asyncHandler (async(req,res)=>{

    const getAlarms = await Alarm.find({}).populate("client","username email  numTel")

    if(!getAlarms){
        return res.status(400).json({message:"pas d'alarme configure dans la db !"})
    }

    res.status(201).json({
        getAlarms
    })
})



/*--------------------------------------------------
* @desc    delete one Alarm by id
* @router  /api/alarm/deleteOne
* @methode DELETE
* @access  only technicien et admin
----------------------------------------------------*/
module.exports.deleteOneAlert = asyncHandler (async(req,res)=>{

    const deleteAlarmById = await Alarm.findByIdAndDelete ({_id:req.params.id})
    
    if(!deleteAlarmById){
        return res.status(400).json({message:"Alarme non trouvable !"})
    }

    res.status(201).json({
        message:"alarme supprimer avec succes ."
    })
})






