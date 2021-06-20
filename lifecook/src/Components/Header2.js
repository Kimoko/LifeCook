import React from 'react';
import { useContext } from 'react';
import { hexToRgb, makeStyles, rgbToHex } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from '../Pages/login';
import AccountCircle from '@material-ui/icons/AccountCircle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import FirebaseContext from '../context/firebase';
import UserContext from '../context/user';
import {Link} from 'react-router-dom';
import * as ROUTES from '../constants/routes';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: "center",
    marginLeft: "60px",
  },
}));

export default function Header()  {

    const{firebase} = useContext(FirebaseContext);
    const {user} = useContext(UserContext);

    console.log('user',user);

    const classes = useStyles();
    

    return (
      <>
      <div className={classes.root}>
      <AppBar position="static" color="255, 233, 222, 72">
        <Toolbar>
        
          <Typography variant="h4" className={classes.title}>
              lifeCook
          </Typography>
         
         <div>
              {user ?(
                  <>
                 {/*  <span class="iconify" data-icon="bx:bx-home" data-inline="false" data-width="24" data-height="24"> */}
            
                   <Button color="inherit" onClick={() => {
                    firebase.auth().signOut();
                    /*history.push(ROUTES.LOGIN);*/
                        }}
                    onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      firebase.auth().signOut();
                      /* history.push(ROUTES.LOGIN); */
                    }
                    }}>Sign Out</Button>
                    




                   {/* <Button color="inherit" href="/register">Register</Button> */}
                    
                   {/*  <button
                  type="button"
                  title="Sign Out"
                  onClick={() => {
                    firebase.auth().signOut();
                    history.push(ROUTES.LOGIN);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      firebase.auth().signOut();
                      history.push(ROUTES.LOGIN);
                    }
                  }}
                >
                  <span class="iconify" 
                  data-icon="ic:outline-exit-to-app" 
                  data-inline="false" 
                  data-width="24" 
                  data-height="24"></span>
                </button> */}


                  </>
              ) : (
                <>
                <Link to={ROUTES.LOGIN} >
                <Button color="inherit"
                    type="button"
                   /*  className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8" */
                  >
                    Log In
                  </Button>
                </Link>
                <Link to={ROUTES.REGISTER}>
                <Button color="inherit"
                    type="button"
                   /*  className="font-bold text-sm rounded text-blue-medium w-20 h-8" */
                  >
                    Regisrty
                  </Button>
                </Link>

                </>
              )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
    </>
    );
}