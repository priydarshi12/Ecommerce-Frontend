import React from "react";

const FileUpload = () => {


    const fileUploadAndResize=()=>{
       //resize
       //send back to server to upload to clodinary
       //set url to images[] in the parent components -ProductCreate 
    }
  return (
    <div className="row">
      <label className="btn btn-primary">
        Choose File
        <input
          type="file"
          multiple
          hidden
          accept="images/*"
          onChange={fileUploadAndResize}
        />
      </label>
    </div>
  );
};

export default FileUpload;
