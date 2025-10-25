import React, { useState, useEffect } from "react";
import axios from "axios";
import "../CSS/billbyid.css";

function BillById(props) {
  const [billidlist, setBillIdList] = useState([]);
  const [billdetailslist, setBillDetailsList] = useState([]);
  const [plist, setPlist] = useState([]);
  var pname = "";
  var oprice = 0;
  var picname = "";

  useEffect(() => {
    // get bill id from db
    axios
      .get("http://localhost:9211/bill/billshowbillids/" + props.data)
      .then((res) => {
        setBillIdList(res.data);
      })
      .catch((err) => {
        alert(err);
      });

    // get product details from db
    axios
      .get("http://localhost:9211/product/showproduct")
      .then((res) => {
        setPlist(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  }, [props.data]);

  const handleBillSelect = (evt) => {
    axios
      .get("http://localhost:9211/bill/showbillbyid/" + evt.target.value)
      .then((res) => {
        setBillDetailsList(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  };

  // calculate total
  const total = billdetailslist.reduce((acc, bitem) => {
    const product = plist.find((pitem) => pitem.pid === bitem.pid);
    return acc + (product ? parseInt(product.oprice) : 0);
  }, 0);

  return (
    <div className="billbyid-container">
      <center>
        <p className="billbyid-p">Customer Id = {props.data}</p>
        <table>
          <tbody>
            <tr>
              <td>Bill Id</td>
              <td>
                <select onChange={handleBillSelect} className="billbyid-select">
                  {billidlist.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          </tbody>
        </table>

        <table className="billbyid-table">
          <thead>
            <tr>
              <th>Bill Id</th>
              <th>Customer Id</th>
              <th>Bill Date</th>
              <th>Product Name</th>
              <th>Offer Price</th>
              <th>Photo</th>
            </tr>
          </thead>
          <tbody>
            {billdetailslist.map((bitem, index) => {
              pname = "";
              oprice = 0;
              picname = "";

              plist.forEach((pitem) => {
                if (bitem.pid === pitem.pid) {
                  pname = pitem.pname;
                  oprice = pitem.oprice;
                  picname = pitem.ppicname;
                }
              });

              return (
                <tr key={index}>
                  <td>{bitem.billid}</td>
                  <td>{bitem.cid}</td>
                  <td>{bitem.billdate}</td>
                  <td>{pname}</td>
                  <td>{oprice}</td>
                  <td>
                    <img
                      src={
                        picname
                          ? "http://localhost:9211/product/getproductimage/" +
                            picname
                          : "/default.png"
                      }
                      height="100"
                      width="100"
                      alt={pname}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="billbyid-total">Total = {total}</div>
      </center>
    </div>
  );
}

export default BillById;
