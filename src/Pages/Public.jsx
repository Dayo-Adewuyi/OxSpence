import React, { useState, useEffect , useContext} from 'react'
import '../styles/FilesView.css'

import { ConnectContext } from '../context/ConnectContext'
import ChildModal from '../components/filesView/modal'
import PublicCard from '../components/filesView/PublicCard'


export default function Example() {

    const { fetchPublic} = useContext(ConnectContext)
    const [files, setFiles] = useState([])
    const [check, setCheck] = useState(false)
    

    
    const fetch = async() =>{
        const tx = await fetchPublic()
             setFiles(tx)

     }
 
     useEffect(() => {fetch()
        }, [files])
    
    

    return (
        <div className='fileView'>
            <div className="fileView__row">
                { files?.length>0 ?
                    files.map((element,index) => {
                        return(
                            <PublicCard key={index} id={element.fileId} name={element.fileName} hash={element.fileHash} type={element.fileType}/>
                        )}) :(<div>No Files</div>)
                        
                } 
                              
            </div>
          
            
        </div>
    )

}