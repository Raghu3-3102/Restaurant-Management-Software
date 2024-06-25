import React,{useEffect} from 'react'
import {setUser} from '../Redux/userSlice'
import {Navigate,useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios'
import { hideLoading, showLoading } from '../Redux/alertSlice'

function ProtectedRoutes(props){

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const {user,reloadUser} = useSelector((state) => state.user)

    const getData = async ()=>{

        try {

            dispatch(showLoading())
            const response = await axios.post('api/user/get-user-by-id',
            {
                token : localStorage.getItem('token')
            },
            {
                headers : {

                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            }
            )
            dispatch(hideLoading())

            if (response.data.success) {

                dispatch(setUser(response.data.data));
                console.log(response.data.data);
                
            }else{
                localStorage.clear()
                navigate('/Login')
            }
        }
            
      catch (error) {
        dispatch(hideLoading())
        localStorage.clear();
        navigate('/Login');
        }
    

    }

    useEffect(()=>{

        if (!user || reloadUser) {

            getData()

                }
    },[user,reloadUser])
  
    if (localStorage.getItem('token')) {

        return props.children;
        
    }else{

        return navigate('/Login');;

    }


}

export default ProtectedRoutes;