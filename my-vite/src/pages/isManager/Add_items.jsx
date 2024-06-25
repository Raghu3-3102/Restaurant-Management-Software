import React from 'react'
import Layout from '../../component/Layout'
import '../../Style/Add_item.css'
import { Button, Checkbox, Col, Form, Row , Upload } from 'antd'
import Input from 'antd/es/input/Input'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { UploadOutlined } from '@ant-design/icons';

function Add_items() {

  const navigate = useNavigate()
  const onFinish = async (val)=>{
    const file = val.foodimage;
    console.log(file);


  
   const response = await axios.post('api/user/food-register',val)
   if (response.data.success){

    toast.success(response.data.message)
    navigate('/home')


    
    
   }
  }

 

  return (
    <div>
      <Layout>
        <div className='add-item-cnt'>
          {/* <div className='heading-food-cnt'>Add Foods</div> */}
          <Form className='form' layout='horizontal' labelCol={{style:{color:'red'}}} onFinish={onFinish}>
            <Row gutter={24}>
             
            <Col span={24} xs={18} lg={24} sm={24}>
                <Form.Item
                className='items'
                label="parentFood"
                name="parentFood"
                rules={[{required:true,message:"enter parent food name"}]}
                >
              <Input placeholder='Enter food parent'/>

                </Form.Item>
              </Col>

              <Col span={24} xs={18} lg={24} sm={24}>
                <Form.Item
                className='items'
                label="foodname"
                name="foodname"
                rules={[{required:true,message:"enter food name"}]}
                >
              <Input placeholder='Enter food name'/>

                </Form.Item>
              </Col>
              <Col span={24} xs={16} lg={24} sm={24}>
                <Form.Item
                className='items'
                label="foodprice"
                name="foodPrice"
                rules={[{required:true,message:"enter food Price"}]}
                >
              <Input placeholder='Enter food price' type='Number'/>

                </Form.Item>
              </Col>

              <Col span={24} xs={16} lg={24} sm={24}>
                <Form.Item
                className='items'
                label="Recomentation"
                name="recomentation"
                valuePropName='cheked'
                initialValue={true}
                // rules={[{required:false,message:"ENTER value"}]}
                >
              <Checkbox>Food Discriptiion</Checkbox>

                </Form.Item>
              </Col>
            

              <Col span={24} xs={28} lg={28} sm={30}>
                <Form.Item
                className='items'
                label="aboutFood"
                name="aboutFood"
                rules={[{required:true,message:"enter food Discription"}]}
                >
              <Input placeholder='Enter about food' />

                </Form.Item>
              </Col>
             
                <Form.Item
                className='items'
                label="foodImage"
                name="foodimage"
                rules={[{required:true,message:"Uplode food image"}]}
                >
              
              <Input type='text' placeholder='Enter image url' />

                </Form.Item>
              
              
            </Row>

            <Button className='buttons' htmlType='submit'>Submit</Button>
          </Form>
          <div className='show-users-data'>
            <div className='del-food' onClick={()=>{navigate('/Delete_items')}}>
              <div className='del-logo' ><i class="ri-delete-bin-6-line"></i></div>
              <h2>delete</h2>
            </div>
            <div className='add-food'>
            <div className='add-logo'><i class="ri-add-circle-line"></i></div>
              <h2>add-item</h2>
            </div>
            <div className='block-unblock-food' onClick={()=>{navigate('/Blocked_status')}}>
            <div className='block-unblock-food-logo'><i class="ri-settings-6-line"></i></div>
              <h4>Block/Unblock</h4>
            </div>
          </div>
        </div>
        
      </Layout>
    </div>
  )
}

export default Add_items
