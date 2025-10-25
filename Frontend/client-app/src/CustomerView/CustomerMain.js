import React from "react";
import custpic from "../custpic.jpg";
import { Link,Outlet } from "react-router-dom";
import "../CSS/customermain.css";
function CustomerMain()
{
    return(
        <div>
            <center>
                <img src={custpic} className="customer-main-image" height={120} width={800}/>
                <nav className="customer-nav">
                    <ul>
                        <li>
                            <Link className="customer-link" to="/customermain/customerlogin">Login</Link>
                        </li>
                        <li>
                            <Link className="customer-link" to="/customermain/customerreg">Registration</Link>
                        </li>
                    </ul>
                    <Outlet/>
                </nav>
            </center>
        </div>
    );
}export default CustomerMain;