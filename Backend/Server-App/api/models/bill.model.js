var mongoose=require('mongoose');
const Schema=mongoose.Schema;
var Bill=new Schema({
    billid:{type:Number},
    billdate:{type:String},
    cid:{type:Number},
    pid:{type:Number}
},
{
    collection:'Bill'
}
);
module.exports=mongoose.model('Bill',Bill);