import React,{useState} from "react";
import StateMgt from "./StateMgt";
import CityMgt from "./CityMgt";
import ProductCatgMgt from "./ProductCatgMgt";
import VenderMgt from "./VenderMgt";
import "../CSS/adminhome.css";
import ShowBillsMgt from "./ShowBillsMgt";
//import AdminMain from "./AdminMain";
import ReactDOM from "react-dom/client";
import MainPage from "../MainPage";
import ProductList from "../ProductView/ProductList";
import CustomerMgt from "./CustomerMgt";
import ProductListMgt from "./ProductListMgt";


function AdminHome()
{
    const[isstateshow,setIsStateShow]=useState(false);
    const[iscityshow,setIsCityShow]=useState(false);
    const[ispcatgshow,setIsPCatgShow]=useState(false);
    const[isvendershow,setIsVenderShow]=useState(false);
    const[isbillshow,setIsBillShow]=useState(false);
    const[isproductlistshow,setIsProductListShow]=useState(false);
    const[iscustomershow,setIsCustomerShow]=useState(false);

    function togleState()
    {
        setIsStateShow((isstateshow)=>!isstateshow);
    }

    function togleCity()
    {
        setIsCityShow((iscityshow)=>!iscityshow)
    }

    function togleProductCatg()
    {
        setIsPCatgShow((ispcatgshow)=>!ispcatgshow)
    }

    function togleVender()
    {
        setIsVenderShow((isvendershow)=>!isvendershow)
    }

    function togleBill()
    {
        setIsBillShow((isbillshow)=>!isbillshow)
    }

    function togleProductList()
    {
        setIsProductListShow((isproductlistshow)=>!isproductlistshow)
    }

    function togleCustomerList()
    {
        setIsCustomerShow((iscustomershow)=>!iscustomershow)
    }

    function LogOutButtonClick()
    {
        const root=ReactDOM.createRoot(document.getElementById("root"));
        root.render(<MainPage></MainPage>)
    }

    return(
        <div className="admin-container">
            <center>
                <h4 className="admin-title">Admin home Page</h4>
                <div className="admin-button-group-container">
                <div className="admin-button-group">
                <button type="button" onClick={togleState} 
                className="custom-button custom-button-state">State</button>

                <button type="button" onClick={togleCity} 
                className="custom-button custom-button-city">City</button>
                
                <button type="button" onClick={togleProductCatg} 
                className="custom-button custom-button-product-catg">Product Category</button>
                
                <button type="button" onClick={togleVender} 
                className="custom-button custom-button-vender">Vender</button>
                
                <button type="button" onClick={togleBill} 
                className="custom-button custom-button-bills">Bills</button>
                
                <button type="button" onClick={togleProductList} 
                className="custom-button custom-button-product">Product</button>
                
                <button type="button" onClick={togleCustomerList} 
                className="custom-button custom-button-customer">Customer</button>
                
                <button type="button" onClick={LogOutButtonClick} 
                className="custom-button custom-button-logout">Logout</button>
                </div>
                </div>
                <div className="section-container">
                {
                    isstateshow&&
                    <StateMgt/>
                }
                {
                    iscityshow&&
                    <CityMgt/>
                }
                {
                    ispcatgshow&&
                    <ProductCatgMgt/>
                }
                {
                    isvendershow&&
                    <VenderMgt/>
                }
                {
                    isbillshow&&
                    <ShowBillsMgt/>
                }
                {
                    isproductlistshow&&
                    <ProductListMgt/>
                }
                {
                    iscustomershow&&
                    <CustomerMgt/>
                }
                </div>
            </center>
        </div>
    );
}export default AdminHome;