import React,{useEffect,useState} from "react";
import ProductList from "../ProductView/ProductList";
import BillById from "../CustomerView/BillByID";
import ReactDOM from "react-dom/client";
import CustomerLogin from "./CustomerLogin";
import "../CSS/customerhome.css";

function CustomerHome(props)
{

    const[custname,setCustName]=useState();
    const[isshowplist,setIsShowPList]=useState(false);
    const[isshowbill,setShowBill]=useState(false);

    useEffect(()=>{
        var obj=JSON.parse(sessionStorage.getItem('sessionauth'));
        if(obj!=undefined&&obj!=null)
        {
            //alert (obj.username);
            setCustName(obj.userfullname);
        }else{
            alert('Session Expired')
        }
    })

    const handleShopingButton=()=>{
        const root=ReactDOM.createRoot(document.getElementById("root"));
        alert("cid"+props.data.cid);
        var cid=props.data.cid;
        root.render(<ProductList data={cid}></ProductList>);
    }

    const handleShowBills=()=>{
        const root=ReactDOM.createRoot(document.getElementById("root"));
        var cid=props.data.cid;
        root.render(<BillById data={cid}></BillById>);
    }

    const handleLogOut=()=>{
        sessionStorage.removeItem('sessionauth');
        alert("Customer session Closed");
        const root=ReactDOM.createRoot(document.getElementById("root"));

        root.render(<CustomerLogin/>);
    }

    function togleShoping(){
        setIsShowPList((isshowplist)=>!isshowplist);
    }
    function togleBill(){
        setShowBill((isshowbill)=>!isshowbill);
    }

    return(
           <div className="customer-home-container">
            <p className="customer-home-session">Current Session Running For {custname}</p>
            <p className="customer-home-session">Customer Id {props.data.cid}</p>

            <h4 className="customer-home-title">Customer Home Page</h4>
            <h5 className="customer-home-welcome">Welcome {props.data.cfname}</h5>

            <img className="customer-home-image" src={"http://localhost:9211/customer/getimage/" + props.data.cpicname} height={100} width={100} />

            <div className="customer-home-buttons">
                <button type="submit" className="customer-home-button shop" onClick={togleShoping}>
                    Shopping
                </button>

                <button type="submit" className="customer-home-button bill" onClick={togleBill}>
                    Show Bill
                </button>

                <button type="submit" className="customer-home-button logout" onClick={handleLogOut}>
                    Logout
                </button>
            </div>

            {isshowplist && <ProductList data={props.data.cid} />}
            {isshowbill && <BillById data={props.data.cid} />}

            <h4 className="customer-home-footer">
                <marquee>www.subkuchmiltahe.com</marquee>
            </h4>
        </div>
    );
}export default CustomerHome;