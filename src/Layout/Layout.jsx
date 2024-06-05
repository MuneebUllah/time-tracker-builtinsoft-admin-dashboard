import React, { useState } from 'react'
import Header from '../components/Header/Header'
import 'bootstrap/dist/css/bootstrap.min.css';
import SideBar from '../components/sideBar/SideBar';

export default function Layout({ children , userName }) {
  // const [userName , setUserName] = useState() 

  return (
    <div className='d-flex w-100'>

      <SideBar />
      <main className='vh-100 w-100'>
        <Header />
        <div style={{ backgroundColor: "rgba(245, 245, 245, 1)", height: "calc(100% - 79px)", overflowY: "auto" }} className='w-100 d-flex p-3'>
          {children}
        </div>
      </main>
    </div>
  )
}
