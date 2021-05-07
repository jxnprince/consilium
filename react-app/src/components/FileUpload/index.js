import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux";
import { fileUpload } from "../../store/uploads"


const UploadFile = () => {
	const dispatch = useDispatch()
	const history = useHistory(); // so that we can redirect after the image upload is successful
	const [file, setFile] = useState(null);
	// const [fileCreated, setFileCreated] = useState(false);
	const [fileLoading, setFileLoading] = useState(false);
	
	
	const handleSubmit = async (e) => {
		e.preventDefault();
		setFileLoading(true)
		
		const createdFile = dispatch(fileUpload(file))
			setFileLoading(false);
			// if (createdFile) setFileCreated(true)
			if (createdFile) history.push("/");  //Wont need to redirect because of Modal?
			else return {"Errors":"Something went wrong with file upload"}
	}
	
	const updateFile = (e) => {
		const file = e.target.files[0]
		setFile(file);
	}
	
	return (
		<form onSubmit={handleSubmit}>
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