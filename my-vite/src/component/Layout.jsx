import React, { useEffect, useState } from 'react'
// import '../App.css'
import '../Layout.css'
import '../Layout.css'
import {useSelector} from 'react-redux'
import {Link,useLocation,useNavigate} from 'react-router-dom'
import { Badge } from 'antd'

// Assume this function is called after the user logs in successfully
function loginSuccess() {
  // Perform any necessary actions after login
  // For example, update UI, fetch data, etc.

  // Reload the page after a short delay (e.g., 1 second)
  setTimeout(() => {
      location.reload();
  }, 1000); // 1000 milliseconds = 1 second
}




function Layout({children}) {

  const {user} = useSelector((state) => state.user)
  console.log(user);
  const location = useLocation()
  const navigate = useNavigate()
  const [menutoberander,setmenutoberander] = useState([])
  const [credential,showcredential] = useState([])

  let isActive = true;

  const isUaser = [

    {
      name :"home",
      onclick : '/Home',
      icon : 'ri-home-2-line'
    },
    {
      name: "Career",
      onclick: "/Career",
      icon: "ri-hospital-line",
    },
    {
      name: "Reservation",
      onclick: "/Reservation",
      icon: "ri-git-repository-commits-line",
    },
    {
      name :"Our Best",
      onclick : '/best',
      icon : "ri-arrow-right-circle-line"
    },
    {
      name : "profile",
      onclick : `/profile`,
      icon : "ri-user-follow-line"
    },
    {
      name : "Feedback",
      onclick : `/Feedback`,
      icon : "ri-feedback-line"
    },
  ]

  const isManager = [

    {
      name :"Home",
      onclick : '/Home',
      icon : 'ri-home-2-line'
    },
    {
      name :"Order",
      onclick : '/oder',
      icon : "ri-exchange-dollar-line"
    },
    {
      name : "Visulization",
      onclick : '/visulization',
      icon : "ri-bar-chart-grouped-line"
    },
    {
      name : "  Manage Item",
      onclick : '/Add-item',
      icon : "ri-add-circle-line"
    },
    {
      name : "Message",
      onclick : '/messege',
      icon : "ri-message-3-line"
    },
    {
      name : "Sales",
      onclick : '/salles',
      icon : "ri-bar-chart-horizontal-line"
    },
    {
      name : "Feedback",
      onclick : `/Feedback`,
      icon : "ri-feedback-line"
    },
  ]

  const isAdmin = [

    {
      name :"home",
      onclick : '/Home',
      icon : 'ri-home-2-line'
    },
    {
      name :"oder",
      onclick : '/oder',
      icon : "ri-exchange-dollar-line"
    },
    {
      name : "Visulization",
      onclick : '/visulization',
      icon : "ri-bar-chart-grouped-line"
    },
    {
      name : "manage employe",
      onclick : '/Admin',
      icon : "ri-add-circle-line"
    },
    {
      name : "Feedback",
      onclick : `/Feedback`,
      icon : "ri-feedback-line"
    },
  ]


  

   useEffect(()=>{

     setmenutoberander(user?.isadmin ? isAdmin : user?.isManager ? isManager : isUaser)
     showcredential(user?.isadmin ? "Admin" : user?.isManager ? "Manager" : "Uaser")
    
   },[user])
   
   
   
   

    

   

    
  

 


  return (
    <div>
      <div className='cnt-nav'>
        <div className='heaiding'><i class="ri-map-pin-user-line">{user?.name}</i><p> </p> 
        <p className='user'>{credential}</p></div>
        <p style={{margin:"9px"}}>Overview</p>
        <hr />
         {user && menutoberander.map((menu,index)=>{
           isActive = location.pathname === menu.onclick;
          return(
          
            <div className={`nav-items ${isActive && `bg-clr`}`}>
              <Link to={menu.onclick} className='icon-cnt' style={{textDecoration:"none"}}>
                <i class={menu.icon}></i>
                <div className='text-menu'>{menu.name}</div> 
              </Link>
              
             
            </div>
            
          )
         })}
         
         {/* <div className= 'nav-items'>
          <div>
            <Badge count={user?.isNotification.length }  onClick = {()=>navigate(`/Notify`)  } className='icon-cnt'> 
             <i className="ri-notification-line "></i> 
             <div className='text-menu'>Notification</div> 
               </Badge> 
            
              
          </div>
         </div> */}
         {/* <p style={{margin:"4px",marginBottom:"12px"}}>Logout and Notification</p> */}
         {/* <div className='nav-items'>
           <div className='icon-cnt'> <i class="ri-message-3-line"></i>
            <div className='text-menu'>messege</div> 
            </div>
            </div> */}

<div className= 'nav-items'>
          <div>
            <Badge count={user?.isNotification.length }  onClick = {()=>navigate(`/Notify`)  } className='icon-cnt'> 
             <i className="ri-notification-line "></i> 
             <div className='text-menu'>Notification</div> 
               </Badge> 
            
              
          </div>
         </div>
         <hr />
            {/* <div className='nav-items'>
           <div className='icon-cnt' > <i class="ri-bar-chart-horizontal-line"></i>
            <div className='text-menu'>selles</div> 
            </div>
            </div> */}
             <div className='nav-items'>
           <div className='icon-cnt' onClick={()=>{
             localStorage.clear()
             window.location.reload();

             navigate('/Login')
            }}> <i class='ri-login-circle-line'></i>
            <div className='text-menu'>Logout</div> 
            </div>
            {/* <div className='text'></div> */}

         </div>
      </div>
      <div className='body'>{children}</div>
      
      

    </div>
  )
}

export default Layout;
