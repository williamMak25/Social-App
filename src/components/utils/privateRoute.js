import React from 'react'
import { Navigate, Outlet, Route } from 'react-router-dom'
import { LoginPage } from '../auth/login'
import { useAuth } from '../FunctionForPost/userFunctionContext'

export const PrivateRoute = () => {
    const {currentUser} = useAuth()
  return (
    currentUser ? <Outlet/> : <LoginPage/>
  )
}
