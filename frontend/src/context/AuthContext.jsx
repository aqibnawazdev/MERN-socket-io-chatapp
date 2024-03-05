import React, { createContext, useEffect, useReducer, useState } from "react";

import { userReducer } from "./userReducer.js";
import axios from "axios";
export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [conversations, setConversations] = useState(null);
  const [singleConversation, setSingleConversation] = useState(null);
  const [messages, setMessages] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [conversationId, setConversationId] = useState(null);
  const [state, dispatch] = useReducer(userReducer, {});

  const handleUserSelect = async (selectedUser, conversationId) => {
    dispatch({ type: "SELECT_USER", payload: selectedUser });
    setSingleConversation(null);
    setConversationId(null);
    if (!conversationId) {
      setSelectedUser(selectedUser);
      console.log("selected User Id", selectedUser);
      const { data } = await axios.post(
        "http://127.0.0.1:8080/api/conversations/single",
        {
          currentUserId: currentUser.userId,
          selectedUserId: selectedUser.userId,
        }
      );
      console.log("auth data", data);
      const res = await axios.get(
        "http://127.0.0.1:8080/api/messages/" + data.conversationId
      );
      console.log(res);
      setMessages(res.data.message);
    } else {
      setSelectedUser(selectedUser);
      setConversationId(conversationId);
      console.log("selected User Id", selectedUser);
      const { data } = await axios.get(
        "http://127.0.0.1:8080/api/messages/" + conversationId
      );
      setMessages(data.message);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setCurrentUser(user);
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
