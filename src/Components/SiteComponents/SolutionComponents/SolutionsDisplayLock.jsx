import LockIcon from "@material-ui/icons/Lock";
import { makeStyles, Typography, Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  lockBox: {
    minHeight: "200px",
    border: "2px #eee solid",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "4em",
    width: "100%",
  },
}));

export default function SolutionsDisplayLock() {
  const classes = useStyles();
  return (
    <Box className={classes.lockBox}>
      <LockIcon className={classes.lockIcon} fontSize="large" />
      <Typography className={classes.lockTypography}>
        Solutions locked
      </Typography>
    </Box>
  );
}
