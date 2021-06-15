import React, { Component } from 'react';
import {useState, useContext} from "react";
import { useHistory } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
export default function Login() {
  const history = useHistory();
  const{firebase} = useContext(FirebaseContext);

  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
    return (
      <div> Login </div>
    );
  }

