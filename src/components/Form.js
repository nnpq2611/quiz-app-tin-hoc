import React from "react";
import axios from "axios";

const Form = () => {
  // a local state to store the currently selected file.
  const [selectedFile, setSelectedFile] = React.useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile);
    try {
      await axios({
        method: "post",
        url: "http://localhost:8000/questions/",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  return (
    <form className="form-up-load" onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileSelect} />
      <input type="submit" value="Upload File" />
    </form>
  );
};

export default Form;
