import { useDispatch, useSelector } from "react-redux"
import { setSearchField } from "../../../features/search/searchSlice";
import { InputBase , makeStyles } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';


const useStyles = makeStyles(theme => ( {

    searchInput: {
        opacity: "0.6",
        padding: `${theme.spacing(0)}px ${theme.spacing(2)}px`,
        foontSize: "0.8rem",
        width: "100%",
        backgroundColor: "white",
        
        '&:hover': {
            backgroundColor: "white"
        },

        '& .MuiSvgIcon-root': {
            marginRight: theme.spacing(2)
        }
    },

}))

export default function SearchField(){
    const classes  = useStyles();

    const dispatch  = useDispatch();
    const searchField =   useSelector(state => state.search.searchField);
    

    const setField =  event => {

        const value = event.target.value;
        dispatch(setSearchField({search : value}))
    }

    return (
        <InputBase
            className={classes.searchInput}
            value = {searchField}
            onChange={setField}
            placeholder="Search.."
            startAdornment={<SearchIcon fontSize="small"></SearchIcon>}
        />
    
    )
}