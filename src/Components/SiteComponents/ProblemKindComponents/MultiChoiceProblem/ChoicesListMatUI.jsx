import { List , makeStyles } from "@material-ui/core";

const useStyles  = makeStyles( _  => ({
    choicesList : {
        maxHeight: "290px",
        overflow: "auto",

    }
}))

export default function ChoicesList({children}) {
    const classes  =  useStyles();
    return (
        <List className={classes.choicesList}>
            {children}
        </List>
    )
}