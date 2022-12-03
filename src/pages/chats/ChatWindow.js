import React,{ useEffect } from "react";
import { Link as RouterLink,useHistory, useLocation } from "react-router-dom";
import {
  Container,
  Avatar,
  Box,
  Typography,
  Paper,
  Divider,
  Grid,
  OutlinedInput,
  FormControl,
  IconButton,
} from "@mui/material";

import SendIcon from '@mui/icons-material/Send';
import { useSelector } from "react-redux";

import { auth, db } from "../../utils/firebase";
import {
  setDoc,
  serverTimestamp,
  updateDoc,
  doc,
  arrayUnion,
  addDoc,
  collection,
  where,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";

import { formatDistance, subDays } from 'date-fns'

const AdminUi = {
  overflowWrap: "break-word",
  wordWrap: "break-word",
  hyphens: "auto",
  maxWidth: "500px",
  minWidth: "400px",
  p: 2,
  ml:2,
  color: "gray",
  border: 1,
  borderTopLeftRadius: 10,
  borderTopRightRadius: 0,
  borderBottomLeftRadius: 10,
  borderBottomRightRadius: 10,
}

const UserUi = {
    overflowWrap: "break-word",
                  wordWrap: "break-word",
                  hyphens: "auto",
                  maxWidth: "500px",
                  minWidth: "400px",
                  p: 2,
                  color: "gray",
                  border: 1,
                  ml: 2,
                  borderTopLeftRadius: 0,
                  borderTopRightRadius: 10,
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 10,
                  bgcolor: "primary.main",
}

export default function ChatWindow({ data1, urlId }) {
  const user = useSelector((state) => state.user);
  const data = data1.sort((a, b) => b.Created?.seconds - a.Created?.seconds);

  // const useQuery = () => {
  //   return new URLSearchParams(useLocation().search);
  // };
  // let queryy = useQuery();
  // let urlId = queryy.get("id");
  
 
  
  const [message, setMessage] = React.useState("");
const handleSendMessage = async (e) => {
setMessage("");
  console.log(message);
  await addDoc(collection(db, "Chats", urlId,"Chat"), {
    from: "Admin",
    message: message,
    Created: serverTimestamp(),
  });

}


  return (
    <Box>
      { urlId !== "1" ? (
    <Box sx={{p:2}}>
      {/* User Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          p: 2,
          bgcolor: "background.paper",
        }}
      >
        <Avatar src={user.users?.filter((user) => user.id  === urlId).map((user) => user.Image)}
        sx={{ bgcolor: "primary.main" }}>M</Avatar>
        <Box sx={{ ml: 1, flexGrow: 1 }}>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Typography sx={{ fontSize: 15, fontWeight: "bold" }}>
            {user.users?.filter((user) => user.id  === urlId).map((user) => user.UserName)}
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            {/* <Typography variant="caption" sx={{ color: "gray" }}>
              1m ago
            </Typography> */}
          </Box>
          {/* <Typography sx={{ fontSize: 13, color: "gray" }} noWrap>
            active now
          </Typography> */}
        </Box>
      </Box>
      <Divider orientation="horizontal" flexItem />

      {/* Chat Info */}
      <Box sx={{ p: 1,  maxHeight: 390, overflow: 'auto', display:"flex", flexDirection: "column-reverse" }}>
      
      {data.map((item) => (
        <Box>
        {/* Student UI **/}
    <Grid container sx={{my:2}}>
            <Grid item xs={1} sx={  item.from === "Admin" ? {display:"flex"} : {display:"none"} }>
              <Box sx={{ display: "flex", flexDirection: "row", }}>
                <Box sx={{ flexGrow: 1, }} />

                <Avatar 
                src={
                  item.from === "Student" ?
                  user.users?.filter((user) => user.id  === urlId).map((user) => user.Image) :
                  item.from === "Admin" ?
                  user.currentUserData[0].Image : null}
                sx={{ bgcolor: "primary.main", ml: 1 }}>M</Avatar>
              </Box>
            </Grid>

            <Grid item xs={11} sx={  item.from === "Admin" ? {display:"block"} : {display:"none"} }>
              <Typography
                sx={{ fontSize: 13, color: "gray", textAlign: "left", ml: 2 }}
                noWrap
              >
             
             { item.Created !== null &&
               formatDistance(subDays(new Date(), 0), new Date(item.Created?.seconds * 1000))}
              </Typography>
              <Box
                sx={ item.from === "Student" ? AdminUi : UserUi}
              >
                <Typography sx={{ fontSize: 13, color: "black" }}>
               { item.message}
                </Typography>
              </Box>
            </Grid>

            {/* Admin UI **/}

            <Grid item xs={11} sx={  item.from === "Student" ? {display:"block"} : {display:"none"} }>
              <Typography
                sx={{ fontSize: 13, color: "gray", textAlign: "right", ml: 2 }}
                noWrap
              >
             
             { item.Created !== null &&
               formatDistance(subDays(new Date(), 0), new Date(item.Created?.seconds * 1000))}
              </Typography>
              <Box
                sx={ item.from === "Student" ? AdminUi : UserUi}
              >
                <Typography sx={{ fontSize: 13, color: "black" }}>
               { item.message}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={1} sx={  item.from === "Student" ? {display:"flex"} : {display:"none"} }>
              <Box sx={{ display: "flex", flexDirection: "row", }}>
                <Box sx={{ flexGrow: 1, }} />

                <Avatar 
                src={
                  item.from === "Student" ?
                  user.users?.filter((user) => user.id  === urlId).map((user) => user.Image) :
                  item.from === "Admin" ?
                  user.currentUserData[0].Image : null}
                sx={{ bgcolor: "primary.main", ml: 1 }}>M</Avatar>
              </Box>
            </Grid>

          </Grid>
     

          </Box>
      ))}
          

          

         
      
      </Box>

      <Box sx={{display:"flex", }}>
      <FormControl sx={{  mt: 2 }} variant="outlined" fullWidth>
        <OutlinedInput
          size="small"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
        
        />
      </FormControl>
      <IconButton  size="small" sx={{ml:3, mt:2, bgcolor: (theme) => theme.palette.primary.main , borderRadius:1}} onClick={handleSendMessage}>
        <SendIcon  sx={{fontSize:25, color:"white" }} />
      </IconButton>
      </Box>
    </Box>
      ) : (
        <Box sx={{p:2,}}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: 2,
            bgcolor: "background.paper",
            height: 550,
            width: 550,
            textAlign: "center",
          }}
        >
        <Typography variant="h6" color="initial" sx={{mx:"auto"}}>Select a chat</Typography>
        </Box>
        </Box>
      )}
    </Box>
  );
}
