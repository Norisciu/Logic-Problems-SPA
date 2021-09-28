import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProblemSolution, upvoteSolution, downvoteSolution } from "../../../features/problem/problemSlice";
import ButtonCustom from "../../Controls/ButtonCustom";
import InputCustom from "../../Controls/InputCustom";
import ProblemSolution from "./ProblemSolution";
import SolutionsDisplayLock from "./SolutionsDisplayLock";
import { useUsers } from "../../../Hooks/useUsers";
import {
    List,
    ListItem,
    Grid,
    makeStyles,
    Typography,
} from "@material-ui/core";




const useStyles = makeStyles(theme => ({
    problemSolution: {
        padding: 0,

        "& + &": {
            marginTop: theme.spacing(2)
        }
    }
}))

export default function SolutionsDisplay({ problem, isVisible }) {

    const classes = useStyles();

    const dispatch = useDispatch();
    const [solutionContent, setSolutionContent] = useState("");
    const { problemSolutions } = problem;
    const [users, setUser, loginUser, userName, getUserName] = useUsers();

    console.log("SolutionsDisplay problemSolutions..");
    console.log(problemSolutions);

    const upvoteTheSolution = (solutionId) => {
        dispatch(upvoteSolution({
            problemId: problem.problemId,
            solutionId: solutionId,
            userId: loginUser
        }))
    }

    const downvoteTheSolution = (solutionId) => {
        dispatch(downvoteSolution({
            problemId: problem.problemId,
            solutionId: solutionId,
            userId: loginUser

        }))

    }

    const solutionsList = problemSolutions
        .slice()
        .sort((a, b) => b.upvotes.count - a.upvotes.count)
        .map(solutionData => {
            return (
                <ListItem className={classes.problemSolution}>
                    <ProblemSolution
                        {...solutionData}
                        upvoteCallback={upvoteTheSolution}
                        downvoteCallback={downvoteTheSolution}
                    />
                </ListItem>
            )
        });



    const handleChange = (event) => {
        let value = event.target.value;
        setSolutionContent(value);
    }

    const publishSolution = () => {
        console.log(problem);
        dispatch(addProblemSolution({
            problemId: problem.problemId,
            solutionContent: solutionContent,
            author: userName
        }));
    }



    if (!isVisible) { return <SolutionsDisplayLock /> }


    return (
        <Grid container>
            <Grid xs={12} container item>
                <Typography variant="h5">
                    Publish a solution..
                </Typography>
                <InputCustom
                    value={solutionContent}
                    onChange={handleChange}
                    rows={4}
                />
                <ButtonCustom onClick={publishSolution}>
                    Publish
                </ButtonCustom>
            </Grid>
            <Grid xs={12}>
                <List>
                    {solutionsList}
                </List>
            </Grid>
        </Grid>
    )

}