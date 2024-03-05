import React, { useContext, useEffect, useState } from "react";
import UsersContainer from "../containers/UsersContainer";
import { Grid, Typography, Box } from "@mui/material";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Divider from "@mui/material/Divider";
import { fontFamilies } from "../../Theme/Components-Theme/typography";
import UserCard from "../cards/UserCard";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
function Users() {
  const [searchUser, setSearchUser] = useState("");
  const [availableUser, setAvailableUser] = useState(null);
  const [search, setSearch] = useState(false);
  const [err, setErr] = useState(null);
  const [conversation, setConversations] = useState(null);
  const { handleUserSelect } = useContext(AuthContext);
  const [currentUserId, setCurrentUserId] = useState(null);

  //Handle Search
  const fetchConversations = async (token, userId) => {
    console.log("UserId", userId);
    const { data } = await axios.post(
      "http://127.0.0.1:8080/api/conversations",
      {
        userId: userId,
      }
    );
    console.log("conversation", data);
    setConversations(data.conversation);
  };
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setCurrentUserId(user.userId);
    fetchConversations(user.token, user.userId);
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setSearch(true);

    const { data } = await axios.get(
      "http://127.0.0.1:8080/api/users/" + searchUser
    );
    setAvailableUser(data.user);
    // console.log(data.user);
    setSearchUser("");
  };

  const handlesSearchSelect = (selectedUser) => {
    handleUserSelect(selectedUser);
  };

  const handleChatUserSelect = async (selectedUser, chatId) => {
    const selectedUserId = selectedUser;
    handleUserSelect(selectedUser, chatId);
  };

  return (
    <UsersContainer>
      <Grid item>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "370px",
            marginBottom: 4,
            marginTop: "10px",
          }}
          onSubmit={(e) => handleSearch(e)}
        >
          <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1, fontFamily: fontFamilies.Roboto }}
            placeholder="Search "
            inputProps={{ "aria-label": "search google maps" }}
            type="text"
            onChange={(e) => setSearchUser(e.target.value)}
            value={searchUser}
          />
        </Paper>
      </Grid>
      {search && (
        <Grid
          item
          onClick={() => {
            handlesSearchSelect(availableUser), setSearch(false);
          }}
        >
          <Paper
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "start",
              // borderRadius: "20px",
              width: 370,
              flexDirection: "column",
              padding: 2,
              marginBottom: "10px",
              cursor: "pointer",
            }}
          >
            {availableUser ? (
              <UserCard
                photoURL={availableUser?.photoURL}
                userName={availableUser?.username}
              />
            ) : (
              <Typography variant="h1" color="initial">
                {err}
              </Typography>
            )}
          </Paper>
        </Grid>
      )}
      <Grid item>
        <Paper
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "start",
            // borderRadius: "20px",
            width: "100%",
            flexDirection: "column",
            padding: 2,
          }}
        >
          <Typography variant="h3" component={"h2"} fontWeight={600}>
            People
          </Typography>

          {conversation?.map((c, { _id, users }) => (
            <Box
              component={"div"}
              sx={{ width: "100%", cursor: "pointer" }}
              key={c._id}
              onClick={(e) => {
                let selectedUserId =
                  c.users[0] === currentUserId ? c.users[0] : c.users[1];
                handleChatUserSelect(selectedUserId, c._id);
              }}
            >
              <UserCard
                photoURL={
                  c.users[0]._id === currentUserId
                    ? c?.users[1].photoURL
                    : c?.users[0].photoURL || ""
                }
                userName={
                  c.users[0]._id === currentUserId
                    ? c?.users[1].username
                    : c?.users[0].username
                }
                user={c?.users}
                chatid={c?._id}
                // seen={c.messages.seen}
                // message={c.messages[c.messages?.length - 1].body}
                // updatedAt={c.updatedAt}
                // messagesLength={c.messages.length}
              />
              <Divider
                component="li"
                sx={{ width: "100%", listStyle: "none" }}
              />
            </Box>
          ))}
        </Paper>
      </Grid>
    </UsersContainer>
  );
}

export default Users;
