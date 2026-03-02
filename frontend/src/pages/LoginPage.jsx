import React from 'react'

const LoginPage = () => {
  const { authUser, isLoading, login } = useAuthStore()
  return (
    <div>
      login page
    </div>
  )
}

export default LoginPage
