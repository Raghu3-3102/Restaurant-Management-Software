import React from 'react'
import { useNavigate,Navigate } from "react-router-dom";

function PublicRoutes(props) {

    const navigate = useNavigate()

    if (localStorage.getItem('token')) {

        console.log(localStorage.getItem('token'));
        return  <Navigate to='/home'/>
    
        
      }
      else{
    
         return props.children;
      }

 
}

export default PublicRoutes;