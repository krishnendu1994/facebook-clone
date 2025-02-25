import React, { useState } from 'react';
import Post from '../mini_components/Post';
import Wael from '../../assets/profile/jev.jpg';
import AnimeProf from '../../assets/profile/anime.webp';  
import { Modal, Box, Typography, Button, TextField, IconButton } from "@mui/material";
import { AddPhotoAlternate, EmojiEmotions, VideoCameraBack } from "@mui/icons-material";
import { Close, Gif, LocationOn, MoreHoriz } from "@mui/icons-material";
import { Avatar } from "@mui/material";


const samplePost = [{
  author: 'John Gyu',
  date: 'May 15, 2024',
  content: 'Hola amigas',
  image: AnimeProf,
  video: '',
  profile: AnimeProf,
  likes:'6.1m',
  comments:'16.3m',
  share:'5.41m'
},
{
  author: 'John Gyu',
  date: 'April 15, 2024',
  content: 'Wazzapp!',
  image: Wael,
  profile: AnimeProf,
  video: '',
  likes:'16.3m',
  comments:'1.3m',
  share:'3.21m'
},
{
  author: 'Naruto Wael',
  date: 'June 21, 2024',
  content: 'saminamina eh eh waka waka ey eh.',
  image: '',
  video: '',
  profile: Wael,
  likes:'2.4m',
  comments:'200.2k',
  share:'124k'
},
{
  author: 'Naruto Wael',
  date: 'May 15, 2024',
  content: 'Hutao Animation',
  image: '',
  video: '',
  youtube:<iframe style={{width:'100%',aspectRatio:'16/9'}} src="https://www.youtube.com/embed/wfNkEZ12CpE" title="Lapu-Lapu Cinematic  3D animation Short Clip" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>,
  profile: Wael,
  likes:'4.2m',
  comments:'210.2k',
  share:'324k'
}
];

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 3,
  textAlign: "center",
};

const MainContent = ({ setPost }) => {
  const [posts, setPosts] = useState(samplePost);
  const [modalOpen, setModalOpen] = useState(false);
  const [newPost, setNewPost] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [postText, setPostText] = useState("");

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handlePostSubmit = () => {
    if (newPost.trim() === "" && !selectedFile) return;

    const newPostObj = {
      author: "Your Name",
      date: new Date().toLocaleDateString(),
      content: newPost,
      image: selectedFile ? URL.createObjectURL(selectedFile) : "",
      video: "",
      profile: AnimeProf,
      likes: "0",
      comments: "0",
      share: "0",
    };

    setPosts([newPostObj, ...posts]);
    setNewPost("");
    setSelectedFile(null);
    handleCloseModal();
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  return (
    <div style={{ padding: '20px', minWidth:'350px', maxWidth:'550px', width:'100%', marginLeft:'auto', marginRight:"auto" }}>
      
      {/* Post Box (Like Facebook's "What's on your mind?") */}
      <div
        style={{
          background: "#fff",
          padding: "10px",
          borderRadius: "10px",
          marginBottom: "20px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', cursor: "pointer" }} onClick={handleOpenModal}>
          <img
            src={AnimeProf}
            alt="Profile"
            style={{ width: "40px", height: "40px", borderRadius: "50%", marginRight: "10px" }}
          />
          <input
            type="text"
            placeholder="What's on your mind?"
            readOnly
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "20px",
              fontSize:"15px",
              border: "none",
              outline: "none",
              cursor: "pointer",
              backgroundColor:"#f0f2f5"
            }}
          />
        </div>
        
        {/* New Facebook-style buttons */}
         <div style={{ 
          display: "flex", 
          justifyContent: "space-around", 
          alignItems: "center",
          marginTop: "10px",
          padding: "10px 0",
          borderTop: "1px solid #ddd"
        }}>
          
          <Button 
            startIcon={<AddPhotoAlternate style={{ color: "#45bd62" }} />} 
            style={{ color: "#333", textTransform: "none", fontWeight: "bold", fontSize: "14px" }}
          >
            Photo/Video
          </Button>
          
          <Button 
            startIcon={<EmojiEmotions style={{ color: "#f7b928" }} />} 
            style={{ color: "#333", textTransform: "none", fontWeight: "bold", fontSize: "14px" }}
          >
            Feeling/Activity
          </Button>
          
        </div>
      </div>

      {/* Post Modal */}
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            width: 500,
            bgcolor: "white",
            borderRadius: 3,
            boxShadow: 24,
            // p: 2,
            mx: "auto",
            my: "10%",
            outline: "none",
            display: "flex",
            flexDirection: "column",
          }}>
          {/* Header */}
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", p:2, pb: 1, position: "relative" }}>
            <h3 style={{ margin: 0, textAlign: "center", flex: 1 }}>Create Post</h3>
            <IconButton onClick={handleCloseModal} sx={{ position: "absolute", right: 0 }}>
              <Close />
            </IconButton>
          </Box>

          <hr style={{ border: "0.5px solid #ddd", width: "100%", marginBottom: "10px" }} />


          <Box sx={{ p:2 }}>
              {/* User Info + Friends Dropdown */}
              <Box sx={{ display: "flex", alignItems: "center", mb: 2, justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar src="https://via.placeholder.com/40" sx={{ mr: 1 }} />
                  <Box>
                    <span style={{ fontWeight: "bold" }}>Krishnendu Paul</span>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mt: 0.5,
                        bgcolor: "#f0f2f5",
                        px: 1,
                        py: 0.5,
                        borderRadius: "8px",
                        fontSize: "14px",
                        cursor: "pointer",
                      }}
                    >
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/847/847969.png" // Friends icon
                        alt="Friends"
                        width="16"
                        height="16"
                        style={{ marginRight: 5 }}
                      />
                      Friends ▼
                    </Box>
                  </Box>
                </Box>
              </Box>

              {/* Input Field */}
              <TextField
                multiline
                fullWidth
                rows={3}
                placeholder="What's on your mind, Krishnendu?"
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                  sx: { fontSize: "20px" },
                }}
                inputProps={{
                  style: { fontSize: "24px", color: "#000" },
                }}
                sx={{
                  border: "none",
                  outline: "none",
                  mb: 2,
                }}
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
              />

              {/* Add to Your Post Section */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  bgcolor: "#fff",
                  borderRadius: "10px",
                  border:"1px solid #ccd0d5",
                  padding: "10px",
                  mb: 2,
                }}
              >
                <Typography sx={{ fontWeight: "bold" }}>Add to Your Post</Typography>
                <Box sx={{ display: "flex", gap: "10px" }}>
                  <IconButton><AddPhotoAlternate style={{ color: "#45bd62" }} /></IconButton>
                  <IconButton><VideoCameraBack style={{ color: "#f02849" }} /></IconButton>
                  <IconButton><Gif style={{ color: "#00b2ff" }} /></IconButton>
                  <IconButton><EmojiEmotions style={{ color: "#f7b928" }} /></IconButton>
                  <IconButton><LocationOn style={{ color: "#f5533d" }} /></IconButton>
                  <IconButton><MoreHoriz /></IconButton>
                </Box>
              </Box>

              {/* Post Button */}
              <Button
                fullWidth
                variant="contained"
                sx={{
                  mt: 2,
                  bgcolor: postText ? "#1877F2" : "#B8D3FC",
                  color: "white",
                  textTransform: "none",
                  fontWeight: "bold",
                }}
                disabled={!postText}
              >
                Post
              </Button>
          </Box>
        </Box>
      </Modal>
      {/* Post List */}
      {samplePost.map((post, index) => (
        <Post key={index} post={post} setPost={setPost} />
      ))}
    </div>
  );
};

export default MainContent;
