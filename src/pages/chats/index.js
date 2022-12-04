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
    FormControl,
    OutlinedInput,
    Avatar,
} from "@mui/material";
import { Link as RouterLink, useHistory, useLocation } from "react-router-dom";

import SearchIcon from "@mui/icons-material/Search";
import ChatSidebar from "./ChatSidebar";
import ChatWindow from "./ChatWindow";
import ChatDetail from "./ChatDetail";

import { useSelector } from "react-redux";

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
import { auth, db, storage } from "../../utils/firebase";
import User from "./User";
import Message from "./Message";
import MessageForm from "./MessageForm";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function Chats() {
    const user = useSelector((state) => state.user);
    const history = useHistory();

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

        const user2 = user.UserUid
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


    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    };
    let queryy = useQuery();
    let urlId1 = queryy.get("id");

    const [urlId, setUrlId] = useState(queryy.get("id") === null ? "1" : queryy.get("id"));

    const [data, setData] = React.useState([]);
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

    }, [urlId1, urlId])

    useEffect(() => {
        if (urlId1 !== null) {
            setUrlId(queryy.get("id"))
        }
    }, [urlId1,])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user2 = chat.UserUid;

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


    // console.log(urlId);

    return (
        <Box sx={{ mt: 12, width: '100%', padding: 2, height: '50%' }}>

            <Box direction="column" alignItems="center" sx={{
                backgroundColor: 'white'
            }}>
                <Typography variant="h4" gutterBottom>
                    Chat
                </Typography>
                <Breadcrumbs
                    sx={{ ml: 0.5 }}
                    separator={
                        <Box
                            sx={{
                                width: 10,
                                height: 2,
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

            <div className="home_container">
                <div className="users_container">
                    <Box sx={{
                        margin: 2
                    }}>
                        <FormControl sx={{ mt: 2 }} variant="outlined" fullWidth>
                            <OutlinedInput
                                size="small"
                                // value={values.weight}
                                // onChange={handleChange('weight')}
                                placeholder="Search"
                                endAdornment={<SearchIcon color="primary" />}
                            />
                        </FormControl>
                    </Box>
                    {users.map((user) => (
                        <User
                            key={user.uid}
                            user={user}
                            selectUser={selectUser}
                            user1={user1}
                            chat={chat}
                        />
                    ))}
                </div>
                <div className="messages_container">
                    {chat ? (
                        <>
                            <div className="messages_user">
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    {
                                        chat.Image !== "" ?
                                            <Avatar src={chat.Image} alt='avatar' sx={{ border: '2px solid #2E8359', margin: 1, fontSize: 32, width: 80, height: 80 }} /> :
                                            <Avatar alt='avatar' sx={{ backgroundColor: '#2E8359', margin: 1, fontSize: 32, width: 80, height: 80 }}>{chat.UserName.substring(0, 2).toUpperCase()}</Avatar>
                                    }
                                    <div>
                                        <h2>{chat.UserName}</h2>
                                    </div>
                                    <div style={{ flexGrow: 1 }} />
                                    <div style={{
                                        textAlign: 'right'
                                    }}>
                                        <h3 style={{ fontWeight: 700 }}>Student ID</h3>
                                        <Typography style={{ fontWeight: 200, color: 'gray' }}>{chat.StudentNumber}</Typography>
                                    </div>
                                </div>
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
            </div >
        </Box>
    );
}
