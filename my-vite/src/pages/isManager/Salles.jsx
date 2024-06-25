import React, { useState } from 'react'
import Layout from '../../component/Layout'
import axios from 'axios';
import { useEffect } from 'react';
import img from '../../Image/Burger_2.jpg'
import toast from 'react-hot-toast'
import '../../Style/Oder.css'
import Recive_and_reject_oder from '../../component/Recive_and_reject_oder';
import { Col, Row, Table , Form , Input, Button} from 'antd';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../Redux/alertSlice';
import '../../Style/Sells.css'


function Salles() {
  const [FoodData,setFoodData] = useState([])
  const [count,setCount] = useState(0)
  const dispatch = useDispatch()


  const getAllfood = async ()=>{
       
    try {
      dispatch(showLoading())
     const response = await axios.get('/api/user/get-oderd-food-selles')
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
      title: "number of table",
      dataIndex: "tableno",
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
      title: "Phone no",
      dataIndex: "phoneno",
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
       title: "Oder Date",
       dataIndex: "date",
       render: (text, record) => (
        <span>
          {record.date}/{record.manth}/{record.year}
        </span>
      ),
     }, 


   
  ];

  const getfooddate = async (val)=>{

    try {

      const response = await axios.post('api/user/get-oder-by-date',val);
      if (response.data.success) {
        toast.success(response.data.message)
        setFoodData(response.data.data)
      }
      
    } catch (error) {
      console.log(error);
    }


  }


  return (
    <div>
        <Layout>
           <Form onFinish={getfooddate} layout='Horizontal'>
           <Row gutter='16'>
           <Col span={2} xs={12} sm={12} lg={8}>
        
           <Form.Item
             label="Enter date"
             name="date"
             rules={[{required:true , message:"plz enter "}]}
             style={{color:'whitesmoke'}}
             className='dATW'
            >
             <Input type='Date'/>
            </Form.Item>

            </Col>
            </Row>
           
            <Button className='btnsssss' htmlType='submit'> Enter </Button>
           </Form>
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
    </div>
  )
}

export default Salles
