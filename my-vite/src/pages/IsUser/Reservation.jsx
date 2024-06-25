import React from 'react'
import Layout from '../../component/Layout'

import { Form, Input, Select, Button } from 'antd';
import '../../Style/Resevation.css'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';



const { Option } = Select;

const Reservation = () => {

    const navigate = useNavigate()

    const {user} = useSelector((state)=> state.user)

  const onFinish = async (values) => {


    
    const currentDate = new Date();
    const dates = currentDate.getDate()
    console.log(dates);
    values.date = user.dates;
    values.username = user.name;
    values.userid = user._id


    console.log(values);
    const response = await axios.post('/api/user/reservation',values)
    if (response.data.success) {
        toast.success('Successfully bookes')
        navigate('/home')
    }else{
        toast.error('Something went wrong plz try after sometime again')
    }

  };

  return (

    <Layout>
    <div className="reservation-form-container">
      <Form
        name="reservation_form"
        onFinish={onFinish}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item
          label="Date of Reservation"
          name="booked_date"
          rules={[{ required: true, message: 'Please select a date!' }]}
        >
          <Input type="date" className="reservation-input" />
        </Form.Item>
        
        <Form.Item
          label="Time of Visit"
          name="booked_time"
          rules={[{ required: true, message: 'Please select a time!' }]}
        >
          <Input type="time" className="reservation-input" />
        </Form.Item>

        <Form.Item
          label="Phone no"
          name="phoneno"
          rules={[{ required: true, message: 'Please select a time!' }]}
        >
          <Input type="Number" className="reservation-input" />
        </Form.Item>

        <Form.Item
          label="Number of Guest"
          name="noofcustomer"
          rules={[{ required: true, message: 'Please select the number of tables!' }]}
        >
          <Input type="number" min={1} className="reservation-input" />
        </Form.Item>

        <Form.Item
          label="Reason for Booking"
          name="reason"
          rules={[{ required: true, message: 'Please select a reason for booking!' }]}
        >
          <Select className="reservation-input">
            <Option value="birthday">Birthday</Option>
            <Option value="marriage">Marriage</Option>
            <Option value="surprise">Surprise</Option>
            <Option value="milestone">Milestone</Option>
            <Option value="others">Others</Option>
          </Select>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" className="submit-button">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
    </Layout>
  );
};




export default Reservation
