import React, { useEffect, useState } from 'react'
import Layout from '../../component/Layout'
import '../../Style/Add_item.css'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { hideLoading, showLoading } from '../../Redux/alertSlice'
import { Col, Row, Table } from 'antd'
import axios from 'axios'
import toast from 'react-hot-toast'

function Blocked_unBlocked() {

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
             console.log(response.data.data);
            
             
        }
      
      }

      const getBlock = async (food)=>{

       try {
        const response = await axios.post('api/user/blocked-food-items',food)
        if (response.data.success) {

           toast.success(response.data.message)
           setDeletedchect(deletedchech + 1)
            
        }
        else{

            toast.error(response.data.message)
        }
       } catch (error) {
        console.log(error);
       }

      }

      const getUnBlock = async (food)=>{

        try {
         const response = await axios.post('api/user/unblocked-food-items',food)
         if (response.data.success) {
 
            toast.success(response.data.message)
            setDeletedchect(deletedchech + 1)
             
         }else{
            toast.error(response.data.message)
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
            title: "Blocked Status",
            dataIndex: "isBlocked",
            render:isBlocked => (isBlocked ? 'Blocked' : 'unblocked')
          },
    
         
        {
          title: "Block",
          render: (text, record) => (
            <div className="d-flex">
            
            <buttons
        className='btn2'
        onClick={() => getBlock(record)}
      >
       <i class="ri-thumb-down-fill"></i>
      </buttons>      
            </div>
          ),
        },
        {
            title: "UnBlock",
            render: (text, record) => (
              <div className="d-flex">
              
              <buttons
          className='btn1'
          onClick={() => getUnBlock(record)}
          
        >
        <i class="ri-thumb-up-fill"></i>
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
        <div className='show-users-data2'>
            <div className='del-food2' onClick={()=>{navigate('/Delete_items')}}>
              <div className='del-logo' ><i class="ri-delete-bin-6-line"></i></div>
              <h2>delete</h2>
            </div>
            <div className='add-food1' onClick={()=>{navigate('/add-item')}}>
            <div className='add-logo'><i class="ri-add-circle-line"></i></div>
              <h2>add-item</h2>
            </div>
            <div className='block-unblock-food2'>
            <div className='block-unblock-food-logo'><i class="ri-settings-6-line"></i></div>
              <h4>Block/Unblock</h4>
            </div>
          </div>
      </div>
    </Layout>
  )
}

export default Blocked_unBlocked
