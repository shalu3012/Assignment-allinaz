const express =require('express');
const router=express.Router();
const {getCalc}=require("../controller/calcController")

router.get('/',getCalc)

module.exports=router;