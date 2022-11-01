const Calc =require("../models/calc.model");
const asyncHandler =require('express-async-handler')

// const createCalc = asyncHandler(async (req, res, next) => {
//     try {
//       const {alphabet,value} =req.body;
//       let calc= new Calc({
//         alphabet,
//         value
//       })
//       calc = await calc.save()
//       if (calc) {
//         return res.send({
//           message: "Saved Succesfully",
//           calc: {
//             _id: calc._id,
//             value:calc.value,
//             alphabet:calc.alphabet
//           },
//         });
//       }
//     }
//      catch (error) {
//     console.log(error)
//     }
//   });
const getCalc=asyncHandler(async(req,res)=>{
    try{
        const calcs=await Calc.find()
        if(calcs){
            res.send({message:'Found successfully !',calcs})
        }
    }
    catch(error){
        console.log(error)
    }
})
module.exports=getCalc