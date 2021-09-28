import { InputBase, makeStyles } from "@material-ui/core";

const useStyles =   makeStyles(theme  => ({
    inputFieldTrial : {
        borderRadius : theme.shape.borderRadius,
        backgroundColor: "white",
        width: "100%",
        border: "solid 2px #eee",
        borderRadius: "0",
        paddingLeft: theme.spacing(1),
        marginBottom: theme.spacing(2),

        "& .MuiOutlinedInput-root" : {
            border: "solid 2px #eee"
        }

    },
}))

export default function InputCustom ({label , name ,  placeholder , onChange , value , style , ...props}) {
    const classes  =  useStyles();

    return (
        <InputBase
            className={classes.inputFieldTrial}
            placeholder={placeholder}
            label={label}
            name={name}
            variant="outlined"
            onChange={onChange}
            value={value} 
            style={style}
            multiline
            {...props} 
        />
    )
}