import React, { useState } from "react";
import axios from "axios";
import "../CSS/productcatglist.css";

function ProductCatgMgt() {
    const [pcatgid, setPCatgid] = useState();
    const [pcatgname, setPCatgName] = useState();
    const [pcatgList, setPCatgList] = useState([]);

    const handlePCatgNameText = (evt) => {
        setPCatgName(evt.target.value);
    };

    const handleSaveButton = () => {
        axios.post(`http://localhost:9211/productcatg/addproductcatg/${pcatgid}/${pcatgname}`)
        .then((res) => {
            alert(res.data);
        })
        .catch((err) => {
            alert(err);
        });
    };

    const handleShowButton = () => {
        axios.get("http://localhost:9211/productcatg/showproductcatg").then((res) => {
            setPCatgList(res.data);
            setPCatgid(res.data.length + 1);  // To auto-update next pcatgid
        }).catch((err) => {
            alert(err);
        });
    };

    return (
        <div className="product-catg-container">
            <center>
                <p className="product-catg-title">Product Category Form</p>
                <table className="product-catg-table">
                    <tr>
                        <td>Product Id</td>
                        <td>{pcatgid}</td>
                    </tr>
                    <tr>
                        <td>Category Name</td>
                        <td>
                            <input type="text" className="product-catg-input" 
                            onChange={handlePCatgNameText} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button type="submit" className="product-catg-button" 
                            onClick={handleSaveButton}>Save</button>
                        </td>
                        <td>
                            <button type="submit" className="product-catg-button" 
                            onClick={handleShowButton}>Show</button>
                        </td>
                    </tr>
                </table>

                <p className="product-catg-subtitle">Product Category List</p>

                <table className="product-catg-table">
                    <tr>
                        <th>Id</th>
                        <th>Category Name</th>
                    </tr>
                    {
                        pcatgList.map((item, index) => (
                            <tr key={index}>
                                <td>{item.pcatgid}</td>
                                <td>{item.pcatgname}</td>
                            </tr>
                        ))
                    }
                </table>
            </center>
        </div>
    );
}

export default ProductCatgMgt;
