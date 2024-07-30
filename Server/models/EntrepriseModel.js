const mongoose = require('mongoose');
const Joi = require('joi');

const entrepriseSchema = new mongoose.Schema({
    adminEntreprise: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    nomEntreprise: {
        type: String,
        required: true,
        trim: true
    },
    logoEntreprise: {
        type: Object,
        default: {
            url: "https://yourteachingmentor.com/wp-content/uploads/2020/12/istockphoto-1223671392-612x612-1.jpg",
            publicId: null
        }
    },
    secteurActivite: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    nomResponsable: {
        type: String,
        required: true,
        trim: true
    },
    numeroEntreprise: {
        type: Number,
        required: true
    },
    adresseEmail: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    adresseLocale: {
        type: String,
        required: true,
        trim: true
    },
    nombreEmployes: {
        type: Number,
        required: true
    },
    achevement: [
        {
            photoTravail: {
                type: Object,
                default: {
                    url: "https://yourteachingmentor.com/wp-content/uploads/2020/12/istockphoto-1223671392-612x612-1.jpg",
                    publicId: null
                }
            },
            dateTravail: {
                type: Date
            },
            titrTravail: {
                type: String
            },
            description2: {
                type: String
            }
        }
    ],

    userRatting : [
        {
            RatNumber:{
                type:Number,
                default:null
            },
            userRat : {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            }
        }
    ],
    
    publicRatting : {
        type:Number,
        default:null
    },


    specialites: [
        {
            titre: {
                type: String,
                required: true,
                trim: true
            },
            texteDescriptif: {
                type: String,
                required: true,
                trim: true
            }
        }
    ],
    isConnected: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Entreprise = mongoose.model('Entreprise', entrepriseSchema);

// Validation des données pour la création/modification d'une entreprise
function validateEntreprise(entreprise) {
    const schema = Joi.object({
        nomEntreprise: Joi.string().trim().required(),
        secteurActivite: Joi.string().trim().required(),
        description: Joi.string().trim().required(),
        nomResponsable: Joi.string().trim().required(),
        numeroEntreprise: Joi.number().required(),
        adresseEmail: Joi.string().trim().email().required(),
        adresseLocale: Joi.string().trim().required(),
        nombreEmployes: Joi.number().required(),
        achevement: Joi.array().items(Joi.object({
            photoTravail: Joi.object({
                url: Joi.string().trim().required(),
                publicId: Joi.string().trim().allow(null)
            }),
            dateTravail: Joi.date(),
            titrTravail: Joi.string().trim(),
            description2: Joi.string().trim()
        })),
        specialites: Joi.array().items(Joi.object({
            titre: Joi.string().trim().required(),
            texteDescriptif: Joi.string().trim().required()
        }))
    });
    return schema.validate(entreprise);
}

module.exports = {
    Entreprise,
    validateEntreprise
};
