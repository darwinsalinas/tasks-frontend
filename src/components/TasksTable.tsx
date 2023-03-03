import {
  Button,
  ButtonGroup,
  FormControl,
  IconButton,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { TaskDto } from "../interfaces/task.dto";
import { FaTrash, FaPlusCircle } from "react-icons/fa";
import { UsersResponse } from "../interfaces/user.dto";
import { useGetUsers } from "../hooks/useGetUsers";
import { updateTask } from "../services/tasks.service";
import { Box } from "@mui/system";
import { CreateTaskForm } from "./CreateTaskForm";
import { useState } from "react";

interface TasksTableProps {
  rows: TaskDto[];
  completeTask: (id: string) => void;
  removeTask: (id: string) => void;
  reloadData: () => void;
}

const statusList = [
  { value: "TODO", label: "Por hacer" },
  { value: "IN_PROGRESS", label: "En progreso" },
  { value: "DONE", label: "Completada" },
];

export const TasksTable = ({
  rows,
  removeTask,
  reloadData,
}: TasksTableProps) => {
  const { users } = useGetUsers<UsersResponse>([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = ({ shoudRefresh = false }: { shoudRefresh: boolean }) => {
    if (shoudRefresh) {
      reloadData();
    }

    setOpen(false);
  };

  const handleChange = async (
    uuid: string,
    data: any,
    event: SelectChangeEvent<string>
  ) => {
    const resp = await updateTask(uuid, data);
    reloadData();
  };

  const showModal = () => {
    handleOpen();
  };

  return (
    <TableContainer
      component={Paper}
      sx={{ p: 2, display: "flex", flexDirection: "column" }}
    >
      <CreateTaskForm open={open} handleClose={handleClose} />
      <Box
        sx={{ justifyContent: "space-between" }}
        flexDirection="row"
        display={"flex"}
      >
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
          Tareas
        </Typography>
        <IconButton color="primary" onClick={showModal}>
          <FaPlusCircle />
        </IconButton>
      </Box>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Título</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell align="right">Estado</TableCell>
            <TableCell align="right">Usuario</TableCell>
            <TableCell align="right">Opciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} align="center">
                <Typography variant="body2" color="text.secondary">
                  No hay tareas agregadas
                </Typography>
              </TableCell>
            </TableRow>
          )}
          {rows.map((row: TaskDto) => {
            return (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell align="right">
                  <FormControl fullWidth variant="standard" size="medium">
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={row.status}
                      onChange={(e) =>
                        handleChange(row.id, { status: e.target.value }, e)
                      }
                    >
                      {statusList.map((item) => (
                        <MenuItem key={item.value} value={item.value}>
                          {item.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell align="right">
                  <FormControl fullWidth variant="standard" size="medium">
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={row.user.id}
                      onChange={(e) =>
                        handleChange(row.id, { userId: e.target.value }, e)
                      }
                    >
                      {users.map((user) => (
                        <MenuItem key={user.id} value={user.id}>
                          {user.fullName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell align="right">
                  <ButtonGroup variant="text" aria-label="text button group">
                    <Button onClick={() => removeTask(row.id)}>
                      <FaTrash color="red" />
                    </Button>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
