// this file is used to define schema/structure of database
var mongoose= require('mongoose');//used to connect express application to mongodb ,it provide schema namedclass to define table structure
const Schema=mongoose.Schema;
var State=new Schema({
    stid:{type:Number},
    stname:{type:String},
    status:{type:Number}
},
{
    collection:'state'//collection means taable,it will create state named collection or table in mongodb database
}
);
module.exports=mongoose.model('State',State);