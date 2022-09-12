import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Form = () => {
  // a local state to store the currently selected file.
  const [selectedFile, setSelectedFile] = React.useState(null);
  const navigate = useNavigate();
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile);

    await axios({
      method: "post",
      url: "http://localhost:8000/questions/",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        navigate("/")
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <form className="form-up-load" onSubmit={handleSubmit}>
      <p>Select docx file to create test</p>
      <input type="file" onChange={handleFileSelect} />
      <input type="submit" value="Upload File" />
    </form>
  );
};

export default Form;
