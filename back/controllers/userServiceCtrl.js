const asyncHandler = require("express-async-handler");
const { User, registerVerify, loginVerify } = require("../models/userModel.js");
const {
  Service,
  createServiceVerify,
  updateServiceVerify,
} = require("../models/serviceModel.js");
const { json } = require("express");

/*--------------------------------------------------
* @desc    create User new Service
* @router  /api/user/service/create
* @methode POST
* @access  private only user
----------------------------------------------------*/
module.exports.newUserServiceCtrl = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { serviceId, besoins , numTel , adresse } = req.body;

  // Vérifiez si l'utilisateur existe
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ error: "Utilisateur non trouvé." });
  }

  // Vérifiez si le service existe
  const service = await Service.findById(serviceId);
  if (!service) {
      return res.status(404).json({ error: "Service non trouvé." });
  }

  // Ajoutez les services choisis à l'utilisateur
  user.servicesChoisis.push({ serviceId, besoins , adresse });
  user.numTel = numTel ;

  await user.save();

  // Anvoyer response au client
  res.status(200).json({
        message: "new service is pushed in the user modele .",
        userId,
        serviceId,
        besoins,
        numTel
    });
});



/*--------------------------------------------------
* @desc    get User avec service 
* @router  /api/user/service/getAll
* @methode GET
* @access  admin and loged in user
----------------------------------------------------*/
module.exports.getUserWithServiceCtrl = asyncHandler(async(req,res)=>{
    //voir tous les utilisateur
    const getAllUser = await User.find().select([
      "-password","-isAdmin","-isAccountVerified","-avies","-createdAt","-updatedAt","-__v"
    ]).populate(
      { path: 'servicesChoisis.serviceId', select: (["-createdAt","-updatedAt","-__v"]) }
      );

    //filtre les tableaux des utilisateur avec service :
    const utilisateursAvecServices = getAllUser.filter(utilisateur => utilisateur.servicesChoisis.length !== 0);

    res.status(200).json({
        message:"voila les utilisateur et ses services :",
        utilisateursAvecServices
    })
})


/*--------------------------------------------------
* @desc    get one User avec service 
* @router  /api/user/service/getOne
* @methode GET
* @access  admin and loged in user
----------------------------------------------------*/
module.exports.getOneUserWithServiceCtrl = asyncHandler(async(req,res)=>{
  //voir tous les utilisateur
  const getAllUser = await User.find().select([
    "-password","-isAdmin","-isAccountVerified","-avies","-createdAt","-updatedAt","-__v"
  ]).populate(
    { path: 'servicesChoisis.serviceId', select: (["-createdAt","-updatedAt","-__v"]) }
    );

  //filtre les tableaux des utilisateur avec service :
  const utilisateursAvecServices = getAllUser.filter(utilisateur => utilisateur.servicesChoisis.length !== 0);

   // Récupérer l'utilisateur avec le service spécifié par l'ID dans les paramètres de la requête
   const getOneUser = utilisateursAvecServices.find(utilisateur => utilisateur._id.toString() === req.params.id);

   if (!getOneUser) {
     return res.status(404).json({ message: "C'ette utilisateur n'a pas encore des Services !" });
   }

  res.status(200).json({
      message:"voila l'utilisateur et ses services :",getOneUser
  })
})


/*--------------------------------------------------
* @desc    delete one User service 
* @router  /api/user/service/delete
* @methode DELETE
* @access  Only admin 
----------------------------------------------------*/
module.exports.deleteUserServiceCtrl = asyncHandler(async(req,res)=>{

  const { userId, serviceId, besoinId } = req.params;

  // Vérifiez si l'utilisateur existe
  const user = await User.findById(userId);
  if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
  }

  // Trouvez le service choisi par son ID
  const serviceChoisi = user.servicesChoisis.find(service => service._id.toString() === serviceId);
  if (!serviceChoisi) {
      return res.status(404).json({ message: "Service choisi non trouvé pour cet utilisateur." });
  }

  // Vérifiez si besoinId est fourni, si oui, supprimez ce besoin du service
  if (besoinId) {
      const besoinIndex = serviceChoisi.besoins.findIndex(besoin => besoin._id.toString() === besoinId);
      if (besoinIndex === -1) {
          return res.status(404).json({ message: "Besoin non trouvé pour ce service choisi." });
      }
      // Supprimez le besoin spécifique du tableau besoins du service choisi
      serviceChoisi.besoins.splice(besoinIndex, 1);
  } else {
      // Si besoinId n'est pas fourni, supprimez le service entier
      user.servicesChoisis = user.servicesChoisis.filter(service => service._id.toString() !== serviceId);
  }

    // Si le tableau des besoins est vide, supprimez le service
    if (serviceChoisi.besoins.length === 0) {
      user.servicesChoisis = user.servicesChoisis.filter(service => service._id.toString() !== serviceId);
  }

  
  // Enregistrez les modifications
  await user.save();

  res.status(200).json({
      message: "Le service de cet utilisateur a été supprimé avec succès."
  });

  
} )



module.exports.uploadImgsCtrl =asyncHandler (async(req,res)=>{
  // Traitez les fichiers téléversés ici, par exemple, enregistrer les chemins d'accès des fichiers dans la base de données
  console.log('Files uploaded:', req.files);
  res.status(200).json({message:"images uploaded successfuly !"})
})




/*--------------------------------------------------
* @desc    get one User avec service 
* @router  /api/user/service/getServiceById
* @methode GET
* @access  admin and loged in user
----------------------------------------------------*/
module.exports.getServiceByIdCtrl = asyncHandler(async(req,res)=>{

//voir tous les utilisateur
const getAllUser = await User.find().select([
  "-password","-isAdmin","-isAccountVerified","-avies","-createdAt","-updatedAt","-__v"
]).populate(
  { path: 'servicesChoisis.serviceId', select: (["-createdAt","-updatedAt","-__v"]) }
  );

//filtre les tableaux des utilisateur avec service :
const utilisateursAvecServices = getAllUser.filter(utilisateur => utilisateur.servicesChoisis.length !== 0);

 // Récupérer l'utilisateur avec le service spécifié par l'ID dans les paramètres de la requête
 const getOneUser = utilisateursAvecServices.find(utilisateur => utilisateur._id.toString() === req.params.id);

 if (!getOneUser) {
   return res.status(404).json({ message: "C'ette utilisateur n'a pas encore des Services !" });
 }

 const getUserOneService = getOneUser.servicesChoisis.find(service=>service._id.toString() === req.params.serviceId)

 
res.status(200).json({
    message:"voila l'utilisateur et ses services :",getUserOneService
})
  })



 


 /*--------------------------------------------------
* @desc    confirm Service by id 
* @router  /api/user/service/update/:userId/:serviceId
* @methode PUT
* @access  only Admin 
----------------------------------------------------*/
module.exports.confirmServiceCntr = asyncHandler(async (req, res) => {
  const { userId, serviceId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    // Trouvez le service choisi par son ID
    const serviceChoisi = user.servicesChoisis.find(service => service._id.toString() === serviceId);
    if (!serviceChoisi) {
      return res.status(404).json({ message: "Service choisi non trouvé pour cet utilisateur." });
    }

    // Modifier la valeur de isConfirme à true
    serviceChoisi.isConfirme = true;

    // Sauvegarder l'utilisateur avec les modifications
    await user.save();

    res.status(200).json({
      message: "Confirmation du service valide !",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Erreur lors de la confirmation du service.",
    });
  }
});




 /*--------------------------------------------------
* @desc    Get all Confirmed services
* @router  /api/user/service/getAllConfirmedService
* @methode GET
* @access  only Admin and Technicien 
----------------------------------------------------*/
module.exports.getAllConfServiceCtrl = asyncHandler (async(req,res)=>{
 const users = await User.find({ 'servicesChoisis.isConfirme': true });

 if(!users){
  return res.status(404).json({message:"pas des services utilisateur Confirmer !"})
 }

    const usersAvecServiceConfirme = users.map(userItem => {
      return {
        _id: userItem._id,
        username: userItem.username,
        email: userItem.email,
        numTel: userItem.numTel,
        servicesChoisis: userItem.servicesChoisis.filter(service => service.isConfirme === true)
      };
    });

  if(!usersAvecServiceConfirme){
    return res.status(404).json({message:"Error lors de la featching des services confirmer dans la base des données !"})
  }

  res.status(200).json({
    usersAvecConfirmedService : usersAvecServiceConfirme
  })
})





 /*--------------------------------------------------
* @desc    Get one Confirmed service
* @router  /api/user/service/getOneConfirmedServiceById
* @methode GET
* @access  only Admin and Technicien 
----------------------------------------------------*/
module.exports.GetConfirmedServicesByIdClientCtrl = asyncHandler(async(req,res)=>{

  const users = await User.findById({'_id':req.params.id}).populate('servicesChoisis.serviceId' ,"");

  if(!users){
   return res.status(404).json({message:"pas des services utilisateur Confirmer !"})
  }

  const userConfirmerService = {
    id:users._id,
    name:users.username,
    email:users.email,
    numTel:users.numTel,
    servicesChoisis : users.servicesChoisis.filter(services => services.isConfirme === true )
    
  }

  
  
  

  res.status(200).json ({
   userConfirmerService 
  })
})