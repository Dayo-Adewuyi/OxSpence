import React from 'react'

import '../../styles/Header.css'
import GDriveLogo from '../../media/google-drive-logo.png'
import SearchIcon from '@material-ui/icons/Search';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { useContext,useState, useEffect } from 'react';
import { ConnectContext } from '../../context/ConnectContext';
import polygonLogo from '../../assets/polygonlogo.png'
import { motion } from 'framer-motion/dist/framer-motion'

const Header = () => {
    const {currentAccount, setSearch, connectWallet } = useContext(ConnectContext);
    const [query, setQuery] = useState("")

    const handleSearch = () =>{
        setSearch(query)
    }
    const style = {
        transform: 'rotate(360deg)',
        transition: 'transform 150ms ease'
    }
    return (
        <div className='header'>
            <div className="header__logo" style={style}>
              
                🗄️
                <span className='header__text'>0xSpence</span>
            </div>
            <div className="header__searchContainer">
                <div className="header__searchBar">
                    <SearchIcon />
                    <input type="text" placeholder='Search Files' onChange={event => setQuery(event.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSearch()} />
                    <ExpandMoreIcon />
                </div>
            </div>
            <div className="header__icons">
                <span>
                  
                    
                </span>
                
                {currentAccount && <button className='btn'><img alt="Network logo" className="logo" src={polygonLogo} width="10px" height="10px"/>{currentAccount.slice(0, 6)}...{currentAccount.slice(-4)} </button>}
            </div>
        </div>
    )
}

export default Header
