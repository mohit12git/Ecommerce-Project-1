var mongoose=require('mongoose');
const { schema } = require('./statemodel');
//mongoose library used to provide mongodb schema class to manage structure of data for database.

const Schema=mongoose.Schema;
/*Schema named class provides information about data types */
// productcatg is object and used to define fileds /column of database with datatypes

var Productcatg=new Schema({
    pcatgid:{type:Number}, //integer like 1,2,3
    pcatgname:{type:String}  //text amit indore,india, electronics
},
{
    collection:'productcatg'
}
);
module.exports=mongoose.model('Productcatg',Productcatg);