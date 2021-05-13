import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Container, Row, Card } from 'react-bootstrap';
import {showModal, hideModal, setCurrentModal} from '../../store/modal'
import ProjectForm from '../Forms/projectForm'
import splashLogo from '../Assets/splashLogo.png'
import eighthNote from '../Assets/Iconography/eighthNote.png'
import './aDashboard.css'

export default function ArtistDashboard() {
  // debugger
  const { artistId }  = useParams()
  const dispatch = useDispatch()
  const history = useHistory()
  // const user = useSelector(state => state.session?.user)
  const [projects, setProjects] = useState([])
  const [artist, setArtist] = useState([])

  async function fetchData() {
    const response = await fetch(`/api/users/${artistId}/projects`);
    const responseData = await response.json();
    setProjects(responseData?.Projects)
    setArtist(responseData?.Artist)
  }
  
  useEffect(() => {
      fetchData();
	}, [dispatch, projects]);
	
	const handleCardClick = (aId, pId) => {
    history.push(`/users/${aId}/projects/${pId}`)
  }
  const form = () => {
  return (
    <ProjectForm artistId={artistId}/>
  )}
  
  const handleModal = () =>{
    dispatch(setCurrentModal(form))
    dispatch(showModal())
  }


  const projectComponents = projects?.map((project)=>{
    let songCount;
      const findProjectArtwork = (project) => {
        if (project.artwork) return project.artwork
        else return splashLogo
      }
      return (
        <Card key={project.id}>
        <a style={{ cursor: 'pointer' }} onClick={()=> handleCardClick(artist?.id, project?.id)}>
            <Card.Img src={findProjectArtwork(project)} id="card-img" />
              <Card.Body>
                <Card.Title>{project?.name}</Card.Title>
                <span id="track-quantity">
                  <img src={eighthNote} id='eighthNote-icon' />
                  <p id="count">{project.trackCount}</p>
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
            <Row>
              <button onClick={handleModal}>
                <i className="fas fa-plus"></i>
              </button>
            </Row>
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