import React, { createContext, useEffect, useReducer, useState } from "react";

import { userReducer } from "./userReducer.js";
import axios from "axios";
import newRequest from "../utils/newRequest.js";
import { socket } from "../socket.js";
export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [conversations, setConversations] = useState(null);
  const [singleConversation, setSingleConversation] = useState(null);
  const [messages, setMessages] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [conversationId, setConversationId] = useState(null);
  const [state, dispatch] = useReducer(userReducer, {});
  const [refresh, setRefresh] = useState(0);
  const handleUserSelect = async (selectedUser, conversationId) => {
    dispatch({ type: "SELECT_USER", payload: selectedUser });
    setSingleConversation(null);
    setMessages(null);
    setConversationId(null);
    if (!conversationId) {
      setSelectedUser(selectedUser);
      console.log("selected User Id", selectedUser);
      const { data } = await newRequest.get(
        "/conversations/" + selectedUser.userId
      );
      console.log("auth data", data);
      const res = await newRequest.get("/messages/" + data.conversationId);
      console.log(res);
      setMessages(res.data.message);
    } else {
      setSelectedUser(selectedUser);
      setConversationId(conversationId);
      console.log("selected User Id", selectedUser);
      const { data } = await newRequest.get("/messages/" + conversationId);

      setMessages(data.message);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setCurrentUser(user);
  }, [selectedUser?.username]);

  useEffect(() => {
    socket.on("addMessage", (newMessage) => {
      setMessages((Prev) => [...Prev, newMessage]);
    });
  }, []);
  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        handleUserSelect,
        selectedUser,
        setSelectedUser,
        conversations,
        setConversations,
        singleConversation,
        setSingleConversation,
        messages,
        setMessages,
        conversationId,
        setConversationId,
        refresh,
        setRefresh,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
