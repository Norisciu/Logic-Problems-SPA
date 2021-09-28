import React from "react";
import { Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { setLoginUser } from "../../features/users/usersSlice";
import SearchField from "../SiteComponents/SearchBar/SearchBar";
import {
  AppBar,
  Avatar,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Select,
  Toolbar,
  Typography,
} from "@material-ui/core";

const drawerWidth = "20%";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "whitesmoke",
    backgroundColor: theme.palette.background.appBar,
  },

  userName: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    "& .MuiAvatar-root": {
      marginRight: theme.spacing(2),
    },
  },

  searchInput: {
    opacity: "0.6",
    padding: "0px 8px",
    foontSize: "0.8rem",
    width: "100%",
    backgroundColor: "white",

    "&:hover": {
      backgroundColor: "white",
    },

    "& .MuiSvgIcon-root": {
      marginRight: "8px",
    },
  },

  mainNavigation: {
    display: "flex",
    justifyContent: "flex-end",

    "& .MuiListItemText-root": {
      flexGrow: "0",
      paddingLeft: "0",
      paddingRight: theme.spacing(4),
      fontWeight: "700",
      cursor: "pointer",
      color: "#4d4c4c",

      "& :hover": {
        color: "black",
      },
    },
  },
}));

const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.availableUsers);
  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  const setCurrentUser = (event) => {
    console.log(`Header setCurrentUser() value : ${event.target.value} `);
    dispatch(setLoginUser({ userId: event.target.value }));
  };

  const currentUserName = useSelector((state) =>
    users.find((user) => user.id === state.users.loginUserId)
  ).name;

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <Grid
          spacing={4}
          sm
          item
          justifyContent="center"
          alignItems="center"
          container
        >
          <Grid className={classes.userName} item>
            <Avatar alt="User">{currentUserName[0]}</Avatar>
            <Select native name="currentUser" onChange={setCurrentUser}>
              {usersOptions}
            </Select>
          </Grid>
          <Grid sm={4} />

          <Grid sm={4} item>
            <SearchField />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
