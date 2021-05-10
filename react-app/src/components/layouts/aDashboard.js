import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Redirect } from "react-router-dom";

export default function ArtistDashboard() {
  const { artistId }  = useParams()
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


  const projectComponents = projects?.map((project)=>{
    let songCount;
    tracks.forEach((listOfTracks, i)=>{
      if (listOfTracks[i].projectId == project.id){
        songCount = listOfTracks.length
      }
    })
    return (
      <div key={project?.id}>
        <span> {project?.name} </span>
        <span> {songCount} </span>
      </div>
		)
  })

    return(
      <>
        <h1>{artist?.firstName}  {artist.lastName}'s Dashboard</h1>
        <hr/>
        {projectComponents}
      </>
    )
  }