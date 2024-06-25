import React, { useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import '../Style/PaymentGateway.css'




const Bill_handle = ({ isOpen, onClose, billData,payble,fooddata,user,status }) => {

    const handleDownload = () => {
    //     // Generate a string representation of the bill data
    //     const billText = `Food Name: ${fooddata.foodname}\n` ;
    //     // +
    //                     //  `Food Price: ${billData.foodPrice}\n` +
    //                     //  `Order Date: ${billData.orderDate}\n` +
    //                     //  `Order Time: ${billData.orderTime}\n` +
    //                     //  `Table No: ${billData.tableNo}\n` +
    //                     //  `Quantity: ${billData.quantity}\n`;
    
    //     // Create a new blob object containing the bill text
    //      // Create a Blob object containing the bill text
    // const blob = new Blob([billText], { type: 'text/plain' });

    // // Create a temporary <a> element and trigger the download
    // const url = window.URL.createObjectURL(blob);
    // const a = document.createElement('a');
    // a.href = url;
    // a.download = 'bill.txt';
    // document.body.appendChild(a);
    // a.click();

    // // Clean up by removing the <a> element and revoking the URL
    // document.body.removeChild(a);
    // window.URL.revokeObjectURL(url);
      };

    const navigate = useNavigate()
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <h2 style={{marginLeft:"400px",margin:"20px"}}>Bill Details</h2>
      <hr />
      <table style={{margin:"20px"}}>
        <tbody>
        <tr>
            <td>Name:</td>
            <td>{user?.name}</td>
          </tr>
          <tr>
            <td>Email:</td>
            <td>{user?.email}</td>
          </tr>
          <tr>
            <td>Status:</td>
            <td>{status}</td>
          </tr>
        
          <tr>
            <td>Food Name:</td>
            <td>{fooddata?.foodname}</td>
          </tr>
          <tr>
            <td>Food Price:</td>
            <td>{fooddata?.foodPrice}</td>
          </tr>
          <tr>
            <td>Order Date:</td>
            <td>{billData?.booked_date}</td>
          </tr>
          <tr>
            <td>Order Time:</td>
            <td>{billData?.booked_time}</td>
          </tr>
          <tr>
            <td>tables :</td>
            <td>{billData?.tablenos}</td>
          </tr>
          <tr>
            <td>Quuentety:</td>
            <td>{billData?.quntety}</td>
          </tr>
          <tr>
            <td>taxes:</td>
            <td> 5%</td>
          </tr>
          <tr>
            <td>Grandtotal:</td>
            <td>{payble}</td>
          </tr>
          
         
        </tbody>
      </table>
      <br />
      <hr />
      <buttun onClick={() => {
        handleDownload()
      }} style={{margin:"20px",}}>Download Bill</buttun>
      <br />
      <buttun onClick={()=>{navigate('/Home')}} style={{margin:"20px"}}>Remove</buttun>
    </Modal>
  );
};

export default Bill_handle;
