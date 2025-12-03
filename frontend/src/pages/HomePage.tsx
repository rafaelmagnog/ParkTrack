/**
 * Página inicial do ParkTrack
 *
 * Exibe o menu principal com acesso às três áreas do sistema:
 * Clientes, Veículos e Estacionamento.
 */

import { Box, Button, Paper, Typography, Avatar, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import PeopleIcon from "@mui/icons-material/People";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";

const AVATAR_SIZE = 80;

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  // Definição dos itens do menu principal
  const menuItems = [
    {
      title: "Clientes",
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      color: "primary.main",
      path: "/clientes",
      description: "Gerenciar clientes do estacionamento",
    },
    {
      title: "Veículos",
      icon: <TimeToLeaveIcon sx={{ fontSize: 40 }} />,
      color: "secondary.main",
      path: "/veiculos",
      description: "Cadastrar e gerenciar veículos",
    },
    {
      title: "Estacionamento",
      icon: <LocalParkingIcon sx={{ fontSize: 40 }} />,
      color: "success.main",
      path: "/estacionamentos",
      description: "Controlar entradas e saídas",
    },
  ];

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="background.default"
      p={3}
    >
      <Paper elevation={3} sx={{ p: 4, width: "100%", maxWidth: 600 }}>
        {/* Cabeçalho com logo e título */}
        <Box textAlign="center" mb={4}>
          <Box display="flex" justifyContent="center" mb={2}>
            <Avatar
              sx={{
                width: AVATAR_SIZE,
                height: AVATAR_SIZE,
                bgcolor: "primary.main",
              }}
            >
              <DirectionsCarIcon sx={{ fontSize: 48 }} />
            </Avatar>
          </Box>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            ParkTrack
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Sistema de Gerenciamento de Estacionamento
          </Typography>
        </Box>

        {/* Grid de botões de navegação */}
        <Grid container spacing={2}>
          {menuItems.map((item) => (
            <Grid size={12} key={item.path}>
              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={() => navigate(item.path)}
                sx={{
                  py: 2,
                  bgcolor: item.color,
                  "&:hover": {
                    bgcolor: item.color,
                    filter: "brightness(0.9)",
                  },
                }}
                startIcon={item.icon}
              >
                <Box textAlign="left" flex={1}>
                  <Typography variant="button" display="block">
                    {item.title}
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>
                    {item.description}
                  </Typography>
                </Box>
              </Button>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
};

export default HomePage;
