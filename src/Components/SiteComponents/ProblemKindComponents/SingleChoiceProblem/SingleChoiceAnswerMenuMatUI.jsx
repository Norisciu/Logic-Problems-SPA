import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { useUserProblemData } from "../../../../Hooks/useUserProblemData";
import ButtonCustom from "../../../Controls/ButtonCustom";
import InputCustom from "../../../Controls/InputCustom";

const useStyles = makeStyles(theme => ({
    result: {
        marginBottom: theme.spacing(2)
    }
}))



export function SingleChoiceAnswerMenuMatUI({ problemId, checkAnswerCallback, onAnswerChangeCallback, answerData }) {

    const classes = useStyles();

    const [
        isProblemAuthor,
        isProblemSolver,
        isProblemFailure,
        canSeeSolutions,
        problemAttemps,
        currentUserId,
        problemAnswer
    ] = useUserProblemData(problemId);



    if (isProblemSolver) {
        return (
            <Typography className={classes.result} variant="body1">
                Congrats! You found the problem's solution!
            </Typography>
        )
    }

    else if (isProblemFailure) {
        return (
            <Typography className={classes.result} variant="body1">
                {`Wrong answer! The answer was :${problemAnswer}`}
            </Typography>
        )
    }

    else {
        return (
            <div className="single-choice-answer-menu">
                <InputCustom
                    style={{ marginBottom: 0 }}
                    name="answer"
                    value={answerData.answer}
                    placeholder="Insert your numeric answer here"
                    // onChange={onAnswerChange} 
                    onChange={onAnswerChangeCallback}
                />
                <Typography className={classes.result}>
                    Problem attemps : {`${problemAttemps}`}
                </Typography>
                <ButtonCustom
                    className={classes.multiChoiceCheckButton}
                    onClick={checkAnswerCallback}>
                    Check
                </ButtonCustom>
            </div>

        )
    }
}