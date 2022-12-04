import { Avatar } from "@mui/material";
import { doc, onSnapshot } from "firebase/firestore";
import moment from "moment";
import React, { useRef, useEffect, useState } from "react";
import { db } from "../../utils/firebase";

const Message = ({ msg, user1 }) => {
  const scrollRef = useRef();

  const [userData, setUserData] = useState({});

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msg]);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "Users", msg.from), (doc) => {
      setUserData(doc.data());
    })
    return unsub;
  }, [msg])

  return (
    <div
      className={`message_wrapper ${msg.from === user1 ? "own" : ""}`}
      ref={scrollRef}
    >
      <div style={{
        display: 'inline-block',
        maxWidth: '100%',
        borderRadius: '15px',
      }}>
        <div style={{
          padding: '10px',
          display: 'flex',
          width: '100%',
          alignItems: 'flex-start',
        }}>
          {msg.from === user1 ?
            <>
              <p className={msg.from === user1 ? "me" : "friend"}>

                {msg.text}
                <br />
                <small>
                  {moment(msg.createdAt.toDate()).startOf().fromNow()}
                </small>
              </p>
              {
                userData.Image !== "" ?
                  <Avatar src={userData.Image} alt='avatar' sx={{ backgroundColor: '#2E8359', alignSelf: 'flex-start' }}/> :
                  <Avatar alt='avatar' sx={{ backgroundColor: '#2E8359', alignSelf: 'flex-start' }}>{userData.UserName.substring(0, 2).toUpperCase()}</Avatar>
              }

            </> : <>
              {
                userData.Image !== "" ?
                  <Avatar src={userData.Image} alt='avatar' sx={{ backgroundColor: '#2E8359', alignSelf: 'flex-start' }}/> :
                  <Avatar alt='avatar' sx={{ backgroundColor: '#2E8359', alignSelf: 'flex-start' }}>{userData.UserName.substring(0, 2).toUpperCase()}</Avatar>
              }<p className={msg.from === user1 ? "me" : "friend"}>
                {msg.text}
                <br />
                <small>
                  {moment(msg.createdAt.toDate()).startOf().fromNow()}
                </small>
              </p>
            </>}
        </div>
      </div >
    </div>
  );
};

export default Message;
