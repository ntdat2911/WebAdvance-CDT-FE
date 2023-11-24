import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Image, { Label } from "@mui/icons-material";
import AuthService from "@/auth/auth-service";
import { useRouter } from "next/router";
import axios from "axios";
import jwt from "jsonwebtoken";
import {
  middleListItems,
  bottomListItems,
  topListItems,
} from "../components/dashboard-page/listItems";
import authService from "@/auth/auth-service";
import LinkNext from "next/link";
import AvatarDropdown from "@/components/AvatarDropdown";
import Layout from "../components/dashboard-page/Layout";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function HomePage() {
  const router = useRouter();
  const [open, setOpen] = React.useState(true);
  const [currentUser, setCurrentUser] = React.useState(null);
  React.useEffect(() => {
    // authCheck();
    const fetchData = async () => {
      if (router.isReady) {
        try {
          console.log(router.query)
          const userParam = router.query.user;
          const tokenParam = router.query.token;
          if (userParam && tokenParam) {
            const user = JSON.parse(decodeURI(userParam));
            console.log(user.displayName + " Sau khi decode")
            setCurrentUser(user.displayName);
          } else setCurrentUser("SAI ROI")
          // Fetch user data and token from the server after successful authentication
          // const response = await axios.get("http://localhost:5000/auth/google/success");
          // console.log(response.data)
          // if (response.data) {
          //   setCurrentUser(response.data.user);
          //   // Save the token to localStorage or cookies for subsequent requests
          //   // localStorage.setItem('token', response.data.token);
          // }

          // if (!currentUser) {
          //   // Redirect to login page or handle unauthenticated user
          //   router.push({ pathname: 'http://localhost:3000/auth/sign-in' });
          //   return null;
          // }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchData();

  }, [router.isReady]);


  // const authCheck = async () => {
  //   const user = AuthService.getCurrentUser();

  //   if (isTokenExpired(user.accessToken) || !user.accessToken) {
  //     router.push({ pathname: "/auth/sign-in" });
  //   }
  //   if (user) {
  //     setCurrentUser(user.user[0].fullname);
  //   }
  // };

  const isTokenExpired = (token) => {
    const decodedToken = jwt.decode(token);
    return decodedToken.exp * 1000 < Date.now();
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open} color="success">
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}>
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}>
              Classroom
              <Breadcrumbs>
                <BreadcrumbItem></BreadcrumbItem>
                <BreadcrumbItem>Advanced Web Programming</BreadcrumbItem>
              </Breadcrumbs>
            </Typography>
            <LinkNext href="/">
              <Typography sx={{ paddingRight: 5 }}>{currentUser} </Typography>
            </LinkNext>

            <AvatarDropdown></AvatarDropdown>
            <Typography variant="title" color="inherit" noWrap>
              &nbsp; &nbsp; &nbsp;
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {topListItems}
            <Divider sx={{ my: 1 }} />
            {middleListItems}
            <Divider sx={{ my: 1 }} />
            {bottomListItems}
          </List>
        </Drawer>
        <Layout />
      </Box>
    </ThemeProvider>
  );
}
