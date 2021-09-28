import React from "react";
import {
    Checkbox,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles
} from "@material-ui/core";


const getColors = ({ choiceType, choiceCorrect, choiceWrong, choiceUserSelection, choiceNeutral }) => {
    const CHOICE_CORRECT = "choice-correct";
    const CHOICE_WRONG = "choice-wrong";
    const CHOICE_NEUTRAL = "choice-neutral";
    const CHOICE_USER_SELECTION = "choice-user-selection";


    if (choiceType === CHOICE_CORRECT) { return choiceCorrect }
    else if (choiceType === CHOICE_USER_SELECTION) { return choiceUserSelection }


    else if (choiceType === CHOICE_WRONG) { return choiceWrong }
    else if (choiceType === CHOICE_NEUTRAL) { return choiceNeutral }
    else { throw new Error("unknown given choice color") }
}
const useStyles = makeStyles(theme => ({
    choiceStyle: choiceType => ({

        ...getColors({
            ...choiceType,
            ...theme.mixins.answerChoices
        }),


        marginBottom: theme.spacing(1),



        "&:hover": {
            backgroundColor: "hsla",
        },


        "&.Mui-disabled": {
            opacity: "1"
        }
    }),


}))


export function MultiChoiceOptionMatUI({
    id,
    content,
    onPickAnswerCallback,
    isChoosenCallback = f => f,
    choiceType,
    isDisable
}) {


    const classes = useStyles({ choiceType });

    const onSelectChoice = event => {
        event.preventDefault();
        onPickAnswerCallback(id);
    }


    return (
        <ListItem
            className={classes.choiceStyle}
            key={id}
            button
            onClick={onSelectChoice}
            disabled={isDisable}
        >
            <ListItemIcon>
                <Checkbox
                    edge="start"
                    disableRipple
                    inputProps={{ 'aria-labelledby': id }}
                    checked={isChoosenCallback(id)}

                />
            </ListItemIcon>
            <ListItemText id={id} primary={content} />

        </ListItem>
    )

}