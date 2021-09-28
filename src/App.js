import React from 'react';

import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom"

import ProblemListMatUI from './Components/SiteComponents/ProblemList/ProblemListMatUI.jsx';
import { makeStyles, ThemeProvider, createTheme } from "@material-ui/core";
import { Layout } from "./Components/LayoutComponents/Layout";
import AddProblemPagieMatUI from './Pagies/AddProblemPagieMatUI';
import SingleProblemPageMatUI from './Pagies/SingleProblemPageMatUI';

const useStyles = makeStyles({
  column: {
    height: "100%",
    paddingTop: "2em",
  },

  columnLeft: {
    backgroundColor: "cornflowerblue",
    width: "39%",
  },


  columnRight: {
    flexGrow: "1"
  },

  appMain: {
    paddingLeft: "320px",
    width: "100%"
  }
})

const theme = createTheme({
  palette: {
    background: {
      gridCell: "#555555ff",
      sideBar: "#555555ff",
      tabItems: "#555555ff",
      listChoices: "#555555ff",

      appBar: "#e5e5e5ff",

      pagie: "#f9f9f9ff",

      actionButtonColor: "#000000",

    }
  },

  mixins: {
    answerChoices: {
      choiceCorrect: {
        color: "#11c111",
        backgroundColor: "white"
      },

      choiceWrong: {
        color: "whitesmoke",
        backgroundColor: "crimson"
      },

      choiceUserSelection: {

        color: "white",
        backgroundColor: "#555555ff",
      },

      choiceNeutral: {
        color: "black",
        backgroundColor: "transparent"
      },
    },
  },


  overrides: {
    MuiButton: {
      text: {
        color: 'whitesmoke',
      },
    },
  },
});


function App() {
  let classes = useStyles();
  console.log(classes);

  return (
    <ThemeProvider theme={theme} >
      <Router>
        <Layout>
          <Switch>
            <Route
              exact path="/"
              render={() => <ProblemListMatUI />}>
            </Route>
            <Route
              exact path="/addProblem"
              render={() => { return <AddProblemPagieMatUI /> }}
            >
            </Route>
            <Route
              exact path="/singleProblem/:problemId"
              component={SingleProblemPageMatUI}
            />
            <Redirect to="/" />
          </Switch>
        </Layout>
      </Router>
    </ThemeProvider>
  )

}

export default App;