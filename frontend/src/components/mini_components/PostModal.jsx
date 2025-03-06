import React, { useState } from 'react';
import Post from '../mini_components/Post';
import Wael from '../../assets/profile/jev.jpg';
import AnimeProf from '../../assets/profile/anime.webp';  
import { Modal, Box, Typography, Button, TextField, IconButton } from "@mui/material";
import { AddPhotoAlternate, EmojiEmotions, PersonAdd } from "@mui/icons-material";
import { Close, Gif, LocationOn, MoreHoriz,ChevronLeft,ArrowDropDown } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import EmojiPicker from 'emoji-picker-react';
import DragDropUpload from "./DragDropUpload";


const backgrounds = [
  null,"#6a0dad", "#ff0000", "#000000", 
  "linear-gradient(45deg, #ff6b6b, #ff4757)", 
  "linear-gradient(45deg, #2ed573, #1e90ff)", 
  "linear-gradient(45deg, #1e90ff, #3742fa)",
  {
    "thumb": "src/assets/img/thumb1.jpg",
    "image_bg":"src/assets/img/bg1.jpg"
  }

];

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

const PostModal = ({ modalEmojiOpen, setEmojiModalOpen, setPost ,feelingActivity,handleCloseModal ,modalGifOpen, setGifModalOpen,showAudienceModal,setShowAudienceModal,selectedAudience,setSelectedAudience,setGif,selectedgif,locationModalOpen,setLocationModalOpen,selectedLocation,setDragImg,DragImg}) => {
  const [posts, setPosts] = useState(samplePost);
  const [modalOpen, setModalOpen] = useState(false);
  const [newPost, setNewPost] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [postText, setPostText] = useState("");
  const [selectedBg, setSelectedBg] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [VisibleBg, setVisibleBg] = useState(false);
  

  const handleOpenModal = () => setModalOpen(true);
 
  const handleEmojiModal = () => {
   // alert(modalEmojiOpen);
    setEmojiModalOpen(!modalEmojiOpen); // Toggle the state
  };
  const handleLocationModal = () => {
   // alert(modalEmojiOpen);
    setLocationModalOpen(!locationModalOpen); // Toggle the state
  };
  const handleGifModal = () => {
   // alert(modalEmojiOpen);
    setGifModalOpen(!modalGifOpen); // Toggle the state
  };
  const handleAudienceModal = () => {
   // alert(modalEmojiOpen);
    setShowAudienceModal(!showAudienceModal); // Toggle the state
  };
  const handleDragImg = () => {
    setDragImg(!DragImg);
  }

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

      
        <Box
          sx={{
            width: 500,
            bgcolor: "white",
            borderRadius: 2,
            boxShadow: 24,
            // p: 2,
            mx: "auto",
            my: "5%",
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

          <hr style={{ border: "0.5px solid #ddd", width: "100%", marginBottom: "5px" }} />


          <Box sx={{ p:0,m:0  }}>
              {/* User Info + Friends Dropdown */}
              <Box sx={{ display: "flex", alignItems: "center", mb: 1, p:1, justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar src="https://via.placeholder.com/40" sx={{ mr: 1 }} />
                  <Box>
                    <span style={{ fontWeight: "bold" }}>Krishnendu Paul {(feelingActivity || selectedLocation) && ` is `}  {feelingActivity} {selectedLocation}</span>
                    <Box onClick={handleAudienceModal}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mt: 0.5,
                        bgcolor: "#f0f2f5",
                        px: 1,
                        py: 0.5,
                        maxWidth:"200px",
                        borderRadius: "8px",
                        fontSize: "14px",
                        cursor: "pointer",
                        fontWeight:"bold"
                      }}
                    >
                      <img
                        src="https://static.xx.fbcdn.net/rsrc.php/v4/yJ/r/zPcex_q0TM1.png" // Friends icon
                        alt="Friends"
                        width="12"
                        height="12"
                        style={{ marginRight: 5 }}
                      />
                      {selectedAudience} <ArrowDropDown style={{ fontSize: "24px",fontWeight: "bold", color: "#000" }} />
                    </Box>
                  </Box>
                </Box>
              </Box>

             <Box sx={{ pb:0,pl:selectedBg ? 0 : 2,pr:selectedBg ? 0 : 2,pt:0 }}>
              {/* Text Input with Background */}
              <div style={{
                    background: selectedBg?.image_bg ? `url(${selectedBg.image_bg}) center/cover no-repeat` : selectedBg || "transparent",
                    borderRadius: selectedBg ? "" : "",
                    minHeight: selectedBg ? "220px" : selectedgif || DragImg ? "60px" : "100px", // Increased to ensure enough space
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    fontSize: "30px",
                    position: "relative", // Needed for absolute positioning inside
                    }}>
                    <TextField
                      multiline
                      fullWidth
                      minRows={selectedBg ? 1 : 3}
                      variant="standard"
                      placeholder="What's on your mind?"
                      InputProps={{
                        disableUnderline: true,
                        sx: {
                          color: selectedBg ? "#fff" : "#000",
                          fontSize: selectedBg ? "37px" : selectedgif || DragImg ? "17px" : "27px",
                          textAlign: selectedBg ? "center" : "",
                          position: "absolute", // Absolute positioning for full centering
                          top: "50%",
                          left: "50%",
                          maxHeight: selectedBg ? "200px" : selectedgif ? "60px" : "", // Limits height
                          overflowY: selectedBg ? "auto" : "",
                          transform: "translate(-50%, -50%)", // Moves it exactly to the center
                          width: "100%",
                          "& textarea": {
                            textAlign: selectedBg ? "center" : "", // Centers the text inside textarea
                            display: "flex",
                            alignItems: selectedBg ? "center": "",
                            justifyContent: selectedBg ? "center" : "",
                            height: "100%",
                          }
                        }
                      }}
                      sx={{
                        border: "none",
                        outline: "none",
                        width: "100%",
                        color: selectedBg ? "#fff" : "#000",
                      }}
                      value={postText}
                      onChange={(e) => setPostText(e.target.value)}
                    />
              </div>
              {/* Display Selected GIF */}
              {selectedgif && (
                <Box sx={{ position: "relative", width: "100%", maxHeight: 200, overflow: "hidden", mb: 2 }}>
                  <img src={selectedgif} alt="Selected GIF" style={{ width: "100%", borderRadius: 8 }} />
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
                    onClick={() => setGif("")}
                  >
                    <Close fontSize="small" />
                  </IconButton>
                </Box>
              )}
              {DragImg && <DragDropUpload setDragImg={setDragImg} /> }
              
              <Box sx={{ mt: 0,mb: 0,ml: selectedBg ? 2 : 0 ,mr: selectedBg ? 2 : 0 }}>
                {/* Parent container to keep both divs in one line */}
                <div 
                  style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "space-between", 
                    gap: "10px",
                    width: "100%" 
                  }}
                >
                  {/* Background Selection */}
                  <div style={{ display: "flex", gap: "10px", overflowX: "auto", marginBottom: "10px", marginTop: "10px" }}>
                     {!DragImg && (
                     <div 
                      onClick={() => setVisibleBg(!VisibleBg)}
                      style={{
                        width: "40px", 
                      height: "40px", 
                      borderRadius: "10px", 
                      cursor: "pointer",
                      background: VisibleBg ? "#ccc" : "url(https://www.facebook.com/images/composer/SATP_Aa_square-2x.png) center/cover", 
                      border: VisibleBg ? "2px solid #ccc" : "0px solid #ccc",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                      
                      }}
                    >
                      <span 
                        style={{
                          fontSize: "18px",
                          fontWeight: "bold",
                          lineHeight: "10px",
                          color: VisibleBg ? "#000" : "#fff",
                          textShadow: VisibleBg ? "": "0px 0px 5px rgba(0, 0, 0, 0.5)"
                        }}
                      >
                       {VisibleBg ? <ChevronLeft style={{ fontSize: "25px", color: "#000" }} /> : "Aa"}
                      </span>
                    </div>
                    )}

                    {VisibleBg && 
                      backgrounds.map((bg, index) => (
                        <div 
                          key={index} 
                          onClick={() => setSelectedBg(bg)}
                          style={{
                            width: "40px", 
                            height: "40px", 
                            borderRadius: "10px", 
                            cursor: "pointer",
                            background: bg?.thumb ? `url(${bg.thumb}) center/cover` : bg, 
                            border: selectedBg === bg ? "3px solid #000" : "2px solid #ccc"
                          }}
                        ></div>
                      ))
                    }
                  </div>

                  

                  {/* Emoji Button Section */}
                  <div style={{  position: "relative" }}>
                    <IconButton style={{ backgroundColor: "transparent", padding: "5px" }} onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                      <EmojiEmotions style={{ color: "#000",fontSize: "33px"  }} />
                    </IconButton>
                    {showEmojiPicker && (
                      <div 
                        style={{ 
                          position: "absolute", 
                          bottom: "-77px", 
                          left: "61px", 
                          zIndex: 9999 ,
                        }}
                      >
                        <EmojiPicker onEmojiClick={(e) => setPostText(postText + e.emoji)} />
                      </div>
                    )}
                  </div>
                </div>
              </Box>

            </Box>
            
          {/* Add to Post Options */}
          

          
            <Box sx={{ mt:0,ml:2,mr:2,mb:2 }}>
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
                    mb: 0

                  }}
                >
                  <Typography sx={{ fontWeight: "bold" }}>Add to Your Post</Typography>
                  <Box sx={{ display: "flex", mb:0 }}>
                    <IconButton disabled={selectedBg}  sx={{ opacity: selectedBg ? 0.5 : 1, cursor: selectedBg ? "not-allowed" : "pointer"}} onClick={handleDragImg}><AddPhotoAlternate style={{ color: "#45bd62" }} /></IconButton>
                    {/*<IconButton><PersonAdd style={{ color: "#f02849" }} /></IconButton>*/}
                    <IconButton disabled={selectedBg}  sx={{ opacity: selectedBg ? 0.5 : 1, cursor: selectedBg ? "not-allowed" : "pointer"}} onClick={handleGifModal}><Gif style={{ color: "#00b2ff" }} /></IconButton>
                    <IconButton onClick={handleEmojiModal}><EmojiEmotions style={{ color: "#f7b928" }} /></IconButton>
                    <IconButton onClick={handleLocationModal}><LocationOn style={{ color: "#f5533d" }} /></IconButton>
                    {/*<IconButton><MoreHoriz /></IconButton>*/}
                  </Box>
                </Box>

                {/* Post Button */}
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 1,
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
        </Box>
     
     
   
  );
};

export default PostModal;
