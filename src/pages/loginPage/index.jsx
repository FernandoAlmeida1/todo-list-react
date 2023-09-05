import React, { useEffect } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Box, Button } from "@mui/material";
import { UserAuth } from "../../context/authContext";
import { useNavigate, useLocation } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { googleSignIn, user } = UserAuth();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user !== null && !location.state?.mode) {
      navigate("/todo-list-react/todoListPage");
    } else if (location.state?.mode === "logout") {
      window.history.replaceState({}, document.title);
      window.location.reload();
    }
  }, [user]);

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="100%"
        flexDirection="column"
        height="90vh"
      >
        <Typography variant="h5" component="h1" align="center">
          TODO LIST
        </Typography>
        <Typography variant="body1" align="justify">
          Para acessar o TODOLIST você precisa entrar com a conta Google
        </Typography>
        <Button onClick={handleGoogleSignIn}>Entrar com conta Google</Button>
      </Box>
    </Container>
  );
}

export default LoginPage;
