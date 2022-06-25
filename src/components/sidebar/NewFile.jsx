import React, { useState, useEffect, useContext } from 'react'
import '../../styles/NewFile.css'
 import {create as ipfsHttpClient} from 'ipfs-http-client'
import { ethers } from "ethers";
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { ConnectContext } from "../../context/ConnectContext";
import { useAlert } from 'react-alert'


 const ipfs = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

function getModalStyle() {
    return {
        top: `50%`,
        left: `50%`,
        transform: `translate(-50%, -50%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: '#ad8762',
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));


const NewFile = () => {
    const {uploads } = useContext(ConnectContext);
    const alert = useAlert()
    const classes = useStyles();

    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState({})
    const [fileUrl, setFileUrl] = useState('')
      const [uploading, setUploading] = useState(false)
      const[description, setdescription] =useState("")
    
    const [fileDetails, setFileDetails] = React.useState({
        fileName: "",
        fileDescription: "", 
        fileHash: "",
        fileType: "",
        fileSize: "",
    })

    console.log(fileDetails)
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0])
        }
    }

    const handleUpload = async() => {
        setUploading(true)
        try {
            const added = await ipfs.add(file)
            
            const url = `https://ipfs.infura.io/ipfs/${added.path}`
            const hash=  (added.path).toString()
            const name= (file.name.substr(0, file.name.lastIndexOf("."))).toString()
          
            const size = (file.size).toString()
           // const ftype=(file.type).toString()
           const ftype= (file.name.split('.').pop()).toString()
           
              await uploads(hash, size, ftype, name,description, false)
            
            //setUrl(url)
            setFileUrl(url)
        alert.success("File successfully uploaded")
        
            setUploading(false)
          
            
        } catch (err) {
            console.log('Error uploading the file : ', err)}
        

        
    }

    return (
        <div className='newFile'>
            <div className="newFile__container" onClick={handleOpen}>
                <AddIcon fontSize='large' style={{ fill : "green" }} />
                <p>New</p>
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div style={modalStyle} className={classes.paper}>
                    <p>Select files you want to upload!</p>
                    {
                        uploading ? (
                            <p>Uploading...</p>
                        ) : (
                                <>  

                                    <input type='text' placeholder='File Description' name = 'file Description' value={description} onChange={(e)=>setdescription(e.target.value)} required/>
                                    <input type="file" onChange={handleChange} />
                                    <button onClick={handleUpload}>Upload</button>
                                </>
                            )
                    }
                </div>
            </Modal>
        </div>
    )
}

export default NewFile
