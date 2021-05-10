import React,{ useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'

export default function SplashLayout () {
  const user = useSelector(state => state.session.user)
return(
<div>
    <h1>{user?.firstName}</h1>
</div>
)
}
