import { Button, makeStyles } from "@material-ui/core";


const useStyles =  makeStyles( theme => ({
    button : {
        backgroundColor: theme.palette.background.actionButtonColor,
        color: "white",

        "&:hover .MuiTouchRipple-root" : {
            // backgroundColor: "black",
            color: "white",
        },

        "&:hover .MuiButton-label" : {
            // backgroundColor: "black",
            color: "white",
        }
    }
}))

export default function ButtonCustom({children , className , onClick = f => f}){
    const classes  = useStyles();

    return (
        <Button  
            className = {`${classes.button} ${className}`}
            variant="contained"
            onClick = {onClick}
        >
            {children}
        </Button>
    )
}