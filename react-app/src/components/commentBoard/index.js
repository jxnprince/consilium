import React, { useState, useEffect } from 'react'
import  { useDispatch, useSelector } from "react-redux";
import './commentBoard.css'

const CommentBoard = (comments) =>{
  const [commentArray, setCommentArray] = useState([])
  const user = useSelector(state => state?.session?.user);
  
  useEffect(()=>{
    setCommentArray(comments?.comments)
  },[comments])
  
  const deleteComment = () =>{
    return 
  }
  

if (commentArray?.length === 0){

return (
      <div id='comments-container'>
      <h3 id='comment-header'>Notes</h3>
      <div id='inner-comment-container'>
      <hr></hr>
        <p id='no-comments'>No Notes</p>
      </div>
    </div>
)
}else{ 
  return(
    <div id='comments-container'>
    <div id='comment-header'>
      <h3>Notes</h3>
      <hr></hr>
    </div>
      <div id='inner-comment-container'>
        {commentArray && commentArray?.map((comment, i)=>{
          return <p key={i} className='comments'>{comment?.body}{deleteComment}</p>
        })}
      </div>
    </div>
  )
}
}
export default CommentBoard