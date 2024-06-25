import React,{useState, useEffect} from 'react'
import '../index.css'
import '../Style/Home.css'
import Layout from '../component/Layout';
import {  Col, Form, Row,Input, Badge } from 'antd';
import { Navigate , useNavigate} from 'react-router-dom';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';

import Oder_pay from '../component/Oder_pay';
import toast from 'react-hot-toast'
import { hideLoading, showLoading } from '../Redux/alertSlice';



function Home() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user} = useSelector((state)=>state.user)
  console.log(user);
  const [lodedata , setLodedata] = useState([])
  const [HistoryFoodData,setHistoryFoodData] = useState([])
  const [count,setCount] = useState(0)
  const [lode,setlode] = useState(false)
  const [userCount,setUsercount] = useState(0);
  const [oderCount,setOdercount] = useState(0)
  


  const onFinish = async (val)=>{
    dispatch(showLoading())
     console.log(val);
    const response = await axios.post('/api/user/get-food-by-name',val)
    if (response.data.success) {
      if (response.data.data.length > 0 ){
        toast.success(response.data.message)
        setLodedata(response.data.data)
        console.log(response.data.data);
        setlode(false)
        dispatch(hideLoading())
      }else{
        toast.error('Sorry food not found')
        setlode(true)
        dispatch(hideLoading())
      }
     
    }
   
 
  }

  const getLiked = async ()=>{

   try {
    dispatch(showLoading())
    const response = await axios.post('/api/user/get-cart-items',user)
    if (response.data.success) {

        console.log(response.data.data);
        setLodedata(response.data.data);
        toast.success(response.data.message)
        setCount(count+1)
        dispatch(hideLoading())
      
    }else{
      toast.error("You havent like any food")
      dispatch(hideLoading())
    }

   } catch (error) {
    console.log(error);
   }

  }
 

  const getFood = async ()=>{

  
    dispatch(showLoading())

    const response = await axios.get('/api/user/get-food',{
      headers : {
        Authorization: "Bearer " + localStorage.getItem("token")

      },
    })
    if (response.data.success){

         setLodedata(response.data.data)
         console.log(response.data.data);
         dispatch(hideLoading())
         
    }
  
  }

  const dataInfo = async ()=>{
    const getDatainfo = await axios.get('/api/user/get-data-to-show')
    if (getDatainfo.data.success) {
      console.log(getDatainfo.data.data);
      setUsercount(getDatainfo.data.data[0]);
      setOdercount(getDatainfo.data.data[1]);
    }

  }

  // const HistoryDatas = async ()=>{

  //   try {
  //     dispatch(showLoading())
  //     const response = await axios.post('/api/user/get-cart-items-history',user)
  //     if (response.data.success) {
  
  //         console.log(response.data.data);
  //         setHistoryFoodData(response.data.data);
  //         toast.success(response.data.message)
  //         setCount(count+1)
  //         dispatch(hideLoading())
        
  //     }else{
  //       toast.error("You havent like any food")
  //       dispatch(hideLoading())
  //     }
  
  //    } catch (error) {
  //     console.log(error);
  //    }

  // }


  var i = 0;

  useEffect(()=>{
  
    if (lode || i == 0) {
      getFood()
      dataInfo()
      
      i++;
    }
      
  
     
    
  },[lode])



  return (
    <>
     <Layout>
      <div className='logo'></div>
       <Form layout='vertical' onFinish={onFinish}>
        <Form.Item
        name = "parentFood"
        rules={[{required:true,message:"Serch food"}]} 

        >
         <Input placeholder='Serch food' className='srch' />
        </Form.Item>
        
         <button htmlType="submit" className='btns'>Serch</button>
         {/* <div className='add-to-cart'> */}
         {/* <Badge count={user?.add_to_cart.length }> 
          <i class="ri-shopping-cart-2-fill"></i></div>
          </Badge> */}
         <Badge count={user?.add_to_cart.length} className='add-to-cart'>
         <i class="ri-shopping-cart-2-fill" onClick={getLiked}></i>
          </Badge> 
          {/* </div> */}
       </Form>

       

       <div className='food-show-cnt'> 

      
        <Row gutter={24}>
       
         {lodedata.map((foods , index)=>(
          <Col span={10} xs={10} sm={14} lg={8}>
            {!foods.isBlocked && <Oder_pay foods={foods} index = {index} />}
             
             {/* <h1 color='black'>{foods.foodname}</h1> */}   
          </Col> ))}
        </Row>
          

         </div> 
         
         <div className='data-show-cnt'>
         <h1 style={{marginTop:"20px",marginLeft:"70px"}}>About us</h1>
         <hr />
         <div className='past-oder'>
         <div class="about-us">
        <div class="restaurant-image"></div>
        <div class="restaurant-name">The Grill</div>
        <div class="restaurant-description">
            Welcome to FoodAdda, where we serve delicious food made with love and care.
             Our menu is crafted to satisfy your cravings and our ambiance is designed to make you feel at home.
              Come and experience a culinary journey like no other.
        </div>
    </div>
         </div>
        
         <br />
         <hr />
          <div className='cnt-about'>
         <div className='oder-data-cnt1'>
             <div className='oder-logo1'><i class="ri-user-add-line"></i></div>
           <div className='oder-text1'>
            <h5>User : {userCount}+</h5>
            </div>
            

          </div>
          <div className='oder-data-cnt2'>
          <div className='oder-logo1'><i class="ri-play-list-add-fill"></i></div>
           <div className='oder-text1'>
            <h5>Oder : {oderCount}+</h5>
            </div>
          </div>
         </div>
         </div>

     
     </Layout>
    </>
  )
}

export default Home;

