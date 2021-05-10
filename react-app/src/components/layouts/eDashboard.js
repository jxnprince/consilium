import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Redirect } from "react-router-dom";

export default function EngineerDashboard() {
  const { artistId }  = useParams()
  const user = useSelector(state => state.session?.user)
  const [artists, setArtists] = useState([])
  const [projects, setProjects] = useState([])
  
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/users/${user.id}`);
      const responseData = await response.json();
      setArtists(responseData?.Artists)
      setProjects(responseData?.Projects)
    }
      fetchData();
	}, []);
  
  const artistComponents = artists?.map((artist)=>{
    let artistId = artist?.id //find projectObj[artistId].length
    let count = 0
    return (
      <div key={artist?.id}>
        {!!projects.forEach((project)=>{
        if (project.artistId == artistId) count++
        })}
        <span>{artist?.firstName} {artist?.lastName} : {count}</span>
      </div>
		)
  })

    if (user?.superUser && user?.id == artistId) {
    return(
      <>
        <h1>{user?.firstName}'s Dashboard</h1>
        <hr/>
        {artistComponents}
      </>
    )
  // } else if (user?.superUser){
  //   return <Redirect to={`/users/${artistId}/artists`} />
  // } else {
  //   return <Redirect to={`/users/${artistId}`} />
  }
}