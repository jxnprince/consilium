import React, { useEffect, useState, version } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import UploadFile from '../FileUpload/index'
import AudioPlayer from '../audioPlayer/index'
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
      <Container id="sdash-main">
        <Container id="sdash-heading">
        <Col>
          <Row>
            <h2>{track?.name}</h2>
          </Row>
          <Row>
            <button className="arrow" onClick={goBack}>
              <i className="fas fa-arrow-left"></i>
            </button>
            <button className="plus" onClick={handleUpload}>
              <i className="fas fa-plus"></i>
            </button>
          </Row>
        </Col>
          <hr/>
          <Row>
            <h4> {project?.name} | {artist?.firstName} {artist?.lastName} </h4>
          </Row>
        </Container>
    
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
        {currentVersion?.comments && currentVersion.comments.map((comment, i) =>{
        return <p key={i}>{comment?.body}</p>
        })}
        </Row>
        </Col>
      </Container>
    </>
    )
}