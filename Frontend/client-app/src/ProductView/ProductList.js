import React,{useEffect,useState} from "react";
import axios from "axios";
import cart from "./cart.png";
import ReactDOM from "react-dom/client";
import Bill from "../CustomerView/Bill";
import "../CSS/productlist.css";

function ProductList(props)
{
    const[itemcount,setItemCount]=useState(0);
    const[selitems,setSelItems]=useState([]);

    const[pcatglist,setPCatgList]=useState([]);

    const[plist,setPList]=useState([]);
    var cname="";

    useEffect(()=>{
        axios.get("http://localhost:9211/product/showproduct").then((res)=>{
            setPList(res.data);
        }).catch((err)=>{
            alert(err);
        });
        axios.get("http://localhost:9211/productcatg/showproductcatg").then((res)=>{
            setPCatgList(res.data);
        }).catch((err)=>{
            alert(err);
        });
    },[]);

    const handleBuyButton=(evt)=>{
        var pid=parseInt(evt);
        var status="";
        axios.get("http://localhost:9211/product/showproductstatus/"+pid).then((res)=>{
            status=res.data.status;
            if(status=="Active")
            {
                setItemCount(itemcount+1);
                plist.map((item)=>{
                    if(item.pid==evt)
                    {
                        selitems.push(item);
                    }
                })
            }else{
                alert("Product Out Of Stock");
            }
        }).catch((err)=>{
            alert(err);
        });
    }

    const handleCheckOutButton=()=>{
        alert("Hello")
        if(selitems.length<=0)
        {
            alert("Please Buy Some Product");
        }
        else
        {
            const root=ReactDOM.createRoot(document.getElementById("root"));
            var ccid=props.data;
            var obj={
                selitems:selitems,
                cid:ccid
            };
            root.render(<Bill data={obj}></Bill>)
        }
    }

    const handleSearch=(evt)=>{
        if(evt.target.value>0)
        {
            axios.get("http://localhost:9211/product/showproductbycatgid/"+evt.target.value).then((res)=>{
                setPList(res.data);
            }).catch((err)=>{
                alert(err);
            });
        }else{
            axios.get("http://localhost:9211/product/showproduct").then((res)=>{
                setPList(res.data);
            }).catch((err)=>{
                alert(err);
            });
        }
    }

    return(
        <div className="product-list-container">
            <h6 className="product-list-header">Customer Id: {props.data}</h6>

            <div className="product-list-cart">
                <img src={cart} height="50" width="50" alt="cart" />
                <label>{itemcount}</label>
                <button type="submit" onClick={handleCheckOutButton}>CheckOut</button>
            </div>

            <div className="product-list-search">
                Search By Category
                <select onClick={handleSearch}>
                    <option value="0">All</option>
                    {
                        pcatglist.map((pcatgitem) => (
                            <option key={pcatgitem.pcatgid} value={pcatgitem.pcatgid}>{pcatgitem.pcatgname}</option>
                        ))
                    }
                </select>
            </div>

            <p className="mainproduct-list-title">Product List</p>

            <table className="product-list-table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Offer Price</th>
                        <th>Category Name</th>
                        <th>Photo</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        plist.map((item) => (
                            <tr key={item.pid}>
                                <td>{item.pid}</td>
                                <td>{item.pname}</td>
                                <td>{item.pprice}</td>
                                <td>{item.oprice}</td>
                                <td>
                                    {
                                        pcatglist.map((citem) => {
                                            if (item.pcatgid == citem.pcatgid) {
                                                cname = citem.pcatgname;
                                            }
                                        })
                                    }
                                    {cname}
                                </td>
                                <td>
                                    <img src={"http://localhost:9211/product/getproductimage/" + item.ppicname}
                                        height="100" width="100" />
                                </td>
                                <td>
                                    <button type="submit" className="product-list-buy-button" onClick={() => handleBuyButton(item.pid)}>
                                        Buy
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}export default ProductList;