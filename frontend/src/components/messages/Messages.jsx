import React, { useContext, useEffect, useRef, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import MessagesContainer from "../containers/MessagesContainer";
import "../../index.css";
import IconButton from "@mui/material/IconButton";
import UserAvatar from "../avatar/UserAvatar";
import InputBase from "@mui/material/InputBase";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import Message from "./Message";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import newRequest from "../../utils/newRequest";
import { socket } from "../../socket";
function Messages() {
  const [message, setMessage] = useState("");
  // const [currentUser, setCurrentUser] = useState(null);
  const {
    selectedUser,
    messages,
    currentUser,
    conversationId,
    setConversationId,
    refresh,
    setRefresh,
  } = useContext(AuthContext);
  const [err, setError] = useState("");
  const ref = useRef(null);
  useEffect(() => {}, []);

  useEffect(() => {
    if (messages?.length) {
      ref.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages?.length]);

  const handleMessageSent = async (e) => {
    e.preventDefault();
    // if (message.length < 1) {
    //   return;
    // }

    try {
      if (!conversationId) {
        const { data } = await newRequest.get(
          "/conversations/" + selectedUser._id
        );
        console.log("alreadey Exists...", data);
        setConversationId(data.conversationId);
        if (!data) {
          const res = await newRequest.post(
            "/conversations" + selectedUser._id
          );
          setConversationId(res.data.conversationId);
          console.log("Newly created...", res.data);
        }

        await newRequest.post("/messages", {
          conversationId: data.conversationId,
          to: selectedUser._id,
          by: currentUser.userId,
          body: message,
        });
        socket.emit("newMessage", {
          conversationId: conversationId,
          to: selectedUser._id,
          by: currentUser.userId,
          body: message,
        });
        setRefresh((prev) => prev + 1);
      } else {
        await newRequest.post("/messages", {
          conversationId: conversationId,
          to: selectedUser._id,
          by: currentUser.userId,
          body: message,
        });
        socket.emit("newMessage", {
          conversationId: conversationId,
          to: selectedUser._id,
          by: currentUser.userId,
          body: message,
        });
        setRefresh((prev) => prev + 1);
      }

      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <MessagesContainer>
      <Stack
        direction={"row"}
        spacing="15px"
        sx={{
          width: "100%",
          padding: "10px",
          height: "70px",
          backgroundColor: "#f3f3f3",
          position: "sticky",
          top: "-10px",
          zIndex: "999",
        }}
      >
        <UserAvatar srcPath={selectedUser?.photoURL} />
        <Box
          component="div"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography
            component="h2"
            variant="h4"
            sx={{ fontWeight: 600, margin: "0px", padding: "0px" }}
          >
            {selectedUser?.username}
          </Typography>
          <Typography variant="caption">{selectedUser?.status}</Typography>
        </Box>
      </Stack>
      <Box
        component="div"
        sx={{
          width: "100%",
          height: ".5px",
          backgroundColor: "#B4ABAB",
          position: "sticky",
          top: "70px",
        }}
      ></Box>
      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "90vh",
          width: "60%",
          overflow: "auto",
          position: "fixed",
          bottom: "70px",
          top: "10px",
        }}
      >
        {messages?.map((m, i) => (
          <Message
            key={m._id}
            currUserId={currentUser.userId}
            message={m.body}
            sender={m.by}
          />
        ))}
        <div ref={ref} />
      </Box>

      <Box
        component="div"
        sx={{
          width: "100%",
          height: "8vh",
          position: "fixed",
          bottom: "0px",
        }}
      >
        <Typography
          variant="h1"
          color="red"
          sx={{ position: "fixed", bottom: "50px" }}
        >
          {err && err}
        </Typography>
        <Box
          component="form"
          onSubmit={(e) => handleMessageSent(e)}
          sx={formStyles}
        >
          <IconButton sx={{ p: "10px" }} aria-label="attach-file">
            <AttachFileIcon />
          </IconButton>
          <InputBase
            placeholder="Type you message here..."
            inputProps={{ "aria-label": "Type you message here..." }}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value), setError("");
            }}
          />
          <IconButton
            type="submit"
            aria-label="search"
            sx={{ marginLeft: "auto" }}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    </MessagesContainer>
  );
}

export default Messages;

var formStyles = {
  width: "40%",
  backgroundColor: "#EFF6FC",
  position: "sticky",
  bottom: "0px",
  borderRadius: "17px",
  padding: "0px",
  paddingRight: "10px",
  display: "flex",
  // marginBottom: "10px",
  marginLeft: "20px",
  height: "40px",
};
