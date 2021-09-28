import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
    makeStyles,
    Paper,
    Tabs,
    Tab
} from "@material-ui/core";

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

const TabMenuMatUI = ({ problemId, children }) => {


    const loginUserId = useSelector(state => state.users.loginUserId);
    const problemAuthorId = useSelector(state => {
        const problem = state.problems.problems.find(problem => problem.problemId == problemId);
        return problem.userId;
    });
    const loginUserIsProblemAuthor = loginUserId === problemAuthorId;
    const [selection, setSelection] = useState(0);

    const onTabButtonClick = ( _ , tabIdx) =>  setSelection(tabIdx)



    const classes = useStyles();


    return (
        <Paper square className={classes.root}>
            <Tabs className={classes.tabs}
                value={selection}
                onChange={onTabButtonClick}
                textColor="inherit">
                <Tab textColor="inherit" label="Post" />
                <Tab textColor="secondary" label="Comments" />
                <Tab disabled={!loginUserIsProblemAuthor} textColor="secondary" label="Update Problem" />

            </Tabs>
            {children.filter((_, idx) => idx === selection)}
        </Paper>
    )


}

export default TabMenuMatUI;