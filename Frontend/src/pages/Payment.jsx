import React, { useState, useContext } from "react";
import { Context } from "../main";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

import html2canvas from "html2canvas";


const Payment = () => {
  //const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const [cardNum, setCardNum] = useState("");
  const [expriyDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false); // New state to track form submission

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/appointment/payment",
        { cardNum, expriyDate, cvv, cardholderName, dob, phone, amount },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      toast.success(response.data.message);
      setIsSubmitted(true); // Set the form submission state to true
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };



  // Download Bill

  const handleDownloadImage = () => {
    const billElement = document.getElementById("bill"); // Target the bill element
  
    html2canvas(billElement).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png"); // Convert to image format (e.g., PNG)
      link.download = "bill-summary.png"; // Name of the downloaded image
      link.click(); // Trigger the download
    });
  };


  return (
    <div className="payment-container">
      <div className="container form-paycomponent payment-form">
        <h2>Payment Gateway</h2>
        <form onSubmit={handlePayment}>
          <div>
            <label htmlFor="card-number">Card Number</label>
            <input
              type="password"
              id="card-number"
              name="card_number"
              value={cardNum}
              onChange={(e) => setCardNum(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="expiry-date">Expiry Date</label>
            <input
              type="text"
              id="expiry-date"
              name="expiry_date"
              value={expriyDate}
              onChange={(e) => setExpiryDate(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="cvv">CVV</label>
            <input
              type="password"
              id="cvv"
              name="cvv"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="card-holder">Card Holder Name</label>
            <input
              type="text"
              id="card-holder"
              name="card_holder"
              value={cardholderName}
              onChange={(e) => setCardholderName(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="Date">Date</label>
            <input
              type="date"
              id="date1"
              name="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="mobile-num">Mobile No.</label>
            <input
              type="number"
              id="mob-no"
              name="mobile_num"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="amount">Amount To Pay</label>
            <input
              type="number"
              id="amount1"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">Submit Payment</button>
          </div>
        </form>
        {isSubmitted && (
          <div className="payment-summary" id="bill">
            <h3>BILL</h3>
            <table>
              <thead>
                <tr>
                <th>Date</th>
                  <th>Card Holder Name</th>
                  <th>Mobile No.</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                <td>{dob}</td>
                  <td>{cardholderName}</td>
                  <td>{phone}</td>
                  <td>{amount}</td>
                </tr>
              </tbody>
            </table>


            {/* Download button */}
    <div style={{ textAlign: "right", marginTop: "10px" }}>
      <button onClick={handleDownloadImage}>Download</button>
    </div>


          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
