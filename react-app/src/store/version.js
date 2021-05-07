const UPLOAD_FILE = "versions/UPLOAD_FILE";
const RENDER_MUSIC = "versions/RENDER_MUSIC";

const uploadVersion = (file) => ({
    type: UPLOAD_FILE,
    file
})

const renderVersion = (url) => ({
    type: RENDER_MUSIC,
    url
})


export const fileUpload = (submission) => async (dispatch) => {
    const { url } = submission
    const formData = new FormData()
    formData.append("url", url) 

    const response = await fetch('/api/files/', {
        method: "POST",
        body: formData
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(uploadVersion(data))
        return 
    }

}

export default function versionReducer(state = { post: null, posts: null }, action) {
    switch (action.type) {
        case UPLOAD_FILE:
            return { ...state, post: action.payload };
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