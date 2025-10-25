import React,{useState,useEffect} from "react";
import axios from "axios";
import "../CSS/citymgt.css";

function CityMgt()
{
    const[ctid,setCtId]=useState();
    const[ctname,setCtName]=useState();
    const[stid,setStId]=useState();
    const[status,setStatus]=useState();
    const[ctlist,setCtList]=useState([]);
    const[stlist,setStList]=useState([]);
    var statename="";

    const handleCtIdText=(evt)=>{
        setCtId(evt.target.value);
    }

    const handleCtNameText=(evt)=>{
        setCtName(evt.target.value);
    }

    const handleStIdSelect=(evt)=>{
        //alert(evt.target.value)
        setStId(evt.target.value);
    }

    const handleStatusText=(evt)=>{
        setStatus(evt.target.value);
    }

    /* handle page load event or this function will execute automatically at the loading time of component*/
    useEffect(()=>{
        axios.get("http://localhost:9211/state/show").then((res)=>{
            setStList(res.data);
        }).catch((err)=>{
            alert(err);
        });
    })
    const handleNewButton=()=>{
        axios.get("http://localhost:9211/city/getall").then((res)=>{
            setCtId(res.data.length+1);
            setStatus(1);
        }).catch((err)=>{
            alert(err);
        });
    }

    const handleSaveButton=()=>{

        if(ctid==""||ctid==undefined||ctname==""||ctname==undefined||stid==""||stid==undefined||
            status==""||status==undefined||stid=="0")
            {
                alert("Please Fill All Fields");
                return;
            }
            else{
                axios.get("http://localhost:9211/city/searchbyname/"+ctname).then((res)=>{
                    if(res.data.ctname!=undefined)
                    {
                        alert("City name alredy Exist");
                    }
                    else{

                        var obj={
                            ctid:ctid,
                            ctname:ctname,
                            stid:stid,
                            status:status
                        }
                        axios.post("http://localhost:9211/city/save/",obj).then((res)=>{
                            alert(res.data);
                            setCtId("");
                            setCtName("");
                            setCtId("");
                            setStatus("");
                        }).catch((err)=>{
                            alert(err);
                        });
                    }
                }).catch((err)=>{
                    alert(err);
                });
            }
    }


    const handleShowButton=()=>{
        axios.get("http://localhost:9211/city/getall").then((res)=>{
            setCtList(res.data);
        }).catch((err)=>{
            alert(err);
        });
    }

    const handleSearchButton=()=>{

        if(ctid!=undefined&&ctid!="")
        {
            axios.get("http://localhost:9211/city/search/"+ctid).then((res)=>{

                if(res.data.stid!=undefined)
                {
                    setCtId(res.data.ctid);
                    setCtName(res.data.ctname);
                    setStId(res.data.stid);
                    setStatus(res.data.status);
                }else{
                    alert("Data Not Found");
                }
            }).catch((err)=>{
                alert(err);
            });
        }

        if(ctname!=undefined&&ctname!="")
        {
            axios.get("http://localhost:9211/city/searchbyname/"+ctname).then((res)=>{

                if(res.data.stid!=undefined)
                {
                    setCtId(res.data.ctid);
                    setCtName(res.data.ctname);
                    setStId(res.data.stid);
                    setStatus(res.data.status);
                }else{
                    alert("Data Not Found");
                }
            }).catch((err)=>{
                alert(err);
            });
        }
    }
    
     const handleUpdateButton=()=>{
         if(ctid==""||ctid==undefined||ctname==""||ctname==undefined||
            status==""||status==undefined||stid==""||stid==undefined)
            {
                alert("Please Fill all fields");
                return;
            }
            else{

                var obj={
                     ctid:ctid,
                     ctname:ctname,
                     stid:stid,
                     status:status
                }
                axios.put("http://localhost:9211/city/update/",obj).then((res)=>{
                    alert(res.data);
                     setCtId("");
                    setCtName("");
                     setCtId("");
                    setStatus("");
                }).catch((err)=>{
                    alert(err);
                });
            }
     }

     const handleDeleteButton=()=>{
        if(ctid!=undefined&&ctid!="")
        {
            axios.delete("http://localhost:9211/city/delete/"+ctid).then((res)=>{
                alert(res.data);
            }).catch((err)=>{
                alert(err);
            });
        }else{
            alert("Fill State Id to Delete")
        }
     }

     return(
       <div className="citymgt-wrapper">
            <center>
                <h6 className="citymgt-heading">City Management</h6>

                <div className="citymgt-form-section">
                    <table className="citymgt-table">
                        <tr>
                            <td>City Id</td>
                            <td><input type="number" onChange={handleCtIdText} value={ctid} className="citymgt-form-control"/></td>
                        </tr>
                        <tr>
                            <td>City Name</td>
                            <td><input type="text" onChange={handleCtNameText} className="citymgt-form-control" value={ctname}/></td>
                        </tr>
                        <tr>
                            <td>State Name</td>
                            <td>
                                <select onClick={handleStIdSelect} id="stdropdown" name="stateddl" className="citymgt-form-control">
                                    <option value="0">Select State</option>
                                    {stlist.map((item) => (
                                        <option value={item.stid} key={item.stid}>{item.stname}</option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Status</td>
                            <td>
                                <select onClick={handleStatusText} className="citymgt-form-control">
                                    <option value={1}>Active</option>
                                    <option value={0}>Inactive</option>
                                </select>
                            </td>
                        </tr>
                    </table>

                    <table className="citymgt-button-table">
                        <tr>
                            <td><button type="submit" onClick={handleNewButton} 
                            className="citymgt-btn citymgt-btn-primary">New</button></td>
                            
                            <td><button type="submit" onClick={handleSaveButton} 
                            className="citymgt-btn citymgt-btn-success">Save</button></td>
                            
                            <td><button type="submit" onClick={handleShowButton} 
                            className="citymgt-btn citymgt-btn-secondary">Show</button></td>
                            
                            <td><button type="submit" onClick={handleSearchButton} 
                            className="citymgt-btn citymgt-btn-success">Search</button></td>
                            
                            <td><button type="submit" onClick={handleUpdateButton} 
                            className="citymgt-btn citymgt-btn-primary">Update</button></td>
                            
                            <td><button type="submit" onClick={handleDeleteButton} 
                            className="citymgt-btn citymgt-btn-secondary">Delete</button></td>
                        </tr>
                    </table>
                </div>

                <div className="citymgt-list-section">
                    <table className="citymgt-table">
                        <tr>
                            <th>City Id</th>
                            <th>City Name</th>
                            <th>State Name</th>
                            <th>Status</th>
                        </tr>
                        {ctlist.map((item) => (
                            <tr key={item.ctid}>
                                <td>{item.ctid}</td>
                                <td>{item.ctname}</td>
                                <td>{
                                    stlist.map((stitem) => {
                                        if (item.stid === stitem.stid) {
                                            statename = stitem.stname;
                                        }
                                    })}{statename}
                                </td>
                                <td className={item.status === 1 ? "citymgt-status-enabled" : "citymgt-status-disabled"}>
                                    {item.status === 1 ? "Enabled" : "Disabled"}
                                </td>
                            </tr>
                        ))}
                    </table>
                </div>
            </center>
        </div>
     );
}export default CityMgt;