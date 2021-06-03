import React, { useEffect, useState, version } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import UploadFile from '../FileUpload/index'
import AudioPlayer from '../audioPlayer/index'
import CommentBoard from '../commentBoard/index'
import CommentForm from '../Forms/commentForm'
import {showModal, hideModal, setCurrentModal} from '../../store/modal'
import './sDashboard.css'

export default function SongDashboard(){
  const dispatch = useDispatch()
  const history = useHistory()
  const { artistId, projectId, trackId }  = useParams()
  const [artist, setArtist] = useState([])
  const [project, setProject] = useState([])
  const [track, setTrack] = useState([])
  const [versions, setVersions] = useState([])
  const [currentVersion, setCurrentVersion] = useState({})

  async function fetchData() {
    const response = await fetch(`/api/users/${artistId}/projects/${projectId}/tracks/${trackId}`);
    const responseData = await response.json();
    setArtist(responseData?.Artist)
    setTrack(responseData?.Track)
    setProject(responseData?.Project)
    setVersions(responseData?.Versions)
    setCurrentVersion(responseData?.Versions[0])
  }

  useEffect(() => {
      fetchData();
	}, [hideModal]);
	

  // let player = <AudioPlayer url={currentVersion.url}/>

  const handleVersionChange = (e) => {
    const i = e.target.value
    setCurrentVersion(versions[i])
  }
  
  const uploaderContainer = ()=>{
  return (<UploadFile  artistId={artistId}  projectId={projectId} trackId={trackId}/>)
  }

  const handleUpload = () => {
    dispatch(setCurrentModal(uploaderContainer))
    dispatch(showModal())
  }
  
  const goBack =()=>{
    return history.push(`/users/${artistId}/projects/${project.id}`)
  }

    return(
    <>
        <Container id="sdash-heading">
          <Row>
            <h1>{track?.name}</h1>
          </Row>
          <Row className='plusback'>
            <div id="arrow">
                <i className="fas fa-arrow-left arrow" onClick={goBack}></i>
            </div>
            <div id="plus">
                <i className="fas fa-plus plus" onClick={handleUpload}></i>
            </div>
          </Row>
          <hr/>
          <Row id="subheading">
            <h2> {project?.name} | {artist?.firstName} {artist?.lastName} </h2>
          </Row>
        </Container>
    
      <Container id="sdash-main">
        <Col>
          <Row id="audio-player-container">
            {<AudioPlayer url={currentVersion.url}/>}
          </Row>

        <Row id="version-select">
          <select onChange={handleVersionChange}>
            {versions.map((version, i) => {
              return <option value={i} key={i}>{`Mix no. ${i + 1}`}</option>
            })}
          </select>
        </Row>
        <Row>
        <CommentBoard comments={currentVersion?.comments} />
        <CommentForm currentVersion={currentVersion?.id}/>
        </Row>
        </Col>
      </Container>
    </>
    )
}