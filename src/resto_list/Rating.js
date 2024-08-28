import React from "react";

export default function Rating ({rating}){
        const stars =[];
        for(let i = 0; i < 5; i++){
            if (i < Math.floor(rating)){
                stars.push(<i key = {i} className="fas fa-star text-yellow-400"></i>);
            } 
            else if(i < rating){
                stars.push(<i key={i} className="fas fa-star-half-alt text-yellow-400"></i>);
            }
            else{
                stars.push(<i key={i} className="far fa-star text-yellow-400"></i>)
            }
        }
        return <span>{stars}</span>
    
}