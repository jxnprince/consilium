import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux";
import { fileUpload } from "../FileUpload/index"


const UploadFile = () => {
	const dispatch = useDispatch()
	const history = useHistory(); // so that we can redirect after the image upload is successful
	const [file, setFile] = useState(null);
	const [fileCreated, setFileCreated] = useState(null);
	const [fileLoading, setFileLoading] = useState(false);
	
	
	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("file", file);
		setFileLoading(true)
		console.log(fileLoading)

		const res = await fetch('/api/files', {
			method: "POST",
			body: formData,
		});

		if (res.ok) {
			await res.json();
			setFileLoading(false);
			history.push("/");  //Wont need to redirect because of Modal?
		}
		else {
			setFileLoading(false);
			console.error("error");
		}
	}
	
	const updateFile = (e) => {
		const file = e.target.files[0];
		setFile(file);
	}
	
	return (
		<form onSubmit={handleSubmit}>
			<input
				type="file"
				accept="image/*"
				onChange={updateFile}
			/>
			<button type="submit">Submit</button>
			{(fileLoading)&& <p>Loading...</p>}
		</form>
	)
}

export default UploadFile;