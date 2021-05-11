import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Container, Row, Card } from 'react-bootstrap';
import splashLogo from '../Assets/splashLogo.png'
import eighthNote from '../Assets/Iconography/eighthNote.png'
import './aDashboard.css'

export default function ArtistDashboard() {
  const { artistId }  = useParams()
  const history = useHistory()
  const user = useSelector(state => state.session?.user)
  const [projects, setProjects] = useState([])
  const [artist, setArtist] = useState([])
  const [tracks, setTracks] = useState([])

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/users/${artistId}/projects`);
      const responseData = await response.json();
      setProjects(responseData?.Projects)
      setArtist(responseData?.Artist)
      setTracks(responseData?.Tracks)
    }
      fetchData();
	}, []);
	
	const handleCardClick = (aId, pId) => {
    history.push(`/users/${aId}/projects/${pId}`)
  }


  const projectComponents = projects?.map((project)=>{
    let songCount;
    const findProjectArtwork = (project) => {
        if (project.artwork) return project.artwork
        else return splashLogo
    }
    tracks.forEach((listOfTracks, i)=>{
      if (listOfTracks[i].projectId == project.id){
        songCount = listOfTracks.length
      }
    })
    return (
      <Card key={project.id}>
        <a style={{ cursor: 'pointer' }} onClick={()=> handleCardClick(artist?.id, project?.id)}>
            <Card.Img src={findProjectArtwork(project)} id="card-img" />
              <Card.Body>
                <Card.Title>{project?.name}</Card.Title>
                <span id="track-quantity">
                  <img src={eighthNote} id='eighthNote-icon' />
                  <p id="count">{songCount}</p>
                </span>
              </Card.Body>
        </a>
          </ Card>

		)
  })

    return(
      <>
      <Container id="adash-heading">
          <Row>
            <h1> {artist?.firstName} {artist?.lastName}'s Dashboard </h1>
            <hr/>
          </Row>
      </Container>
      <Container id="adash-main">
        <Container id="adash-flow">
          {projectComponents}
        </Container>
      </Container>
      </>
    )
  }