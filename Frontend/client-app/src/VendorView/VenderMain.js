import React from "react";
import { Link, Outlet } from "react-router-dom";
import venderpic from "../multi-vender.png";
import "../CSS/vendermain.css";

function VenderMain() {
    return (
        <div>
            <center>
                <img src={venderpic} className="vender-main-image" height={120} width={800} alt="Vendor Pic" />
                <nav className="vender-nav">
                    <ul>
                        <li>
                            <Link className="vender-link" to="/vendermain/venderlogin">Login</Link>
                        </li>
                        <li>
                            <Link className="vender-link" to="/vendermain/venderreg">Registration</Link>
                        </li>
                    </ul>
                    <Outlet />
                </nav>
            </center>
        </div>
    );
}

export default VenderMain;
