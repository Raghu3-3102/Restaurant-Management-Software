import React, { useState } from 'react'
import Layout from '../../component/Layout'
import axios from 'axios';
import { useEffect } from 'react';
import img from '../../Image/Burger_2.jpg'
import toast from 'react-hot-toast'
import '../../Style/Oder.css'
import Recive_and_reject_oder from '../../component/Recive_and_reject_oder';
import { Col, Row, Table } from 'antd';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../Redux/alertSlice';

function Massege() {

  const [FoodData,setFoodData] = useState([])
  const [count,setCount] = useState(0)
  const dispatch = useDispatch()

  const getCorrect = async (foods)=>{
    try {
       console.log(foods)
       dispatch(showLoading())
      const response = await axios.post('/api/user/food-dilever-final',foods)
      if (response.data.success) {
         toast.success(response.data.message)
        setCount(count + 1)
        window.location.reload()
        dispatch(hideLoading())
      }
    } catch (error) {
      console.log(error);
      dispatch(hideLoading)
    }
  }
  const getDelete = async (foods)=>{
    try {
       console.log(foods)
       dispatch(showLoading())
      const response = await axios.post('/api/user/food-not-diliverd',foods)
      if (response.data.success) {
         toast.error(response.data.message)
        setCount(count + 1)
        window.location.reload()
        dispatch(hideLoading())
      }
    } catch (error) {
      console.log(error);
      dispatch(hideLoading)
    }
  }

  const getAllfood = async ()=>{
       
    try {
      dispatch(showLoading())
     const response = await axios.get('/api/user/get-oderd-food-by-date')
     if (response.data.success) {
       console.log(response.data.data);
       // alert(response.data.message)
       setFoodData(response.data.data)
       dispatch(hideLoading())
     }
    } catch (error) {
     console.log(error);
     dispatch(hideLoading())
    }
   }


   useEffect(()=>{
    getAllfood()
   },[count])

   const columns = [
    {
      title: "FoodName",
      dataIndex: "foodname",
      render: (text, record) => (
        <span>
          {record.foodname} 
        </span>
      ),
    },
    {
      title: "User name",
      dataIndex: "username",
    },
    {
      title: "Address",
      dataIndex: "address",
    }, 
    {
      title: "Address",
      dataIndex: "address",
    }, 
    {
      title: "Occesion",
      dataIndex: "reason",
    }, 
    {
      title: "Gueest",
      dataIndex: "noofcustomer",
    },
    {
      title: "Booked Date",
      dataIndex: "booked_date",
    }, 
    {
      title: "Booked time",
      dataIndex: "booked_time",
    }, 
    {
      title: "Food price",
      dataIndex: "Foodprice",
    },
    {
      title: "Quentety",
      dataIndex: "quntety",
    },
   {
       title: "Date",
       dataIndex: "date",
       render: (text, record) => (
        <span>
          {record.date}/{record.manth}/{record.year}
        </span>
      ),
     }, 

    {
      title: "Dileverd",
      // dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex ">
        
            <buttons
               className='btn1'
              onClick={() => getCorrect(record)}
            >
             <i class="ri-check-double-line"></i> 
            </buttons>
        
         
          
         
        </div>
      ),
    },
    {
      title: "Reject",
      render: (text, record) => (
        <div className="d-flex">
        
        <buttons
    className='btn2'
    onClick={() => getDelete(record)}
  >
   <i class="ri-delete-bin-line"></i>
  </buttons>
        
         
          
         
        </div>
      ),
    },





   
  ];

  return (
    <Layout>
     <Row gutter={6}>
        <div className='oder-cnt'>
     
         <Col span={4} xs={16} sm={24} lg={28}>
         
                 <>
                  {/* <div className='img-cnt-oder'><img  src={img}/></div>
                  <p>Oderd by : {foods.username}</p>
                 <p>FoodOder: {foods.foodname}</p>
                  <p>ingredience : {foods.aboutfood}</p>
                  <p>table no : {foods.tableno}</p>
                   <button className='btn1'onClick={()=>getCorrect(foods)} ><i class="ri-check-double-line"></i> </button>
                   <button className='btn2'><i class="ri-delete-bin-line"></i></button> */}
                   <Table columns={columns} dataSource={FoodData.reverse()}  className='tble'>
                    
                     
                   </Table>

                   </>
                   
                 
            
         </Col> 
         </div>
       </Row>
    </Layout>
  )
}

export default Massege
