import React, { useState } from 'react'
import './starRatting.css'
import { FaStar } from 'react-icons/fa'

const StarRatting = () => {
    const [ratting,setRatting]= useState(null)
    const [starHover,setStarHover]= useState(null)


  return (
    <div>
         {[...Array(5)].map((star,index)=>{
        const courentRat = index+1
        return(
            <label>
                <input type='radio' name='rating' value={courentRat} onClick={()=>setRatting(courentRat)}/>

                <FaStar 
                color={courentRat <= (ratting || starHover) ? "yellow" : null}
                className='star'
                 size={30}

                 onMouseEnter={()=>setStarHover(courentRat)}
                 onMouseLeave={()=>setStarHover(null)}
                 
                 
                 />



            </label>
        )
    })}
    </div>
  )
}

export default StarRatting
