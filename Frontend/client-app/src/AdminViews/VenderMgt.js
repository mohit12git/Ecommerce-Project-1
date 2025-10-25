import React,{useState,useEffect} from "react";
import axios from "axios"
import "../CSS/vendermgt.css";

function VenderMgt()
{
    const[venderlist,setVenderList]=useState([]);

    useEffect(()=>{
        axios.get("http://localhost:9211/vender/getvendercount").then((res)=>{
            setVenderList(res.data);
        }).catch((err)=>{
            alert(err);
        })
    },[]);

    const handleActiveButton=(vid)=>{
        var newstatus="Active";
        axios.put("http://localhost:9211/vender/vendermanage/"+vid+"/"+newstatus).then((res)=>{
            alert(res.data);
        }).catch((err)=>{
            alert(err);
        })
    }

    const handleInactiveButton=(vid)=>{
        var newstatus="Inactive";
        axios.put("http://localhost:9211/vender/vendermanage/"+vid+"/"+newstatus).then((res)=>{
            alert(res.data);
        }).catch((err)=>{
            alert(err);
        })
    }

    return(
      <div className="vender-mgt-container">
            <center>
                <h4 className="vender-mgt-title">Vender List</h4>
                <table className="vender-mgt-table">
                    <tr>
                        <th>VId</th>
                        <th>Vender Name</th>
                        <th>Status</th>
                        <th></th>
                        <th></th>
                    </tr>
                    {
                        venderlist.map((item, index) => (
                            <tr key={index}>
                                <td>{item.VId}</td>
                                <td>{item.VenderName}</td>
                                <td>{item.Status}</td>
                                <td>
                                    <button type="submit" className="vender-mgt-button" onClick={() => handleActiveButton(item.VId)}>
                                        Active
                                    </button>
                                </td>
                                <td>
                                    <button type="submit" className="vender-mgt-button inactive" onClick={() => handleInactiveButton(item.VId)}>
                                        Inactive
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </table>
            </center>
        </div>
    );
}export default VenderMgt;