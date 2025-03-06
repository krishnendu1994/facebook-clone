import React, { useState,useEffect } from "react";
import { Box, IconButton, InputBase, Typography, CircularProgress } from "@mui/material";
import { Search, ChevronLeft, Place } from "@mui/icons-material";





const LocationModal = ({ onSelect, setLocationModalOpen }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);

  const [suggestedLocations, setSuggestedLocations] = useState([]);
  //const [loading, setLoading] = useState(false);

  const fetchLocations = async (query) => {
    if (!query) return;
    
    setLoading(true);
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`);
      const data = await response.json();
      setLocations(data);
    } catch (error) {
      console.error("Error fetching locations:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch nearby popular places
  const fetchNearbyPlaces = async (lat, lon) => {
    setLoading(true);
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18`);
      const data = await response.json();
      if (data && data.display_name) {
        setSuggestedLocations([{ place_id: data.place_id, display_name: data.display_name }]);
      }
    } catch (error) {
      console.error("Error fetching nearby places:", error);
    } finally {
      setLoading(false);
    }
  };

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchNearbyPlaces(position.coords.latitude, position.coords.longitude);
        },
        (error) => console.error("Error getting location:", error),
        { enableHighAccuracy: true }
      );
    }
  }, []);

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
        <IconButton onClick={() => setLocationModalOpen(false)} sx={{ backgroundColor: "#eee", position: "absolute", left: 0 }}>
          <ChevronLeft />
        </IconButton>
        <Typography sx={{ fontWeight: "bold" }} variant="h6" textAlign="center" flex={1}>
          Select Location
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
          placeholder="Search locations..."
          fullWidth
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            fetchLocations(e.target.value);
          }}
          sx={{ flex: 1 }}
        />
      </Box>

      {/* Location List */}
      <Box sx={{ maxHeight: 300, overflowY: "auto", mt: 2, display: "flex", flexDirection: "column", gap: 1 }}>
        {loading ? (
          <CircularProgress sx={{ mx: "auto", my: 2 }} size={30} />
        ) : (
          (searchTerm ? locations : suggestedLocations).map((loc) => (
            <Box
              key={loc.place_id}
              onClick={() => onSelect(`  at ${loc.display_name.split(",")[0]} `)}
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                borderRadius: 2,
                p: 1.5,
                "&:hover": { bgcolor: "#f0f0f0" },
              }}
            >
              {/* Location Icon with Background */}
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  backgroundColor: "#e4e6eb",
                  flexShrink: 0,
                }}
              >
                <Place sx={{ fontSize: 24, color: "#606770" }} />
              </Box>

              {/* Location Text */}
              <Box sx={{ ml: 2 }}>
                <Typography variant="body1" fontWeight="bold" sx={{ fontSize: 15 }}>
                  {loc.display_name.split(",")[0]} {/* First word as title */}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: 12, color: "#65676b" }}>
                  {loc.display_name.split(",").slice(1).join(",")} 
                </Typography>
              </Box>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
};

export default LocationModal;
