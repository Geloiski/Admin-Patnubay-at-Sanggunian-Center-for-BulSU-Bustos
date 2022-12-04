import React, { useEffect, useState } from "react";
import Img from "../../assets/images/image1.png";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { Avatar } from "@mui/material";

const User = ({ user1, user, selectUser, chat }) => {
  const user2 = user?.UserUid;
  const [data, setData] = useState("");

  useEffect(() => {
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    let unsub = onSnapshot(doc(db, "lastMsg", id), (doc) => {
      setData(doc.data());
    });
    return () => unsub();
  }, [user1, user2]);

  return (
    <>
      <div
        className={`user_wrapper ${chat.name === user.name && "selected_user"}`}
        onClick={() => selectUser(user)}
      >
        <div className='user_info'>
          <div className='user_detail'>
            {
              user.Image !== "" ?
                <Avatar src={user.Image} alt='avatar' /> :
                <Avatar alt='avatar' sx={{ backgroundColor: '#2E8359' }}>{user.UserName.substring(0, 2).toUpperCase()}</Avatar>
            }
            <h4>{user.UserName}</h4>
            {data?.from !== user1 && data?.unread && (
              <small className='unread'>New</small>
            )}
          </div>
          <div
            className={`user_status ${data?.from !== user1 && data?.unread && "offline"}`}
          ></div>
        </div>
        {data && (
          <p className='truncate'>
            <strong>{data.from === user1 ? "Me:" : null}</strong>
            {data.text}
          </p>
        )}
      </div>
      <div
        onClick={() => selectUser(user)}
        className={`sm_container ${chat.name === user.name && "selected_user"}`}
      >
        <img
          src={user.avatar || Img}
          alt='avatar'
          className='avatar sm_screen'
        />
      </div>
    </>
  );
};

export default User;
