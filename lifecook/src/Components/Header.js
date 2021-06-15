import React from 'react';
import { hexToRgb, makeStyles, rgbToHex } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from '../Pages/login';
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
    marginLeft: "100px",
  },
}));

export default function Header()  {
  const classes = useStyles();

    return (
      <>
      <div className={classes.root}>
      <AppBar position="static" color="255, 233, 222, 72">
        <Toolbar>
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h4" className={classes.title}>
            
              lifeCook
          </Typography>
          <Button color="inherit" href="/login">Login</Button>
          <Button color="inherit">Register</Button>
        </Toolbar>
      </AppBar>
    </div>
    </>
    );
}