import React, { useState } from "react";
import  { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { login } from "../../store/session";
import { hideModal } from '../../store/modal'


const ProjectForm = ({ artistId }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState("");
  const [artwork, setArtwork] = useState("");

  const handleProject = async (artistId, e) => {
    e.preventDefault();

    const res = await fetch(`/api/users/${artistId}/projects/create`, {
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

  const updateName = (e) => {
    setName(e.target.value)
  }
  
  const updateArtwork = (e) => {
    setArtwork(e.target.value)
  }

  return (
    <form onSubmit={(e)=> {
    // debugger
    handleProject(artistId, e)
    }}>
      <div>
        {errors.map((error, idx) => (
          <div key={idx}> {error} </div>
        ))}
      </div>
      <div>
      <h3>Submit New Project</h3>
        <label>Project Name</label>
        <input
          name="name"
          type="text"
          placeholder="Name"
          onChange={updateName}
          value={name}
        />
      </div>
      <div>
        <label>Project Artwork</label>
        <input
          name="artwork"
          type="text"
          placeholder="Image Url"
          onChange={updateArtwork}
          value={artwork}
        />
      </div>
        <button type="submit">Create</button>
    </form>
  );
};

export default ProjectForm;
