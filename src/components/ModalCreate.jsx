import React, { useState } from "react";
import { Box, Button, Modal, TextField } from "@mui/material";
import { addTask } from "../services/firebase";
import { Timestamp } from "firebase/firestore";
import { UserAuth } from "../context/authContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AddTaskModal = ({ open, handleClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { user } = UserAuth();

  const handleAddTask = () => {
    addTask({
      blocked: false,
      completed: false,
      createdAt: Timestamp.now(),
      createBy: user.email,
      title: title,
      description: description,
    });
    setTitle("");
    setDescription("");
    handleClose();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            sx={{ width: "100%", marginBottom: "20px" }}
            id="outlined-basic"
            label="Titulo"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            sx={{ width: "100%" }}
            id="outlined-basic"
            label="Descrição"
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Box display="flex" justifyContent="end">
            <Button onClick={handleClose}>Cancelar</Button>
            <Button onClick={handleAddTask}>Adicionar Tarefa</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default AddTaskModal;
