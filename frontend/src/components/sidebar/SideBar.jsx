import React, { useContext } from "react";
import SideBarContainer from "../containers/SideBarContainer";
import { Grid } from "@mui/material";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import UserAvatar from "../avatar/UserAvatar";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import { showToastMessage } from "../../utils/showToast";

function SideBar() {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const handleLogout = async () => {
    try {
      const { data } = await newRequest.post("/logout");
      console.log("data", data);
      if (data.status === "success") {
        localStorage.removeItem("user");
        const toastDetails = {
          type: data.status,
          message: data.message,
        };
        showToastMessage(toastDetails);
        navigate("/login");
      }
    } catch (error) {
      const toastDetails = {
        type: error.status,
        message: error.response.message,
      };
      showToastMessage(toastDetails);
    }
  };
  return (
    <SideBarContainer>
      <Grid item marginTop={2}>
        <IconButton
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <UserAvatar srcPath={currentUser?.photoURL} alt="" />
        </IconButton>

        <Stack marginTop={2}>
          <IconButton>
            <img src="/images/home.png" width={35} alt="" />
          </IconButton>
          <IconButton>
            <img src="/images/messages.png" width={35} alt="" />
          </IconButton>
          <IconButton>
            <img src="/images/bx_bell.png" width={35} alt="" />
          </IconButton>
          <IconButton>
            <img src="/images/ci_settings.png" width={35} alt="" />
          </IconButton>
        </Stack>
      </Grid>
      <Grid item marginBottom={2}>
        <IconButton onClick={() => handleLogout()}>
          <img src="/images/logout.png" width={35} alt="" />
        </IconButton>
      </Grid>
    </SideBarContainer>
  );
}

export default SideBar;
