import React, { useEffect, useState } from "react";
import { Container, Typography, Button, List, Box } from "@mui/material";
import AddTaskModal from "../../components/ModalCreate";
import { addUser, getAllTasks, getAllUsers } from "../../services/firebase";
import { onSnapshot } from "firebase/firestore";
import Cards from "../../components/Cards";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/authContext";
import UsersList from "../../components/UsersList";

function TodoListPage() {
  const [tasks, setTasks] = useState(null);
  const [open, setOpen] = useState(false);
  const [listUsers, setListUsers] = useState(null);

  const { logOut, user } = UserAuth();
  const navigate = useNavigate();
  console.log(tasks);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSignOut = async () => {
    try {
      await logOut();
      navigate("/todo-list-react/", {
        state: {
          mode: "logout",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const queryUsers = getAllUsers();

    onSnapshot(queryUsers, (querySnapshot) => {
      setListUsers(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  useEffect(() => {
    if (user !== null && listUsers !== null) {
      if (
        listUsers.filter((listUser) => listUser.data.email === user.email)
          .length === 0
      ) {
        addUser({
          email: user.email,
          name: user.displayName,
          photoURL: user.photoURL,
        });
      }
    }
  }, [listUsers, user]);

  useEffect(() => {
    const q = getAllTasks();
    onSnapshot(q, (querySnapshot) => {
      setTasks(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  return (
    tasks && (
      <Container maxWidth="sm">
        <UsersList users={listUsers} />
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
          {tasks &&
            tasks
              .sort((a, b) => {
                return (
                  new Date(b.data.createdAt.seconds * 1000) -
                  new Date(a.data.createdAt.seconds * 1000)
                );
              })
              .map((task) => <Cards task={task} key={task.id} />)}
        </List>
        <AddTaskModal open={open} handleClose={handleClose} />
      </Container>
    )
  );
}

export default TodoListPage;
