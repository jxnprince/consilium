import React, { useState } from "react";
import  { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { login } from "../../store/session";
import { hideModal } from '../../store/modal'


const TrackForm = ({artistId, projectId}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState("");

  const handleTrack = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/users/${artistId}/projects/${projectId}/tracks/new`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
    })
        const project = await res.json();
        if (project.errors) {
        const err = new Error('Unauthorized');
        err.errors = user.errors
        throw err
    }
    if (errors.length === 0) {
      dispatch(hideModal())
      window.location.reload()
    }
  };
  
  const updateName = (e) => setName(e.target.value)

  return (
    <form onSubmit={handleTrack}>
      <div>
        {errors.map((error, idx) => (
          <div key={idx}> {error} </div>
        ))}
      </div>
      <div>
      <h3>Submit new Track</h3>
        <label>Track Name</label>
        <input
          name="name"
          type="text"
          placeholder="Name"
          onChange={updateName}
          value={name}
          autoComplete="on"
        />
      </div>
        <button type="submit">Create</button>
    </form>
  );
};

export default TrackForm;
