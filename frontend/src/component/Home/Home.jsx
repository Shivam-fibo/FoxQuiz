import React, {useState, useEffect, useContext } from 'react'
import { Context } from '../../main'
import { Navigate } from 'react-router-dom'
import Login from '../Auth/Login'
import axios from 'axios'
import Quiz from './Quiz'
const Home = () => {
    const {isAuthorized} = useContext(Context)
  if(!isAuthorized){
    return <Navigate to = {"/login"} />
  }

  
  return (
    <div>
      Home
      <Quiz/>
    </div>
  )
}

export default Home