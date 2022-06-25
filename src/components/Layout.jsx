import React from 'react'
import Sidebar from './sidebar/Sidebar'

import Header from './header/Header'

import '../styles/Layout.css'


const Layout = (props) => {
  return (
    <>
        <Header />
   
   <div className="app__main">
   <Sidebar />
{props.children}
</div>
</>
  )
}

export default Layout