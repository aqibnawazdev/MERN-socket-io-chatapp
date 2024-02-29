import React, { useState } from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import moment from "moment";
import { Padding } from "@mui/icons-material";
function UserCard({
  user,
  id,
  message,
  userName,
  photoURL,
  chatid,
  seen,
  updatedAt,
  messagesLength,
}) {
  return (
    <Card
      elevation={0}
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "relative",
        margin: "10px 0px 0px 0px",
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            aria-label="recipe"
            src={photoURL || "./images/user-billgate.png"}
          />
        }
        title={userName}
        subheader={message}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        {seen === true ? (
          <Avatar
            src="./images/tick-double.png"
            sx={{ width: 19, height: 19 }}
          />
        ) : (
          <>
            <Badge
              badgeContent={messagesLength}
              color="secondary"
              sx={{
                marginRight: "12px",
                position: "absolute",
                left: "15px",
                top: "16px",
                width: "2px",
                height: "2px",
                fontSize: "2px",
              }}
            />
            {updatedAt && (
              <Typography
                variant="subtitle2"
                component={"span"}
                sx={{ marginTop: 2 }}
              >
                {" "}
                {moment(updatedAt.toDate()).calendar()}
              </Typography>
            )}
          </>
        )}
      </Box>
    </Card>
  );
}

export default UserCard;
