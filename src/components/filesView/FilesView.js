import React, { useState, useEffect, useContext } from 'react'
import '../../styles/FilesView.css'
import { ConnectContext } from '../../context/ConnectContext'

import FileItem from './FileItem'
import FileCard from './FileCard'



const FilesView = () => {
    const { fetchAll, currentAccount, connectWallet } = useContext(ConnectContext)
    const [files, setFiles] = useState([])
    
   

    
    const fetch = async() =>{
        const tx = await fetchAll()
             setFiles(tx)

     }
 
     useEffect(() => {fetch()}, [files])
    
     
    return (
        <>
       { currentAccount ? <div className='fileView'>
            <div className="fileView__row">
                {
                    files?.length > 0 ?
                    files?.map((element,index) => {
                        return(
                            <FileCard key={index} id={element.fileId} name={element.fileName} hash={element.fileHash} type={element.fileType}/>
                        )}) : <div className="word"> Please Upload A File To Get Started 🚀🚀🚀</div>
                        
                } 
            
            </div>
            <div className="fileView__titles">
                <div className="fileView__titles--left">
                    <p>Name</p>
                </div>
                <div className="fileView__titles--right">
                    <p>Last modified</p>
                    <p>File size</p>
                </div>
            </div>
         
            {files?.map((item, index) => (
                    <FileItem key={index}id={(item.fileId).toNumber()} caption={item.fileName} timestamp={(item.uploadTime).toNumber()} fileUrl={item.fileHash} size={item.fileSize} />
                    
                    ))
            
             
                   
                
            }
        </div> : <div className="container">
        <div className="header-container">
        <header>
          <div className="left">
            <p className="title"><span role="img" aria-label="sheep"></span></p>
            <p className="subtitle"></p>
                        </div>

          <div className="right">
    
  </div>
        </header>
      </div>
        <div className="connect-wallet-container">
        <img src="https://media.giphy.com/media/kIQRoRorbJ5AIk6joX/giphy.gif" alt="greatness" />
       
        <button onClick={connectWallet} className="cta-button connect-wallet-button">
          Connect Wallet To Experience greatness
        </button>
      </div>
      
      </div>}
        </>
    )
}

export default FilesView
