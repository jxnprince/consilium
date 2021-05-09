import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Redirect } from "react-router-dom";

export default function EngineerDashboard() {
  const { artistId }  = useParams()
  const user = useSelector(state => state.session?.user)
  const [artists, setArtists] = useState([])
  
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/users/${user.id}`);
      const responseData = await response.json();
      setArtists(responseData?.Artists)
    }
      fetchData();
	}, []);

  const artistComponents = artists?.map((artist)=>{
    return (
      <div key={artist?.id}>
        <span>{artist?.firstName}</span>
        <span>{artist?.lastName}</span>
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