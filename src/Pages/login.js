import React, { Component } from 'react';
import {useState, useContext, useEffect} from "react";
import { Link, useHistory } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../Components/Header'; 
import Footer from '../Components/footer';
import '../Components/login.css'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import * as ROUTES from '../constants/routes';


  
export default function Register() {
  const history = useHistory();
  const{firebase} = useContext(FirebaseContext);
  
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const isInvalid = password === ''|| emailAddress === '';
  
  const handleLogin = async (event) => {
      event.preventDefault();

      try {
          await firebase.auth().signInWithEmailAndPassword(emailAddress, password);
          history.push(ROUTES.RECIPES)
      } catch (error) {
        setEmailAddress('');
        setPassword('');  
        setError(error.message);
      }

      }
  

  useEffect(() => {
      document.title = 'Login - Lifecook';
  }, [])
    return (
      <div>
          <div>
        <Header/>
      </div>
        <div className="logform">
                    <form onSubmit={handleLogin} method="POST" className="logform1">
                    <h3>Log in</h3><p></p>
                    {error && <p>{error}</p>}
                    <TextField
                        id="standard-multiline-flexible"
                        label="Email"
                        multiline
                        rowsMax={4}
                        onChange={({ target }) => setEmailAddress(target.value)}
                        className="lopar"
                        value={emailAddress}
                        /><p></p>
                    <FormControl className="lopar">
                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                        <Input
                            id="standard-adornment-password"
                            type="password" 
                            onChange={({ target }) => setPassword(target.value)}
                            value={password}
                        />
                        </FormControl>
                        <p></p>
                        <Button disabled={isInvalid} 
                        variant="contained" 
                        color="primary" 
                         type="submit">
                            Log in
                        </Button>
                      
                            <p></p>
                        <h5>Good to see you.</h5> 
                        </form>
                    </div>
                    <div className="footer"> 
          <Footer/>
        </div>  
      </div>
    );
  }