import React, { useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import '../Style/PaymentGateway.css'
import Bill_handle from './Bill_handle';
import toast from 'react-hot-toast'





// const Handle_bill = ({ isOpen, onClose, billData,payble,fooddata,user,status }) => {

//     const handleDownload = () => {
//     //     // Generate a string representation of the bill data
//     //     const billText = `Food Name: ${fooddata.foodname}\n` ;
//     //     // +
//     //                     //  `Food Price: ${billData.foodPrice}\n` +
//     //                     //  `Order Date: ${billData.orderDate}\n` +
//     //                     //  `Order Time: ${billData.orderTime}\n` +
//     //                     //  `Table No: ${billData.tableNo}\n` +
//     //                     //  `Quantity: ${billData.quantity}\n`;
    
//     //     // Create a new blob object containing the bill text
//     //      // Create a Blob object containing the bill text
//     // const blob = new Blob([billText], { type: 'text/plain' });

//     // // Create a temporary <a> element and trigger the download
//     // const url = window.URL.createObjectURL(blob);
//     // const a = document.createElement('a');
//     // a.href = url;
//     // a.download = 'bill.txt';
//     // document.body.appendChild(a);
//     // a.click();

//     // // Clean up by removing the <a> element and revoking the URL
//     // document.body.removeChild(a);
//     // window.URL.revokeObjectURL(url);
//       };

//     const navigate = useNavigate()
//   return (
//     <Modal isOpen={isOpen} onRequestClose={onClose}>
//       <h2 style={{marginLeft:"400px",margin:"20px"}}>Bill Details</h2>
//       <hr />
//       <table style={{margin:"20px"}}>
//         <tbody>
//         <tr>
//             <td>Name:</td>
//             <td>{user?.name}</td>
//           </tr>
//           <tr>
//             <td>Email:</td>
//             <td>{user?.email}</td>
//           </tr>
//           <tr>
//             <td>Status:</td>
//             <td>{status}</td>
//           </tr>
        
//           <tr>
//             <td>Food Name:</td>
//             <td>{fooddata?.foodname}</td>
//           </tr>
//           <tr>
//             <td>Food Price:</td>
//             <td>{fooddata?.foodPrice}</td>
//           </tr>
//           <tr>
//             <td>Order Date:</td>
//             <td>{billData?.booked_date}</td>
//           </tr>
//           <tr>
//             <td>Order Time:</td>
//             <td>{billData?.booked_time}</td>
//           </tr>
//           <tr>
//             <td>tables :</td>
//             <td>{billData?.tablenos}</td>
//           </tr>
//           <tr>
//             <td>Quuentety:</td>
//             <td>{billData?.quntety}</td>
//           </tr>
//           <tr>
//             <td>taxes:</td>
//             <td> 5%</td>
//           </tr>
//           <tr>
//             <td>Grandtotal:</td>
//             <td>{payble}</td>
//           </tr>
          
         
//         </tbody>
//       </table>
//       <br />
//       <hr />
//       <buttun onClick={() => {
//         handleDownload()
//       }} style={{margin:"20px",}}>Download Bill</buttun>
//       <br />
//       <buttun onClick={()=>{navigate('/Home')}} style={{margin:"20px"}}>Remove</buttun>
//     </Modal>
//   );
// };

const Handle_bill = ({ isOpen, onClose, billData,payble,fooddata,user,status }) => {

  const [isModalOpens, setIsModalOpens] = useState(false);
  const [billDatas, setBillDatas] = useState([]);


  const handleSubmits = ()=>{

    // navigate('/home')
    setIsModalOpens(true)
    toast.success("payment sucessfull")

  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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

  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handleCardNumberChange = (e) => {
    setCardNumber(e.target.value.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim());
  };

  const handleCardHolderChange = (e) => {
    setCardHolder(e.target.value.toUpperCase());
  };

  const handleExpiryDateChange = (e) => {
    setExpiryDate(e.target.value.replace(/[^0-9]/g, '').replace(/(.{2})/, '$1/').slice(0, 5));
  };

  const handleCvvChange = (e) => {
    setCvv(e.target.value.replace(/[^\d]/g, '').slice(0, 3));
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform payment processing logic here
    console.log('Payment submitted');
  };

return (
  <Modal isOpen={isOpen} onRequestClose={onClose}>
    <h2 style={{marginLeft:"400px",margin:"20px"}}>Payment</h2>
    <hr />
    <div className="payment-container">
      <h1> Payment</h1>
      <form className="payment-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Card Number:</label>
          <input
            type="password"
            value={cardNumber}
            onChange={handleCardNumberChange}
            placeholder="Enter card number"
            maxLength="19"
            required
          />
        </div>
        <div className="form-group">
          <label>Card Holder:</label>
          <input
            type="text"
            value={cardHolder}
            onChange={handleCardHolderChange}
            placeholder="Enter card holder's name"
            required
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Expiry Date:</label>
            <input
              type="text"
              value={expiryDate}
              onChange={handleExpiryDateChange}
              placeholder="MM/YY"
              maxLength="5"
              required
            />
          </div>
          <div className="form-group">
            <label>CVV:</label>
            <input
              type="password"
              value={cvv}
              onChange={handleCvvChange}
              placeholder="CVV"
              maxLength="3"
              required
            />
          </div>
        </div>
        <button type="submit" className="pay-btn" onClick={()=>{handleSubmits()}}>Pay Now {payble}</button>
        <Bill_handle isOpen={isModalOpens} onClose={handleCloseModal} billData={billData} fooddata = {fooddata}payble={payble} user={user} status={status}/>
      </form>
    </div>
    <br />
    <hr />
    {/* <buttun onClick={() => {
      handleDownload()
    }} style={{margin:"20px",}}>Download Bill</buttun>
    <br />
    <buttun onClick={()=>{navigate('/Home')}} style={{margin:"20px"}}>Remove</buttun> */}
  </Modal>
);
};


export default Handle_bill;
