import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom"
import { useDispatch } from "react-redux";
import { fileUpload } from "../../store/uploads"


const UploadFile = ({artistId, projectId,trackId}) => {
	const dispatch = useDispatch()
	const history = useHistory(); // so that we can redirect after the image upload is successful
	const [file, setFile] = useState(null);
	// const [fileCreated, setFileCreated] = useState(false);
	const [fileLoading, setFileLoading] = useState(false);
	// const { artistId, projectId, trackId } = useParams();
	
	const handleSubmit = async (e) => {
		e.preventDefault();
		setFileLoading(true)
		
		const res = dispatch(fileUpload(file, artistId, projectId,trackId))
			setFileLoading(false);
			// if (createdFile) setFileCreated(true)
			if (res.ok) history.push("/");
			else return {"Errors":"Something went wrong with file upload"}
	}
	
	const updateFile = (e) => {
		const file = e.target.files[0]
		setFile(file);
	}
	
	return (
		<form onSubmit={handleSubmit}>
		<h3> Upload New Mix Version </h3>
			<input
				id="file"
				type="file"
				accept="audio/*"
				onChange={updateFile}
			/>
			{(file)&&<button type="submit">Upload new mix</button>}
			{(fileLoading)&& <p>Loading...</p>}
		</form>
	)
}

export default UploadFile;