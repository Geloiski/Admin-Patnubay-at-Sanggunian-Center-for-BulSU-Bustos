import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Stack,
  Box,
  Typography,
  Link,
  Breadcrumbs,
  Paper,
} from "@mui/material";
import { Link as RouterLink,useHistory, useLocation } from "react-router-dom";


import ChatSidebar from "./ChatSidebar";
import ChatWindow from "./ChatWindow";
import ChatDetail from "./ChatDetail";

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

export default function Chats() {
  const user = useSelector((state) => state.user);
  console.log(user.chats);
  const history = useHistory();




  
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
let queryy = useQuery();
let urlId1 = queryy.get("id");

const [urlId, setUrlId] = useState(queryy.get("id") === null ? "1" : queryy.get("id") );

const [data , setData] = React.useState([]);
// const [data1 , setData] = React.useState(["id"]);
// const data = data1.sort((a, b) => b.Created?.seconds - a.Created?.seconds);

useEffect(() => {

   const collectionRefFinance = collection(db, "Chats", urlId, "Chat");
   const qFinance = query(collectionRefFinance, orderBy("Created", "asc"));
   onSnapshot(qFinance, (snapshot) =>
      setData(
         snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
       )
     
   );

}, [urlId1,urlId])

useEffect(() => {
  if(urlId1 !== null){
    setUrlId(queryy.get("id"))
  }
}, [urlId1,])


  
  // console.log(urlId);

  return (
    <Container sx={{ml:{md:30,lg:40}, mt: 12, mb: 5, position: 'fixed', height: '100%', width: 'auto' }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={3}
      >
        <Box direction="column" alignItems="center">
          <Typography variant="h4" gutterBottom>
            Chat
          </Typography>
          <Breadcrumbs
            sx={{ ml: 0.5 }}
            separator={
              <Box
                sx={{
                  width: 4,
                  height: 2,
                  bgcolor: "gray",
                  borderRadius: "50%",
                  mx: 1,
                }}
              />
            }
          >
            <Link
              component={RouterLink}
              underline="hover"
              color="inherit"
              to="/chat"
            >
              <Typography color="text.primary" variant="body2">
                Chats
              </Typography>
            </Link>
            <Typography color="gray" variant="body2">
              List
            </Typography>
          </Breadcrumbs>
        </Box>
      </Stack>

      <Grid container spacing={2}>
        <Grid item xs={3.5}>
          <Paper >
            <ChatSidebar  data={data} urlId={urlId}/>
          </Paper>
        </Grid>
        <Grid item xs={6.5}>
          <Paper >
            <ChatWindow data1={data} urlId={urlId}/>
          </Paper>
        </Grid>
        <Grid item xs={2}>
        <Paper >
            <ChatDetail urlId={urlId}/>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
