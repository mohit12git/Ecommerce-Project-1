import React from "react";
import { Link, Outlet, Route, Routes } from "react-router-dom";
import adminpic from "../adminpic.jpg";
import "../CSS/adminmain.css"; 
import AdminLogin from "./AdminLogin";

function AdminMain() {
    return (
        <div>
            <center>
                <img src={adminpic} className="admin-main-image" height={120} width={800} />
                <nav className="admin-nav">
                    <ul>
                        <li>
                            <Link className="admin-link" to="/adminmain/adminlogin">Login</Link>
                        </li>
                        <li>
                            <Link className="admin-link" to="/adminmain/adminreg">Registration</Link>
                        </li>
                    </ul>
                    
                </nav>

                {/* <Routes>
                    <Route path="adminlogin" element={<AdminLogin />} />
                </Routes> */}
                <Outlet />
            </center>
        </div>
    );
}

export default AdminMain;
