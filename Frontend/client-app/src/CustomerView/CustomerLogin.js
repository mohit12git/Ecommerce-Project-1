// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import CustomerHome from "./CustomerHome";
// import CustomerReg from "./CustomerReg";
// import ReactDOM from "react-dom/client";
// import Cookies from "js-cookie";
// import "../CSS/customerlogin.css";

// function CustomerLogin() {
//     const [uid, setUId] = useState();
//     const [upass, setUPass] = useState();
//     const [ischecked, setIsChecked] = useState(false);

//     const handleUIdText = (evt) => {
//         setUId(evt.target.value);
//     };

//     const handleUPassText = (evt) => {
//         setUPass(evt.target.value);
//     };

//     useEffect(() => {
//         const mycookies = Cookies.get("auth");
//         if (mycookies != undefined) {
//             const obj = JSON.parse(mycookies);
//             setUId(obj.username);
//             setUPass(obj.password);
//         }
//     }, []);

//     const handleLoginButton = () => {
//         const obj = {
//             CUserId: uid,
//             CUserPass: upass,
//         };

//         axios
//             .post("http://localhost:9211/customer/login", obj)
//             .then((res) => {
//                 if (res.data.CUserId != undefined) {
//                     if (res.data.Status === "Inactive") {
//                         alert("User Not Active. Please wait for Admin Activation Process.");
//                         return;
//                     }

//                     if (ischecked) {
//                         const userData = { username: uid, password: upass };
//                         const expirationTime = new Date(new Date().getTime() + 6000000);
//                         Cookies.set("auth", JSON.stringify(userData), { expires: expirationTime });
//                     }

//                     const userSessionData = { userfullname: res.data.CustomerName };
//                     sessionStorage.setItem("sessionauth", JSON.stringify(userSessionData));

//                     const root = ReactDOM.createRoot(document.getElementById("root"));
//                     const obj = {
//                         cfname: res.data.CustomerName,
//                         cpicname: res.data.CPicName,
//                         cid: res.data.CId,
//                     };
//                     root.render(<CustomerHome data={obj}></CustomerHome>);
//                 } else {
//                     alert("Invalid Id/Password");
//                 }
//             });
//     };

//     const handleIsRemember = () => {
//         setIsChecked(true);
//     };

//     const handleRegisterButton = () => {
//         const root = ReactDOM.createRoot(document.getElementById("root"));
//         root.render(<CustomerReg />);
//     };

//     return (
//         <div className="customer-login-container">
//             <center>
//                 <h4 style={{ backgroundColor: "yellow" }}>Customer Login Form</h4>
//                 <table className="customer-login-table">
//                     <tr>
//                         <td>User Id</td>
//                         <td>
//                             <input type="text" className="form-control" onChange={handleUIdText} value={uid} />
//                         </td>
//                     </tr>
//                     <tr>
//                         <td>Password</td>
//                         <td>
//                             <input type="password" className="form-control" onChange={handleUPassText} value={upass} />
//                         </td>
//                     </tr>
//                     <tr>
//                         <td></td>
//                         <td>
//                             <button type="submit" className="btn-success" onClick={handleLoginButton}>
//                                 Login
//                             </button>
//                             &nbsp;&nbsp;
//                             <button type="button" className="btn btn-success" onClick={handleRegisterButton}>
//                                 Register
//                             </button>
//                         </td>
//                     </tr>
//                     <tr>
//                         <td></td>
//                         <td>
//                             <input type="checkbox" onClick={handleIsRemember} /> <span>Remember Me</span>
//                         </td>
//                     </tr>
//                 </table>
//             </center>
//         </div>
//     );
// }

// export default CustomerLogin;

import React, { useState } from "react";

function CustomerLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // fake login for demo — replace with actual API call
    if (email === "user@test.com" && password === "123") {
      localStorage.setItem("user", JSON.stringify({ email }));
      alert("Login successful!");
      window.close(); // close login tab
      window.opener.location.reload(); // refresh main window
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h2>Customer Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br /><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default CustomerLogin;
