import { Box, Button, Modal, Typography } from "@mui/material";

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

const ModalCardDetails = ({ open, handleClose, data }) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h4" id="outlined-basic" label="Titulo">
            {data.title}
          </Typography>
          <Typography variant="body" id="outlined-basic" label="Descrição">
            {data.description}
          </Typography>
          <Box display="flex" justifyContent="end">
            <Button onClick={handleClose}>Fechar</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalCardDetails;
