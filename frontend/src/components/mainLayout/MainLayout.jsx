import SideBar from "../../components/sidebar/SideBar";
import MainContainer from "../containers/MainContainer";
import Users from "../../components/users/Users";
import Messages from "../../components/messages/Messages";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { socket } from "../../socket.js";
export const MainLayout = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [loggedInUser, setloggedInUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setloggedInUser(user);

    if (!user?.username) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    socket.emit("connection");
  }, []);

  return (
    <MainContainer>
      <SideBar />
      <Users />
      <Messages />
    </MainContainer>
  );
};
