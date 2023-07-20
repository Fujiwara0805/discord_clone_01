import React from 'react'
import "./login.scss";
import { Button } from "@mui/material";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from '../../firebase';

const login = () => {
  const signIn = () => {
    signInWithPopup(auth, provider)
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="login">
      <div className="loginLogo">
        <img src="./discordIcon.png" alt="NoImage" />
      </div>

      <Button onClick={signIn}>ログイン</Button>

      
    </div>
  )
};

export default login