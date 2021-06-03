import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom"; import { Container, Row, Col } from 'react-bootstrap';
import {showModal, hideModal, setCurrentModal} from '../../store/modal'
import TrackForm from '../Forms/trackForm'
import splashLogo from '../Assets/splashLogo.png'
import sixteenthNote from '../Assets/Iconography/sixteenthNote.png'
import './pDashboard.css'

export default function ProjectDashboard(){
  const history = useHistory()
  const dispatch = useDispatch()
  const { artistId, projectId }  = useParams()
  const [versions, setVersions] = useState([])
  const [tracks, setTracks] = useState([])
  const [project, setProject] = useState([])
  const [artist, setArtist] = useState([])

  async function fetchData() {
    const response = await fetch(`/api/users/${artistId}/projects/${projectId}`);
    const responseData = await response.json();
    setVersions(responseData?.Versions)
    setTracks(responseData?.Tracks)
    setProject(responseData?.Project)
    setArtist(responseData?.Artist)
  }

  useEffect(() => {
      fetchData();
	}, []);
	
	
	  const form = () => {
  return (
    <TrackForm artistId={artistId} projectId={projectId}/>
  )}
	
	const handleModal = () =>{
	  dispatch(setCurrentModal(form))
	  dispatch(showModal())
	}
	
	const handleDelete = async (aId, pId, tId) =>{
	const response = await fetch(`/api/users/${aId}/projects/${pId}/tracks/${tId}/delete`, {method: 'DELETE'});
  const responseData = await response?.json();
  fetchData()
	}
	
	const goBack =()=>{
	  return history.push(`/users/${artistId}/`)
	}
	
		const handleTrackClick = (trackId) => {
    history.push(`/users/${artistId}/projects/${projectId}/tracks/${trackId}`)
  }
	
	  const TracksComponent = tracks?.map((track)=>{
    return (
      <Row key={track?.id} className="track-rows">
              <div>
                <i onClick={()=> handleDelete(artist.id, project.id, track.id)} className="far fa-trash-alt"></i>
              </div>

              <span id='track' onClick={()=> handleTrackClick(track.id)}>
              <span id='trackName'>
                {track.name} 
              </span>
                <img src={sixteenthNote} id="sixteenthNote-icon"/>  
                {versions[track.id]}
              </span>
      </Row>
		)
  })

  return(
  <>
    <Container id="pdash-heading">
      <Row >
        <h1>{project?.name}</h1>
      </Row>
        <Row className='plusback'>
        <div id="arrow">
            <i className="fas fa-arrow-left arrow" onClick={goBack}></i>
        </div>
        <div id="plus">
            <i className="fas fa-plus plus" onClick={handleModal}></i>
        </div>
        </Row>
      <hr/>
      <Row id="subheading">
        <h2> {artist?.firstName} {artist?.lastName} </h2>
      </Row>
    </Container>
      
    <Container id="pdash-main">
      <Col id="pdash-flow">
        {TracksComponent}
      </Col>
    </Container>
  </>
  )
}