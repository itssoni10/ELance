import React, { useState } from "react";
import { Drawer, Box, Divider, Typography } from "@mui/material";

const Navigation = () => {
  const [activeItem, setActiveItem] = useState(null);

  const menuItems = [
    { id: "home", label: "Home" },
    { id: "dashboard", label: "Dashboard" },
    { id: "skill-radar", label: "Skill Radar" },
    { id: "career-planner", label: "Career Planner" },
    { id: "resume", label: "Resume" },
    { id: "aboutus", label: "About Us" },
    { id: "login", label: "Login" },
  ];

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 80,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 80,
          boxSizing: "border-box",
          background: "#f9f9f9",
          borderRight: "1px solid #ddd",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: 4,
        },
      }}
    >
      {menuItems.map((item) => (
        <Box
          key={item.id}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
            width: "100%",
          }}
          onClick={() => setActiveItem(item.id)}
        >
          {/* Show label only if this line is active */}
          {activeItem === item.id && (
            <Typography
              variant="caption"
              sx={{
                mb: 0.5,
                fontWeight: "bold",
                color: "#1976d2",
                fontSize: "0.8rem",
              }}
            >
              {item.label}
            </Typography>
          )}

          {/* Horizontal line */}
          <Divider
            sx={{
              width: "60%",
              borderBottomWidth: 3,
              borderColor: activeItem === item.id ? "#1976d2" : "#bbb",
              mb: 2,
            }}
          />
        </Box>
      ))}
    </Drawer>
  );
};

export default Navigation;
