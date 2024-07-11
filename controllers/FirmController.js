

const Firm = require('../models/Firm');
const Vendor = require('../models/Vendor');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination:function(req,file,cd){
        cd(null,'uploads/');
    },
    filename:function(req,file,cd){
        cd(null,Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({storage: storage});



const addFirm = async (req,res)=>{

   try{
    const {firmName,area,category,region,offer} = req.body

    const image = req.file?req.file.filename:undefined;

    const vendor = await Vendor.findById(req.vendorId);

    if(!vendor){
        res.status(404).json({message:"Vendor not Found hear"})
    }
    const firm = new Firm({

        firmName,area,category,region,offer,image,vendor:vendor._id
    })

    const saveFirm =  await firm.save();

    vendor.firm.push(saveFirm);

    await vendor.save();

    return res.status(200).json({message:"Firn added Successfully"})
   }
   catch(error){

    console.error(error)
    res.status(500).json("internal server error");


   }

}

const deleteFirmById = async(req,res)=>{

    try{

        const firmId = req.params.firmId;

        const deletedFirm = await Firm.findByIdAndDelete(firmId);

        if(!deleteFirmById){
            return res.status(404).json({error : "No Firm Found"});
        }
    }
    catch(error){
        console.error(error);
        res.status(500).json({error: " INternal server Error"})

    }
}

module.exports = {addFirm: [ upload.single('imge'),addFirm],deleteFirmById}