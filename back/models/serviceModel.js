const mongoose = require ('mongoose');
const JOI = require ('joi');

const serviceSchema = new mongoose.Schema({
    icon:{
        type:String,
        required:true,
        trim:true
    },
    titreService :{
        type:String,
        required:true,
        true:true
    },
    descriptionService :{
        type:String,
        required:true,
        true:true
    }
},
{
    timestamps:true
}
);

const Service = mongoose.model('Service',serviceSchema);

//Create service verification :
function createServiceVerify(obj){
    const schema = JOI.object({
        icon:JOI.string().required().trim(),
        titreService:JOI.string().required().trim(),
        descriptionService:JOI.string().required().trim()
    })
    return schema.validate(obj);
}

//Update service verification :
function updateServiceVerify(obj){
    const schema = JOI.object({
        icon:JOI.string().trim(),
        titreService:JOI.string().trim(),
        descriptionService:JOI.string().trim()
    })
    return schema.validate(obj);
}


module.exports = {
    Service,
    createServiceVerify,
    updateServiceVerify
}