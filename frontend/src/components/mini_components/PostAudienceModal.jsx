import React, { useState } from "react";
import { Box, Typography, IconButton, Radio, FormControlLabel, RadioGroup, Button } from "@mui/material";
import { ChevronLeft, Lock, People, Public, Close } from "@mui/icons-material";

const PostAudienceModal = ({ onClose, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState("friends");

  const handleSelection = (value) => {
    setSelectedOption(value);
  };

  return (
    <Box
      sx={{
        width: 500,
        bgcolor: "white",
        borderRadius: 2,
        boxShadow: 24,
        mx: "auto",
        my: "2%",
        p: 2,
      }}
    >
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", pb: 2, position: "relative" }}>
        <IconButton onClick={onClose} sx={{ position: "absolute", left: 0 }}>
          <ChevronLeft />
        </IconButton>
        <Typography sx={{ fontWeight: "bold" }} variant="h6" textAlign="center" flex={1}>
          Post Audience
        </Typography>
        <IconButton onClick={onClose} sx={{ position: "absolute", right: 0 }}>
          <Close />
        </IconButton>
      </Box>
      {/*<hr style={{ border: "0.5px solid #ddd", width: "100%", marginBottom: "5px" }} />*/}

      {/* Subtitle */}
      <Typography sx={{ color: "#000", fontWeight:"bold" , fontSize: 17, mb: 2 }}>
        Who can see your post?
      </Typography>
       <Typography sx={{ color: "grey" , fontSize: 15, mb: 2 }}>
       Your post will appear in Feed, on your profile and in search results
      </Typography>
       <Typography sx={{ color: "grey",  fontSize: 15, mb: 2 }}>
        Your default audience is set to <b sx={{ color:"#000" }}>Friends</b>, but you can change the audience of this specific post.
      </Typography>

      {/* Audience Options */}
     <RadioGroup sx={{maxHeight: "200px", overflowY: "auto", display: "flex",flexDirection: "row",pr: 1 }} value={selectedOption} onChange={(e) => handleSelection(e.target.value)}>
      {[
        { value: "public", icon: <Public />, title: "Public", subtitle: "Anyone on or off Facebook" },
        { value: "friends", icon: <People />, title: "Friends", subtitle: "Your friends on Facebook" },
        { value: "only_me", icon: <Lock />, title: "Only Me", subtitle: "No one else can see this" },
        { value: "custom", icon: <People />, title: "Specific Friends", subtitle: "Choose specific people" },
      ].map(({ value, icon, title, subtitle }) => (
        <Box
          key={value}
          onClick={() => handleSelection(value)}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            // bgcolor: "#f0f2f5",
            p: 1.5,
            borderRadius: 2,
            width: "100%",
            cursor: "pointer",
          }}
        >
          {/* Icon with Round Background */}
          <Box
            sx={{
              width: 60,
              height: 60,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              backgroundColor: "#e4e6eb",
              flexShrink: 0,
            }}
          >
            {React.cloneElement(icon, { sx: { fontSize: 32 } })}
          </Box>

          {/* Text Section */}
          <Box sx={{ flexGrow: 1, ml: 2 }}>
            <Typography variant="body1" fontWeight="bold" sx={{ fontSize: 15 }}>
              {title}
            </Typography>
            <Typography variant="body2" sx={{ fontSize: 12, color: "#65676b" }}>
              {subtitle}
            </Typography>
          </Box>

          {/* Radio Button on the Right */}
          <Radio
            value={value}
            checked={selectedOption === value}
            onChange={() => handleSelection(value)}
          />
        </Box>
      ))}
    </RadioGroup>

      {/* Buttons */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={() => onSelect(selectedOption)}
          variant="contained"
          color="primary"
        >
          Done
        </Button>
      </Box>
    </Box>
  );
};

export default PostAudienceModal;
