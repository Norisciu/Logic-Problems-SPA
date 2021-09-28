import AddIcon from '@material-ui/icons/Add';
import { nanoid } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import InputCustom from "../../../Controls/InputCustom";
import ChoicesList from "./ChoicesListMatUI";
import { MultiChoiceOptionMatUI } from "./MultiChoiceOptionMatUI";
import {
    Button,
    Grid,
    makeStyles
} from "@material-ui/core";
import "./MultiChoiceProblem.css";

const CHOICE_CORRECT = "choice-correct";
const CHOICE_WRONG = "choice-wrong";
const CHOICE_NEUTRAL = "choice-neutral";


const initData = {
    answerData: { choices: [], correctChoiceId: null },
    inputValue: "",
}

const useStyles = makeStyles(theme => ({
    inputStyle: {
        backgroundColor: "white",
        paddingLeft: theme.spacing(2),
    },

    topRow: {
        marginBottom: theme.spacing(4)
    },

    addButton: {
        marginLeft: "1em",
        backgroundColor: "black",

        "$ *": {
            color: "white",
        },


        width: "2em",
        maxWidth: "2em",
        maxHeight: "2em",
        minWidth: "2em",
        minHeight: "2em",
        height: "2em",

    },
    controlsWrapper: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },

    choicesList: {
        backgroundColor: theme.palette.background.appBar,
        maxHeight: "290px",
        overflow: "auto",
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4)

    }
}));

export function MultiChoiceMenuMatUI({
    setAnswerData,
    answerDataFromParent
}) {
    const classes = useStyles();
    const [formData, setFormData] = useState({
        ...initData,
        answerData: {
            ...initData.answerData,
            // ...answerDataFromParent
        }
    });

    useEffect(() => {
        console.log("MultiChoiceMenuMatUI useEffect() formData");
        console.log(formData);
    })


    useEffect(() => {
        const { answerData } = formData;
        setAnswerData(answerData);
    }, [formData]);


    const addChoice = event => {
        event.preventDefault();
        if (formData.inputValue.length === 0) {
            return;
        }

        let newChoice = {
            id: nanoid(),
            content: formData.inputValue
        };

        let newChoices = [...formData.answerData.choices, newChoice];

        setFormData({
            answerData: { ...formData.answerData, choices: newChoices },
            inputValue: ""
        });

    }

    const chooseCorectChoice = choiceId => {
        setFormData({
            ...formData,
            answerData: { ...formData.answerData, correctChoiceId: choiceId }
        });
    }

    const removeChoice = idOfRemovdChoice => {
        const { choices, correctChoiceId } = formData.answerData;
        let cleanOptions = choices.filter(elem => elem.id != idOfRemovdChoice);
        let correctChoiceIdValue = idOfRemovdChoice === correctChoiceId ? null : correctChoiceId;

        setFormData({
            ...formData,
            answerData: {
                ...formData.answerData,
                choices: cleanOptions,
                correctChoiceId: correctChoiceIdValue
            },
        })
    }

    const onInputChange = event => {
        let value = event.target.value;
        setFormData({ ...formData, inputValue: value });
    }

    const onRemoveButtonClick = (event, choiceId) => {
        event.preventDefault();
        removeChoice(choiceId);
    }


    const getChoiceType = (choiceId) => {

        let isMarAsCorrectAnswer = choiceId === formData.answerData.correctChoiceId;
        return isMarAsCorrectAnswer ? CHOICE_CORRECT : CHOICE_NEUTRAL;

    }

    const isChoosen = choiceId => {
        let result = choiceId === formData.answerData.correctChoiceId;
        return result;
    }

    const listContents = formData.answerData.choices.map((choice, idx) => (
        <MultiChoiceOptionMatUI
            key={choice.id}
            {...choice}
            choiceType={getChoiceType(choice.id)}
            onPickAnswerCallback={chooseCorectChoice}
            isChoosenCallback={isChoosen}
        />

    ));

    return (
        <Grid container>
            <Grid className={classes.topRow} item xs={12}>

                <ChoicesList>
                    {listContents}
                </ChoicesList>
            </Grid>
            <Grid className={classes.controlsWrapper} item xs={12}>

                <InputCustom
                    onChange={onInputChange}
                    value={formData.value}
                    placeholder="Add choice"
                    style={{ marginBottom: "0" }} />
                <Button
                    className={classes.addButton}
                    variant="contained"
                    onClick={addChoice}
                    size="small"
                    color=""

                >
                    <AddIcon style={{ color: "white" }} fontSize="small" />
                </Button>
            </Grid>
        </Grid>
    )
}
