import React from 'react';
import "../styles/Scrollbar.scss";

export default function Scroll({ children }) {
  return (
    <div className="scrollbar" style={{ overflowY: 'auto', height: '80vh'}}>
        {children}
    </div>
  )
}
