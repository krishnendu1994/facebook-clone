import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Typography, IconButton } from "@mui/material";
import { AddAPhoto, Delete, Close } from "@mui/icons-material";

const DragDropUpload = ({ setDragImg }) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
   
  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': [], 'video/*': [] },
    onDrop: (acceptedFiles) => {
      setUploadedFiles((prev) => [
        ...prev,
        ...acceptedFiles.map((file) => ({
          file,
          preview: URL.createObjectURL(file),
          type: file.type.startsWith("video") ? "video" : "image",
        })),
      ]);
    },
  });

  const removeFile = (index) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
    console.log(uploadedFiles);
    
  };

  const HandlecloseImg = () => {
    setDragImg(false);
  };
const rootProps = uploadedFiles.length === 0 ? getRootProps() : {};
  return (
    <Box
      sx={{
        position: "relative",
        border: "1px solid #ccc",
        padding: "10px",
        borderRadius: "10px",
      }}
    >
        {uploadedFiles.length > 0 && (
              <>
                <IconButton
                  sx={{
                    position: "absolute",
                    top: 5,
                    left: 5,
                    p: 1,
                    bgcolor: "rgba(0,0,0,0.6)",
                    color: "white",
                    borderRadius: "10px",
                  }}
                  size="small"
                >
                  <AddAPhoto fontSize="small" />
                  <Box {...getRootProps()} sx={{ fontSize: 17, paddingLeft: "5px" }}>  Add Photos/Videos <input {...getInputProps()} /></Box>
                  
                </IconButton>
              </>
          )}
         <IconButton
        sx={{
          position: "absolute",
          top: 5,
          right: 5,
          bgcolor: "rgba(0,0,0,0.6)",
          color: "white",
          borderRadius: "50%",
        }}
        size="small"
        onClick={HandlecloseImg}
      >
        <Close fontSize="small" />
      </IconButton>

      <Box
        sx={{
          borderRadius: "10px",
          padding: "20px",
          textAlign: "center",
          cursor: "pointer",
          bgcolor: "#f9f9f9",
          "&:hover": { bgcolor: "#f0f0f0" },
        }}
       {...rootProps} 
      >
      {uploadedFiles.length === 0 && (
          <>
            <input {...getInputProps()} />
          </>
        )}
        

        {uploadedFiles.length === 0 ? (
          <>
            <AddAPhoto sx={{ fontSize: 38, color: "#000" }} />
            <Typography variant="body1" mt={1}>
              Add Photos/Videos
            </Typography>
            <Typography sx={{ fontSize: 10, color: "grey" }}>
              or drag and drop
            </Typography>
          </>
        ) : (
          <Box sx={{ display: "flex", gap: 2, overflowX: "auto", p: 1 }}>
            {/* Add Image Button */}
            

            {/* Uploaded Images */}
            {uploadedFiles.map((file, index) => (
              <Box
                key={index}
                sx={{
                  position: "relative",
                  display: "inline-block",
                }}
              >
                {file.type === "image" ? (
                  <img
                    src={file.preview}
                    alt="Preview"
                    style={{ width: "100%", maxHeight: 200, borderRadius: "8px" }}
                  />
                ) : (
                  <video
                    src={file.preview}
                    controls
                    style={{ width: "100%", maxHeight: 200, borderRadius: "8px" }}
                  />
                )}

                {/* Delete Button */}
                <IconButton
                  onClick={() => removeFile(index)}
                  sx={{
                    position: "absolute",
                    top: 5,
                    right: 5,
                    bgcolor: "rgba(0,0,0,0.5)",
                    color: "white",
                    "&:hover": { bgcolor: "red" },
                  }}
                >
                  <Delete />
                </IconButton>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default DragDropUpload;
