
import React from 'react'
import Layout from '../../component/Layout';
import { Button, Col, Form, Input, Row, TimePicker,Select } from 'antd';
import '../../Style/Career.css'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

function Career() {

  const {user} = useSelector((state)=> state.user)


  const onFinish = async (val)=>{

    val.applicentid = user._id;
    console.log(val);
    try {

    
      
      const response = await axios.post('/api/user/save-career-data',val)
      if (response.data.success) {
        toast.success("Succesfully Apllyed")
       

      }else{
        toast.error("something went wrong")
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Layout>
      {/* <h5 className='text-career'>Apply</h5>
      <hr style={{border:'2px solid white'}}/> */}
      <Form
      layout="vertical"
      onFinish={onFinish}
    >
      <h1 className="text-career" style={{color:'black'}} >Persnol Information</h1>
      <hr style={{border:'2px solid white'}}/>
      <Row gutter={20}>
        <Col span={12} xs={24} sm={24} lg={8}>
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[{ required: true }]}
          >
            <Input placeholder="Firs Name" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[{ required: true }]}
          >
            <Input placeholder="last Name" />
          </Form.Item>
        </Col>

        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[{ required: true }]}
          >
            <Input placeholder="Phone Number" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            label="email"
            name="email"
            rules={[{ required: true }]}
          >
            <Input placeholder="email" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item label="Adress" name="address" rules={[{ required: true }]}>
            <Input placeholder="Adress" />
          </Form.Item>
        </Col>
      </Row>
      <hr />
      <h5 className='text-career'  style={{color:'black'}}>Profesnol information</h5>
      <hr style={{border:'2px solid white'}}/>
      <Row gutter={20}>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            label="Specialization"
            name="specialization"
            rules={[{ required: true }]}
          >
            <Input placeholder="Specialization" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            label="Expirence"
            name="expirence"
            rules={[{ required: true }]}
          >
            <Input placeholder="Expirence" type="Number" />
          </Form.Item>
        </Col>

        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            label="prefrence"
            name="prefrence"
            rules={[{ required: true }]}
          >
          <Select defaultValue="Select">
           <Option value = "Chef"/>
           <Option  value = "waiter">Waiter</Option>
           <Option   value = "Host">Host</Option>
           <Option value = "disable">Busser</Option>
           <Option value = "Kichen staff">Kichen staff</Option>

          </Select>
          </Form.Item>
        </Col>
      
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              label="avablity"
              name="avaibility"
              rules={[{ required: true }]}
            >
             <Select defaultValue="Select">
           <Option  value = "waiter">Full time</Option>
           <Option   value = "Host">Part time</Option>
           <Option value = "disable">Internship</Option>

          </Select>
            </Form.Item>
          </Col>
        
      </Row>

      <div className="d-flex justify-content-end">
        <Button className="primary-buttons" htmlType="submit">
          SUBMIT
        </Button>
      </div>
    </Form>
    </Layout>
  )
}

export default Career
