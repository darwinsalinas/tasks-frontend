import { Box, Button, FormControl, Modal, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import { toast } from "react-toastify";
import { createTask } from "../services/tasks.service";

interface CreateTaskFormProps {
  open: boolean;
  handleClose: ({ shoudRefresh }: { shoudRefresh: boolean }) => void;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
};

export const CreateTaskForm = ({ open, handleClose }: CreateTaskFormProps) => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const storeData = {
      title: data.get("title") as string,
      description: data.get("description") as string,
    };

    if (!storeData.title || !storeData.description) {
      toast("Todos los campos son requeridos", { type: "error" });
      return;
    }

    await createTask(storeData);
    handleClose({ shoudRefresh: true });
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ ...style, width: 400 }}
      >
        <Typography variant="h4">Nueva tarea</Typography>

        <FormControl fullWidth variant="standard" size="medium">
          <TextField
            required
            margin="normal"
            fullWidth
            id="title"
            name="title"
            label="Título"
            variant="outlined"
          />
        </FormControl>
        <FormControl fullWidth variant="standard" size="medium">
          <TextField
            id="description"
            name="description"
            margin="normal"
            label="Descripción"
            multiline
            rows={4}
            required
          />
        </FormControl>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 4, mb: 2, paddingY: 2 }}
        >
          Guardar
        </Button>
      </Box>
    </Modal>
  );
};
