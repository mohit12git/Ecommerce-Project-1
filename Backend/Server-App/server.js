const express=require('express');
const app =express();
const bodyParser=require('body-parser');
const PORT=9211;
const cors=require ('cors');
const mongoose = require ('mongoose');
const config =require('./config/DB.js');
const stateRoute=require('./api/routes/stateroute.js');
const cityRoute=require('./api/routes/cityroute.js');
const productcatgRoute=require('./api/routes/productcatgroute.js');
const venderRoute=require('./api/routes/vanderroute.js');
const customerRoute=require('./api/routes/customer.route.js');
const productRoute=require('./api/routes/product.route.js');
const billRoute=require('./api/routes/bill.route.js');
const paymentdetailsRoute=require('./api/routes/paymenydetails.route.js');
const emailRoute=require('./emailmgt.js');
const emailactivationRoute=require('./emailactivation.js');
const paymentRoute=require('./payment.js');

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/state',stateRoute);
app.use('/city',cityRoute);
app.use('/productcatg',productcatgRoute);
app.use('/vender',venderRoute);
app.use('/customer',customerRoute);
app.use('/product',productRoute);
app.use('/bill',billRoute);
app.use('/paymentdetails',paymentdetailsRoute);
app.use('/email',emailRoute);
app.use('/emailactivation',emailactivationRoute);
app.use('/payment',paymentRoute);

mongoose.connect(config.URL,
    {useNewUrlParser:true}).then(
        ()=>{console.log('Database is connected'+config.URL)},
        err=>{console.log('Can not connect to the database'+err)}
    );
    app.listen(PORT,()=>{
    console.log('server is running on port:',PORT);
});