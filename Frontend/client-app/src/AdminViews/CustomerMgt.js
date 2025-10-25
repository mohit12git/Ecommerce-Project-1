import React,{useState,useEffect} from "react";
import axios from "axios";
import "../CSS/customermgt.css";

function CustomerMgt()
{
    const [customerlist,setCustomerList]=useState([]);
    useEffect(()=>{
        axios.get("http://localhost:9211/customer/getcustomercount").then((res)=>{
            // console.log("Customer data:", res.data);
            setCustomerList(res.data);
        }).catch((err)=>{
            alert(err);
        })
    },[]);

    const handleActiveButton=(cid)=>{
        var email="";
        axios.get("http://localhost:9211/customer/getcustomerdetails/"+cid).then((res)=>{
            email=res.data.CEmail;
            alert("Customer email="+email);

            var newstatus="Active";
            axios.put("http://localhost:9211/customer/customermanage/"+cid+"/"+newstatus).then((res)=>{
                alert(res.data);
                var mailto=email;
                var subject="Login Activation";
                var message="Your Id is Successfully Activated By Admin now you can Login"

                axios.post("http://localhost:9211/emailactivation/sendmails/"+mailto+"/"+subject+"/"+message)
                .then((res)=>{
                    alert(res.data);
                }).catch((err)=>{
                    alert(err);
                })
            }).catch((err)=>{
                alert(err);
            })
        }).catch((err)=>{
            alert(err);
        })
    }

    const handleInactiveButton=(cid)=>{
        var email="";
        axios.get("http://localhost:9211/customer/getcustomerdetails/"+cid).then((res)=>{
            //alert(res.data);
            email=res.data.CEmail;
            alert("Customer Email="+email);

            var newstatus="Inactive";
            axios.put("http://localhost:9211/customer/customermanage/"+cid+"/"+newstatus).then((res)=>{
                alert(res.data);
                var mailto=email;
                var subject="Login Deactivation";
                var message="Your Id is Successfully Inactivated By Admin now You Not Login"

                axios.post("http://localhost:9211/emailactivation/sendmails/"+mailto+"/"+subject+"/"+message)
                .then((res)=>{
                    alert(res.data);
                }).catch((err)=>{
                    alert(err);
                })
            }).catch((err)=>{
                alert(err);
            })
        }).catch((err)=>{
            alert(err);
        })
    }

    return(
        <div className="customer-mgt-container">
            <center>
                <h4 className="customer-mgt-title">Customer List</h4>

                <table className="customer-mgt-table">
                    <tr>
                        <th>Customer id</th>
                        <th>Customer Name</th>
                        <th>Status</th>
                        <th></th>
                        <th></th>
                    </tr>

                    {customerlist.map((item, index) => (
                        <tr key={index}>
                            <td>{item.CId}</td>
                            <td>{item.CustomerName}</td>
                            <td>{item.Status}</td>
                            <td>
                                <button type="submit" className="customer-mgt-button" onClick={() => handleActiveButton(item.CId)}>
                                    Active
                                </button>
                            </td>
                            <td>
                                <button type="submit" className="customer-mgt-button inactive" onClick={() => handleInactiveButton(item.CId)}>
                                    Inactive
                                </button>
                            </td>
                        </tr>
                    ))}
                </table>
            </center>
        </div>
    );
}export default CustomerMgt;