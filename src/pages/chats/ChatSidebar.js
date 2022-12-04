import React, { useEffect, useState } from "react";
import {
  Container,
  Avatar,
  Box,
  Grid,
  Typography,
  FormControl,
  OutlinedInput,
  InputAdornment,
  Link,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link as RouterLink, useHistory, useLocation } from "react-router-dom";
import Scrollbar from "../../components/Scrollbar";
import { useSelector } from "react-redux";
import { auth, db, storage } from "../../utils/firebase";
import { addDoc, collection, doc, getDoc, onSnapshot, query, setDoc, Timestamp, updateDoc, where } from "firebase/firestore";
import { orderBy } from "lodash";
import User from "./User";
import Message from "./Message";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import MessageForm from "./MessageForm";

export default function ChatSidebar({ data, urlId }) {
  const user = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState("");
  const [text, setText] = useState("");
  const [img, setImg] = useState("");
  const [msgs, setMsgs] = useState([]);

  const user1 = auth.currentUser.uid;

  useEffect(() => {
    const usersRef = collection(db, "Users");
    // create query object
    const q = query(usersRef, where("UserUid", "not-in", [user1]));
    // execute query
    const unsub = onSnapshot(q, (querySnapshot) => {
      let users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      setUsers(users);
    });
    return () => unsub();
  }, [user1]);

  console.log(users);

  const selectUser = async (user) => {
    setChat(user);

    const user2 = user.uid;
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    const msgsRef = collection(db, "Chats", id, "Chat");
    const q = query(msgsRef, orderBy("createdAt", "asc"));

    onSnapshot(q, (querySnapshot) => {
      let msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push(doc.data());
      });
      setMsgs(msgs);
    });

    // get last message b/w logged in user and selected user
    const docSnap = await getDoc(doc(db, "lastMsg", id));
    // if last message exists and message is from selected user
    if (docSnap.data() && docSnap.data().from !== user1) {
      // update last message doc, set unread to false
      await updateDoc(doc(db, "lastMsg", id), { unread: false });
    }
  };

  // const useQuery = () => {
  //   return new URLSearchParams(useLocation().search);
  // };
  // let queryy = useQuery();
  // let urlId = queryy.get("id");

  return (
    <Box sx={{ p: 2 }}>
      {/* Search */}
      <FormControl sx={{ mt: 2 }} variant="outlined" fullWidth>
        <OutlinedInput
          size="small"
          // value={values.weight}
          // onChange={handleChange('weight')}
          placeholder="Search"
          endAdornment={<SearchIcon color="primary" />}
        />
      </FormControl>

      {/* User List */}
      <div className="users_container">
        {users.map((user) => (
          <Link underline="none" component={RouterLink} color="inherit" to={`/chat?id=${user.uid}`}>
            <User
              key={user.uid}
              user={user}
              selectUser={selectUser}
              user1={user1}
              chat={chat}
            />
          </Link>
        ))}
      </div>
    </Box>
  );
}
