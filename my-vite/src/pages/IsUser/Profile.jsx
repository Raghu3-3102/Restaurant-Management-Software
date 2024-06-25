import React, { useEffect, useState } from 'react'
import Layout from '../../component/Layout'
import '../../Style/Profile.css'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'


function Profile() {
  const {user} = useSelector((state)=>state.user)
  const [data,setData] = useState()
  const [status,setStatus] = useState("Normal")
  const [colors,setColors] = useState("white")
  const navigate = useNavigate()

  const getuserStatus = () =>{
    if(user.Nooftimefoododerd > 30){
      setStatus('Silver')
      setColors('silver')
    }
    else if(user.Nooftimefoododerd > 60){
      setStatus("Gold")
      setColors('gold')
    }
    else if(user.Nooftimefoododerd > 90){
      setStatus("Ruby")
      setColors('red')
    }
  }
 
  useEffect(()=>{
    if (user) {
      setData(user)
      getuserStatus()
    }
    
    
  },[user])


  


  return (
    <div>
      <Layout>
        <div className='profile-cnt'>
          <div className='profile-data-cnt' style={{color :`${colors}`}}>

            {/* {data && data.map((user)=>(
              <>
             <div className='profile-img-cnt' >{user.name.slice(0,2)}</div>
              <p>Gueest : {user.name}</p>
              <p>Email : {user.email}</p>
              <p>Best Friend : {user.bestfriendname}</p>
              <p>Oder times :{user.Nooftimefoododerd} </p>
              <p>Our recomentation : </p> 
              </>
            ))} */}

            {data ? <> <div className='profile-img-cnt' >{data.name.slice(0,2)}</div>
              <p>Gueest : {data.name}</p>
              <p>Email : {data.email}</p>
              <p>Best Friend : {data.bestfriendname}</p>
              <p>No of time oder :{data.Nooftimefoododerd} </p>
              <p>Customer Status : {status}</p>
              <p><Button className='btn-oder' onClick={()=>navigate('/best')}>Our best food</Button> </p></>  : <div>ufff</div>}
   
          </div>
          <div className='Offer-cnt'>
            <div className='offer-data-cnt'>
              <div className='Silver-cnt' style={{border :`2px solid ${colors}`}} ><i class="ri-hand-coin-line"></i></div>
              <div className='golden-cnt'><i class="ri-coin-line"></i></div>
              <div className='dimond-cnt'><i class="ri-copper-diamond-line"></i></div>
            </div>
            <div className='write-up'>
              <p><Button className='btn-silver'></Button>In our hotel , when you place more than 30 orders,
               you become a  silver customer and you can enjoy a 10% discount on each food order</p>
               <p><Button className='btn-gold'></Button>In our hotel , when you place more than 60 orders,
               you become a  Gold customer and enjoy a 15% discount on each food order</p>
               <p><Button className='btn-dimond'></Button>In our hotel , when you place more than 90 orders,
               you become a  Ruby customer and can enjoy a 20% discount on each food order</p>
            </div>
          </div>
          
        </div>
      </Layout>
    </div>
  )
}

export default Profile
