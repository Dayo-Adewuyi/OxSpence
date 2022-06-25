import React, { useState, useEffect , useContext} from 'react'
import '../styles/FilesView.css'
// import{ toast, ToastContainer } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'
import { ConnectContext } from '../context/ConnectContext'
import FileItem from '../components/filesView/FileItem'
import FileCard from '../components/filesView/FileCard'


export default function Example() {

    const { fetchAll, shareFile, makePublic } = useContext(ConnectContext)
    const [files, setFiles] = useState([])
    const [receivers, setReceivers] = useState([])
    

    
    const fetch = async() =>{
        const tx = await fetchAll()
             setFiles(tx)

     }
 
     useEffect(() => {fetch()}, [files])
    
     
    return (
        <div className='fileView'>
            <div className="fileView__row">
                {
                    files.map((element,index) => {
                        return(
                            <FileCard key={index} id={element.fileId} name={element.fileName} hash={element.fileHash} type={element.fileType}/>
                        )})
                        
                } 
            
            </div>
            {/* <div className="fileView__titles">
                <div className="fileView__titles--left">
                    <p>Name</p>
                </div>
                <div className="fileView__titles--right">
                    <p>Last modified</p>
                    <p>File size</p>
                </div>
            </div> */}
            {/* {
                files.map(({ id, item }) => (
                    <FileItem id={id} caption={item.caption} timestamp={item.timestamp} fileUrl={item.fileUrl} size={item.size} />
                ))
            } */}
            
        </div>
    )

}