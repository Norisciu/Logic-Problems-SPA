import React from "react";
import NavbarMatUI from "./NavbarMatUI.jsx";
import Header from "./Header"
import { 
    Container, 
    makeStyles, 
} from "@material-ui/core";

import { Grid } from "@material-ui/core";


export const drawerWidth  =  "20%";

let useStyles =   makeStyles(theme => ({
    root : {
        display: "flex",
        width: "100%",
        backgroundColor: "#f9f9f9ff"
    } ,

    content : {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexGrow: 1,
        paddingLeft: 0,
        paddingRight: 0
    }, 

    mainContent : {
        width : `calc(100%  - ${drawerWidth})`
    },

    drawer :{
        width: drawerWidth
    },

    drawerHeader : {
        fontSize: "1em"
    } ,

    paperStyle : {
        width: drawerWidth
    },

    headerWrapper : {
        ...theme.mixins.toolbar,
        width: `calc(100%  - ${drawerWidth})`,
        position: "absolute",
        top: "0",
        left : drawerWidth

    },

    columnLeft : {
        width: drawerWidth,
        position:"relative"
    } ,

    columnRight : {
        display:"flex",
        flexDirection: "column",
    },

    toolbar : theme.mixins.toolbar
}));

export  function Layout({children}) {
    const classes =  useStyles();
    return (
            <Grid container>
                <Grid item md={4}>
                     <NavbarMatUI  />
                </Grid>
                <Grid className={classes.columnRight} item md={8}>
                    <Header />
                    <Container className={classes.content}>
                        {children}
                    </Container>
                </Grid>
            </Grid>
            
    )
}

