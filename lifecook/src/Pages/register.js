import React, { Component } from 'react';
import {useState, useContext, useEffect} from "react";
import { useHistory } from 'react-router-dom';
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
import { doesUsernameExist } from '../services/firebase';


  
export default function Register() {
    const history = useHistory();
    const { firebase } = useContext(FirebaseContext);
  

    const [username, setUsername] = useState('');
  //const [state, setstate] = useState('');
  
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const isInvalid = password === '' || emailAddress === '';
  
  const handSignup = async (event) => {
    event.preventDefault();

      const usernameExists = await doesUsernameExist(username);
      if (!usernameExists) {
        try {
          const createdUserResult = await firebase
            .auth()
            .createUserWithEmailAndPassword(emailAddress, password);


            await createdUserResult.user.updateProfile({
                displayName: username
              });

              await firebase
              .firestore()
              .collection('users')
              .add({
                userId: createdUserResult.user.uid,
                username: username.toLowerCase(),
                emailAddress: emailAddress.toLowerCase(),
                dateCreated: Date.now()
            });
            history.push(ROUTES.REGISTER);
      } catch (error) {
              setUsername('');
              setEmailAddress('');
              setPassword('');
              setError(error.message);
          }
      }
      else{
            setUsername('');
            setError('That username is alredy taken, please try another.')  
        }
      }
  

  useEffect(() => {
      document.title = 'Register - Lifecook';
  }, [])
    return (
      <div>
          <div>
        <Header/>
      </div>
        <div className="logform">
                    <form onSubmit={handSignup} method="POST" className="logform1">
                    <h3>Register</h3><p></p>
                    {error && <p>{error}</p>}
                    <TextField
                        id="standard-multiline-flexible"
                        label="User Name"
                        multiline
                        rowsMax={4}
                        onChange={({ target }) => setUsername(target.value)}
                        className="lopar"
                        value={username}
                        /><p></p>
                    <TextField
                        id="standard-multiline-flexible"
                        label="Login"
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
                            Register 
                        </Button>
                      
                            <p></p>
                        <h5>Thank you for registering.</h5> 
                        </form>
                    </div>
                    <div className="footer"> 
          <Footer/>
        </div>  
      </div>
    );
  }