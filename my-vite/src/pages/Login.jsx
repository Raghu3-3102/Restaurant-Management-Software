import React from 'react'
import '../Register.css'
import img from '../Image/the_grill2.jpg'
import {Button, Col, Form,Input, Row} from 'antd'
import { useNavigate,Link } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '../Redux/alertSlice'
import useSelection from 'antd/es/table/hooks/useSelection'

function Login() {

  const navigate = useNavigate()
  const dispatch = useDispatch()


    const onFinish = async (val)=>{


      try {

        dispatch(showLoading())
        const response = await axios.post('/api/user/login',val);
        dispatch(hideLoading())

        if (response.data.success) {

          toast.success(response.data.message)
        
            navigate('/home')
          
          
          localStorage.setItem("token",response.data.data)
        }else{
          toast.error(response.data.message)
          dispatch(hideLoading())
        }

        
      } catch (error) {

        console.log(error);
        
      }
        
      }

  return (
    <div className='reg-cnt'>
         <div className='reg'>

<h2 className='heaids'>Login</h2>

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

  
  <Col span={8} xs={12} sm={24} lg={18}>
  <Form.Item
label="Password"
name = "passward"
rules={[{required:true,message:"Required"}]} 
>
  <Input placeholder='Enter password' type='Password'/>
</Form.Item>
  </Col>
</Row>

<Button type="primary"  className='reg-btn' htmlType="submit">Login</Button>

  
</Form>
<Link to='/' className='anchor1'>

    click to Register

  </Link>
  <Link to='/Forget-passward' className='anchor2'>

    Forget passward?

  </Link>

        </div>
        <div className='reg-img-cnt'>
       <img src={img} alt='img' />
      </div>

      
    </div>
  )
}

export default Login
