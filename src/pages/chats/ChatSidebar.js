import React from "react";
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
import { Link as RouterLink,useHistory, useLocation } from "react-router-dom";
import Scrollbar from "../../components/Scrollbar";
import { useSelector } from "react-redux";

export default function ChatSidebar({data, urlId}) {
  const user = useSelector((state) => state.user);
  console.log(user.chats);

  // const useQuery = () => {
  //   return new URLSearchParams(useLocation().search);
  // };
  // let queryy = useQuery();
  // let urlId = queryy.get("id");
  console.log(data);

  return (
    <Box sx={{p:2}}>
      {/* Search */}
      <FormControl sx={{  mt: 2 }} variant="outlined" fullWidth>
        <OutlinedInput
          size="small"
          // value={values.weight}
          // onChange={handleChange('weight')}
          placeholder="Search"
          endAdornment={<SearchIcon color="primary" />}
        />
      </FormControl>

      {/* User List */}
      <Box sx={{ maxHeight: 450, overflow: 'auto',mt:2 }}>

        {user.chats.map((chat, k) => (
             <Link underline="none" component={RouterLink} color="inherit" to={`/chat?id=${chat.id}`}>
        <Box
        key={k}
          sx={{
            display: "flex",
            alignItems: "center",
            p: .5,
            bgcolor: "background.paper",
            mb:2,
            cursor: "pointer",
          }}
        >
          <Avatar src={user.users?.filter((user) => user.id  === chat.id).map((user) => user.Image)}sx={{ bgcolor: "primary.main", width: 40, height: 40}}></Avatar>
          <Box sx={{ ml: 1, flexGrow: 1 }}>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Typography sx={{ fontSize: 13, fontWeight: "bold" }}>
                {user.users.filter((user) => user.id  === chat.id).map((user) => user.UserName)}
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              {/* <Typography variant="caption" sx={{ color: "gray", fontSize: 10, }}>
                1m ago
              </Typography> */}
            </Box>
            <Typography sx={{ fontSize: 13 }} noWrap>
              {/* { data.map(i => i.from )[data.length - 1] === "Student" ? "You: " : "Counselor: "}  */}
              {/* {data.map(i => i.message)[data.length - 1]} */}
              ************
            </Typography>
          </Box>
        </Box>
        </Link>
        ))}
 
        
        
      </Box>
    </Box>
  );
}
