import React from "react";
import AddProblemFormMatUI from "../Components/FormChecker/AddProblemFormMatUI";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: "1em",
        minWidth: "90%",
        padding: "2em",
        backgroundColor: "transparent",
        boxShadow: "none"
    },

    tabs: {
        marginBottom: theme.spacing(4),
        backgroundColor: theme.palette.background.sideBar,
        color: "white",
        "$ .MuiTab-wrapper": {
            color: "white"
        }
    }
}))

const AddProblemPagieMatUI = ({ match }) => {
    const classes = useStyles();

    return (
        <Paper square className={classes.root}>
            <AddProblemFormMatUI />
        </Paper>
    )
}


export default AddProblemPagieMatUI;