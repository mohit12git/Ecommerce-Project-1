import React,{useState,useEffect} from "react";
import Product from "../ProductView/Product"
import ReactDOM from "react-dom/client";
import VenderLogin from "./VenderLogin";
import "../CSS/venderhome.css";
function VenderHome(props)
{
    const[vendname,setVendName]=useState();

    useEffect(()=>{
        var obj=JSON.parse(sessionStorage.getItem('vsessionauth'));
        if(obj!=undefined&&obj!=null)
        {
            //alert(obj.username);
            setVendName(obj.vuserfullname);
        }else{
            alert('Vender Session Expired');
        }
    })

    const handleAddProductButton=()=>{
        const root=ReactDOM.createRoot(document.getElementById("root"));
        root.render(<Product data={props.data.vid}></Product>)
    }

    const handleLogOut=()=>{
        sessionStorage.removeItem('vsessionauth');
        alert("Vender session Closed");
        const root=ReactDOM.createRoot(document.getElementById("root"));
        
        root.render(<VenderLogin/>);
    }
    return(
        <div className="vender-home">
            <h1 className="vender-title">Vender Home Page</h1>
            <p className="vender-session">Session running for <span className="vender-name">{vendname}</span></p>
            <h3 className="vender-details">Vender Id: <span>{props.data.vid}</span></h3>
            <h3 className="vender-details">Welcome: <span>{props.data.vfname}</span></h3>
            <img 
                className="vender-image"
                src={`http://localhost:9211/vender/getimage/${props.data.vpicname}`} 
                alt="Vender Pic"
            />
            <div className="vender-buttons">
                <button className="btn manage-product" onClick={handleAddProductButton}>Manage Product</button>
                <button className="btn logout" onClick={handleLogOut}>Logout</button>
            </div>
        </div>
    );
}export default VenderHome;