import React from 'react'
// import Login from './Login'
import LocalStorage from '../hooks/LocalStorage';
import Dashboard from '../Components/chat/Dashboard'
import {ContactsProvider} from '../contexts/chat/ContactsProvider';
//import SideBar from './components/SideBar';
// import "bootstrap/dist/css/bootstrap.min.css";
import { MessagesProvider } from '../contexts/chat/MessagesProvider';
import {SocketProvider} from '../contexts/chat/SocketProvider'

const username = localStorage.getItem('username')

function ChatPage() {
  const [id, setId] = LocalStorage('id', username)

  const dashboard = (
  <SocketProvider id={id}>
    <ContactsProvider>
      <MessagesProvider id={id}>
      <Dashboard id={id} />
      </MessagesProvider>
    </ContactsProvider>
  </SocketProvider>
  )

  return (
    //id !== 'undefined' && id != null ? 
    dashboard
    // : 
    //<Login onIdSubmit={setId} />
  )
}

export default ChatPage;