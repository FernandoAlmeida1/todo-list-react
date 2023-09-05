import { Avatar, Box, Tooltip } from "@mui/material";
import React from "react";

// import { Container } from './styles';

function UsersList({ users }) {
  return (
    <Box display="flex" position="absolute" left="20px" gap="10px">
      {users.map((user) => {
        return (
          <Tooltip title={user.data.name} key={user.data.email}>
            <Avatar
              key={user.data.email}
              alt={user.data.name}
              src={user.data.photoURL}
            />
          </Tooltip>
        );
      })}
    </Box>
  );
}

export default UsersList;
