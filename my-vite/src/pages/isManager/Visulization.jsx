import React, { useEffect, useState } from 'react'
import Layout from '../../component/Layout'
import '../../Style/Visulization.css'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../Redux/alertSlice';
import BarChart from '../../component/BarChart';

function Visulization() {

  const [allData, setAllData] = useState([])
  const [daillyData , setDaillyData] = useState(0);
  const [manthData,setmanthdata] = useState([]);
  const [yearData,setyearData] = useState(0);
  const [loding , setloding] = useState(true)
  const dispatch = useDispatch()

  const currentDate = new Date();
  const dates = currentDate.getDate()
  const currenthmanth = new Date()
  const manth =  currenthmanth.getMonth()
  const currentyear = new Date()
  const year = currentyear.getFullYear()
  console.log(manth);

  let priceday = 0;
  let pricemanth = 0;
  let priceyear = 0;

  const getAllfood = async ()=>{

   try {
    dispatch(showLoading())
    const response = await axios.get('/api/user/get-all-oderd-food')

    if(response.data.success){

        setAllData(response.data.data)
        setloding(false)
        dispatch(hideLoading())
        for(let index = 0; index < allData.length  ; index++){

                 if (allData[index].date === dates) {
                     priceday += allData[index].Foodprice;
                   setDaillyData(priceday)
                   
                }
                 if(allData[index].manth === manth+1){
                   pricemanth += allData[index].Foodprice;
                     setmanthdata(pricemanth)
                 }
                 if(allData[index].year === year){
                  priceyear += allData[index].Foodprice;
                    setyearData(priceyear)
  
                }
              
                
            
        }
       
       
    }
   } catch (error) {
    console.log(error);
   }

}

// {allData && 
//   allData.map((food,index)=>{
//     if (allData[index].date === dates) {
//         price = price + allData[index].Foodprice;
//        setDaillyData(price)
       
//     }
//   })
//}

const todayData = ()=>{

  try {
    alert("riched")
  } catch (error) {
    console.log(error);
  }
  
}

// edit delete block/unblock


useEffect(()=>{
getAllfood()
},[loding])

  return (
    <div>
      <Layout>
      <div className='visulization-cnt'>
         <div className='daily-sale' onClick={todayData}> 
            <div className='oder-cnts'>
              <h3>Today sale</h3>
               <h3>{daillyData } $</h3>  
            </div>
            <i class="ri-slideshow-line"></i>
          </div>
          
          <div className='weekly-sale'> 
            <div className='oder-cnts'>
              <h3>monthly sale</h3>
              <h3>{manthData} $</h3>
            </div>
            <i class="ri-percent-line"></i>
          </div>

          <div className='monethly-sale'> 
            <div className='oder-cnts'>
              <h3>yearly sale</h3>
              <h3>{yearData} $ </h3>
            </div>
            <i class="ri-file-chart-line"></i>
          </div>

         
         
      </div>

      <div className='chart-cnt'>  <BarChart /></div>
      </Layout>
    </div>
  )
}

export default Visulization
