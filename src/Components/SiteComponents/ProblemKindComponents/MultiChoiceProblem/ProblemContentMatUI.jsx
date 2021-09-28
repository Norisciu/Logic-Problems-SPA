import {
    Typography,
    Paper,
    makeStyles
} from "@material-ui/core"



const useStyles = makeStyles(theme => ({
    problemStatementWrapper: {
        padding: theme.spacing(2),
        paddingLeft: 0,
        paddingRight: 0,
        minHeight: "320px"
    },

    problemName: {
        marginBottom: theme.spacing(4),
        padding: theme.spacing(2),
        borderBottom: "2px solid #eee",

    },

    problemContent: {
        paddingLeft: theme.spacing(2),
    }
}))

export default function ProblemContentMatUI({ name, content, author }) {
    const classes = useStyles();

    return (
        <Paper className={classes.problemStatementWrapper}>
            <Typography className={classes.problemName} variant="h5">
                {name}
                <Typography variant="body2">
                    by {author || "Unknown author"}
                </Typography>
            </Typography>
            <Typography className={classes.problemContent}>
                {content}
            </Typography>
        </Paper>
    )
}