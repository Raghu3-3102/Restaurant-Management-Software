import React  from 'react'
import '../Register.css'
import img from '../Image/the_grill.jpg'
import {Button, Col, Form,Input, Row} from 'antd'
import { useNavigate,Link } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import axios from 'axios'
import { hideLoading, showLoading } from '../Redux/alertSlice'

function Foreget_passward() {

  

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onFinish = async (val)=>{
      console.log(val);
      
  
      try {
        dispatch(showLoading())
        const response = await axios.post('/api/user/change-passward',val)
        dispatch(hideLoading())
        if(response.data.success){
          toast.success(response.data.messege)
          navigate('/Login')
          
        }else{
          toast.error(response.data.message)
          dispatch(hideLoading())
      }
      } catch (error) {
        console.log(error);
        dispatch(hideLoading())
      }
  
      
    }


  return (
    <div>
        <div className='reg-cnt'>
         <div className='reg'>

<h2 className='heaidss'>Regiser</h2>

<Form layout='vertical' onFinish={onFinish}>

<Row gutter={24} className='row'>
  

  <Col span={8} xs={12} sm={24} lg={18}>
  <Form.Item
label="Email"
name = "email"
rules={[{required:true,message:"Required"}]} 
>
  <Input placeholder='Enter Email' />
</Form.Item>
  </Col>


 <Col span={6} xs={20} sm={24} lg={18}>
          <Form.Item
        label="Best Friend Name"
        name = "bestfriendname"
        rules={[{required:true,message:"Required"}]} 
        >
          <Input placeholder='Enter friend Name' />
        </Form.Item>
          </Col>

  
  <Col span={8} xs={12} sm={24} lg={18}>
  <Form.Item
label="New Passward"
name = "passward"
rules={[{required:true,message:"Required"}]} 
>
  <Input placeholder='Enter New passward' type='Password' />
</Form.Item>
  </Col>
</Row>

<Button type="primary" className='reg-btn' htmlType="submit">Change passward</Button>

  
</Form>
<Link to='/Login' className='anchor1'>

    click to Login

  </Link>
    </div>
    <div className='reg-img-cnt'>
   <img src={img} alt='' />

    
    </div>
    </div>
    </div>
  )
}


export default Foreget_passward;
