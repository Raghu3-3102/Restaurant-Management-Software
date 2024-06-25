import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import Layout from '../../component/Layout';
import '../../Style/Book_food.css'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import img from '../../Image/Burger_2.jpg'
import { Button, Col, Form, Input, Row, Select, TimePicker } from 'antd';
import { hideLoading, showLoading } from '../../Redux/alertSlice';
import toast from 'react-hot-toast';
import Handle_bill from '../../component/Handle_bill';

function Book_food() {
    const params = useParams()
    const {user} = useSelector((state)=> state.user)
    const [price,setPrice] = useState(0)
    const [againprice,setagainprice] = useState(0)
    const [status,setStatus] = useState("Normal 0% Disscount")
    console.log(user);
    console.log(params.foodid);
    const foodid = params.foodid;
    const userid = user._id;
    console.log(userid);
    const [data,setData] = useState([])
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [billData, setBillData] = useState([]);

    const handlePay = () => {
      // Assuming you have the bill data available
      const bill = {
        foodname: 'Burger',
        Foodprice: 5.99,
        orderDate: '2024-04-07',
        orderTime: '12:30 PM',
        tableNo: 5,
        quantity: 2,
      };
      setBillData(bill);
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };

    const setFoodPrice =  (price)=>{


      if (user.Nooftimefoododerd > 30 && price ){

        const newPrice = (price * (105/100))
        const gstdedection = (newPrice * (95/100))
        const folrePrice = Math.floor(gstdedection)
        console.log(folrePrice);
        setPrice(folrePrice)
        setStatus("silver 10% Disscount")
        
      }
     else if (user.Nooftimefoododerd > 60 && price){

        const newPrice = (price * (85/100))
        const gstdedection = (newPrice * (105/100))
        const folrePrice = Math.floor(gstdedection)
        console.log(folrePrice);
        setPrice(folrePrice)
        setStatus("Gold 15% Disscount")
        
      }
     else if (user.Nooftimefoododerd > 90 && price){

        const newPrice = (price * (80/100))
        const gstdedection = (newPrice * (105/100))
        const folrePrice = Math.floor(gstdedection)
        console.log(folrePrice);
        setPrice(folrePrice)
        setStatus("Dimond 20% Disscount")
        
      }
      else{
        const newPrice = price
        const gstdedection = (newPrice * (105/100))
        const folrePrice = Math.floor(gstdedection)
        setPrice(folrePrice)
      }
       


    }

    const Book_food = async (val)=>{
      dispatch(showLoading())
      let tableno = val.tablenos;
      let quntety = val.quntety;
      let phoneno = val.phoneno;
      let address = val.address;
      const currentDate = new Date();
      const date = currentDate.getDate()
      console.log(date);
      const currentmanth = new Date()
      const manth = currentmanth.getMonth() + 1;
      console.log(manth);
      const currentyear = new Date()
      const year =  currentyear.getFullYear()
      console.log(year);
      var booked_time = val.booked_time;
      let booked_date = val.booked_date;
      console.log(booked_date);
      console.log(booked_time);
       setBillData(val)
      console.log(userid);
      try {
        const bookFood = await axios.post('/api/user/Oder-food',{
             tableno,
             foodid,
             userid,
             date,
             manth,
             year,
             price,
             quntety,
             booked_date,
             booked_time,
             address,
             phoneno


        })
        if (bookFood.data.success){
          console.log(bookFood.data.data);
         toast.success(bookFood.data.message)
        //  navigate('/home')
        setIsModalOpen(true)
         dispatch(hideLoading())
          
        }else{
          toast.error(bookFood.data.message)
          dispatch(hideLoading())
        }
      } catch (error) {
        console.log(error);
      }
    }

    const getFood = async ()=>{
      dispatch(showLoading())
      const response = await axios.post(`/api/user/get-info-id`,{
        foodid
      },{
        headers : {
          Authorization: "Bearer " + localStorage.getItem("token")
  
        },
      })
      if (response.data.success) {
        console.log(response.data.data);
        setData(response.data.data)
        setFoodPrice(response.data.data.foodPrice)
        setagainprice(response.data.data.foodPrice)
        dispatch(hideLoading())
      }
    }
    useEffect(()=>{
      getFood()
    },[])

    const handlechange = (value)=>{
       console.log(value);
       setFoodPrice(value * againprice)

    }

   
  
    
  return (
    <Layout>
      <div className='pay-cnt'>

      <div className='img-cnt'> 
      <img src={data.foodimage} alt='no image'/>
      </div>

      <div className='text-cnts'>
        <div className='p-text'>Foodname : {data.foodname}</div>
        <div className='p-text'>foodPrice : {data.foodPrice}</div>
        <div className='p-text'>AboutFood : {data.aboutFood}</div>
        <p className='p-text'> Pay Status : {status} </p>
        <hr />
        <Form layout='Veticle' onFinish={Book_food}>
          <Row gutter='16'>
           
          <Col span={8} xs={12} sm={24} lg={18}>
            <Form.Item
            label="Enter quentety"
            name="quntety"
            rules={[{required:true , message:"plz enter "}]}
            style={{color:'whitesmoke'}}
            >
              
           {/* <Input placeholder='Enter quentety' type='Number' defaultValue={1} /> */}
           <Select defaultValue="1" onChange={handlechange} >
            <option value={1}></option>
            <option value={2}></option>
            <option value={3}></option>
            <option value={4}></option>
            <option value={5}></option>
            <option value={6}></option>
            <option value={7}></option>
            <option value={8}></option>
            <option value={9}></option>
            <option value={10}></option>
            <option value={11}></option>
            <option value={12}></option>
           </Select>
            </Form.Item>
            </Col>


            <Col span={8} xs={12} sm={24} lg={18}>
            <Form.Item
            label="Enter Address"
            name="address"
            rules={[{required:true , message:"plz enter "}]}
            >
           <Input placeholder='Address' type='Address'/>
            </Form.Item>
            </Col>

            <Col span={8} xs={12} sm={24} lg={18}>
            <Form.Item
            label="Phone number"
            name="phoneno"
            rules={[{required:true , message:"plz enter "}]}
            >
           <Input placeholder='Phone no' type='Number'/>
            </Form.Item>
            </Col>

            <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              label="Timing"
              name="booked_time"
              rules={[{ required: true }]}
            >
              <Input type='time' placeholder='enter time' />
            </Form.Item>
          </Col>

          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              label="Date"
              name="booked_date"
              rules={[{ required: true }]}
            >
              <Input type="Date" placeholder="enter date" />
            </Form.Item>
          </Col>
          </Row>
          <div>
          <Button className='btnss' htmlType='submit'>Pay  {price} Rs <i class="ri-arrow-right-fill"></i> </Button>
          <Handle_bill isOpen={isModalOpen} onClose={handleCloseModal} billData={billData} fooddata = {data}payble={price} user={user} status={status}/>
          </div>
        </Form>
      
      </div>

      {/* <div className='payment-cucess'>
        
      </div> */}
       
      </div>
    </Layout>
  )
}

export default Book_food
