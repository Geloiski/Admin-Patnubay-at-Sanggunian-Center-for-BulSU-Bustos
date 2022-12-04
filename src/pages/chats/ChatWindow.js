import React, { useEffect, useState } from "react";
import { Link as RouterLink, useHistory, useLocation } from "react-router-dom";
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

import { auth, db, storage } from "../../utils/firebase";
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
  getDoc,
  Timestamp,
} from "firebase/firestore";

import { formatDistance, subDays } from 'date-fns'
import Message from "./Message";
import MessageForm from "./MessageForm";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function ChatWindow({ data1, urlId }) {

  const [chat, setChat] = useState("");
  const [text, setText] = useState("");
  const [img, setImg] = useState("");
  const [msgs, setMsgs] = useState([]);

  const user1 = auth.currentUser.uid;

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user2 = chat.uid;

    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    let url;
    if (img) {
      const imgRef = ref(
        storage,
        `images/${new Date().getTime()} - ${img.name}`
      );
      const snap = await uploadBytes(imgRef, img);
      const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
      url = dlUrl;
    }

    await addDoc(collection(db, "Chats", id, "Chat"), {
      text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || "",
    });

    await setDoc(doc(db, "lastMsg", id), {
      text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || "",
      unread: true,
    });

    setText("");
    setImg("");
  };



  return (
    <div className="messages_container">
      {chat ? (
        <>
          <div className="messages_user">
            <h3>{chat.name}</h3>
          </div>
          <div className="messages">
            {msgs.length
              ? msgs.map((msg, i) => (
                <Message key={i} msg={msg} user1={user1} />
              ))
              : null}
          </div>
          <MessageForm
            handleSubmit={handleSubmit}
            text={text}
            setText={setText}
            setImg={setImg}
            img={img}
          />
        </>
      ) : (
        <h3 className="no_conv">Select a user to start conversation</h3>
      )}
    </div>
  );
}
