import React from "react";
import { Card, Typography, CardContent, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  problem: {
    width: "100%",

    "&:hover a": {
      color: "lightblue",
    },
  },

  problemPapper: {
    borderRadius: 0,
  },
});

const ProblemCard = ({ problemName, problemContent, problemId, userId }) => {
  const classes = useStyles();

  return (
    <Card className={classes.problem} classes={{ root: classes.problemPapper }}>
      <CardContent>
        <Typography variant="h4">{problemName}</Typography>
        <Typography>{problemContent}</Typography>
        <Typography variant="h9" component={"a"}>
          Show problem
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProblemCard;
