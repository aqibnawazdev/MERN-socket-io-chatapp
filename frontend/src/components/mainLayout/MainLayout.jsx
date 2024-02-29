import SideBar from "../../components/sidebar/SideBar";
import MainContainer from "../containers/MainContainer";
import Users from "../../components/users/Users";
import Messages from "../../components/messages/Messages";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const MainLayout = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {}, []);

  return (
    <MainContainer>
      <SideBar />
      <Users />
      <Messages />
    </MainContainer>
  );
};
