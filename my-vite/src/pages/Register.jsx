import React  from 'react'
import '../Register.css'
import img from '../Image/the_grill.jpg'
import {Button, Col, Form,Input, Row} from 'antd'
import { useNavigate,Link } from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux';
import {showLoading,hideLoading} from '../Redux/alertSlice'
import toast from 'react-hot-toast'
import axios from 'axios'


function Register() {
 
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onFinish = async (val)=>{
    dispatch(showLoading())
    console.log(val);

    try {
      const response = await axios.post('/api/user/register',val)
      if(response.data.success){
        toast.success(response.data.messege)
        navigate('/Login')
        dispatch(hideLoading())
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
      <div className='reg-img-cnt'>
      <img src={img} alt='' />
      </div>
      <div className='reg'>

        <h2 className='heaid'>Regiser</h2>

     <Form layout='vertical' labelCol={{style:{color:'white'}}} onFinish={onFinish}>

        <Row gutter={24} className='row'>
          <Col span={6} xs={20} sm={24} lg={18}>
          <Form.Item
        label="Name"
        name = "name"
        rules={[{required:true,message:"Required"}]} 
        >
          <Input placeholder='Enter Name' />
        </Form.Item>
          </Col>

          <Col span={6} xs={20} sm={24} lg={18}>
          <Form.Item
        label="Best Friend Name"
        name = "bestfriendname"
        rules={[{required:true,message:"Required"}]} 
        style={{color:'whitesmoke !importent'}}
        >
          <Input placeholder='Enter friend Name' />
        </Form.Item>
          </Col>
  
          <Col span={8} xs={12} sm={24} lg={18}>
          <Form.Item
        label="Email"
        name = "email"
        rules={[{required:true,message:"Required"}]} 
        >
          <Input placeholder='Enter Email' />
        </Form.Item>
          </Col>

          
          <Col span={8} xs={12} sm={24} lg={16} className='pass-reg'>
          <Form.Item
        label="Password"
        name = "passward"
        rules={[{required:true,message:"Required"}]} 
        >
          <Input type='Password'  placeholder="Enter passward" />
        </Form.Item>
          </Col>
        </Row>

        <Button type="primary" className='reg-btn' htmlType="submit">Register</Button>
        
          
     </Form>
     <Link to='/Login' className='anchor1'>

            click to login

          </Link>

      </div>
    
    </div>
  )
}

export default Register;
