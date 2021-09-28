import React from "react";
import { useSelector } from "react-redux";
import ProblemCard from "../Cards/ProblemCard.jsx";
import { useHistory } from "react-router-dom";
import { List, ListItem, Container, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  problemContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },

  problemList: {
    width: "100%",
  },

  problemEntry: {
    width: "100%",
    padding: 0,
    "& $.MuiPapper": {
      borderRadius: 0,
    },
  },

  papper: {
    borderRadius: 0,
  },
});

const ProblemListMatUI = () => {
  const classes = useStyles();

  const problems = useSelector((state) => state.problems.problems);
  const difficulty = useSelector((state) => state.problems.filters.difficulty);
  const category = useSelector((state) => state.problems.filters.category);
  const history = useHistory();

  const search = useSelector((state) => state.search.searchField);

  const filterByProblemData = (problem) =>
    problem.difficulty === difficulty && problem.category === category;

  const filterBySearchName = (problem) => {
    const canonizedSearchName = search.toLowerCase();
    const canonizedProblemName = problem.problemName.toLowerCase();
    return (
      canonizedProblemName.includes(canonizedSearchName) &&
      canonizedProblemName.includes(canonizedSearchName)
    );
  };

  const contents = problems
    .filter(filterByProblemData)
    .filter(filterBySearchName)
    .map((problem) => {
      return (
        <ListItem
          button
          className={classes.problemEntry}
          classes={{ papper: classes.papper }}
          onClick={() => history.push(`singleProblem/${problem.problemId}`)}
        >
          <ProblemCard key={problem.problemId} {...problem} />
        </ListItem>
      );
    });

  if (contents.length === 0) {
    return (
      <Container className={classes.problemContainer}>
        <p style={{ margin: "auto" }}>
          No problems have been found for the current Category and Difficulty
          settings..
        </p>
      </Container>
    );
  }
  return <List className={classes.problemList}>{contents}</List>;
};

export default ProblemListMatUI;
