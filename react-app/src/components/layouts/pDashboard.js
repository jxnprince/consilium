import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import splashLogo from '../Assets/splashLogo.png'
import sixteenthNote from '../Assets/Iconography/sixteenthNote.png'
import './pDashboard.css'

export default function ProjectDashboard(){
  const { artistId, projectId }  = useParams()
  const history = useHistory()
  const [versions, setVersions] = useState([])
  const [tracks, setTracks] = useState([])
  const [project, setProject] = useState([])
  const [artist, setArtist] = useState([])
    
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/users/${artistId}/projects/${projectId}`);
      const responseData = await response.json();
      setVersions(responseData?.Versions)
      setTracks(responseData?.Tracks)
      setProject(responseData?.Project)
      setArtist(responseData?.Artist)
    }
      fetchData();
	}, []);
	
	useEffect(()=>{
	// console.log(artist)
	// console.log(project)
	// console.log(tracks)
	// console.log(versions)
	},[tracks,project, artist])
	
		const handleTrackClick = (trackId) => {
    history.push(`/users/${artistId}/projects/${projectId}/tracks/${trackId}`)
  }
	
	  const TracksComponent = tracks?.map((track)=>{
    return (
      <Row key={track?.id} onClick={()=> handleTrackClick(track.id)} className="track-rows">
        <span> {track.name} 
              <span>
                <img src={sixteenthNote} id="sixteenthNote-icon"/>  
                {versions[track.id]}  
              </span>
        </span>
      </Row>
		)
  })

  return(
  <>
    <Container id="pdash-heading">
      <Row>
        <h2>{project?.name}</h2>
      </Row>
      <hr/>
      <Row>
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