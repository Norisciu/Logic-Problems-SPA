import React from "react";
import {
    makeStyles,
    Paper,
    Typography
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "whitesmoke",
    },

    containerHeader: {
        padding: theme.spacing(4),
        display: "flex",
        marginBottom: theme.spacing(2),
    },

    containerIcon: {
        display: "inline-block",
        padding: theme.spacing(2),
        color: "#3c44b1"
    },

    containerName: {
        padding: theme.spacing(4),
    }
}))

export default function MainContainer(props) {
    const { name, small, icon } = props;
    const classes = useStyles();

    return (
        <Paper elevation={0} className={classes.root}>
            <div className={classes.containerHeader}>
                <Card className={classes.containerIcon}>
                    {icon}
                </Card>
            </div>
            <div className={classes.containerName} >
                <Typography
                    variant="h6"
                    component="div">
                    {name}
                </Typography>
                <Typography
                    variant="subtitle2"
                    component="div">
                    {small}
                </Typography>
            </div>
        </Paper>
    )
}