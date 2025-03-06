import React, { useState,useEffect } from 'react';
import Post from '../mini_components/Post';

import Wael from '../../assets/profile/jev.jpg';
import AnimeProf from '../../assets/profile/anime.webp';  
import { Modal, Box, Typography, Button, TextField, IconButton } from "@mui/material";
import { AddPhotoAlternate, EmojiEmotions, PersonAdd } from "@mui/icons-material";
import { Close, Gif, LocationOn, MoreHoriz,ChevronLeft,ArrowDropDown } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import EmojiPicker from 'emoji-picker-react';
import PostModal from '../mini_components/PostModal';
import FeelingModal from '../mini_components/FeelingModal';
import GifModal from '../mini_components/GifModal';
import PostAudienceModal from '../mini_components/PostAudienceModal';
import LocationModal from '../mini_components/LocationModal';
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

const MainContent = ({ setPost }) => {
  const [posts, setPosts] = useState(samplePost);
  const [modalOpen, setModalOpen] = useState(false);
  const [newPost, setNewPost] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [postText, setPostText] = useState("");
  const [selectedBg, setSelectedBg] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [VisibleBg, setVisibleBg] = useState(false);
  const [modalEmojiOpen, setEmojiModalOpen] = useState(false);
  const [modalGifOpen, setGifModalOpen] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [feelingActivity, setFeelingActivity] = useState("");
  const [selectedgif, setGif] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAudienceModal, setShowAudienceModal] = useState(false);
  const [selectedAudience, setSelectedAudience] = useState("friends");

  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const [DragImg, setDragImg] = useState(false);

  const handleSelectLocation = (location) => {
    console.log("Selected location:", location);
    setSelectedLocation(location)
    setLocationModalOpen(false);
    console.log("Selected location:", selectedLocation);
  };


  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => {
    setPostText("");
    setSelectedBg(null);
    setShowEmojiPicker(false);
    setVisibleBg(false);
    setModalOpen(false);
    setSelectedLocation(null);
    setSelectedCategory(null);
    setSearchQuery("");
    setGif("");
    setDragImg(false);
    setEmojiModalOpen(false);
    setGifModalOpen(false);
    setFeelingActivity("");
    setSelectedAudience("friends");
    setLocationModalOpen(false);
  };

  const OpenedMedia =() => {
    handleOpenModal();
    setDragImg(true);
  };
   const OpenedGif =() => {
    handleOpenModal();
    setEmojiModalOpen(true);
  };

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
  // useEffect(() => {
  // if (modalEmojiOpen) {
  //   console.log("yes");
  // }
  // }, [modalEmojiOpen]);
  // useEffect(() => {
  // if (modalGifOpen) {
  //  // console.log("yes");
  // }
  // }, [modalGifOpen]);

// console.log(selectedAudience);
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
          
          <Button onClick={()=> OpenedMedia()} 
            startIcon={<AddPhotoAlternate style={{ color: "#45bd62" }} />} 
            style={{ color: "#333", textTransform: "none", fontWeight: "bold", fontSize: "14px" }}
          >
            Photo/Video
          </Button>
          
          <Button  onClick={()=> OpenedGif()} 
            startIcon={<EmojiEmotions style={{ color: "#f7b928" }} />} 
            style={{ color: "#333", textTransform: "none", fontWeight: "bold", fontSize: "14px" }}
          >
            Feeling/Activity
          </Button>
          
        </div>
      </div>

      {/* Post Modal */}
      <Modal open={modalOpen} onClose={handleCloseModal}>
       <>
    {modalEmojiOpen ? (
      <FeelingModal onSelect={(selected) => {
            setFeelingActivity(selected);
            setEmojiModalOpen(false);
          }} handleCloseModal={handleCloseModal} modalEmojiOpen={modalEmojiOpen} setEmojiModalOpen={setEmojiModalOpen} searchQuery={searchQuery} setSearchQuery={setSearchQuery} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} searchTerm={searchTerm} setSearchTerm={setSearchTerm}
          onClose={() => setShowModal(false)} />
    ): showAudienceModal ? (
      <PostAudienceModal
        onClose={() => setShowAudienceModal(false)}
        onSelect={(value) => {
          setSelectedAudience(value);
          setShowAudienceModal(false);
        }}
      />
    ) 
    : locationModalOpen ? (
      <LocationModal onSelect={handleSelectLocation} setLocationModalOpen={setLocationModalOpen} />
      )
    : modalGifOpen ? ( 
      <GifModal onSelect={(selected) => {
        console.log(selected);
            setGif(selected);
            setGifModalOpen(false);
          }}
        // handleCloseModal={handleCloseModal} 
        modalGifOpen={modalGifOpen} 
        setGifModalOpen={setGifModalOpen} 
      />
    ) : (
      <PostModal feelingActivity={feelingActivity} modalEmojiOpen={modalEmojiOpen} setEmojiModalOpen={setEmojiModalOpen} setPost={setPost} handleCloseModal={handleCloseModal} modalGifOpen={modalGifOpen} setGifModalOpen={setGifModalOpen} showAudienceModal={showAudienceModal} setShowAudienceModal={setShowAudienceModal} selectedAudience={selectedAudience} setSelectedAudience={setSelectedAudience} setGif={setGif} selectedgif={selectedgif} setLocationModalOpen={setLocationModalOpen} locationModalOpen={locationModalOpen} selectedLocation={selectedLocation} DragImg={DragImg} setDragImg={setDragImg} />
    )}
  </>
      </Modal>
      {/* Post List */}
      {samplePost.map((post, index) => (
        <Post key={index} post={post} setPost={setPost} />
      ))}
    </div>
  );
};

export default MainContent;
