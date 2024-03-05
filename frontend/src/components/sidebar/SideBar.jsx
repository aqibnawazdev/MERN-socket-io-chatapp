import React, { useContext } from "react";
import SideBarContainer from "../containers/SideBarContainer";
import { Grid } from "@mui/material";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import UserAvatar from "../avatar/UserAvatar";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function SideBar() {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const handleLogout = () => {};
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
