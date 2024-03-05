import React from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import moment from "moment";
function Message({ currUserId, message, sender }) {
  return (
    <Stack
      sx={{
        width: "fit-content",
        alignSelf: sender === currUserId ? "end" : "start",
        margin: 1,
      }}
    >
      <Typography
        variant="p"
        component="p"
        backgroundColor={sender === currUserId ? "#6E00FF" : "#E7E7E7"}
        sx={(theme) => ({
          padding: "8px",
          borderRadius: theme.shape.borderRadius,
          paddingLeft: "20px",
          paddingRight: "20px",
          color: sender === currUserId ? "white" : "#000",
        })}
      >
        {message}
      </Typography>
      <Typography
        variant="caption"
        sx={{ marginLeft: "10px", marginTop: "0px" }}
      >
        {/* {moment(message?.sendAt.toDate()).calendar()} */}
      </Typography>
    </Stack>
  );
}

export default Message;
