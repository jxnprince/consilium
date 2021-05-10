import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Redirect } from "react-router-dom";

export default function ProjectDashboard(){
  const { artistId, projectId }  = useParams()
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
	
	  const TracksComponent = tracks?.map((track)=>{
    return (
      <div key={track?.id}>
      <span> {track.name} :</span>
      <span>  {versions[track.id]}  </span>
      </div>
		)
  })

  return(
  <>
    <h2>{project?.name}</h2>
    <h2>{artist?.firstName} {artist?.lastName}</h2>
    <hr/>
    {TracksComponent}
  </>
  )
}