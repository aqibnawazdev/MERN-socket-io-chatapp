import React, { createContext, useEffect, useReducer, useState } from "react";

import { userReducer } from "./userReducer.js";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [state, dispatch] = useReducer(userReducer, {});
  const [chat, setChat] = useState(null);
  //User Selection....

  const handleUserSelect = async (selectedUser, chatId) => {
    dispatch({ type: "SELECT_USER", payload: selectedUser });
    setChat(null);
    // console.log("docId ", docId);
    if (!chatId) {
      const conversationId =
        user.uid > selectedUser.userId
          ? user.uid + selectedUser.userId
          : selectedUser.userId + user.uid;
    } else {
      setChat(data);
    }
  };

  useEffect(() => {}, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        handleUserSelect,
        selectedUser: state.selectedUser,
        chat: chat,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
