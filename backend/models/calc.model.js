const mongoose =require( "mongoose");

const calcSchema=mongoose.Schema({
    alphabet:{type:String,min:1,max:1},
    value:{type:Number}
})

const Calc=mongoose.model('Calc',calcSchema);
module.exports=Calc;