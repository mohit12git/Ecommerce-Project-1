//bill.js file
/* npm install razorpay --save :-library provides payment gateway.
payment gaytway is used to implement online payment functionality.
*/

import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "../logo.svg"
import "../CSS/bill.css";

function Bill(props)
{
    const [mydate,setMyDate]=useState();
    const [custdata,setCustData]=useState();  
    const[cname,setCName]=useState();
    const[caddress,setCAddress]=useState();
    const[ccontact,setCContact]=useState();
    const[sitems,setSItem]=useState([]);
    var total=0;
    var nextbillid="";
    const[ispaymentdon,SetisPaymentDone]=useState(false);
    useEffect(()=>{
   //     alert("props length="+props.data.selitems.length);
        for(var i=0;i<props.data.selitems.length;i++)
        {
            sitems.push(props.data.selitems[i]);
        }

        //alert("item count in sitem="+sitems.length);
        alert("Customer ID"+props.data.cid)
        axios.get("http://localhost:9211/customer/getcustomerdetails/"+props.data.cid).then((res)=>{
            
            setCName(res.data.CustomerName);
            setCAddress(res.data.CAddress)
            setCContact(res.data.CContact);
            mydateFun();   
        }).catch((err)=>{
            alert(err);
        })
    },[]);
   
     function mydateFun()
     {        
             const date = new Date();
             let day = date.getDate();
             let month = date.getMonth() + 1;
             let year = date.getFullYear();            
             let currentDate = `${day}-${month}-${year}`;
             console.log(currentDate); 
             setMyDate(currentDate);           
      }
      
      

     // const[selitems,setSelItems]=useState([]);
     // var total=0;
  function loadScript(src) {
      return new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = src;
          script.onload = () => {
              resolve(true);
          };
          script.onerror = () => {
              resolve(false);
          };
          document.body.appendChild(script);
      });
  }
  
 
  function SaveBill()
  {
   // alert(sitems.length);
    //var nextbillid="";
    axios.get("http://localhost:9211/bill/getbillid/").then((res)=>{        
            nextbillid=parseInt(res.data[0].billid)+1;
        
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();            
    let currentDate = `${day}-${month}-${year}`;

    sitems.map((item)=>{
    alert(item.pid)
        var billobj={

            billid:nextbillid,
            billdate:currentDate,
            cid:props.data.cid,
            pid:item.pid,
        }

        axios.post("http://localhost:9211/bill/billsave",billobj).then((res)=>{
            alert(res.data);
        })
      });
    //.catch((err)=>{
    //     alert("inner"+ err);
    //  });
    }).catch((err)=>{
        alert("outer "+err);
    }) 
  }

  async function displayRazorpay() {
    if(ispaymentdon==true)
    {
        alert("Payment Already  Done");
        return;
    }
    else
    {
     SaveBill();
      const res = await loadScript(
          "https://checkout.razorpay.com/v1/checkout.js"
      );
  
      if (!res) {
          alert("Razorpay SDK failed to load. Are you online?");
          return;
      }
  
      var myamount=total*100;
      // creating a new order
      const result = await axios.post("http://localhost:9211/payment/orders/"+myamount);
  
      if (!result) {
          alert("Server error. Are you online?");
          return;
      }
  
      // Getting the order details back
      const { amount, id: order_id, currency } = result.data;
  
      const options = {
          key: "rzp_test_8CxHBNuMQt1Qn8",//"rzp_test_r6FiJfddJh76SI", // Enter the Key ID generated from the Dashboard
          amount: amount.toString(),
          currency: currency,
          name: "Universal Informatics Pvt. Ltd. Indore",
          description: "Test Transaction",
          image: { logo },
          order_id: order_id,
          handler: async function (response) {
              const data = {
                  orderCreationId: order_id,
                  razorpayPaymentId: response.razorpay_payment_id,
                  razorpayOrderId: response.razorpay_order_id,
                  razorpaySignature: response.razorpay_signature,
              };
              alert(data.razorpayPaymentId)
              const result = await axios.post("http://localhost:9211/payment/success", data);
  
              alert("Message From Payment Gateway:-"+result.data);
              //save payment details
              
              const paydetlobjdata = {
                orderCreationId: order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
                cid:props.data.cid,
                billid:nextbillid,
                amount:amount/100
            };
              axios.post("http://localhost:9211/paymentdetails/paymentdetailsave",paydetlobjdata).then((res)=>{
                alert(res.data);
                if(res.data=="payment details saved successfully")
                    {
                        //alert("Payment Already Done ");
                        SetisPaymentDone(true);
                    }
              }).catch((err)=>{
                alert(err);
              })
          },
          prefill: {
              name: "Universal Infromatics",
              email: "universal@gmail.com",
              contact: "9999999999",
          },
          notes: {
              address: "Universal Informatics Indore Pvt. Ltd.",
          },
          theme: {
              color: "#61dafb",
          },
      };
  
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
  }
}

    return(
        <div className="bill-container">
            <table className="bill-customer-info">
                <tbody>
                    <tr><td>Customer Id</td><td>{props.data.cid}</td></tr>
                    <tr><td>Customer Name</td><td>{cname}</td></tr>
                    <tr><td>Address</td><td>{caddress}</td></tr>
                    <tr><td>Contact</td><td>{ccontact}</td></tr>
                    <tr><td>Bill Date</td><td>{mydate}</td></tr>
                </tbody>
            </table>

            <h4 className="bill-title">Bill</h4>

            <table className="bill-products-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Photo</th>
                    </tr>
                </thead>
                <tbody>
                    {props.data.selitems.map((item) => {
                        total = total + item.oprice;
                        return (
                            <tr key={item.pid}>
                                <td>{item.pid}</td>
                                <td>{item.pname}</td>
                                <td>{item.oprice}</td>
                                <td>
                                    <img src={"http://localhost:9211/product/getproductimage/" + item.ppicname} height="50" width="50" />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <div className="bill-total">Total Amount = {total}</div>

            <center>
                <button type="submit" className="bill-pay-button" onClick={displayRazorpay}>Pay Now</button>
            </center>
        </div>
    );
}export default Bill;