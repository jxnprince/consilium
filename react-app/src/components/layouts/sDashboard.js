import { Select } from '@material-ui/core';
import React, { useEffect, useState, version } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Redirect } from "react-router-dom";
import UploadFile from '../FileUpload/index'


export default function SongDashboard(){
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

  	  const VersionsComponent = (()=>{
    return (
      <div>
        <span> {track.name} :</span>
        <span>  {versions[track.id]}  </span>
      </div>
		)
  })
  if (versions.length){
    return(
    <>
      <div>
        <span>{track?.name}</span>
        <span>{versions?.length}</span>
        <select onChange={handleVersionChange}>
          {versions.map((version, i) => <option value={version.url} key={version.id}>{`Mix no. ${i + 1}`}</option>)}
        </select>
      </div>
      {/* <UploadFile /> */}
    </>
    )}else{
        return(
    <>
      <div>
        <span>{track?.name}</span>
        <span>No. Of Versions: {versions?.length} </span>
        <select onChange={handleVersionChange}>
          <option value={null} key={version.id}>{`No Mix Versions`}</option>)
        </select>
      </div>
      {/* <UploadFile /> */}
    </>
    )
    }
}