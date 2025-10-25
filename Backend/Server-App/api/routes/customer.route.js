const express=require("express");
const customerRoute=express.Router();
const bodyparser=require("body-parser");
const Customer=require("../models/customer.model");
var fs=require("fs");
const multer=require('multer');
const nodemailer=require("nodemailer");
const { error, info } = require("console");

function sendGMail(mailto)
{
    console.log("mail:-"+mailto);

    res.status(200).json({response:"Mail Sent"});

    const transporter=nodemailer.createTransport({
        service:"gmail",
        port:465,
        secure:true,
        auth:{
            user:"bsmernwala@gmail.com",
            pass:"necc umnw wnpi bmzy",
        },
    });

    // console .log(req.body.email);
    const mailOptions={
        from:"bsmernwala@gmail.com",
        to:mailto,
        subject:"Registration Success",
        text:"Dear Customer,Youer Registration is Successfully done but it is in Under Admine Review after Admin Confirmation You Can Login",
    };

    transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
            console.error("Error Sending Email:",error);
        }else{
            console.log("email Sent:",info.response);
        }
    });
}
//Customer registration code
customerRoute.route("/register").post((req,res)=>{
    var customer=new Customer(req.body);
    customer.save().then(customer=>{
        if(customer!=null)
        {
            //sendGmail(req.body.CEmail);
            res.send("Registration Successfull");
            res.end();
        }
        else{
            res.send("Registration Failed");
            res.end();
        }
    }).catch(err=>{
        res.send(err);
        res.end();
    });
});
//login
customerRoute.route("/login").post((req,res)=>{
    var id=req.body.CUserId;
    var pass=req.body.CUserPass;
    Customer.findOne({$and:[{"CUserId":id},{"CUserPass":pass}]}).then(customer=>{
        res.send(customer);
        res.end();
    }).catch(err=>{
        res.send("Something Went Wrong");
        res.end();
    })
})
//get image
customerRoute.route
('/getimage/:cpicname').get((req,res)=>{
    res.sendFile("C:/Ecommerce-Project 1/Backend/Server-App/api/routes/customerimages/"+req.params.cpicname);
});
//image save
const st =multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'C:/Ecommerce-Project 1/Backend/Server-App/api/routes/customerimages/')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    },
})
const upload=multer({storage:st});
customerRoute.post('/savecustomerimage',upload.single('file'),(req,res)=>{
    res.json({})
})
//get customer for count
customerRoute.route("/getcustomercount").get((req,res)=>{
    Customer.find().then(customer=>{
        res.send(customer);
        res.end();
    }).catch(err=>{
        res.send("Something Went wrong");
        res.end();
    })
});
//get customer details by id
customerRoute.route("/getcustomerdetails/:cid").get((req,res)=>{
    var id=req.params.cid;
    Customer.findOne({"CId":id}).then(customer=>{
        console.log(customer);
        res.send(customer);
        res.end();
    }).catch(err=>{
        res.send("Something Went Wrong");
        res.end();
    })
})
//get customer list
customerRoute.route("/getcustomerlist").get((req,res)=>{
    var id=req.params.cid;
    Customer.find().then(customer=>{
        console.log(customer);
        res.send(customer);
        res.end();
    }).catch(err=>{
        res.send("Something Went Wrong");
        res.end();
    })
});

//enable disable vender by admin
customerRoute.route
('/customermanage/:cid/:status').put((req,res)=>{
    Customer.updateOne({"CId":req.params.cid},{"Status":req.params.status}).then
    (res=>{
        console.log("CUSTOMERMANAGE API CALLED:", req.params); 
        res.send('Customer Status updated successfully');
        res.end();
    }).catch((err)=>{
        res.send(err);
        res.end();
    });
});
module.exports=customerRoute;