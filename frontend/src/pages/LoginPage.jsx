import React from 'react'
import { useAuthStore } from '../store/useAuthStore'

const LoginPage = () => {
  const { authUser, isLoading, login } = useAuthStore()
  return (
    <div>
      login page
    </div>
  )
}

export default LoginPage
