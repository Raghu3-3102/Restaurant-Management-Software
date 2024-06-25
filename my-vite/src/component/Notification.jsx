
import React, { useEffect, useState } from 'react'
import Home from '../pages/Home'
import Layout from './Layout'
import '../Style/Notification.css'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
import { Button } from 'antd'
import { hideLoading, showLoading } from '../Redux/alertSlice'

function Notification() {
  const {user} = useSelector((state)=>state.user)
  const [notification,setNotification] = useState([])
  const [count,setCount] = useState()
  const navigate = useNavigate()
  const currentmanth = new Date()
  const manth = currentmanth.getMonth() + 1;
  const  currentyear = new Date()
  const year = currentyear.getFullYear();
  const dispatch = useDispatch()
 

  

  const deletes = async (index)=>{

   const userindex =  index;

    try {
      dispatch(showLoading())
      const response = await axios.post('/api/user/delete-noti',{
        user,
        userindex
      })
      if (response.data.success){
      
        toast.success(response.data.message)
        dispatch(hideLoading())
        window.location.reload()
        
      }
    } catch (error) {
      console.log(error);
    }
    

  }



  return (
    <div>
        <Layout>
          <div className='noti-cnt'>
            {user && user?.isNotification.map((noti,index)=>(
            
                 <div key={notification._id}>
                   <div className='noti' >{noti.message} -    
                   {noti.data}/{manth}/{year}
                   <Button className='del-btn' onClick={()=>{deletes(index)}}> <i class="ri-delete-bin-line"></i></Button>
                  </div>
                    
                 
                  </div>
            ))}
            {/* <button className='noti-btn' onClick={deletes}>Delete all notification</button> */}
          </div>
        </Layout>
    </div>
  )
}

export default Notification
