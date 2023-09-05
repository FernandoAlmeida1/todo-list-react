import React, { useEffect, useState } from "react";
import { Container, Typography, Button, List, Box } from "@mui/material";
import AddTaskModal from "../../components/Modal";
import { addUser, getAllTasks, getAllUsers } from "../../services/firebase";
import { onSnapshot } from "firebase/firestore";
import Cards from "../../components/Cards";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/authContext";

function TodoListPage() {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [listUser, setListUser] = useState(null);

  const { logOut, user } = UserAuth();
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSignOut = async () => {
    try {
      await logOut();
      navigate("/", {
        state: {
          mode: "logout",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user !== null) {
      const queryUser = getAllUsers();

      onSnapshot(queryUser, (querySnapshot) => {
        setListUser(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
    }
  }, [user]);

  useEffect(() => {
    if (
      listUser !== null &&
      listUser.filter((user) => user.email === user.email).length === 0
    ) {
      addUser({
        email: user.email,
        name: user.displayName,
        photoURL: user.photoURL,
      });
    }
  }, [listUser]);

  console.log(listUser, "--------------");

  useEffect(() => {
    const q = getAllTasks();
    onSnapshot(q, (querySnapshot) => {
      setTasks(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
      //   setIsLoading(false);
    });
  }, []);

  return (
    <Container maxWidth="sm">
      <Box display="flex" position="absolute" right="20px">
        <Button onClick={handleSignOut} variant="contained" color="primary">
          Log Out
        </Button>
      </Box>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Lista de Tarefas
      </Typography>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleOpen}
      >
        Criar Tarefa
      </Button>

      <List>
        {tasks
          .sort((a, b) => {
            return (
              new Date(b.data.createdAt.seconds * 1000) -
              new Date(a.data.createdAt.seconds * 1000)
            );
          })
          .map((task, index) => (
            <Cards task={task} key={index} />
          ))}
      </List>
      <AddTaskModal open={open} handleClose={handleClose} />
    </Container>
  );
}

export default TodoListPage;
