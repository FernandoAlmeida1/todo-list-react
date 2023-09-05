import React, { useState } from "react";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { editTask, removeTask } from "../services/firebase";
import EditTaskModal from "./ModalEdit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ModalCardDetails from "./ModalCardDetails";
import { UserAuth } from "../context/authContext";

const Cards = ({ task }) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const { user } = UserAuth();

  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleOpenDetails = () => {
    setOpenDetails(true);
  };

  const handleCloseEdit = () => setOpenEdit(false);

  const handleCloseDetails = () => {
    setOpenDetails(false);
  };

  const handleDeleteTask = (taskId) => {
    removeTask(taskId);
  };

  const handleBlockTask = () => {
    editTask(task.id, {
      blocked: !task.data.blocked,
    });
  };

  const handleCompletedTask = () => {
    editTask(task.id, {
      completed: !task.data.completed,
    });
  };

  return (
    <>
      <ListItem>
        <ListItemText
          primary={task.data.title}
          onClick={handleOpenDetails}
          sx={{ textDecoration: task.data.completed ? "line-through" : "none" }}
        />
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            aria-label="block"
            onClick={() => handleCompletedTask()}
            disabled={task.data.blocked}
          >
            {task.data.completed ? (
              <CheckCircleIcon />
            ) : (
              <CheckCircleOutlineIcon />
            )}
          </IconButton>
          {user.email === task.data.createBy && (
            <IconButton
              edge="end"
              aria-label="block"
              onClick={() => handleBlockTask()}
            >
              {task.data.blocked ? <LockIcon /> : <LockOpenIcon />}
            </IconButton>
          )}
          <IconButton
            edge="end"
            aria-label="edit"
            disabled={task.data.blocked}
            onClick={() => handleOpenEdit()}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            edge="end"
            aria-label="delete"
            disabled={task.data.blocked}
            onClick={() => handleDeleteTask(task.id)}
          >
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>

      <EditTaskModal
        open={openEdit}
        taskId={task.id}
        oldTitle={task.data.title}
        oldDescription={task.data.description}
        handleClose={handleCloseEdit}
      />
      <ModalCardDetails
        open={openDetails}
        handleClose={handleCloseDetails}
        data={task.data}
      />
    </>
  );
};

export default Cards;
