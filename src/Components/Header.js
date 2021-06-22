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
    marginLeft: "160px",
  },
}));

export default function Header()  {
  const classes = useStyles();
    return (
      <>
      <div className={classes.root}>
      <AppBar position="static" color="255, 233, 222, 72">
        <Toolbar>
          <Typography variant="h4" className={classes.title}>
              lifeCook
          </Typography>
          <Button color="inherit" href={ROUTES.LOGIN}>Login</Button>
          <Button color="inherit" href={ROUTES.REGISTER}>Register</Button>
        </Toolbar>
      </AppBar>
    </div>
    </>
    );
}