import React from "react";
import { colorObject } from "../../Theme/customColors";
import { Grid, Paper } from "@mui/material";
function SideBarContainer({ children }) {
  return (
    <Grid
      item
      container
      // margin={2}
      direction={"column"}
      xs={1}
      bgcolor={colorObject.sidebarBgPrimary}
      height={"100%"}
      sx={(theme) => ({
        marginLeft: "0px",
        marginRight: "0px",
      })}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      {children}
    </Grid>
  );
}

export default SideBarContainer;
