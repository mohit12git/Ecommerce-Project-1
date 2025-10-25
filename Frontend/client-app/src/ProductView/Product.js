import React, { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/product.css";

function Product(props) {
    const [pid, setPId] = useState();
    const [pname, setPName] = useState();
    const [pprice, setPPrice] = useState();
    const [oprice, setOPrice] = useState();
    const [ppicname, setPPicname] = useState();
    const [pcatgid, setPCagId] = useState();
    const [pcatglist, setPCatgList] = useState([]);
    const [image, setImage] = useState({ preview: '', data: '' });
    const [status, setStatus] = useState('');
    const [plist, setPList] = useState([]);
    var cname = "";
    var catgname = "";

    var venderid = props.data == undefined ? 0 : props.data;

    const handlePIdText = (evt) => setPId(evt.target.value);
    const handlePNameText = (evt) => setPName(evt.target.value);
    const handlePPriceText = (evt) => setPPrice(evt.target.value);
    const handleOPriceText = (evt) => setOPrice(evt.target.value);
    const handlePCatgSelect = (evt) => setPCagId(evt.target.value);

    useEffect(() => {
        alert("VID=" + venderid);

        axios.get("http://localhost:9211/product/getmaxpid")
            .then((res) => setPId(res.data.length + 1))
            .catch((err) => alert(err));

        axios.get("http://localhost:9211/productcatg/showproductcatg")
            .then((res) => setPCatgList(res.data))
            .catch((err) => alert(err));
    }, []);

    const handleSaveButton = () => {
        const obj = {
            pid, pname, pprice, oprice, ppicname, pcatgid, vid: venderid, status: "Active"
        };
        axios.post("http://localhost:9211/product/saveproduct/", obj)
            .then(() => alert("Product Saved"))
            .catch((err) => alert(err));
    };

    // ✅ Updated toggle logic here
    const handleShowButton = () => {
        if (plist.length > 0) {
            // Hide data if already shown
            setPList([]);
        } else {
            // Fetch and show data if not shown
            axios.get("http://localhost:9211/product/showproductbyvender/" + venderid)
                .then((res) => setPList(res.data))
                .catch((err) => alert(err));
        }
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        let formData = new FormData();
        formData.append('file', image.data);
        const response = await fetch('http://localhost:9211/product/saveproductimage', {
            method: 'POST',
            body: formData,
        });

        if (response) {
            setStatus(response.statusText === "ok" ? "File Uploaded Successfully" : "Failed to Upload File");
        }
    };

    const handleFileChange = (evt) => {
        const img = {
            preview: URL.createObjectURL(evt.target.files[0]),
            data: evt.target.files[0]
        };
        setImage(img);
        setPPicname(evt.target.files[0].name);
    };

    const handleNewButton = () => {
        axios.get("http://localhost:9211/product/getmaxpid")
            .then((res) => {
                setPId(res.data.length + 1);
                setPName("");
                setPCagId("");
                setPPrice("");
                setOPrice("");
                setPPicname("");
                setImage("");
            }).catch((err) => alert(err));
    };

    return (
        <div className="product-page">
            <center>
                <p className="vender-id">Vender Id: {venderid}</p>

                <h2 className="section-title">Product Form</h2>

                <div className="form-container">
                    <table className="product-form-table">
                        <tbody>
                            <tr>
                                <td>Product Id</td>
                                <td>{pid}</td>
                            </tr>
                            <tr>
                                <td>Product Name</td>
                                <td><input type="text" onChange={handlePNameText} value={pname} /></td>
                            </tr>
                            <tr>
                                <td>Price</td>
                                <td><input type="number" onChange={handlePPriceText} value={pprice} /></td>
                            </tr>
                            <tr>
                                <td>Offer Price</td>
                                <td><input type="number" onChange={handleOPriceText} value={oprice} /></td>
                            </tr>
                            <tr>
                                <td>Select Photo</td>
                                <td>
                                    <input type="file" onChange={handleFileChange} name="file" />
                                    {image.preview && <img className="preview-image" src={image.preview} alt="Preview" />}
                                </td>
                            </tr>
                            <tr>
                                <td>Upload Photo</td>
                                <td><button onClick={handleSubmit} className="btn upload-btn">Upload</button></td>
                            </tr>
                            <tr>
                                <td>Category</td>
                                <td>
                                    <select onClick={handlePCatgSelect}>
                                        {pcatglist.map((item) => (
                                            <option key={item.pcatgid} value={item.pcatgid}>{item.pcatgname}</option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td><button onClick={handleNewButton} className="btn new-btn">New</button></td>
                                <td><button onClick={handleSaveButton} className="btn save-btn">Save</button></td>
                                <td><button onClick={handleShowButton} className="btn show-btn">Show</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h2 className="section-title">Product List</h2>

                <div className="list-container">
                    <table className="product-list-table">
                        <thead>
                            <tr>
                                <th>SNo</th>
                                <th>Product Id</th>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Offer Price</th>
                                <th>Category Name</th>
                                <th>Photo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {plist.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.pid}</td>
                                    <td>{item.pname}</td>
                                    <td>{item.pprice}</td>
                                    <td>{item.oprice}</td>
                                    <td>
                                        {pcatglist.map((citem) => {
                                            if (item.pcatgid == citem.pcatgid) {
                                                cname = citem.pcatgname;
                                            }
                                        })}
                                        {cname}
                                    </td>
                                    <td>
                                        <img className="product-image" src={`http://localhost:9211/product/getproductimage/${item.ppicname}`} alt="Product" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </center>
        </div>
    );
}

export default Product;
