import React, { useState, useEffect } from "react";
import { Box, IconButton, InputBase, Typography } from "@mui/material";
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

const GifModal = ({ onSelect, setGifModalOpen, modalGifOpen }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [gifs, setGifs] = useState([]);

  useEffect(() => {
    fetchGifs();
  }, [searchTerm]);

  const fetchGifs = async () => {
    const apiKey = "GcWdnGdF4TIqo9whE2H3bjJT2BHhfSJH";
    const url = searchTerm
      ? `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchTerm}&limit=20`
      : `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=20`;
    
    try {
      const response = await fetch(url);
      const { data } = await response.json();
      setGifs(data);
    } catch (error) {
      console.error("Error fetching GIFs:", error);
    }
  };

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
      <Box sx={{ display: "flex", alignItems: "center", pb: 1, position: "relative" }}>
        <IconButton onClick={() => setGifModalOpen(false)} sx={{ backgroundColor: "#eee", position: "absolute", left: 0 }}>
          <ChevronLeft />
        </IconButton>
        <Typography sx={{ fontWeight:"bold" }} variant="h6" textAlign="center" flex={1}>
          Choose a GIF
        </Typography>
      </Box>
      
      {/* Search Bar */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#f0f2f5",
          borderRadius: 8,
          px: 1,
          py: 0.5,
        }}
      >
        <Search sx={{ color: "gray", mr: 1 }} />
        <InputBase
          placeholder="Search GIFs..."
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flex: 1 }}
        />
      </Box>
      
      {/* GIF Grid */}
      <Box sx={{ maxHeight: 300, overflowY: "auto", mt: 2, display: "grid", gridTemplateColumns: "repeat(1, 1fr)", gap: 1 }}>
        {gifs.map((gif) => (
          <Box key={gif.id} onClick={() => onSelect(gif.images.fixed_height.url)} sx={{ cursor: "pointer" }}>
            <img src={gif.images.fixed_height.url} alt="GIF" width="100%" style={{ borderRadius: 8 }} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default GifModal;
