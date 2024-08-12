const asyncHandler = require("express-async-handler");
const { Avie, createAvieVerify } = require("../models/avieModel.js");
const { User } = require("../models/userModel.js");
const path = require('path');
const {cloudinaryUpload,cloudinaryRemoveImage,cloudinaryRemoveMultipleImages} = require('../utils/cloudinary.js');

const fs = require('fs');
const { url } = require("inspector");
const { use } = require("../routes/avieRoute.js");
const { array } = require("joi");

/*--------------------------------------------------
* @desc    create Avie
* @router  /api/register/create
* @methode POST
* @access  only user
----------------------------------------------------*/
module.exports.createAvieCtrl = asyncHandler(async (req, res) => {
  //validator :
  const { error } = createAvieVerify(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // create new avie :
  const createdAvie = await Avie.create({
    userId: req.user.id,
    avieText: req.body.avieText,
  });

  //Verify creating avie :
  if (!createdAvie) {
    return res.status(401).json({ message: "avies not created !" });
  }

  //add avie id to avies user :
  const getUser = await User.findById({ _id: req.user.id });
  getUser.avies.push(createdAvie._id);
  await getUser.save();

  // Response to client :
  res
    .status(201)
    .json({ message: "Avies est bien crée , merci pour votre confiance ." });
});

/*--------------------------------------------------
* @desc    get all Avie
* @router  /api/avie/getAllAvies
* @method  GET
* @access  only admin
----------------------------------------------------*/
module.exports.getAvieCtrl = asyncHandler(async (req, res) => {
  const getAllAvies = await Avie.find({}).populate("userId", [
    "-password",
    "-isAdmin",
    "-isAccountVerified",
    "-avies",
    "-createdAt",
    "-updatedAt",
    "-__v",
  ]);
  if (!getAllAvies || getAllAvies.length === 0) {
    return res.status(400).json({ message: "Il n'y a pas encore d'avis !" });
  }
  res.status(200).json({ avies: getAllAvies });
});



/*--------------------------------------------------
* @desc    get all Avie
* @router  /api/avie/getAllAvies
* @method  GET
* @access  only admin
----------------------------------------------------*/
module.exports.getCheckedAvieCtrl = asyncHandler(async (req, res) => {
  const getAllAvies = await Avie.find({isChecked: true }).populate("userId", [
    "-password",
    "-isAdmin",
    "-isAccountVerified",
    "-avies",
    "-createdAt",
    "-updatedAt",
    "-__v",
  ]);
  if (!getAllAvies || getAllAvies.length === 0) {
    return res.status(400).json({ message: "Il n'y a pas encore d'avis varifier !" });
  }
  res.status(200).json({ avies: getAllAvies });
});





/*--------------------------------------------------
* @desc    Delete one Avie
* @router  /api/avie/deleteOne
* @method  DELETE
* @access  only admin
----------------------------------------------------*/
module.exports.deleteAvieCtrl = asyncHandler(async (req, res) => {
  const findAvie = await Avie.findById({ _id: req.params.id });
  if (!findAvie) {
    return res.status(400).json({ message: "Avie non trouvable !" });
  }

  // Get the user associated with the avie
  const user = await User.findById(findAvie.userId);

  // Delete the avie
  await Avie.findByIdAndDelete({_id:findAvie._id});

  // Remove the avie id from user's avies array
  user.avies.pull(findAvie._id);
  await user.save();

    // Check if the user has no more avies
    if (user.avies.length === 0) {
      // Remove the user's profile photo
      await cloudinaryRemoveImage(user.profilePhoto.publicId);
      user.profilePhoto = { url: "", publicId: null };
      await user.save();
    }



  // const deletedAvie = await Avie.findByIdAndDelete({ _id: req.params.id });
  res.status(200).json({ message: "Avie et bien supprimer ." });
});



/*--------------------------------------------------
* @desc    update isCheked avie to true 
* @router  /api/avie/isCheckedTrue
* @method  PUT
* @access  only admin
----------------------------------------------------*/
module.exports.isCheckedCtrl = asyncHandler(async(req,res)=>{
  const findAvie = await Avie.findById({_id:req.params.id});
  if(!findAvie){
    return res.status(400).json({message:"avie non trouvable !"})
  }
  
  const updatedAvie = await Avie.updateOne({ _id: req.params.id }, { isChecked: true });
  res.json({ message: 'isChecked updated successfully' });


})














/*--------------------------------------------------
* @desc    create Avie photo
* @router  /api/avie/create/image
* @methode POST
* @access  only user
----------------------------------------------------*/
module.exports.createAvieImageCtrl = asyncHandler (async(req,res)=>{
  //Validator :
  if(!req.file){
    return res.status(400).json({message:"no file provided !"})
  }
  //get the path to the image :
  const photoPath = path.join(__dirname,`../images/${req.file.filename}`);
  
  //upload to the cloudinary :
  const result = await cloudinaryUpload(photoPath);

  //get the user from db :
  const user = await User.findById({_id:req.user.id})

  //delete the old profilePhoto if exist :
   if(user.profilePhoto.publicId !== null){
    await cloudinaryRemoveImage(user.profilePhoto.publicId)
   } 
  //change the progilePhoto filed in the db :
  user.profilePhoto = {
    url : result.secure_url ,
    publicId : result.public_id
  }
  await user.save();



  res.status(201).json({
    message:"profile user et bien uploaded .",
    profilePhoto : {
      url:result.secure_url,
      publicId :result.public_id
    }
  
  })

  //remove image from the server :
  fs.unlinkSync(photoPath)
})







module.exports.imagesUploading = asyncHandler (async(req,res)=>{
  const arra = [] ;
  const results = [] ;
 
 
  
  console.log(arra)
  req.files.map((item)=>{
    arra.push(path.join(__dirname,`../images/${item.filename}`) )
  })

  console.log(arra)
  arra.map(async(item)=>{
    console.log(typeof item)
    r =await cloudinaryUpload(item);
    results.push(r)
    console.log(results)
  })



  



   

  

  res.status(200).json({message:"Images uploaded successfuly .",results})
})