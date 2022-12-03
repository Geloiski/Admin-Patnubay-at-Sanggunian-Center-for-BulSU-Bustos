import React from "react";
import { useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Avatar,
  Divider,
  Link,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../assets/images/logo.png";
export default function HeaderMain() {
  const location = useLocation();
  console.log(location)
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{background:"transparent", boxShadow: 0, height: 100,}}>
        <Toolbar >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
           {/* <Avatar src={Logo} alt="logo" /> */}
          </IconButton>
          <Box sx={{display:"block", mt:2}}>
          {/* <Typography variant="h6" color="textPrimary" sx={{ flexGrow: 1, fontWeight:"bold" }}>
            SPOC's 
          </Typography> */}
          <Avatar src={Logo} alt="logo" sx={{height:200, width: 200,mt:10}}/>
    
          </Box>
          <Box sx={{flexGrow:1}}/>

          {/* <Link  href="/login" underline="none" >
          <Button sx={{ textTransform: "capitalize",display: location.pathname === "/login" ? "none" : "flex" }}><Typography variant="body1" color="primaryText" sx={{fontSize: 14, fontWeight:500}}>Log in</Typography></Button>
          </Link>
          <Link  href="/register" underline="none" >
          <Button sx={{ textTransform: "capitalize",display: location.pathname === "/register" ? "none" : "flex" }}><Typography variant="body1" color="primaryText" sx={{fontSize: 14, fontWeight:500}}>Sign up</Typography></Button>
          </Link>
          <Link  href="/forgot-password" underline="none" >
          <Button sx={{ textTransform: "capitalize",display: location.pathname === "/forgot-password" ? "none" : "flex" }}><Typography variant="body1" color="primaryText" sx={{fontSize: 14, fontWeight:500}}>Forgot Password</Typography></Button>
          </Link>
          <Button variant="contained" size="small" sx={{mx:3, textTransform:"capitalize",}}><Typography variant="body1" color="primaryText" sx={{fontSize: 14, fontWeight:400}}>Contact Us</Typography></Button> */}
       
        </Toolbar>
      </AppBar>
    </Box>
  );
}
