const asyncHandler = require("express-async-handler");
const { Service, createServiceVerify , updateServiceVerify } = require("../models/serviceModel.js");

/*--------------------------------------------------
* @desc    create Service
* @router  /api/register/create
* @methode POST
* @access  private only admin
----------------------------------------------------*/
module.exports.createServiceCtrl = asyncHandler(async (req, res) => {
  //Validation
  const { error } = createServiceVerify(req.body);
  if (error) {
    return res.status(500).json({ message: error.details[0].message });
  };

  // find service exist
  const findService =  await Service.findOne({titreService:req.body.titreService})
    if(findService){
        return res.status(400).json({message:"service et deja existe"});
    }

    //create Servise
    const createServise = await Service.create({
        icon:req.body.icon,
        titreService:req.body.titreService,
        descriptionService:req.body.descriptionService
    });

    //send response to client
    res.status(201).json({message:"Service est bien ajouter ."})
})


/*--------------------------------------------------
* @desc    get All service
* @router  /api/service/getAll
* @methode get
* @access  public
----------------------------------------------------*/
module.exports.getServicesCtrl = asyncHandler (async (req,res)=>{
  const allServices = await Service.find({});
  if (!allServices){
      return res.status(404).json({message:"tu n'avais pas des services !"});
  }
  res.status(200).json({services:allServices})
})







/*--------------------------------------------------
* @desc    get One service
* @router  /api/service/getOne
* @methode get
* @access  public
----------------------------------------------------*/
module.exports.getOneServicesCtrl = asyncHandler (async (req,res)=>{
  const allService = await Service.findById({_id:req.params.id});
  if (!allService){
      return res.status(404).json({message:"tu n'avais pas des services !"});
  }
  res.status(200).json({service:allService})
})








/*--------------------------------------------------
* @desc    Delete one service
* @router  /api/service/delete/id
* @methode DLEATE
* @access  only admin
----------------------------------------------------*/
module.exports.deleteServiceCtrl = asyncHandler (async(req,res)=>{
  const findServise = await Service.findById({_id:req.params.id})
  if(!findServise){
      return res.status(400).json({message:"service introuvable !"})
  }
  const deletedService = await Service.findByIdAndDelete({_id:req.params.id});
  res.status(200).json({message:"Service deleted successfuly ."});
})


/*--------------------------------------------------
* @desc    Update service
* @router  /api/service/update/:id
* @methode put
* @access  only admin
----------------------------------------------------*/
module.exports.updateServiceCtrl = asyncHandler (async(req,res)=>{
  //Validation
  const { error } = updateServiceVerify(req.body);
  if (error) {
    return res.status(500).json({ message: error.details[0].message });
  };

  const service = await Service.findById({_id:req.params.id});
  if(!service){
      return res.status(404).json({message:"Service not found"})
  };

  const updatedService = await Service.findByIdAndUpdate({_id:req.params.id},{
      $set:{
          icon:req.body.icon,
          titreService:req.body.titreService,
          descriptionService:req.body.descriptionService
      }
  },{new:true,runValidators:true})

  res.status(200).json({updatedService:updatedService})
})



