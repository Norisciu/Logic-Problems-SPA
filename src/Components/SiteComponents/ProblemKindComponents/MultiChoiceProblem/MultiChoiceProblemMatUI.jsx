import { Grid, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import SolutionsDisplay from "../../../../Components/SiteComponents/SolutionComponents/SolutionsDisplay";
import { checkMultiChoiceProblemAnswer } from "../../../../features/problem/problemSlice";
import { useUserProblemData } from "../../../../Hooks/useUserProblemData";
import { MultiChoiceEitorMatUI } from "./MultiChoiceEitorMatUI";
import ProblemContentMatUI from "./ProblemContentMatUI";
import ButtonCustom from "../../../Controls/ButtonCustom";



const CHOICE_CORRECT = "choice-correct";
const CHOICE_WRONG = "choice-wrong";
const CHOICE_NEUTRAL = "choice-neutral";
const CHOICE_USER_SELECTION = "choice-user-selection";


const useStyles = makeStyles(theme => ({
    topRow: {
        marginBottom: theme.spacing(4)
    },

    bottomRow: {

    },


    rightColumn: {
        paddingLeft: theme.spacing(2)
    },

    multiChoiceCheckButton: {
        width: "100%",
    },

    evaluation: {
        marginBottom: theme.spacing(2),
        paddingLeft: theme.spacing(2)
    }
}))


export function MultiChoiceProblemMatUI({ problem }) {

    const classes = useStyles();
    const dispatch = useDispatch();

    const [
        isProblemAuthor,
        isProblemSolver,
        isProblemFailure,
        canSeeSolutions,
        problemAttemps,
        currentUserId,
        problemAnswer,
        problemChoices
    ] = useUserProblemData(problem.problemId);

    const [selectionId, setSelectionId] = useState(canSeeSolutions && problemAnswer);


    const getChoiceColor = choice => {
        let isCorrectAnswerChoice = choice.id === problemAnswer;
        if (isCorrectAnswerChoice && isProblemAuthor) {
            return CHOICE_CORRECT;
        }

        let pickAnswer = !isProblemAuthor && choice.id === (canSeeSolutions ? problemAttemps.answer : selectionId);




        if (canSeeSolutions && isCorrectAnswerChoice) {
            return CHOICE_CORRECT;
        }

        if (canSeeSolutions && pickAnswer && !isCorrectAnswerChoice) {
            return CHOICE_WRONG;
        }


        if (!canSeeSolutions && pickAnswer) {
            return CHOICE_USER_SELECTION;
        }

        else {
            return CHOICE_NEUTRAL;
        }
    }



    const getAnswerChoicesColors = () => {
        let choiceToColorMap = new Map();
        problemChoices.forEach(choice => {
            choiceToColorMap.set(choice.id, getChoiceColor(choice));
        });
        return choiceToColorMap;
    }

    const checkAnswer = () => {
        if (canSeeSolutions) { return; }
        dispatch(checkMultiChoiceProblemAnswer({
            userId: currentUserId,
            userAnswer: { answer: selectionId },
            problemId: problem.problemId
        }));
    }

    const chooseOption = selectionId => {
        if (canSeeSolutions) { return; }
        setSelectionId(selectionId);
    }

    const evaluationText = () => {
        if (!canSeeSolutions || isProblemAuthor) { return; }
        if (isProblemSolver) {
            return (
                <Typography className={classes.evaluation}>
                    <strong>Correct!</strong> The answer was choice 69!
                </Typography>
            )
        }

        else {
            return (
                <Typography className={classes.evaluation}>
                    <strong>Wrong!</strong> The answer was choice 69!
                </Typography>
            )
        }
    }

    return (
        <section>
            <Grid container direction="column">
                <Grid
                    // spacing={4} 
                    className={`${classes.topRow} ${classes.leftColumn}`} item container>
                    <Grid xs={12} md={8} item>
                        <ProblemContentMatUI
                            name={problem.problemName}
                            content={problem.problemContent}
                        />
                    </Grid>
                    <Grid className={classes.rightColumn} xs={12} md={4} item>
                        <MultiChoiceEitorMatUI
                            choices={problemChoices}
                            choicesTypes={getAnswerChoicesColors()}
                            chooseOptionCallback={chooseOption}
                            selectionId={selectionId}
                            isDisable={canSeeSolutions}
                        />
                        {evaluationText()}
                        <ButtonCustom
                            className={classes.multiChoiceCheckButton}
                            onClick={checkAnswer}>
                            Check
                        </ButtonCustom>
                    </Grid>

                </Grid>
                <Grid
                    md={8} className={`${classes.bottomRow} ${classes.leftColumn}`} item container>
                    <SolutionsDisplay problem={problem} isVisible={canSeeSolutions}>

                    </SolutionsDisplay>

                </Grid>

            </Grid>
            <Link to="/">Go back</Link>
        </section>
    )
}