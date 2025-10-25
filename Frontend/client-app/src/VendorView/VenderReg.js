import React, { useEffect, useState } from "react";
import axios from "axios";
import VenderLogin from "./VenderLogin";
import ReactDOM from "react-dom/client";
import "../CSS/venderreg.css";

function VenderReg() {
    const [vuserid, setVUserId] = useState();
    const [vuserpass, setVUserPass] = useState();
    const [vendername, setvenderName] = useState();
    const [vaddress, setVAddress] = useState();
    const [vcontact, setVContact] = useState();
    const [vemail, setVEmail] = useState();
    const [vpicname, setVPicName] = useState();
    const [vid, setVId] = useState();
    const [image, setImage] = useState({ preview: '', data: '' });
    const [status, setStatus] = useState('');

    const handleVUserIdText = (evt) => setVUserId(evt.target.value);
    const handleVUserPassText = (evt) => setVUserPass(evt.target.value);
    const handleVenderNameText = (evt) => setvenderName(evt.target.value);
    const handleVAddressText = (evt) => setVAddress(evt.target.value);
    const handleVContactText = (evt) => setVContact(evt.target.value);
    const handleVEmailText = (evt) => setVEmail(evt.target.value);
    const handleVIdText = (evt) => setVId(evt.target.value);

    useEffect(() => {
        axios.get("http://localhost:9211/vender/getvendercount/")
            .then((res) => setVId(res.data.length + 1))
            .catch((err) => alert(err));
    }, []);

    const handleRegisterButton = () => {
        const obj = {
            VUserId: vuserid,
            VUserPass: vuserpass,
            VenderName: vendername,
            VAddress: vaddress,
            VContact: vcontact,
            VEmail: vemail,
            VPicName: vpicname,
            VId: vid,
            Status: "Inactive"
        };
        axios.post("http://localhost:9211/vender/register/", obj)
            .then((res) => alert(res.data))
            .catch((err) => alert(err));
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        let fromData = new FormData();
        fromData.append('file', image.data);
        const response = await fetch('http://localhost:9211/vender/savevenderimage', {
            method: 'POST',
            body: fromData,
        });
        if (response) {
            if (response.statusText.toLowerCase() === "ok") {
                setStatus("File Uploaded Successfully");
            } else {
                setStatus("Failed to Upload File");
            }
        }
    };

    const handleFileChange = (evt) => {
        const img = {
            preview: URL.createObjectURL(evt.target.files[0]),
            data: evt.target.files[0]
        };
        setImage(img);
        setVPicName(evt.target.files[0].name);
    };

    const handleLogin = () => {
        const root = ReactDOM.createRoot(document.getElementById("root"));
        root.render(<VenderLogin />);
    };

    return (
        <div className="vender-container">
            <center>
                <p className="form-title">Vender Registration Form</p>
                <table className="vender-table">
                    <tr>
                        <td>Vender Id</td>
                        <td>{vid}</td>
                    </tr>
                    <tr>
                        <td>User Id</td>
                        <td><input type="text" onChange={handleVUserIdText} className="form-control" /></td>
                    </tr>
                    <tr>
                        <td>Password</td>
                        <td><input type="password" onChange={handleVUserPassText} className="form-control" /></td>
                    </tr>
                    <tr>
                        <td>Vender Name</td>
                        <td><input type="text" onChange={handleVenderNameText} className="form-control" /></td>
                    </tr>
                    <tr>
                        <td>Address</td>
                        <td><input type="text" onChange={handleVAddressText} className="form-control" /></td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td><input type="email" onChange={handleVEmailText} className="form-control" /></td>
                    </tr>
                    <tr>
                        <td>Select Photo</td>
                        <td>
                            <input type="file" onChange={handleFileChange} name="file" className="form-control" />
                            <img src={image.preview} width='100' height='100' className="preview-image" />
                        </td>
                    </tr>
                    <tr>
                        <td>Click To Upload Vender Photo</td>
                        <td>
                            <button type="submit" onClick={handleSubmit} className="btn btn-danger">Upload</button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button type="submit" onClick={handleRegisterButton} className="btn btn-primary">Register</button>
                        </td>
                        <td>
                            <button type="submit" onClick={handleLogin} className="btn btn-success">Login</button>
                        </td>
                    </tr>
                </table>
            </center>
        </div>
    );
}

export default VenderReg;
