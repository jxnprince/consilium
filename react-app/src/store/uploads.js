import { hideModal } from './modal'

const UPLOAD_FILE = "versions/UPLOAD_FILE";
const RENDER_FILE = "versions/RENDER_FILE";

const uploadFile = (url) => ({
		type: UPLOAD_FILE,
		url
})

// const renderVersion = (url) => ({
//     type: RENDER_FILE,
//     url
// })

// "/users/:id/projects/:id/tracks/:id"
export const fileUpload = (file, artistId, projectId, trackId) => async (dispatch) => {
		const formData = new FormData()
		formData.append("file", file)
		const response = await fetch(`/api/users/${artistId}/projects/${projectId}/tracks/${trackId}/versions/new`, {
				method: "POST",
				body: formData,
		});
		if (response.ok) {
				const url = await response.json();
				console.log(url)
				dispatch(uploadFile(url))
				dispatch(hideModal())
				window.location.reload()
		}else{
				return {"Errors": "Could not contact server"}
		}
}

export default function uploadReducer(state = { url: null }, action) {
		switch (action.type) {
				case UPLOAD_FILE:
						return { ...state, url: action.url };
				default:
						return state
		}
}

// export const commentOnVersion = (params) => async dispatch => {
//     const {user_id, post_id, comment} = params
//     const response = await fetch(`/api/posts/${post_id}/comments`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//             user_id,
//             comment,
//         }),
//     });
//     const data = await response.json
//     return
// }


// export const deleteAComment = (commentId) => async dispatch => {
//     const response = await fetch(`api/posts/comments/${commentId}`, {
//         method: "DELETE",
//         commentId,
//     })

//     const data = await response.json()
//     return
// }