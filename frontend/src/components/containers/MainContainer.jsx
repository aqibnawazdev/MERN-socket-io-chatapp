import React from "react";
import { Grid } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { colorObject } from "../../Theme/customColors";
function MainContainer({ children }) {
  return (
    <Grid
      container
      bgcolor={colorObject.bodyBgPrimary}
      justifyContent={"space-between"}
      height={"100vh"}
    >
      {children}
    </Grid>
  );
}

export default MainContainer;
