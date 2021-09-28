import { Card, CardActions, CardContent, CardHeader, IconButton, List, makeStyles, Typography } from "@material-ui/core";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

const useStyles = makeStyles(theme => ({
    topRow: {
        marginBottom: theme.spacing(4)
    },

    solutionWrapper: {
        width: "100%"
    }
}))

export default function ProblemSolution({ id, solutionAuthor, solutionContent, upvotes, downvotes, upvoteCallback, downvoteCallback }) {

    const classes = useStyles();


    return (
        <Card className={classes.solutionWrapper}>
            <CardHeader
                className={classes.cardHeader}
                title={solutionAuthor}
            />
            <CardContent
                className={classes.cardContent}>
                <Typography variant="subtitle">
                    {solutionContent}
                </Typography>
            </CardContent>
            <CardActions>
                <IconButton onClick={() => upvoteCallback(id)}>
                    <ThumbUpIcon />
                </IconButton>
                <Typography> {upvotes.count} </Typography>
                <IconButton onClick={() => downvoteCallback(id)}>
                    <ThumbDownIcon />
                </IconButton >
                <Typography> {downvotes.count} </Typography>

            </CardActions>
        </Card>
    )
}