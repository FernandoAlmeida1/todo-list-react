import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  List,
  Box,
  TextField,
} from "@mui/material";
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
  const [filterUser, setFilterUser] = useState("");

  const { logOut, user } = UserAuth();
  const navigate = useNavigate();

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
        <TextField
          style={{ width: "100%", marginBottom: "10px" }}
          id="outlined-basic"
          label="filtro de usuario"
          variant="outlined"
          value={filterUser}
          onChange={(e) => setFilterUser(e.target.value)}
        />

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
              .filter((task) => task.data.createBy.includes(filterUser))
              .sort((a, b) => {
                return (
                  new Date(b.data.createdAt.seconds * 1000) -
                  new Date(a.data.createdAt.seconds * 1000)
                );
              })
              .map((task) => <Cards user={user} task={task} key={task.id} />)}
        </List>
        <AddTaskModal open={open} handleClose={handleClose} />
      </Container>
    )
  );
}

export default TodoListPage;
