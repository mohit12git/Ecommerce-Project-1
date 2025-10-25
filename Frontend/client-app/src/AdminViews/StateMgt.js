import React,{useState,useEffect} from "react";
import axios from "axios";
import "../CSS/statemgt.css";

function StateMgt()
{
    const [stid,setStId]=useState('');
    const [stname,setStName]=useState('');
    const [status,setStatus]=useState('');
    const [statelist,setStateList]=useState([]);

    const handleStIdText=(evt)=>{
        setStId(evt.target.value);
    }       
    const handleStNameText=(evt)=>{
        setStName(evt.target.value);
    }
    const handleStatusText=(evt)=>{
        setStatus(evt.target.value);
    }
    const handleNewButton=()=>{
        axios.get("http://localhost:9211/state/getall").then((res)=>{
            setStateList(res.data);
            setStId(res.data.length+1);
            
    // setStName('');
    // setStatus('');
        })
    }

    const handleSaveButton=()=>{
        var obj={
            stid:stid,
            stname:stname,
            status:status
        };
        axios.post("http://localhost:9211/state/save",obj).then((res)=>{
            alert(res.data);
        }).catch((err)=>{
            alert(err);
        })
    }
    
    const handleSearchButton=()=>{
        axios("http://localhost:9211/state/search/"+stid).then((res)=>{
            // console.log("Search Response:", res.data);
            if(res.data)
            {
                setStId(res.data.stid);
                setStName(res.data.stname);
                setStatus(res.data.status);
            }else{
                alert("Data Not Found")
            }
        }).catch((err)=>{
            alert(err);
        });
    }
    const handleEditButton=()=>{
        var obj={
            stid:stid,
            stname:stname,
            status:status
        }
        axios.put("http://localhost:9211/state/update",obj).then((res)=>{
            alert(res.data);
        }).catch((err)=>{
            alert(err);
        })
    }
    const handleDeleteButton=()=>{
        axios.delete("http://localhost:9211/state/delete/"+stid).then((res)=>{
            alert(res.data);
        })
    };

    const handleShowAll=()=>{
        axios.get("http://localhost:9211/state/show").then((res)=>{
            setStateList(res.data);
        }).catch((err)=>{
            alert(err);
        })
    }
    return(
        <div className="state-container">
    <center>
        <h4 className="state-form-title">Manage State</h4>
        <div className="state-form-container">

            <table className="state-form-table">
                <tr>
                    <td>State Id</td>
                    <td><input type="number" onChange={handleStIdText} value={stid} /></td>
                </tr>
                <tr>
                    <td>State Name</td>
                    <td><input type="text" onChange={handleStNameText} value={stname} /></td>
                </tr>
                <tr>
                    <td>Status</td>
                    <td>
                        <select onChange={handleStatusText} value={status}>
                            <option value={1}>Active</option>
                            <option value={0}>Inactive</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td><button type="submit" onClick={handleNewButton} className="state-custom-button">Add New</button></td>
                    <td><button type="submit" onClick={handleSaveButton} className="state-custom-button">Save</button></td>
                </tr>
                <tr>
                    <td><button type="submit" onClick={handleSearchButton} className="state-custom-button">Search</button></td>
                    <td><button type="submit" onClick={handleEditButton} className="state-custom-button">Edit</button></td>
                </tr>
                <tr>
                    <td><button type="submit" onClick={handleDeleteButton} className="state-custom-button">Delete</button></td>
                    <td><button type="submit" onClick={handleShowAll} className="state-custom-button">Show All</button></td>
                </tr>
            </table>

            <table className="state-table-display">
                <tr>
                    <th>State Id</th>
                    <th>State Name</th>
                    <th>Status</th>
                </tr>
                {statelist.map((item) => (
                    <tr key={item.stid}>
                        <td>{item.stid}</td>
                        <td>{item.stname}</td>
                        <td>{item.status}</td>
                    </tr>
                ))}
            </table>
        </div>
    </center>
</div>
    );
}export default StateMgt;