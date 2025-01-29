import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import Person2TwoToneIcon from "@mui/icons-material/Person2TwoTone";
import { useNavigate, useLocation } from "react-router-dom";
import { Home } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Avatar, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

export default function Sidebar() {
  const { name } = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = React.useState(false);

  const menuItems = [
    {
      name: "Home",
      href: "/",
      icon: <Home />,
    },
    {
      name: "Trade",
      href: "/trade",
      icon: <CurrencyExchangeIcon />,
    },
    {
      name: "Profile",
      href: "/profile",
      icon: <Person2TwoToneIcon />,
    },
    {
      name: "Strategies",
      href: "/strategies",
      icon: <MonetizationOnIcon />,
    },
  ];

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box
      sx={{ width: 250, color: "#3b7fce" }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          m: 4,
          gap: 2,
        }}
      >
        <Avatar sx={{ width: 150, height: 150 }}>
          <AccountCircleIcon sx={{ width: 150, height: 150 }} />
        </Avatar>
        <Typography variant="h6">{name}</Typography>
      </Box>
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              onClick={() => navigate(item.href)}
              sx={{
                backgroundColor:
                  location.pathname === item.href ? "#e3f2fd" : "transparent",
                "&:hover": { backgroundColor: "#bbdefb" },
              }}
            >
              <ListItemIcon
                sx={{
                  color:
                    location.pathname === item.href ? "#1976d2" : "inherit",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.name}
                primaryTypographyProps={{
                  fontWeight:
                    location.pathname === item.href ? "bold" : "normal",
                  color:
                    location.pathname === item.href ? "#1976d2" : "inherit",
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>
        <MenuIcon className="text-white text-3xl" />
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
