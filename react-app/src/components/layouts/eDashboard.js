import React, { useEffect, useState } from 'react';
import { Container, Row, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux'
// import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import splashLogo from '../Assets/splashLogo.png'
import quarterNote from '../Assets/Iconography/quarterNote.png'
import './eDashboard.css'

export default function EngineerDashboard() {
  // const { artistId }  = useParams()
  const history = useHistory()
  const user = useSelector(state => state.session?.user)
  const [artists, setArtists] = useState([])
  const [projects, setProjects] = useState([])
  useEffect(()=>{ if (!user?.superUser)history.push(`/users/${user?.id}`) },[user])
  
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/users/${user.id}`);
      const responseData = await response.json();
      setArtists(responseData?.Artists)
      setProjects(responseData?.Projects)
    }
      fetchData();
	}, []);
  
  const handleCardClick = (id) => {
    history.push(`/users/${id}`)
  }
  
  const artistComponents = artists?.map((artist, i)=>{
    let artistId = artist?.id //find projectObj[artistId].length
    let count = 0
    return (
      <Card key={i}>
        {!!projects.forEach((project)=>{
        if (project.artistId === artistId) count++
        })}
        <div style={{ cursor: 'pointer' }} onClick={()=> handleCardClick(artist.id)}>
            <Card.Img src={splashLogo} id="card-img" />
              <Card.Body>
                <Card.Title>{artist?.firstName} {artist?.lastName}</Card.Title>
                <span id="project-quantity">
                  <img src={quarterNote} id='quarterNote-icon' />
                  <p id="count">{count}</p>
                </span>
              </Card.Body>
        </div>
          </ Card>
		)
  })


    return(
      <>
      <Container id="edash-heading">
          <Row>
            <h1> {user?.firstName}'s Dashboard </h1>
            <hr/>
          </Row>
      </Container>
        <Container id="edash-main">
          <Container id="edash-flow">
            {artistComponents}
          </Container>
        </Container>
      </>
    )
}