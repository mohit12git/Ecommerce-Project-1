import React,{useState,useEffect} from "react";
import axios from "axios";
import VenderHome from "./VenderHome";
import ReactDOM from "react-dom/client";
import Cookies from 'js-cookie';
import VenderReg from "./VenderReg";
import "../CSS/venderlogin.css";
//import { set } from "mongoose";

function VenderLogin()
{
    const[uid,setUId]=useState();
    const[upass,setUPass]=useState();
    const[ischecked,setIsChecked]=useState(false);

    const handleUIdText=(evt)=>{
        setUId(evt.target.value);
    }

    const handleUPassText=(evt)=>{
        setUPass(evt.target.value);
    }

    useEffect(()=>{
        var myccokies=Cookies.get('vauth');
        if(myccokies!=undefined)
        {
            var obj=JSON.parse(myccokies);
            //alert(obj.username);
            setUId(obj.username);
            setUPass(obj.password);
        }
    })

    const handleLoginButton=()=>{
        var obj={
            vuid:uid,
            vupass:upass
        };

        axios.post("http://localhost:9211/vender/login",obj).then((res)=>{
            
            if(res.data.VUserId!=undefined)
            {
                if(res.data.Status=="Inactive")
                {
                    alert("User Not Active Please Wait For Admine Activation Process");
                    return
                }
                //cookies handling code
                if(ischecked==true)
                {
                    const userData={
                        username:uid,
                        password:upass
                    };

                    const expirationTime=new Date(new Date().getTime()+6000000);
                    //store data in cookies
                    Cookies.set('vauth',JSON.stringify(userData),{expires:expirationTime});
                }

                //Session handling code
                const userSessionData={
                    vuserfullname:res.data.VenderName
                };

                const sessionexpirationTime=new Date(new Date().getTime()+60000);
                //store data in session
                sessionStorage.setItem('vsessionauth',JSON.stringify(userSessionData),sessionexpirationTime);


                const root=ReactDOM.createRoot(document.getElementById("root"));
                var obj={vfname:res.data.VenderName,
                    vpicname:res.data.VPicName,
                    vid:res.data.VUserId
                }
                alert("Vender Id" +obj.vid)
                root.render(<VenderHome data={obj}></VenderHome>)
            }else{
                alert("Invaild Id/Password");
            }
        });
    }

    const HandleIsRemember=()=>{
       setIsChecked(true);
    }

    const handleRegister=()=>{
        const root=ReactDOM.createRoot(document.getElementById("root"));
        root.render(<VenderReg/>)
    }

    return(
        <div className="vender-login-container">
            <center>
                <h4 style={{backgroundColor:"yellow"}}>Vender Login Form</h4>
                {/* <div className="jumbotron" style={{marginLeft:20,marginRight:20,borderRadius:5}}> */}
                    <table className="vender-login-table">
                        <tr>
                            <td>User Id</td>
                            <td>
                                <input type="text" className="form-control" onChange={handleUIdText} value={uid}
                                style={{marginTop:5}}/>
                            </td>
                        </tr>
                        <tr>
                            <td>Password</td>
                            <td>
                                <input type="password" onChange={handleUPassText} className="form-control" value={upass}
                                style={{marginTop:5}}/>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                <input type="checkbox" onClick={HandleIsRemember}/><span>Remember Me</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button type="submit" className=" btn-success" onClick={handleLoginButton}
                                style={{marginTop:5,marginLeft:30}}>Login</button>
                            </td>
                            <td>
                                <button type="submit" className=" btn-success" onClick={handleRegister}
                                style={{marginTop:5,marginLeft:30}}>Register</button>
                            </td>
                        </tr>
                    </table>
                {/* </div> */}
            </center>
        </div>
    );
}export default VenderLogin;