import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeDifficulty,
  changeCategory,
} from "../../features/problem/problemSlice";
import { setLoginUser } from "../../features/users/usersSlice";
import { Typography } from "@material-ui/core";
import { useHistory } from "react-router";
import SelectCustom from "../Controls/SelectCustom";
import HomeIcon from "@material-ui/icons/Home";
import { Button, Drawer, makeStyles, IconButton } from "@material-ui/core";
import {
  problemCategory,
  problemDifficulty,
} from "../../features/problem/problemConstants";

const drawerWidth = "33.333333%";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
  },

  paperStyle: {
    width: "inherit",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.background.sideBar,
    color: "white",
  },

  drawerHeader: {
    paddingBottom: "1em",
  },

  formRow: {
    paddingBottom: "1em",
    width: "75%",
    backgroundColor: "white",
  },
}));

const NavbarMatUI = () => {
  const classes = useStyles();
  const history = useHistory();

  const dispatch = useDispatch();
  const onCategoryChange = (event) => {
    let value = event.target.value;
    dispatch(changeCategory(value));
  };
  const onDifficultyChange = (event) => {
    let value = event.target.value;
    dispatch(changeDifficulty(value));
  };

  const onLoginUserIdChange = (event) => {
    let userId = event.target.value;
    dispatch(setLoginUser({ userId: userId }));
  };

  const handleClick = () => history.push("/addProblem");

  const users = useSelector((state) => state.users.availableUsers);

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      anchor="left"
      classes={{ paper: classes.paperStyle }}
    >
      <Typography className={classes.drawerHeader} variant="h4" component="div">
        Logic problems
      </Typography>
      <SelectCustom style={{ width: "75%" }} onChange={onCategoryChange}>
        <option value={problemCategory.LOGIC}>Logic</option>
        <option value={problemCategory.PROGRAMMING}>Programming</option>
      </SelectCustom>
      <SelectCustom style={{ width: "75%" }} onChange={onDifficultyChange}>
        <option value={problemDifficulty.VERY_EASY}>Very easy</option>
        <option value={problemDifficulty.EASY}>Easy</option>
        <option value={problemDifficulty.MEDIUM}>Medium</option>
        <option value={problemDifficulty.HARD}>Hard</option>
        <option value={problemDifficulty.VERY_HARD}>Very hard</option>
      </SelectCustom>
      <IconButton onClick={() => history.push("/")}>
        <HomeIcon style={{ color: "whitesmoke" }} />
      </IconButton>

      <Button onClick={handleClick}>Add problem</Button>
    </Drawer>
  );
};

export default NavbarMatUI;
