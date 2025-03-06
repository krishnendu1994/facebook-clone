import React, { useState } from "react";
import {
  SentimentSatisfied,
  SentimentDissatisfied,
  Favorite,
  Mood,
  EmojiEmotions,
  ChevronLeft,
  DirectionsRun,
  Fastfood,
  Headset,
  SportsEsports,
  Search,ChevronRight,Close
} from "@mui/icons-material";
import { Box, IconButton, Typography, Button, Tabs, Tab,TextField,InputAdornment } from "@mui/material";

const feelings = [
  { category: "Feeling", name: "Happy", emoji: "😊" },
  { category: "Feeling", name: "Sad", emoji: "😢" },
  { category: "Feeling", name: "Loved", emoji: "❤️" },
  { category: "Feeling", name: "Excited", emoji: "🤩" },
  { category: "Feeling", name: "Angry", emoji: "😠" },
  { category: "Feeling", name: "Tired", emoji: "😴" },
  { category: "Feeling", name: "Sick", emoji: "🤒" },
  { category: "Feeling", name: "Confused", emoji: "😕" },
  { category: "Feeling", name: "Grateful", emoji: "🙏" },
  { category: "Feeling", name: "Shy", emoji: "😊" },
  { category: "Feeling", name: "Proud", emoji: "😌" },
  { category: "Feeling", name: "Bored", emoji: "😐" },
  { category: "Feeling", name: "Hopeful", emoji: "🤞" },
  { category: "Feeling", name: "Scared", emoji: "😨" },
  { category: "Feeling", name: "Surprised", emoji: "😲" },
  { category: "Feeling", name: "Lonely", emoji: "😔" },
  { category: "Feeling", name: "Embarrassed", emoji: "😳" },
  { category: "Feeling", name: "Frustrated", emoji: "😤" },
  { category: "Feeling", name: "Guilty", emoji: "😞" },
  { category: "Feeling", name: "Ashamed", emoji: "😖" },
  { category: "Feeling", name: "Jealous", emoji: "😒" },
  { category: "Feeling", name: "Relieved", emoji: "😌" },
  { category: "Feeling", name: "Confident", emoji: "😏" },
  { category: "Feeling", name: "In Love", emoji: "😍" },
  { category: "Feeling", name: "Peaceful", emoji: "☮️" },
  { category: "Feeling", name: "Depressed", emoji: "😞" },
  { category: "Feeling", name: "Curious", emoji: "🤔" },
  { category: "Feeling", name: "Overwhelmed", emoji: "😵" },
  { category: "Feeling", name: "Mischievous", emoji: "😜" },
  { category: "Feeling", name: "Worried", emoji: "😟" },
  { category: "Feeling", name: "Nervous", emoji: "😬" },
  { category: "Feeling", name: "Determined", emoji: "💪" },
  { category: "Feeling", name: "Satisfied", emoji: "😌" },
  { category: "Feeling", name: "Disgusted", emoji: "🤢" },
  { category: "Feeling", name: "Lazy", emoji: "😴" },
  { category: "Feeling", name: "Stressed", emoji: "😖" },
  { category: "Feeling", name: "Crazy", emoji: "🤪" },
  { category: "Feeling", name: "Nostalgic", emoji: "🎶" },
  { category: "Feeling", name: "Amused", emoji: "😆" },
  { category: "Feeling", name: "Optimistic", emoji: "😃" },
  { category: "Feeling", name: "Melancholic", emoji: "🥀" },
  { category: "Feeling", name: "Inspired", emoji: "✨" },
  { category: "Feeling", name: "Anxious", emoji: "😰" },
  { category: "Feeling", name: "Energetic", emoji: "⚡" },
  { category: "Feeling", name: "Surreal", emoji: "🌌" },
  { category: "Feeling", name: "Euphoric", emoji: "🤗" },
  { category: "Feeling", name: "Grumpy", emoji: "😡" },
  { category: "Feeling", name: "Rejected", emoji: "💔" },
  { category: "Feeling", name: "Warmhearted", emoji: "🥰" },
  { category: "Feeling", name: "Skeptical", emoji: "🤨" },
  { category: "Feeling", name: "Impatient", emoji: "⏳" },
  { category: "Feeling", name: "Mysterious", emoji: "🕵️‍♂️" },
  { category: "Feeling", name: "Uncertain", emoji: "🤷" },
  { category: "Feeling", name: "Brave", emoji: "🦁" },
  { category: "Feeling", name: "Calm", emoji: "🌊" },
  { category: "Feeling", name: "Triumphant", emoji: "🏆" },
  { category: "Feeling", name: "Zen", emoji: "🧘" },
];


const activities = {
  Celebrating: [
    { name: "Birthday", emoji: "🎂" },
    { name: "Anniversary", emoji: "💍" },
    { name: "Graduation", emoji: "🎓" },
    { name: "Promotion", emoji: "🏆" },
    { name: "New Year", emoji: "🎊" },
  ],
  Eating: [
    { name: "Fast Food", emoji: "🍔" },
    { name: "Healthy Food", emoji: "🥗" },
    { name: "Desserts", emoji: "🍩" },
    { name: "Home-Cooked Meal", emoji: "🍛" },
    { name: "BBQ", emoji: "🍖" },
  ],
  Watching: [
    { name: "Movie", emoji: "🎬" },
    { name: "TV Series", emoji: "📺" },
    { name: "Sports", emoji: "⚽" },
    { name: "News", emoji: "📰" },
    { name: "Cartoons", emoji: "🐭" },
  ],
  Drinking: [
    { name: "Coffee", emoji: "☕" },
    { name: "Tea", emoji: "🍵" },
    { name: "Cocktails", emoji: "🍹" },
    { name: "Juice", emoji: "🧃" },
    { name: "Milkshake", emoji: "🥤" },
  ],
  Attending: [
    { name: "Concert", emoji: "🎤" },
    { name: "Wedding", emoji: "💒" },
    { name: "Party", emoji: "🎉" },
    { name: "Conference", emoji: "🏢" },
    { name: "Festival", emoji: "🎭" },
  ],
};
const activityCategories = [
  { name: "Celebrating", emoji: "🎉" },
  { name: "Eating", emoji: "🍽️" },
  { name: "Watching", emoji: "📺" },
  { name: "Drinking", emoji: "🍹" },
  { name: "Attending", emoji: "🎭" },
];

const FeelingModal = ({ onSelect, onClose,handleCloseModal,modalEmojiOpen,setEmojiModalOpen,searchQuery,setSearchQuery,selectedCategory,setSelectedCategory,searchTerm,setSearchTerm }) => {
  const [tab, setTab] = useState(0); // 0 for Feelings, 1 for Activities
 
  return (
    <Box
      sx={{
        width: 500,
        bgcolor: "white",
        borderRadius: 2,
        boxShadow: 24,
        mx: "auto",
        my: "5%",
        display: "flex",
        flexDirection: "column",
        p: 2,
      }}
    >
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", position: "relative", pb: 1 }}>
        <IconButton
          onClick={() => setEmojiModalOpen(false)}
          sx={{ backgroundColor: "#eee", position: "absolute", left: 0 }}
        >
          <ChevronLeft />
        </IconButton>
        <Typography sx={{ fontWeight:"bold" }} variant="h6" textAlign="center" flex={1}>
          {tab === 0
            ? "How are you feeling?"
            : selectedCategory
            ? selectedCategory
            : "Select a Category"}
        </Typography>
      </Box>

      {/*<hr style={{ border: "0.5px solid #ddd", width: "100%", marginBottom: "10px" }} />*/}

      {/* Tabs */}
      <Tabs
        value={tab}
        onChange={(e, newTab) => {
          setTab(newTab);
          setSearchTerm("");
          setSelectedCategory(null); // Reset category when switching tabs
        }}
      >
        <Tab label="Feelings" />
        <Tab label="Activities" />
      </Tabs>

      {tab === 0 ? (
        <>
          {/* Search Bar for Feelings */}
          <TextField
            variant="outlined"
            placeholder="Search Feelings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
            sx={{
              mt: 2,
              backgroundColor: "#f0f2f5",
              borderRadius: "30px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "30px",
                paddingLeft: "10px",
              },
              "& .MuiOutlinedInput-input": {
                padding: "8px 12px", // customize as needed
              },
              "& fieldset": { border: "none" }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: "#666" }} />
                </InputAdornment>
              ),
            }}
          />
          <Box sx={{ maxHeight: 300, overflowY: "auto", mt: 2, p: 1 }}>
            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 2 }}>
              {feelings
                .filter((item) =>
                  item.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((item) => (
                  <Button
                    key={item.name}
                    onClick={() => onSelect(` ${item.emoji} feeling ${item.name.toLowerCase()}`)}
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      flexDirection: "row",
                      textTransform: "none",
                      gap: 1,
                      height: 50,
                    }}
                  >
                    <Box
                      sx={{
                        width: 42,
                        height: 42,
                        fontSize:"20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "50%",
                        backgroundColor: "#f0f0f0",
                        flexShrink: 0,
                      }}
                    >
                      {item.emoji}
                    </Box>
                    <Typography variant="body2" sx={{ fontWeight:"bold",color:"#000",textAlign: "left" }}>
                      {item.name}
                    </Typography>
                  </Button>
                ))}
            </Box>
          </Box>
        </>
      ) : (
        <>
          {/* Activities Content */}
          {selectedCategory ? (
            <>
              {/* Search Bar for Activities */}
               <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
    
                {/* Category Dropdown */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    bgcolor: "#f0f2f5",
                    px: 1.5,
                    py: 0.8,
                    borderRadius: "8px",
                    fontSize: "14px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    color:"blue",
                    flexShrink: 0, // Prevents it from shrinking
                    whiteSpace: "nowrap" // Prevents text from wrapping
                  }}>
                  {selectedCategory}  
                  <Close style={{ fontSize: "14px", fontWeight: "bold", color: "blue" }} onClick={() => setSelectedCategory("")} />
                </Box>

                {/* Search Box */}
                <Box sx={{ flex: 1, position: "relative" }}>
                  
                  <TextField
                    variant="outlined"
                    placeholder="Search activities..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    fullWidth
                    sx={{
                      bgcolor: "#f0f2f5",
                      borderRadius: "30px",
                      "& .MuiOutlinedInput-root": {
                        pl: 4, // Left padding for search icon
                        pr: 1,
                        borderRadius:"30px",
                        height: "40px",
                        fontSize: "14px",
                      },
                      "& fieldset": { border: "none" }
                    }}
                     InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search sx={{ color: "#666" }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>

              </Box>
              <Box sx={{ maxHeight: 300, overflowY: "auto", mt: 1, p: 1 }}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  {(activities[selectedCategory] || [])
                    .filter((item) =>
                      item.name.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((item) => (
                      <Button
                        key={item.name}
                        onClick={() => onSelect(` ${item.emoji} ${selectedCategory} ${item.name.toLowerCase()}`)}
                        sx={{
                          display: "flex",
                          justifyContent: "flex-start",
                          textTransform: "none",
                          gap: 1,
                          height: 50,
                        }}
                      >
                        <Box
                          sx={{
                            width: 42,
                            height: 42,
                            fontSize:"20px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "50%",
                            backgroundColor: "#f0f0f0",
                            flexShrink: 0,
                          }}
                        >
                          {item.emoji}
                        </Box>
                        <Typography variant="body2" sx={{ fontWeight:"bold",color:"#000", textAlign: "left" }}>
                          {item.name}
                        </Typography>
                      </Button>
                    ))}
                </Box>
              </Box>
            </>
          ) : (
            // Show Activity Categories
            <>
              <TextField
                variant="outlined"
                placeholder="Search Categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                fullWidth
                sx={{
                  mt: 2,
                  backgroundColor: "#f0f2f5",
                  borderRadius: "30px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "30px",
                    paddingLeft: "10px",
                  },
                  "& .MuiOutlinedInput-input": {
                    padding: "8px 12px", 
                  },
                  "& fieldset": { border: "none" }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: "#666" }} />
                    </InputAdornment>
                  ),
                }}
              />
              <Box sx={{ maxHeight: 300, overflowY: "auto", mt: 2, p: 1 }}>
                <Box sx={{ display: "grid", gridTemplateColumns: "repeat(1, 1fr)", gap: 1 }}>
                  {activityCategories
                    .filter((cat) =>
                      cat.name.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((category) => (
                      <Button
                        key={category.name}
                        onClick={() => {
                          setSelectedCategory(category.name);
                          setSearchTerm("");
                        }}
                        sx={{
                          display: "flex",
                          justifyContent: "flex-start",
                          flexDirection: "row",
                          textTransform: "none",
                          gap: 1,
                          height: 50,
                        }}
                      >
                        <Box
                          sx={{
                            width: 42,
                            height: 42,
                            fontSize:"20px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "50%",
                            backgroundColor: "#f0f0f0",
                            flexShrink: 0,
                          }}
                        >
                          {category.emoji}
                        </Box>
                        <Typography variant="body2" sx={{ fontWeight:"bold",color:"#000", textAlign: "left" }}>
                          {category.name} 
                        </Typography>
                        {/* Right Arrow */}
                        <ChevronRight sx={{ color: "#888", flexShrink: 0 }} />
                      </Button>
                    ))}
                </Box>
              </Box>
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default FeelingModal;
