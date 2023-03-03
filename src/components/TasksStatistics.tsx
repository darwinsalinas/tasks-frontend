import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useGetUsers } from "../hooks/useGetUsers";
import { UsersResponse } from "../interfaces/user.dto";

interface TasksStatisticsProps {
  done: number;
  todo: number;
  inProgress: number;
  countByUser: any;
}

export const TasksStatistics = ({
  done,
  todo,
  inProgress,
  countByUser,
}: TasksStatisticsProps) => {
  const { users } = useGetUsers<UsersResponse>([]);
  const userIdWithMoretasks = Array.from(Object.entries(countByUser))
    .sort((a: any, b: any) => b[1] - a[1])
    .shift();

  const userWithMoreTasks = users.find(
    (item) => item.id === userIdWithMoretasks?.[0]
  );

  return (
    <TableContainer
      component={Paper}
      sx={{ p: 2, display: "flex", flexDirection: "column" }}
    >
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Estadísticas
      </Typography>
      <Table sx={{ minWidth: 300 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Por hacer</TableCell>
            <TableCell align="right">En progreso</TableCell>
            <TableCell align="right">Completadas</TableCell>
            <TableCell align="right">Usuario Con mas tareas</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(countByUser).length > 0 ? (
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="right">{todo}</TableCell>
              <TableCell align="right">{inProgress}</TableCell>
              <TableCell align="right">{done}</TableCell>
              <TableCell align="right">
                {userWithMoreTasks?.fullName}{" "}
                {`(${
                  userIdWithMoretasks != undefined
                    ? userIdWithMoretasks?.[1]
                    : ""
                })`}
              </TableCell>
            </TableRow>
          ) : (
            <TableRow>
              <TableCell colSpan={4} align="center">
                <Typography variant="body2" color="text.secondary">
                  Sin datos para mostrar
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
