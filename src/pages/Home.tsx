import {
  AppBar,
  Box,
  Container,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { TasksStatistics } from "../components/TasksStatistics";
import { TasksTable } from "../components/TasksTable";
import { useGetTasks } from "../hooks/useGetTasks";
import { TaskDto } from "../interfaces/task.dto";
import { deleteTask, markAsDone } from "../services/tasks.service";
import { useAuth } from "../hooks/useAuth";

type TaskResponse = TaskDto[];

export const Home = () => {
  const { logout } = useAuth();
  const { tasks, isLoading, error, reFetch } = useGetTasks<TaskResponse>([]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const getStatistics = () => {
    const todo = tasks.filter((task) => task.status === "TODO").length;
    const inProgress = tasks.filter(
      (task) => task.status === "IN_PROGRESS"
    ).length;
    const done = tasks.filter((task) => task.status === "DONE").length;

    const countByUser = tasks.reduce((acc: any, task: TaskDto) => {
      if (task.user) {
        if (!acc[task.user.id]) {
          acc[task.user.id] = 0;
        }
        acc[task.user.id] += 1;
      }
      return acc;
    }, {});

    return { todo, inProgress, done, countByUser };
  };

  const completeTask = async (id: string) => {
    await markAsDone(id);
    reFetch();
  };

  const removeTask = async (id: string) => {
    await deleteTask(id);
    reFetch();
  };

  const reloadData = async () => {
    reFetch();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          display: "flex",

          flexDirection: "column",
          alignItems: "stretch",
          height: "100vh",
          overflow: "auto",
        }}
      >
        <AppBar position="absolute">
          <Toolbar
            sx={{
              pr: "24px",
            }}
          >
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Gestor de tareas
            </Typography>
            <IconButton
              color="inherit"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <FaUser />
            </IconButton>

            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        <Toolbar sx={{ mb: "10px" }} />

        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={4} maxWidth="xl">
            <Grid item xs={12} md={12} lg={5}>
              <TasksStatistics {...getStatistics()} />
            </Grid>
            <Grid item xs={12} md={12} lg={7}>
              <TasksTable
                rows={tasks}
                completeTask={completeTask}
                removeTask={removeTask}
                reloadData={reloadData}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};
