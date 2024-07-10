const mongoose = require('mongoose');

const VendorSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type: String,
        require:true,
        unique: true
    },
    password: {
        type: String,
        require:true
    },
    firm:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Firm'
        }
    ]

});

const Vendor = mongoose.model('Vendor', VendorSchema);

module.exports = Vendor;