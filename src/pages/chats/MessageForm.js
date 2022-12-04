import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

const MessageForm = ({ handleSubmit, text, setText, setImg }) => {
  const [preview, setpreview] = useState("");
  const imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setpreview(reader.result);
        setImg(e.target.files[0]);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  return (
    <div style={{ diplay: "flex", flexDirection: { lg: "row", xs: "column" } }}>

      <form className='message_form' onSubmit={handleSubmit}>
        <div>
          <input
            type='text'
            placeholder='Enter message'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div>
          <button
            className='btn'
            onClick={(e) => {
              setpreview("");
            }}
          >
            <SendIcon />
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageForm;
