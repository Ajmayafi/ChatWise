import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { SiteContext } from '../SiteContext';

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { dispatch } = useContext(SiteContext)
  return (
    <>
   {!isSidebarOpen && <div className="mobile-menu">
    <h2>ChatWise</h2>
    <div className="lines" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
    <div className="line"></div>
    <div className="line"></div>
    <div className="line"></div>
    </div>
    </div>
    
    }
    {isSidebarOpen &&
    <div class="mobile-sidebar">
      <h2 onClick={() => setIsSidebarOpen(!isSidebarOpen)}>X</h2>
      <ul>
        <li onClick={() => {
          dispatch({ type: "CLEAR_CONVERSATION"})
          setIsSidebarOpen(!isSidebarOpen)
        }}>Clear Conversation</li>
        <li>Light Mode</li>
        <li>Logout</li>
      </ul>
    </div>
   }
    <div class="sidebar">
      <h2>ChatWise</h2>
      <ul>
        <li onClick={() => dispatch({ type: "CLEAR_CONVERSATION"})}>Clear Conversation</li>
        <li>Light Mode</li>
        <li>Logout</li>
      </ul>
    </div>
    </>
  )
}
