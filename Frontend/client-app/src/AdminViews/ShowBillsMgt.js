import React, { useState, useEffect } from "react";
import axios from "axios";
import "../CSS/showbillmgt.css";

function ShowBillsMgt() {
    const [custlist, setCustList] = useState([]);
    const [billdetaillist, setBillDetailsList] = useState([]);
    const [plist, setPList] = useState([]);
    var pname = "";
    var oprice = "";
    var total = "";
    var picname = "";
    const [prevbillid, setprevbillid] = useState(0);
    var prbid = 0;
    var k = true;
    var count = 0;

    useEffect(() => {
        axios.get("http://localhost:9211/customer/getcustomerlist")
            .then((res) => {
                setCustList(res.data);
            }).catch((err) => {
                alert(err);
            });

        axios.get("http://localhost:9211/product/showproduct")
            .then((res) => {
                setPList(res.data);
            }).catch((err) => {
                alert(err);
            });

        axios.get("http://localhost:9211/paymentdetails/showpaymentdetails")
            .then((res) => {
                // not used yet
            }).catch((err) => {
                alert(err);
            });
    }, []);

    const handleCustomerSelect = (evt) => {
        axios.get("http://localhost:9211/bill/billshow/" + evt.target.value)
            .then((res) => {
                setBillDetailsList(res.data);

                // ✅ Fix: Only access res.data[0].billid if res.data exists and is not empty
                if (res.data.length > 0) {
                    setprevbillid(res.data[0].billid);
                    prbid = res.data[0].billid;
                } else {
                    setprevbillid(0);
                    prbid = 0;
                }
            }).catch((err) => {
                alert(err);
            });
    };

    return (
           <div className="show-bills-container">
            <center>
                <p className="show-bills-title">Bill List Admin View</p>

                <table className="show-bills-table">
                    <tr>
                        <td>Customer</td>
                        <td>
                            <select className="show-bills-select" onChange={handleCustomerSelect}>
                                {custlist.map((item) => (
                                    <option key={item.CId} value={item.CId}>
                                        {item.CustomerName + " " + item.CId}
                                    </option>
                                ))}
                            </select>
                        </td>
                    </tr>
                </table>

                <table className="show-bills-table">
                    <tr>
                        <th>Bill Id</th>
                        <th>Customer Id</th>
                        <th>Bill Date</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Product Image</th>
                    </tr>
                    {billdetaillist.map((bitem, index) => (
                        <tr key={bitem.billid || index} style={{ backgroundColor: "beige" }}>
                            <td>{bitem.billid}</td>
                            <td>{bitem.cid}</td>
                            <td>{bitem.billdate}</td>

                            {plist.filter((pitem) => {
                                if (bitem.pid === pitem.pid) {
                                    if (bitem.billid !== prbid) {
                                        prbid = bitem.billid;
                                        total = 0;
                                        k = true;
                                    }
                                    if (bitem.billid === prbid) {
                                        k = false;
                                    }
                                    pname = pitem.pname;
                                    oprice = pitem.oprice;
                                    total = total + parseInt(pitem.oprice);
                                    picname = pitem.ppicname;
                                }
                            })}

                            <td>{pname}</td>
                            <td>{oprice}</td>
                            <td>
                                <img
                                    src={"http://localhost:9211/product/getproductimage/" + picname}
                                    className="show-bills-image"
                                    height="100"
                                    width="100"
                                    alt="Product"
                                />
                                <p className="show-bills-total">{k === true ? '' : total}</p>
                            </td>
                        </tr>
                    ))}
                </table>
            </center>
        </div>
    );
}

export default ShowBillsMgt;
