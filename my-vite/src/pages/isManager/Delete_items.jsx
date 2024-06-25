import React, { useEffect, useState } from 'react'
import Layout from '../../component/Layout'
import '../../Style/Add_item.css'
import { Col, Row, Table } from 'antd'
import { useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '../../Redux/alertSlice'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

function Delete_items() {

    const [lodedata,setLodedata] = useState([])
    const [deletedchech,setDeletedchect] = useState(0)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const getFood = async ()=>{

  
      
    
        const response = await axios.get('/api/user/get-food',{
          headers : {
            Authorization: "Bearer " + localStorage.getItem("token")
    
          },
        })
        if (response.data.success){
    
             setLodedata(response.data.data)
       
             
        }
      
      }

      const getDeletes = async (food)=>{

       try {
        console.log("riched");
        const response = await axios.post('/api/user/delete-food-item',food)

        if (response.data.success) {
          toast.success('data deleted sucessfully')
          setDeletedchect(deletedchech+1)
          
        }

       } catch (error) {
        console.log(error);
       }
        

      }

      useEffect(()=>{
         getFood()
      },[deletedchech])


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
          title: "Discriptiin",
          dataIndex: "aboutFood",
        }, 
        {
          title: "Food price",
          dataIndex: "foodPrice",
        },
        {
          title: "Oders",
          dataIndex: "numberoftimesOder",
        },
    
         
        {
          title: "Delete",
          render: (text, record) => (
            <div className="d-flex">
            
            <buttons
        className='btn2'
        onClick={() => getDeletes(record)}
      >
       <i class="ri-delete-bin-line"></i>
      </buttons>
            
             
              
             
            </div>
          ),
        },
    
    
    
    
    
       
      ];


  return (
    <Layout>
      <div className='add-item-cnt'>
        <div className='deleteted-cnt'>
       <Row gutter={6}>
        <Col span={4} xs={16} sm={24} lg={28}>
        <Table columns={columns} dataSource={lodedata}  className='tbles'>
        </Table>
        </Col>
       </Row>
        </div>
        <div className='show-users-data1'>
            <div className='del-food1' onClick={()=>{navigate('/Delete_items')}}>
              <div className='del-logo' ><i class="ri-delete-bin-6-line"></i></div>
              <h2>delete</h2>
            </div>
            <div className='add-food1' onClick={()=>{navigate('/add-item')}}>
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
  )
}

export default Delete_items
