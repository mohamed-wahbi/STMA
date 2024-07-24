const mongoose = require ('mongoose');
const JOI = require ('joi');

const avieSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    avieText : {
        type:String,
        trim:true,
        required:true,
        minLength:5
    },
    isChecked : {
        type:Boolean,
        default:false
    }

},
{
    timestamps:true
}
);

const Avie = mongoose.model('Avie',avieSchema);

//Create Avie verification :
function createAvieVerify(obj){
    const schema = JOI.object({
        avieText:JOI.string().trim().required().min(5)
    })
    return schema.validate(obj);
}



module.exports = {
    Avie,
    createAvieVerify
}