import React, { useState } from 'react'
import '../Style/Oder_pay.css'
// import img01 from '../Image/Burger_2.jpg'

import { useNavigate } from 'react-router-dom';
import Book_food from '../pages/IsUser/Book_food';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

function Oder_pay({foods,index }) {
  const {user} = useSelector((state)=>state.user)
  console.log(index);
  const navigate = useNavigate()
  const [addcart,setAddcart] = useState(false)
  const [colorslike,setColorslike] = useState('white')
  const [colordislike,setcolordislike] = useState('white')

  console.log(foods);
  let count = 0;

  for(let i =0; i<user?.add_to_cart.length;i++){
    if (user.add_to_cart[i] == foods._id) {
      // setColorslike('green')
      console.log("yes");
      count++;
      break;
    }
  }



  count = 0;

  const Setlikes = async (foods)=>{
    foods.userid = `${user._id}`
    console.log(foods);
    console.log(foods);
   
      try {
     
      
        const response = await axios.post('/api/user/add-to-cart',foods)
        if (response.data.success) {
          toast.success(response.data.message)
          setColorslike('green')
          setcolordislike('white')
          setAddcart(true)
        
        }else{
          toast.error('somthong went wrong')
        }
  
      } catch (error) {
        console.log(error);
      }

      

    // else{


    //   try {

    //     const response = await axios.post('/api/user/add-to-cart-delete',foods)
    //     if (response.data.success) {
    //       toast.success(response.data.message)
    //       setAddcart(false)
    //       setColors('white')
    //     }else{
    //       toast.error('somthong went wrong')
    //     }
        
    //   } catch (error) {
    //     console.log(error);
    //   }



  
    // }
   

   

    
  }

  const setDislike = async (foods)=>{

    foods.userid = `${user._id}`
    console.log(foods);

    try {

      const response = await axios.post('/api/user/add-to-cart-delete',foods)
      if (response.data.success) {
        toast.success(response.data.message)
        setAddcart(false)
        setColorslike('white')
        setcolordislike('red')
      }else{
        toast.error('somthong went wrong')
      }
      
    } catch (error) {
      console.log(error);
    }

  }

  

  // for (let index = 0; index < user?.add_to_cart.length; index++) {
    
  
  //   if (user.add_to_cart[index] === foods?._id) {
  //     console.log("o got it bro"+user.add_to_cart[index]);
       
  //   }
    
  // }
  

  return (
    <div>
     <div className='food-card' >
       <div className='image-cnt' onClick={()=>navigate(`/Book_food/${foods._id}`)}>
        <img src={foods.foodimage} alt='img' />
      </div>
       <div className='text-cnt' onClick={()=>navigate(`/Book_food/${foods._id}`)}>
       <div>Name : {foods.foodname}</div>
      <div>Price : {foods.foodPrice} rs</div>
      {/* <p>Food Count : {foods.numberoftimesOder}</p>
      <p>Food meterials : {foods.aboutFood}</p> */}
       </div>   
       <div className='like-cnt'>
       <h4 onClick={()=>Setlikes(foods)} style={{color:colorslike}} ><i class="ri-thumb-up-fill"></i></h4> 
       <h5 onClick={()=>setDislike(foods)} style={{color:colordislike}} ><i class="ri-thumb-down-fill"></i></h5> 
        </div> 
      </div> 
      
    </div>
  )
}

export default Oder_pay;


