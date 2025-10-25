import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import AdminHome from "./AdminHome";
import "../CSS/adminlogin.css";

function Adminlogin() {
    const [uid, setUId] = useState("");
    const [upass, setUPass] = useState("");

    const handleUIdText = (evt) => {
        setUId(evt.target.value);
    };

    const handleUPassText = (evt) => {
        setUPass(evt.target.value);
    };

    const handleLoginButton = () => {
        if (uid === "admin" && upass === "abc@123") {
            const root = ReactDOM.createRoot(document.getElementById("root"));
            root.render(<AdminHome />);
        } else {
            alert("Invalid Id/Password");
        }
    };

    return (
        <div className="admin-login-container">
            <h4>Administrator Login</h4>
            <table className="admin-login-table">
                <tbody>
                    <tr>
                        <td>User Id</td>
                        <td>
                            <input
                                type="text"
                                className="form-control"
                                onChange={handleUIdText}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Password</td>
                        <td>
                            <input
                                type="password"
                                className="form-control"
                                onChange={handleUPassText}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <button
                                type="submit"
                                className="btn-success"
                                onClick={handleLoginButton}
                            >
                                Login
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Adminlogin;
