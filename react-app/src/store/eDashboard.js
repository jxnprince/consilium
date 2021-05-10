const SET_ARTISTS = "eDashboard/ SET_ARTISTS "

const setArtists = (artists) => ({
  type: SET_ARTISTS,
  artists
})

export const getArtists = (userId) => async (dispatch) =>{
  const response = await fetch(`/api/users/${userId}`)
  if (response.ok){
  const artists = await response.json()
  dispatch(setArtists(artists))
  }
}

export default function eDashboardReducer(state={artists: null}, action){
  switch (action.type){
    case SET_ARTISTS:
      return {...state, artists: action.artists}
    default:
      return state
  }
}