import React from 'react'
import { useAuthStore } from '../store/useAuthStore'

const ChatPage = () => {
  const {logout} = useAuthStore()
  return (
    <div className='z-10 '>Chat page
      <button onClick={logout}>LogOUT</button>
    </div>
  )
}

export default ChatPage
