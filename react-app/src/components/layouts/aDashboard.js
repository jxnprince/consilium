import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Container, Row, Card } from 'react-bootstrap';
import {showModal, hideModal, setCurrentModal} from '../../store/modal'
import ProjectForm from '../Forms/projectForm'
import albumplaceholder from '../Assets/albumplaceholder.png'
import eighthNote from '../Assets/Iconography/eighthNote.png'
import './aDashboard.css'

export default function ArtistDashboard() {
  // debugger
  const { artistId }  = useParams()
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector(state => state.session?.user)
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
	}, []);
	
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
    fetchData()
  }
  
  const handleDelete = async (id) => {
    const response = await fetch(`/api/users/${artistId}/projects/${id}/delete`, {method: 'DELETE'});
    const responseData = await response?.json();
    fetchData()
  }
  
    const goBack =()=>{
      return history.push(`/users/${artistId}/artists`)
  }
  
  const backButton = () =>{
    if (user?.superUser){
    return <button className='arrow' onClick={goBack}><i className="fas fa-arrow-left"></i></button>
    }
    else return <div></div>
  }


  const projectComponents = projects?.map((project)=>{
    let songCount;
      let projectArtwork = project.artwork? project.artwork : albumplaceholder
      
      return (
        <Card key={project.id}>
            <Card.Img src={projectArtwork} id="card-img" style={{ cursor: 'pointer' }} onClick={()=> handleCardClick(artist?.id, project?.id)}/>
              <Card.Body>
                <Card.Title>{project?.name}</Card.Title>
                <span id="track-quantity">
                  <img src={eighthNote} id='eighthNote-icon' />
                  <p id="count">{project.trackCount}</p>
                  <i onClick={()=> handleDelete(project.id)} className="far fa-trash-alt" id='can'></i>
                </span>
              </Card.Body>
          </ Card>
		)
  })

    return(
      <>
      <Container id="adash-heading">
          <Row>
            <h1> {artist?.firstName} {artist?.lastName}'s Dashboard </h1>
            <Row className='plusback'>
              <button onClick={goBack}>
                <i className="fas fa-arrow-left"></i>
              </button>
              <button className="plus" onClick={handleModal}>
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