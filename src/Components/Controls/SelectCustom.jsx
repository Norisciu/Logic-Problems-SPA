import { NativeSelect , makeStyles , FormControl , InputBase } from "@material-ui/core";

// mike

const useStyles =  makeStyles( theme => ({

    formRow : {

        width: "100%",
        backgroundColor: theme.palette.background.sideBar,
        color: "white",
        marginBottom: theme.spacing(2),

        "& *" : {
            color: "white",
        }

    },

    selectStyle : {
        "& .MuiInputBase-input" : {
            paddingLeft: theme.spacing(1),
        },

        "& .MuiSelect-select" : {
            color: "black",
            backgroundColor: "black"
        },

        "& .MuiSelect-selectMenu" : {
            color: "black",
            backgroundColor: "black"
        },

        "& .MuiNativeSelect-select:hover:focus" : {
            color: "black"
        }
    }


}))

export default  function SelectCustom ({onChange , value , name , children , style , inputProps}) {

    const classes  = useStyles();
    console.log(`SelectCustom onChange`);
    console.log(onChange);

    return (
        <FormControl style={ {...style} } variant="filled" className={classes.formRow}>

            <NativeSelect
                className={classes.selectStyle}
                name={name}
                value={value}
                onChange={onChange}
                input={<InputBase />}
                inputProps={inputProps}
            >
                {children}
            </NativeSelect>
        </FormControl>
    )
}