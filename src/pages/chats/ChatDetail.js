import React from 'react'
import { Link as RouterLink,useHistory, useLocation } from "react-router-dom";
import {
    Container,
    Avatar,
    Box,
    Typography,
    Paper,
    Divider,
    Grid,
  } from "@mui/material";

  import { useSelector } from "react-redux";
export default function ChatDetail({urlId}) {
  const user = useSelector((state) => state.user);

  return (
    <Box sx={{p:2}}>
        <Box sx={{display:"flex", flexDirection:"column", textAlign:"center",  alignItems:"center" }}>
            <Avatar 
            src={user.users?.filter((user) => user.id  === urlId).map((user) => user.Image)}
            alt="Image"  sx={{ width: 80, height: 80,mb:2, bgcolor: "primary.main"}}  >M</Avatar>
            <Typography sx={{fontSize: 15, fontWeight:"bold"}} gutterBottom>{user.users?.filter((user) => user.id  === urlId).map((user) => user.UserName)}</Typography>
            <Typography sx={{fontSize: 14, color:"gray"}} gutterBottom>{user.users?.filter((user) => user.id  === urlId).map((user) => user.UserType)}</Typography>
            <Typography color="primary" sx={{fontSize: 14}} gutterBottom>{user.users?.filter((user) => user.id  === urlId).map((user) => user.StudentNumber)}</Typography>
        </Box>
    </Box>
  )
}
