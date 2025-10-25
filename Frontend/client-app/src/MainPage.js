// // import React from "react";
// // import { BrowserRouter, Link, Routes, Route } from "react-router-dom";

// // import CustomerMain from "./CustomerView/CustomerMain";
// // import VenderMain from "./VendorView/VenderMain";
// // import AdminMain from "./AdminViews/AdminMain";

// // import Adminlogin from "./AdminViews/AdminLogin";
// // import AdminHome from "./AdminViews/AdminHome";
// // // import AdminReg from "./AdminViews/AdminReg";

// // import CustomerLogin from "./CustomerView/CustomerLogin";
// // import CustomerReg from "./CustomerView/CustomerReg";

// // import VenderLogin from "./VendorView/VenderLogin";
// // import VenderReg from "./VendorView/VenderReg";


// // import "./CSS/mainpage.css";
// // import mainpic from "./mainpic.jpg";

// // function MainPage() {
// //     return (
// //         <div className="App">
// //             <center>
// //                 <img src={mainpic} className="main-image" height={300} width={1000} alt="Main Pic" />
// //                 <BrowserRouter>
// //                     <nav className="main-nav">
// //                         <Link className="nav-link" to="/adminmain">Admin</Link><span> | </span>
// //                         <Link className="nav-link" to="/customermain">Customer</Link><span> | </span>
// //                         <Link className="nav-link" to="/vendermain">Vendor</Link>
// //                     </nav>

// //                     <Routes>
// //                         {/* Admin Nested Routes */}
// //                         <Route path="/adminmain" element={<AdminMain />}>
// //                             <Route path="adminlogin" element={<Adminlogin />} />
// //                             <Route path="adminhome" element={<AdminHome />} />
// //                             {/* <Route path="adminreg" element={<AdminReg />} /> */}
// //                         </Route>

// //                         {/* Customer Nested Routes */}
// //                         <Route path="/customermain" element={<CustomerMain />}>
// //                             <Route path="customerlogin" element={<CustomerLogin />} />
// //                             <Route path="customerreg" element={<CustomerReg />} />
// //                         </Route>

// //                         {/* Vendor Nested Routes */}
// //                         <Route path="/vendermain" element={<VenderMain />}>
// //                             <Route path="venderlogin" element={<VenderLogin />} />
// //                             <Route path="venderreg" element={<VenderReg />} />
// //                         </Route>
// //                     </Routes>
// //                 </BrowserRouter>
// //             </center>
// //         </div>
// //     );
// // }

// // export default MainPage;

// import React from "react";
// import { BrowserRouter, Link, Routes, Route } from "react-router-dom";

// import CustomerMain from "./CustomerView/CustomerMain";
// import VenderMain from "./VendorView/VenderMain";
// import AdminMain from "./AdminViews/AdminMain";

// import Adminlogin from "./AdminViews/AdminLogin";
// import AdminHome from "./AdminViews/AdminHome";
// // import AdminReg from "./AdminViews/AdminReg";

// import CustomerLogin from "./CustomerView/CustomerLogin";
// import CustomerReg from "./CustomerView/CustomerReg";

// import VenderLogin from "./VendorView/VenderLogin";
// import VenderReg from "./VendorView/VenderReg";

// // import "./CSS/mainpage.css";
// // import mainpic from "./mainpic.jpg";

// function MainPage() {
//   return (
//     <div className="App">
//       <BrowserRouter>
//         {/* 🔹 Modern Navbar with logo, search bar, and links */}
//         <nav className="main-nav">
//           <div className="nav-left">
//             {/* <img src={mainpic} alt="Logo" className="nav-logo" /> */}
//             <h2 className="nav-title">Electron HuB</h2>
//           </div>

//           {/* <div className="nav-center">
//           <input
//               type="text"
//               className="nav-search"
//               placeholder="Search products, vendors, or customers..."
//             />
//             <button className="search-btn">🔍</button>
//           </div> */}

//           <div className="nav-right">
//             <Link className="nav-link" to="/adminmain">
//               Admin
//             </Link>
//             <Link className="nav-link" to="/customermain">
//               Customer
//             </Link>
//             <Link className="nav-link" to="/vendermain">
//               Vendor
//             </Link>
//           </div>
//         </nav>

//         {/* 🔹 Main image below navbar */}
//         {/* <center>
//           <img
//             src={mainpic}
//             className="main-image"
//             height={300}
//             width={1000}
//             alt="Main Pic"
//           />
//         </center> */}

//         {/* 🔹 Routes */}
//         <Routes>
//           {/* Admin Nested Routes */}
//           <Route path="/adminmain" element={<AdminMain />}>
//             <Route path="adminlogin" element={<Adminlogin />} />
//             <Route path="adminhome" element={<AdminHome />} />
//             {/* <Route path="adminreg" element={<AdminReg />} /> */}
//           </Route>

//           {/* Customer Nested Routes */}
//           <Route path="/customermain" element={<CustomerMain />}>
//             <Route path="customerlogin" element={<CustomerLogin />} />
//             <Route path="customerreg" element={<CustomerReg />} />
//           </Route>

//           {/* Vendor Nested Routes */}
//           <Route path="/vendermain" element={<VenderMain />}>
//             <Route path="venderlogin" element={<VenderLogin />} />
//             <Route path="venderreg" element={<VenderReg />} />
//           </Route>
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default MainPage;


import React from "react";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";

import CustomerMain from "./CustomerView/CustomerMain";
import VenderMain from "./VendorView/VenderMain";
import AdminMain from "./AdminViews/AdminMain";

import Adminlogin from "./AdminViews/AdminLogin";
import AdminHome from "./AdminViews/AdminHome";
// import AdminReg from "./AdminViews/AdminReg";

import CustomerLogin from "./CustomerView/CustomerLogin";
import CustomerReg from "./CustomerView/CustomerReg";

import VenderLogin from "./VendorView/VenderLogin";
import VenderReg from "./VendorView/VenderReg";

import "./CSS/mainpage.css"; // ✅ Make sure this path exists

function MainPage() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* 🔹 Navbar */}
        <nav className="main-nav">
          <div className="nav-left">
            {/* <img src={mainpic} alt="Logo" className="nav-logo" /> */}
            <h2 className="nav-title">Electron Hub</h2>
          </div>

          <div className="nav-right">
            <Link className="nav-link" to="/adminmain/adminlogin">
              Admin
            </Link>
            <Link className="nav-link" to="/customermain/customerlogin">
              Customer
            </Link>
            <Link className="nav-link" to="/vendermain/venderlogin">
              Vendor
            </Link>
          </div>
        </nav>

        {/* 🔹 Routes Section */}
        <div className="content">
          <Routes>
            {/* Admin Nested Routes */}
            <Route path="/adminmain/*" element={<AdminMain />}>
              <Route path="adminlogin" element={<Adminlogin />} />
              <Route path="adminhome" element={<AdminHome />} />
            </Route>

            {/* Customer Nested Routes */}
            <Route path="/customermain/*" element={<CustomerMain />}>
              <Route path="customerlogin" element={<CustomerLogin />} />
              <Route path="customerreg" element={<CustomerReg />} />
            </Route>

            {/* Vendor Nested Routes */}
            <Route path="/vendermain/*" element={<VenderMain />}>
              <Route path="venderlogin" element={<VenderLogin />} />
              <Route path="venderreg" element={<VenderReg />} />
            </Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default MainPage;

