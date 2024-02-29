import React from "react";
import { colorObject } from "../../Theme/customColors";
import { Grid } from "@mui/material";
import Paper from "@mui/material/Paper";
function MessagesContainer({ children }) {
  return (
    <Paper
      sx={(theme) => ({
        height: "100vh",
        width: "60%",
        paddingLeft: "0px",
        position: "relative",
        overflow: "hidden",
      })}
    >
      <Grid
        item
        container
        direction={"column"}
        bgcolor={colorObject.bgWhite}
        sx={{
          width: "100%",
          marginLeft: "0px",
          padding: "0px",
        }}
      >
        {children}
      </Grid>
    </Paper>
  );
}
export default MessagesContainer;
