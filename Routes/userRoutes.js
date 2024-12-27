const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
require('dotenv').config()
const foods = require("../model/FoodModel");
const show_oder = require("../model/Oder_show")
const auth = require("../Auth_middile_were/auth_middile_were");
const Feedback = require('../model/Feedback')
const employe = require('../model/Career')
const nodemailer = require('nodemailer')

router.post("/register", async (req, res) => {
  // try {

    try {

    const existUser = await User.findOne({ email: req.body.email });

    if (existUser) {
      return res.status(200).send({
        message: "User allready Exist",
        success: false,
      });
    }

    const passward = req.body.passward;
    const salt = await bcrypt.genSalt(10);
    const hashedpassward = await bcrypt.hash(passward, salt);
    req.body.passward = hashedpassward;

    const userData = new User(req.body);
    const saveData = await userData.save();

    res.status(200).send({
      messege: "succesfully registerd",
      success: true,
      data: saveData,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const userd = await User.findOne({ email: req.body.email });

    if (!userd) {
      return res
        .status(200)
        .send({ message: "user does not exist", success: false });
    }

    const ismatch = await bcrypt.compare(req.body.passward, userd.passward);

    if (!ismatch) {
      return res
        .status(200)
        .send({ message: "passward incorrect", success: false });
    } else {
      const token = jwt.sign({ id: userd._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      res
        .status(200)
        .send({ message: "longin sucessfully", success: true, data: token });
    }
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .send({ message: "login failed", success: false, error });
  }
});

router.post("/change-passward", async (req, res) => {
  const userData = await User.findOne({ email: req.body.email });

  if (!userData) {
    return res
      .status(200)
      .send({ messege: "user does not exist", success: false });
  }

  if (userData.bestfriendname === req.body.bestfriendname) {
    const id = userData._id;

    const passward = req.body.passward;
    const salt = await bcrypt.genSalt(10);
    const hashedpassward = await bcrypt.hash(passward, salt);
    req.body.passward = hashedpassward;

    const updatePassward = await User.findByIdAndUpdate(
      id,
      { passward: req.body.passward },
      { new: true }
    );

    if (!updatePassward) {
      return res
        .status(200)
        .send({ messege: "passward not updated", success: false });
    } else {
      return res.status(200).send({
        messege: "passward  updated",
        success: true,
        data: updatePassward,
      });
    }
  } else {
    res
      .status(200)
      .send({ messege: "Best Friend Name not matched", success: false });
  }
});

router.get("/get-all-user", async (req, res) => {
  try {
    const userData = await User.find({});
    if (!userData) {
      return res.status(200).send({ message: "no user found", success: false });
    } else {
      res
        .status(200)
        .send({ message: "user found", success: true, data: userData });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "user does not exist", success: false });
  }
});

router.post("/get-user-by-id", auth, async (req, res) => {
  try {
    const userData = await User.findOne({ _id: req.body.userId });
    
    if (!userData) {
      return res
        .status(200)
        .send({ message: "user not exist", success: false });
    } else {
      return res
        .status(200)
        .send({ message: "sucess", success: true, data: userData });
    }
  } catch (error) {
    res.status(500).send({ message: "user does not exist", success: false });
  }
});
router.post("/get-user-by-userid", async (req, res) => {
  try {
    const userData = await User.findOne({ _id: req.body.userId });
    console.log(`from get-user-info ${req.body.userId}`);
    if (!userData) {
      return res
        .status(200)
        .send({ message: "user not exist", success: false });
    } else {
      return res
        .status(200)
        .send({ message: "sucess", success: true, data: userData });
    }
  } catch (error) {
    res.status(500).send({ message: "user does not exist", success: false });
  }
});

router.post("/food-register", async (req, res) => {
  try {
    console.log("riched");

    const foodChek = await foods.findOne({ foodname: req.body.foodname });
    if (foodChek) {
      return res.status(200).send({
        message: "food Registerd",
        success: false,
      });
    }

    const foodData = new foods(req.body);
    const saveFood = await foodData.save();

    if (!saveFood) {
      return res.status(200).send({
        message: "Internal error",
        success: false,
      });
    }

    res.status(200).send({
      message: "Succesfully registerd",
      success: true,
      data: saveFood,
    });
  } catch (error) {
    console.log(" riched" + error);
  }
});

router.get("/get-food", async (req, res) => {
  try {
    const foods_data = await foods.find({});
   

    res.status(200).send({
      message: "succesfully delaiverd",
      success: true,
      data: foods_data,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/get-food-by-name", async (req, res) => {
  try {
    let foodSmall = req.body.parentFood.toLowerCase();

    const foodname = await foods.find({ parentFood: foodSmall });
    console.log(`foods ${req.body.parentFood}`);
    if (foodname) {
      return res.status(200).send({
        message: "Your food",
        success: true,
        data: foodname,
      });
    } else {
      return res.status(200).send({
        message: "Sorry this food is not present",
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/get-recomentation", async (req, res) => {
  try {
    const recomentationData = await foods.find({ recomentation: true });
    res.status(200).send({
      message: "food",
      success: true,
      data: recomentationData,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/get-info-id", async (req, res) => {
  console.log(req.body.foodid);
  try {
    const response = await foods.findOne({ _id: req.body.foodid });
    return res.status(200).send({
      message: "Food get",
      success: true,
      data: response,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/Oder-food", async (req, res) => {
  console.log("yserhkjbwkjfqie kfb3iff1;h3oif qhfqhfwfhwfh "+req.body.userid);

  try {
             
    const user = await User.findOne({ _id: req.body.userid });
    const food = await foods.findOne({ _id: req.body.foodid });
  console.log(user);
    const dataTosave = {
      foodname: `${food.foodname}`,
      aboutfood: `${food.aboutFood}`,
      username: `${user.name}`,
      userid : `${user._id}`,
      date  : `${req.body.date}`,
      manth : `${req.body.manth}`,
      year : `${req.body.year}`,
      Foodprice : `${req.body.price}`,
      quntety:`${req.body.quntety}`,
      booked_date:`${req.body.booked_date}`,
      booked_time : `${req.body.booked_time}`,
      address : `${req.body.address}`,
      phoneno : `${req.body.phoneno}`,


    };

    const count_food = food.numberoftimesOder;
    const count_oder = user.Nooftimefoododerd;
    const updatecount = await foods.findByIdAndUpdate(req.body.foodid,{numberoftimesOder:count_food+1})
    const updateoder = await User.findByIdAndUpdate(req.body.userid,{Nooftimefoododerd:count_oder+1})
    
    const datas = new show_oder(dataTosave)
    const saved = await datas.save()


    const oder_user = await User.findOne({isManager:true})
    console.log("cheking user come"+oder_user);
    const isNotifications = oder_user.isNotification;
    console.log(isNotifications);
    isNotifications.push({
     type: "your-oder-accepted",
     message: `${user.name} is oder a ${food.foodname} `,
     data :req.body.date,
     onClickpath: "/Home",
    });
    const task =  await User.findByIdAndUpdate(oder_user._id,{isNotification : isNotifications})
   
    if (!saved) {
      return(
        res.status(200).send({
          message:"internal error",
          success : false


        })
      )
      }
      res.status(200).send({
        message:"data saved",
        success : true,
        data : saved,


      })

  } catch (error) {
    console.log(error);
  }
});

router.get("/get-oderd-food", async (req, res) => {
  try {
    const AllOderfood = await show_oder.find({dileverd:false});
    res.status(200).send({
      message: "all food",
      success: true,
      data: AllOderfood,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/food-dilever", async (req,res)=>{

try {
  const isFooddileverd = await show_oder.findByIdAndUpdate(req.body._id,{dileverd:true},{new : true});
  if (!isFooddileverd) {
   return(
     res.status(200).send(
       {
         message : "Internal serveral prblem",
         success : false
       }
       )
   )
  }

  const oder_user = await User.findOne({_id:req.body.userid})
  console.log("cheking user come"+oder_user);
  const isNotifications = oder_user.isNotification;
  console.log(isNotifications);
  isNotifications.push({
   type: "your-oder-accepted",
   message: `Your request will dilverd on ${req.body.booked_date} at ${req.body.booked_time},  enjoye your food `,
   data :req.body.date,
   onClickpath: "/Home",
  });

 const task =  await User.findByIdAndUpdate(oder_user._id,{isNotification : isNotifications})
  console.log("check the fucking task "+ task);

  res.status(200).send(
   {
     message : "Succesfully updated",
     success : true,
     data : isFooddileverd,
   }
   )
 
  

} catch (error) {
  console.log(error);
}
 

})

router.post("/food-not-diliverd", async (req,res)=>{

  try {
    const isFooddileverd = await show_oder.deleteOne({_id : req.body._id});
    if (!isFooddileverd) {
     return(
       res.status(200).send(
         {
           message : "Internal serveral prblem",
           success : false
         }
         )
     )
    }
  
    const oder_user = await User.findOne({_id:req.body.userid})
    console.log("cheking user come"+oder_user);
    const isNotifications = oder_user.isNotification;
    console.log(isNotifications);
    isNotifications.push({
     type: "your-oder-deleted",
     message: `Sorry ${req.body.username} at prsent we not able to make ${req.body.foodname} we will refund your ammount very soon `,
     data :req.body.date,
     onClickpath: "/Home",
    });
  
   const task =  await User.findByIdAndUpdate(oder_user._id,{isNotification : isNotifications})
    console.log("check the fucking task "+ task);
  
    res.status(200).send(
     {
       message : "Succesfully deleted",
       success : true,
       data : isFooddileverd,
     }
     )
   
    
  
  } catch (error) {
    console.log(error);
  }
   
  
  })

router.post('/delete-noti', async (req,res)=>{
  console.log(req.body.userindex);
  const usernoti = await User.findOne({_id:req.body.user._id})
  usernoti.isNotification.splice(req.body.userindex,1);
//   console.log(usertobedelete);
//  usertobedelete.isNotification[req.body.userindex] = Null;
 const updateuser = await usernoti.save()
 res.status(200).send({
  success: true,
  message: " notification is deleted",
  
});
})

router.post("/get-notification",async (req,res)=>{
console.log("get-user-id-by-notificaton "+ req.body._id);
  const userNotification = await User.findOne({_id:req.body._id})
  console.log(userNotification);
  if (!userNotification) {
    return(
      res.status(200).send(
        {
          message: "not found",
          success : false
        }
        )
    )
  }
  res.status(200).send(
    {
      message: "found",
      success : true,
      data:userNotification
    })

})

router.get("/get-all-oderd-food", async (req, res) => {
  try {
    const currentDate = new Date();
    const dates = currentDate.getDate()
    console.log(dates);
    const AllOderfood = await show_oder.find({});
    res.status(200).send({
      message: "all food",
      success: true,
      data: AllOderfood,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/get-data-to-show",async(req,res)=>{

 try {
  const totaluser = await User.countDocuments();
  const totaloder = await show_oder.countDocuments();
  if (!totaluser || !totaloder) {

   return(   res.status(200).send(
      {
        message:"no data found",
        success:false
      }
      ))
    
  }

  res.status(200).send(
    {
      message:"data found",
      success:true,
      data : [totaluser,totaloder]
    }
    )
  
 } catch (error) {
    console.log(error);
 }


})

router.post('/delete-food-item',async(req,res)=>{

 try {
  const foodinfo = await foods.deleteOne({_id:req.body._id});
  if (!foodinfo) {

    return(
      res.status(200).send({
        success:false,
        message: "not delted",
        data:foodinfo
      })
    )
    
  }

  res.status(200).send({
    success:true,
    message: "delted",
    data:foodinfo
  })
 } catch (error) {
  console.log(error);
 }
  

})

router.post('/blocked-food-items',async (req,res)=>{

 try {

  const chechblockedstatud = await foods.findOne({_id:req.body._id})

  if (chechblockedstatud.isBlocked === true ) {
    return(
      res.status(200).send({
        success:false,
        message: "food is allready blocked",
        data:chechblockedstatud
      })
    )
  }

  
  const blockeddata = await foods.findByIdAndUpdate(req.body._id,{isBlocked:true},{new : true})
  if (!blockeddata) {
    return(
      res.status(200).send({
        success:false,
        message: "not blocked",
        data:blockeddata
      })
    )
  }

  res.status(200).send({
    success:true,
    message: "food blocked",
    data:blockeddata
  })



 } catch (error) {
  console.log(error);
 }


})

router.post('/unblocked-food-items',async (req,res)=>{

  try {

    const chechblockedstatud = await foods.findOne({_id:req.body._id})

    if (chechblockedstatud.isBlocked == false ) {
      return(
        res.status(200).send({
          success:false,
          message: "food is allready unblocked",
          data:chechblockedstatud
        })
      )
    }
   
   const unblockeddata = await foods.findByIdAndUpdate(req.body._id,{isBlocked:false},{new : true})
   if (!unblockeddata) {
     return(
       res.status(200).send({
         success:false,
         message: "not unblocked",
         data:unblockeddata
       })
     )
   }
 
   res.status(200).send({
     success:true,
     message: "food unblocked",
     data:unblockeddata
   })
 
 
 
  } catch (error) {
   console.log(error);
  }
 
 
 })

 router.post('/get-dinner',async (req,res)=>{

  try {

    const dinnnerdata = await foods.find({parentFood:req.body.foodsnames})
    if(!dinnnerdata){
      return(
        res.status(200).send({
          message:"data nt found",
          success:false
        })
      )
    }

    res.status(200).send({
      message:"enjoy your dinner found",
      success:true,
      data : dinnnerdata,
    })
  } catch (error) {
    console.log(error);
  }

 })

 router.post('/add-to-cart',async (req,res)=>{

  try {
    
    const addtocart = await User.findOne({_id:req.body.userid})
    const addtocarttopush = addtocart.add_to_cart;
    addtocarttopush.map((value)=>{
          if (value == req.body._id) {
           return(
            res.status(200).send(
              {
                success:true,
                message:"Allready you liked this",
                data:addtocart
              }
              )
           )
          }
    })
    addtocarttopush.push(req.body._id)

      const savetask = await User.findByIdAndUpdate(addtocart._id,{add_to_cart:addtocarttopush})

      if (!savetask) {
        return(
          res.status(200).send(
            {
              success:false,
              message:"Interna serverl error"
            }
            )
        )
        
      }

      res.status(200).send(
        {
          success:true,
          message:"liked succesfully",
          data:savetask,
        }
        )


  } catch (error) {
    console.log(error);
  }

 })

 router.post('/add-to-cart-delete',async (req,res)=>{

  const addtocart = await User.findOne({_id:req.body.userid})
  const indexofcart = addtocart.add_to_cart;
// let count = 0;
//   indexofcart.map((value)=>{
//           if(value == req.body._id){
//            count++;
//           }
//   })

  

  const index = indexofcart.indexOf(req.body._id)
  console.log(index);
  const deletcart = indexofcart.splice(index,1);
  const saveData = await addtocart.save()

  if (index < 0) {
    return(
      res.status(200).send(
        {
          message:"You are not liked this food",
          success:true
        }
        )
    )
  }

  if (!saveData) {
    return(
      res.status(200).send(
        {
          message:"internal server error",
          success:false
        }
        )
    )
  }
  res.status(200).send(
    {
      message:"remove from like",
      success:true,
      data:deletcart
    }
    )

 })

 router.post('/get-cart-items', async (req,res)=>{

   try {

    const getUserData = await User.findOne({_id:req.body._id})
   const cart_data = getUserData. add_to_cart;

   const cart_datas = await foods.find({_id:{$in:cart_data}})
   console.log(cart_datas);

   if (!cart_datas) {
    return (
       res.status(200).send(
        {
          message:"thare are no data",
          success:false
        }
        )
      )
   }

   res.status(200).send(
    {
      message:"You liked food found",
      success:true,
      data:cart_datas
    }
    )

    
   } catch (error) {
    console.log(error);
   }
  
  

   

 })

 router.post('/feedback', async (req,res)=>{

  const userFeedback = new Feedback(req.body)
  const saveFeedback = await userFeedback.save()

  if (!saveFeedback) {
    return res.status(200).send({
      message: "Internal error",
      success: false,
    });
  }

  res.status(200).send({
    message: "Your feedback is sucessfully register",
    success: true,
    data: saveFeedback,
  });

 })

 router.get('/response-feedback', async (req,res)=>{

 try {
  const feedback_data = await Feedback.find({})
  if(!feedback_data){
    return(res.status(200).send({
      message: "Internal error",
      success: false,
    }))
    
  }

  
  res.status(200).send({
    message: "",
    success: true,
    data: feedback_data,
  });

 } catch (error) {
  console.log(error);
 }


 })

 router.get("/get-oderd-food-selles", async (req, res) => {
  try {
    const AllOderfood = await show_oder.find({dileverd:true});
    res.status(200).send({
      message: "all food",
      success: true,
      data: AllOderfood,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/save-career-data", async (req,res)=>{

  try {
    
  const userFeedback = new employe(req.body)
  const saveFeedback = await userFeedback.save()

  if (!saveFeedback) {
    return res.status(200).send({
      message: "Internal error",
      success: false,
    });
  }

  res.status(200).send({
    message: " apllication  sucessfully applyed",
    success: true,
    data: saveFeedback,
  });
  } catch (error) {
    console.log(error);
  }


})

router.get("/get-request-for-employe",async (req,res) => {

     try {
      const careerData = await employe.find({})

     if (!careerData) {

      return(
        res.status(200).send({
            message: "Something went wrong",
            success: false,
          
      } )
      )
      
     }

     
  res.status(200).send({
    message: "",
    success: true,
    data: careerData,
  });
     } catch (error) {
      console.log(error);
     }



})


router.get("/get-oderd-food-by-date", async (req, res) => {
  try {

    const currentDate = new Date();
      const dates = currentDate.getDate()
      console.log(dates);

    const AllOderfood = await show_oder.find({finaldileverd:false});
    res.status(200).send({
      message: "all food",
      success: true,
      data: AllOderfood,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/food-dilever-final", async (req,res)=>{

  try {
    const isFooddileverd = await show_oder.findByIdAndUpdate(req.body._id,{finaldileverd:true},{new : true});
    if (!isFooddileverd) {
     return(
       res.status(200).send(
         {
           message : "Internal serveral prblem",
           success : false
         }
         )
     )
    }
  
    const oder_user = await User.findOne({_id:req.body.userid})
    console.log("cheking user come"+oder_user);
    const isNotifications = oder_user.isNotification;
    console.log(isNotifications);
    isNotifications.push({
     type: "your-oder-accepted",
     message: `Your ${req.body.foodname} will dilverd at ${req.body.booked_time},  enjoye your food `,
     data :req.body.date,
     onClickpath: "/Home",
    });
  
   const task =  await User.findByIdAndUpdate(oder_user._id,{isNotification : isNotifications})
    console.log("check the fucking task "+ task);
  
    res.status(200).send(
     {
       message : "Succesfully updated",
       success : true,
       data : isFooddileverd,
     }
     )
   
    
  
  } catch (error) {
    console.log(error);
  }
   
  
  })

  router.post("/employe-approved", async (req,res)=>{

    try {
      const isuseriapproved = await User.findByIdAndUpdate(req.body.applicentid,{isManager:true},{new : true});
      if (!isuseriapproved) {
       return(
         res.status(200).send(
           {
             message : "Allredy approved",
             success : false
           }
           )
       )
      }

      const currentDate = new Date();
      const dates = currentDate.getDate()
      
    
      const oder_user = await User.findOne({_id:req.body.applicentid})
      console.log("cheking user come"+oder_user);
      const isNotifications = oder_user.isNotification;
      console.log(isNotifications);
      isNotifications.push({
       type: "your-oder-accepted",
       message: `Conrats you to become part of our orgnization`,
       data :dates,
       onClickpath: "/Home",
      });
    
     const task =  await User.findByIdAndUpdate(oder_user._id,{isNotification : isNotifications})
      console.log("check the fucking task "+ task);
    
      res.status(200).send(
       {
         message : "Succesfully updated",
         success : true,
         data : isuseriapproved,
       }
       )
     
       console.log(isuseriapproved);
      
    
    } catch (error) {
      console.log(error);
    }
     
    
    })

    router.post('/get-oder-by-date', async (req,res)=>{
     try {
      
      const OderData = await show_oder.find({booked_date : req.body.date})

      if (!OderData) {
        return(
          res.status(200).send({
            success : false,
            message : "Enter server error"
          })
        )
      }

      res.status(200).send({
        success : true,
        message : `${req.body.date} oder list`,
        data : OderData,
      })

     } catch (error) {
      console.log(error);
     }
    })

    router.post('/reservation', async  (req,res) => {
      
      const reservation = new show_oder(req.body)
      const canfirmreservation = await reservation.save();

      if (!canfirmreservation) {
        
        return(
          res.status(200).send({
            success:false,
            
          })
        )

      }

      res.status(200).send({
        success:true,
        
      })

    })

module.exports = router;
