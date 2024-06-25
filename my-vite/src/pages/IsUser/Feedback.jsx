import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Button, TextField, Typography } from '@mui/material';
import '../../Style/Feedback.css'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import Layout from '../../component/Layout'
import { Axios } from 'axios';
import { changeConfirmLocale } from 'antd/es/modal/locale';

const StarContainer = styled('div')({
    display: 'flex',
    fontSize:'50px',
    gap: '5px',
    marginTop: '10px',
  });

  const comments = [
    { rating: 5, comment: 'Excellent food and service!' },
    { rating: 4, comment: 'Great experience, will visit again.' },
    { rating: 3, comment: 'Good food but service was slow.' },
    { rating: 4, comment: 'Great experience, will visit again.' },
    { rating: 3, comment: 'Good food but service was slow.' },
  ];
  
  const Star = styled('span')(({ theme, filled }) => ({
    fontSize: '24px',
    color: filled ? '#ffc107' : '#e0e0e0',
    cursor: 'pointer',
    '&:hover': {
      color: '#ffcd38',
    },
  }));

function Feedback() {

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [commentreal,setCommentreat] = useState([])
    const [comments,setComments] = useState([])
    const [slideIndex, setSlideIndex] = useState(0)
    const {user} = useSelector((state)=> state.user)

    const navigate = useNavigate()
  
    const handleStarClick = (index) => {
      setRating(index + 1);
    };
  
    const handleCommentChange = (event) => {
      setComment(event.target.value);
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      console.log('Rating:', rating);
      console.log('Comment:', comment);
      const username = user.name;
      const useremail = user.email;
      // You can submit the rating and comment to a server or perform other actions here
      try {
        const response = await axios.post('api/user/feedback',
    {
        rating,
        comment,
        username,
        useremail,


        
    })

    if (response.data.success) {
        toast.success(response.data.message)
        navigate('/Home')
    }else{
        toast.error("Something went wrong")
        navigate('/Home')
    }

      } catch (error) {
      console.log(error);
      }
    };

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 0; i < rating; i++) {
          stars.push(<span key={i}>&#9733;</span>);
        }
        return stars;
      };

    useEffect(() => {
        const interval = setInterval(() => {
          setSlideIndex((prevIndex) => (prevIndex + 1) % comments.length);
        }, 1000);
    
        return () => clearInterval(interval);
      }, []);


      const getFeedback = async () =>{
        try {
            const response = await axios.get('api/user/response-feedback')
        if (response.data.success) {
            setComments(response.data.data)
            setCommentreat(response.data.data)
        }
        } catch (error) {
            console.log(error);
        }
      }

      var i = 0;

      const changeToggleleft = ()=>{

        i++;

        setComments(commentreal[i])

        

      
      


      }


      useEffect(()=>{
        getFeedback()
      },[])

  return (
    <Layout>
      <div>
      <Typography variant="h4" style={{textAlign:"center", color:"black"}} gutterBottom>
        Feedback
      </Typography>
      <p style={{margin:"30px 40px", color:'black'}}>Feedback is crucial for FoodAdda's continuous improvement.
         We value your input to enhance our menu, service, and overall dining experience.
          With a commitment to excellence,
           our chefs create delectable dishes using fresh ingredients. 
           Our attentive staff ensures a seamless and enjoyable visit. 
        Share your thoughts to help us serve you better. Thank you for choosing FoodAdda.</p>
        <hr />
        <div className="slider-container">
          
      {comments.map((comment, index) => (
        <div
          key={index}
          
          className="card-slide"
          style={{ transform: `translateX(${(index - slideIndex) * 100}%)` }}
        >
          <div className="card">
            <div  style={{color:"black"}}>{comment.username}</div>
            {/* <div style={{color:"black"}}>{comment.useremail}</div> */}
            <div className="rating">{renderStars(comment.rating)}</div>
            <div className="comment" style={{color:"black"}}>{comment.comment}</div>
            <div className='toogle'>
            {/* <div className='toogle-left'>
              
              </div>
              <div className='toogle-right'>
              <i class="ri-skip-right-line"></i>
            </div> */}
            <i class="ri-arrow-left-s-fill" ></i>
          <i class="ri-arrow-right-s-fill"></i>
            </div>
          </div>
        
        </div>
      ))}
     
    </div>

    <hr />
      <form onSubmit={handleSubmit}>
        <StarContainer>
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              filled={index < rating}
              onClick={() => handleStarClick(index)}
            >
              &#9733;
            </Star>
          ))}
        </StarContainer>
        <TextField
          label="Comment"
          multiline
          rows={4}
          fullWidth
          value={comment}
        style={{border:"2px solid white"}}
          onChange={handleCommentChange}
          variant="outlined"
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Submit Feedback
        </Button>
      </form>
    </div>
    </Layout>
  )
}

export default Feedback
