import React, { useState } from "react";
import { useParams } from "react-router-dom"
import  { useSelector } from "react-redux";
import './commentForm.css'

const CommentForm = (currentVersion) => {
  const [errors, setErrors] = useState([]);
  const [body, setBody] = useState('')
  const [version, setVersion] = useState(currentVersion)
  const { artistId, projectId, trackId } = useParams()
  const user = useSelector(state => state.session.user);
  // console.log(currentVersion?.currentVersion)

  const handleComment = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/users/${artistId}/projects/${projectId}/tracks/${trackId}/versions/${currentVersion?.currentVersion}/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ body })
    })
        const comment = await res.json();
        if (comment.errors) {
        const err = new Error('Unauthorized');
        err.errors = user.errors
        throw err
    }
    if (errors.length === 0) {
      window.location.reload()
    }
  };
  
  const updateBody = (e) => {
    setBody(e.target.value)
  }

  return (
    <form onSubmit={handleComment} id='comment-form'>
      <div>
        {errors.map((error, idx) => (
          <div key={idx}> {error} </div>
        ))}
      </div>
      <div>
        <label id='form-text'>Add a note</label>
        <textarea
          id='comment-area'
          name="Comment"
          type="text"
          placeholder="Max 255 characters"
          onChange={updateBody}
          value={body}
        />
      </div>
        <button type="submit" id="submit-btn">Submit</button>
    </form>
  );
};

export default CommentForm;
