import React from "react";
import Resizer from "react-image-file-resizer"
import axios from "axios"
import { useSelector } from "react-redux";
const FileUpload = () => {

    const {user}=useSelector((state)=>({...state}))
    const fileUploadAndResize=(e)=>{
       //resize
        let files=e.target.files;
        console.log("fileupload",files);
        if(files){
            for(let i=0;i<files.length;i++){
                Resizer.imageFileResizer(
                    files[i],
                    720,
                    720,
                    "JPEG",
                    100,
                    0,
                    (uri) => {
                      console.log(uri);
                    },
                    "base64"
                  );
            }
        }
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
