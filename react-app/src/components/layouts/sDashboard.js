import React, { useEffect, useState, version } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Redirect } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import UploadFile from '../FileUpload/index'
import AudioPlayer from '../audioPlayer/index'
import {showModal, hideModal, setCurrentModal} from '../../store/modal'
import './sDashboard.css'

export default function SongDashboard(){
  const dispatch = useDispatch()
  const { artistId, projectId, trackId }  = useParams()
  const [artist, setArtist] = useState([])
  const [project, setProject] = useState([])
  const [track, setTrack] = useState([])
  const [versions, setVersions] = useState([])
  const [currentVersion, setCurrentVersion] = useState(versions[0])

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/users/${artistId}/projects/${projectId}/tracks/${trackId}`);
      const responseData = await response.json();
      setArtist(responseData?.Artist)
      setTrack(responseData?.Track)
      setVersions(responseData?.Versions)
      setProject(responseData?.Project)
      setCurrentVersion(responseData?.Versions[0])
    }
      fetchData();
	}, []);

  // useEffect(()=>{
  //   // console.log(artist, "=====ARTIST======")
  //   // console.log(project, "=====PROJECT======")
  //   // console.log(track, "=====TRACK======")
  //   // console.log(versions, "=====VERSIONS======")
  //   // console.log(currentVersion, "=====CURRENT+VERSIONS======")
  // },[artist, project, track, versions, currentVersion])

  const handleVersionChange = (e) => {
    const versionURL = e.target.value
    console.log(e.target.value)
    setCurrentVersion(versionURL)
  }
  
  const uploaderContainer = ()=>{
  return (<UploadFile  artistId={artistId}  projectId={projectId} trackId={trackId}/>)
  }
  
  const handleUpload = () => {
    dispatch(setCurrentModal(uploaderContainer))
    dispatch(showModal())
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
            <button onClick={handleUpload}>
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
            <AudioPlayer url={currentVersion}/>
          </Row>

        <Row>
          {/* <span>{track?.name}</span> */}
          {/* <span>{versions?.length}</span> */}
          <select onChange={handleVersionChange}>
            {versions.map((version, i) => <option value={version.url} key={version.id}>{`Mix no. ${i + 1}`}</option>)}
          </select>
        </Row>
        </Col>
      </Container>
    </>
    )
}