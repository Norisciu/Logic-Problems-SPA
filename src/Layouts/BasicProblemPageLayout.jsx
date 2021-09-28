import React from "react";
import { Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  rightColumn: {
    paddingLeft: theme.spacing(4),
  },

  bottomRow: {
    marginTop: theme.spacing(4),
  },
}));

export function BasicProblemPageLayout({ children }) {
  console.log("some trouble");
  const classes = useStyles();
  const [problemStatement, answerMenu, solutions] = children;

  return (
    <Grid container>
      <Grid xs={12} md={8} item>
        {problemStatement}
      </Grid>
      <Grid className={classes.rightColumn} xs={12} md={4} item>
        {answerMenu}
      </Grid>
      <Grid
        md={8}
        className={`${classes.bottomRow} ${classes.leftColumn}`}
        item
        container
      >
        {solutions}
      </Grid>
    </Grid>
  );
}
