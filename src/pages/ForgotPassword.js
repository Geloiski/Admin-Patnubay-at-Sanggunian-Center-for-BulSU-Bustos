import React from "react";

import { Link as RouterLink } from "react-router-dom";
// material
import { styled } from "@mui/material/styles";
import {
  Stack,
  Link,
  Container,
  Typography,
  Box,
  Grid,
  Avatar,
  Paper,
  CssBaseline,
} from "@mui/material";
// layouts
// import AuthLayout from '../components/AuthLayout';
// components
// import Page from '../components/Page';
import ForgotForm from "./forgot/ForgotForm";
import HeaderMain from "../components/HeaderMain";
// import AuthSocial from '../sections/authentication/AuthSocial';
import Logo from "../assets/images/logo.png";
import bsu from "../assets/images/logo2.jpg";

// ----------------------------------------------------------------------

// const RootStyle = styled(Paper)(({ theme }) => ({
//   [theme.breakpoints.up('md')]: {
//     display: 'flex'
//   }
// }));

// const SectionStyle = styled(Card)(({ theme }) => ({
//   width: '100%',
//   maxWidth: 464,
//   display: 'flex',
//   flexDirection: 'column',
//   justifyContent: 'center',
//   margin: theme.spacing(2, 0, 2, 2)
// }));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  display: "flex",
  minHeight: "90vh",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(3, 0),
}));

const ContentStyleText = styled("div")(({ theme }) => ({
  maxWidth: 580,
  margin: "auto",
  display: "flex",
  minHeight: "90vh",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(3, 0),
}));
// ----------------------------------------------------------------------
const classes = {
  mainBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    height: "110vh",
    backgroundColor: "transparent",
  },
  loop: {
    my: 10,
    height: 150,
    width: 150,
    backgroundImage: `url(${Logo})`,
    backgroundRepeat: "repeat",
    // backgroundSize: "100%",
    backgroundSize: "100%",
    // filter: "grayscale(10%)",
    // height: "100%",
    m: 2,
    color: "#45943A",
    animation: "spin 500s linear infinite",
    "@keyframes spin": {
      "0%": {
        transform: "rotate(360deg)",
      },
      "100%": {
        transform: "rotate(0deg)",
      },
    },
  },
};

export default function ForgotPassword() {
  return (
    <Box
      sx={{
        bgcolor: "#F3F3F3",
        width: "100%",
        backgroundImage: `url(${bsu})`,
        backgroundSize: "100%",
        backgroundRepeat: "no-repeat",
        
      }}
    >
      {/* <HeaderMain/> */}
      <CssBaseline>
        <Grid container spacing={2}>
          <Grid item xs={0} md={6} sx={{ display: { xs: "none", md: "flex" } }}>
            <ContentStyleText>
              <Avatar
                src={Logo}
                alt="logo"
                sx={{ height: 150, width: 150, mb: 5 }}
                // sx={classes.loop}
              />

              <Typography
                gutterBottom
                sx={{ fontSize: 60, fontWeight: "bold", width: "95%", color: "white",textShadow: "2px 2px 4px #000000" }}
              >
                Patnubay at Sanggunian Center for BulSU Bustos
              </Typography>

              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  mb: 10,
                  textDecoration: "underline",
                  textDecorationColor: "#2E8359",
                  color: "WHITE",
                  textShadow: "2px 2px 4px #000000"
                }}
              >
                Bulacan State University Bustos Campus
              </Typography>
            </ContentStyleText>
          </Grid>

          <Grid item xs={12} md={6}>
          <Box
                sx={{
                  my: 10,
                  // backgroundImage: `url(${bsu})`,
                  backgroundRepeat: "no-repeat",
                  // backgroundSize: "100%",
                  backgroundSize: "100%",
                  // filter: "grayscale(10%)",
                  height: "90%",
                }}
              >
            <ContentStyle>
             
                <Paper sx={{ p: 5, borderRadius: 3 }}>
                  <Stack sx={{ mb: 5 }}>
                    <Typography
                      variant="h4"
                      gutterBottom
                      style={{ fontWeight: 700 }}
                    >
                      Forgot Password
                    </Typography>
                    <Typography sx={{ color: "text.secondary" }}>
                      Enter your details below.
                    </Typography>
                  </Stack>
                  {/* <AuthSocial /> */}

                  <ForgotForm />

                  <Typography
                    variant="body2"
                    align="center"
                    sx={{
                      mt: 3,
                      // display: { sm: "none" },
                    }}
                  >
                   Already have an account&nbsp;
                    <Link
                      variant="subtitle2"
                      component={RouterLink}
                      to="/login"
                      underline="hover"
                    >
                     Sign in
                    </Link>
                  </Typography>
                </Paper>
     
            </ContentStyle>
            </Box>
          </Grid>
        </Grid>
      </CssBaseline>
    </Box>
  );
}
