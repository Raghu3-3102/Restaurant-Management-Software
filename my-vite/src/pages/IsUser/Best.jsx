import React,{useEffect, useState} from 'react'
import Layout from '../../component/Layout'
import '../../Style/Home.css'
import Oder_pay from '../../component/Oder_pay'
import { Col, Row } from 'antd'
import axios from 'axios'


function Best() {
  const [lodedata,setLodedata] = useState([])

  const getData = async ()=>{

    const response = await axios.get('/api/user/get-recomentation',{
      headers : {
        Authorization: "Bearer " + localStorage.getItem("token")

      },
    });


    if (response.data.success){

      setLodedata(response.data.data)
      
    }

  }

  const getDinner = async (fooditem)=>{

    const dinners = {
      foodsnames : `${fooditem}`
    }

    try {
      const response = await axios.post('/api/user/get-dinner',dinners);
      if (response.data.success) {

        setLodedata(response.data.data)
        
      }
    } catch (error) {
      
    }



  }

  useEffect(()=>{
    getData()
  },[])

  return (
    <div>
      <Layout>
         {/* <div className='text'>Our Best food</div> */}

         <div className='food-show-cnt-best'>
         <Row gutter={24}>
        {lodedata.map((foods)=>(
          <Col span={12} xs={10} sm={14} lg={8}>
             <Oder_pay foods={foods}/>
             {/* <h1 color='black'>{foods.foodname}</h1> */}
             
             
          </Col>         
        ))}
        </Row>
         </div>
         <div className='data-show-cnt'>
          <div className='dinner-cnt' onClick={()=>{getDinner("dinner")}}><i class="ri-restaurant-2-line"></i> Dinner</div>
          <div className='drink-cnt' onClick={()=>{getDinner("beverages")}}><i class="ri-goblet-line"></i>beverages</div>
          <div className='snacks-cnt' onClick={()=>{getDinner("snacks")}}><i class="ri-restaurant-line"></i>Snacks</div>
         </div>
      </Layout>
    </div>
  )
}

export default Best
