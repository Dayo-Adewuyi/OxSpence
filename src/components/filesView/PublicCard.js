import React from 'react'
import '../../styles/FileCard.css'
import ShareIcon from '@material-ui/icons/Share';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import PublicIcon from '@material-ui/icons/Public';
import { ConnectContext } from '../../context/ConnectContext';
import { useContext, useState } from 'react';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import TwitterIcon from '@material-ui/icons/Twitter';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import InsertLinkIcon from '@material-ui/icons/InsertLink';
import ClipboardJS from "clipboard";
import { useAlert } from 'react-alert'



new ClipboardJS(".button");
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
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const PublicCard = ({ name, hash, id, type }) => {
    const { makePrivate, reportFile } = useContext(ConnectContext);
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const alert = useAlert()
    
    
  
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

   
    
    const handleReport = async() => {
        await reportFile(id)
        alert.success("file successfully reported")
    }
    
    const handlePrivate = async() => {
        await makePrivate(id)
        alert.success("file made private")
    }
    
  
    
    return (
        <div className='fileCard'>
            <div className="fileCard--top">
            {(() => {
        switch (type) {
          case 'mp4' || 'mkv':
            return <VideoLibraryIcon style={{ fontSize: 130 }}/>
          case 'jpeg' || 'png':
            return <PhotoLibraryIcon style={{ fontSize: 130 }} />
          case 'pdf':
            return <PictureAsPdfIcon style ={{ fontSize: 130 }} />
          default:
            return <InsertDriveFileIcon style={{ fontSize: 130 }} />
        }
      })()}

            
            </div>

            <div className="fileCard--bottom">
                <p><a href={`https://ipfs.infura.io/ipfs/${hash}`} style={{textDecoration: 'none', color: 'black'}}>{name.slice(0,8)}...</a></p> 
                <div><span><ShareIcon style ={{ fontsize: 10, cursor: "pointer" } } onClick={() => handleOpen()}/></span><span><VisibilityOffIcon style ={{ fontSize: 15, cursor : 'pointer'}} onClick={() => handlePrivate()} /></span></div>    
            </div>
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description">
             <div style={modalStyle} className={classes.paper}>
                <iframe  src={"https://ipfs.infura.io/ipfs/"  + hash}
                width="100%"
                height="400px"
                id="myId"
                className="myClassname"
                display="initial"
                position="relative"
                title="test"/>
          
          <button className="btn btn-small btn-success"><a href={"https://ipfs.infura.io/ipfs/" + hash} className="imp" download={name + "from UNSTOPPABLE DRIVE"} >Download File</a></button> <a target = "_blank"  href={"http://www.twitter.com/share?text=check out " + name + "&url=https://ipfs.infura.io/ipfs/" + hash} className="imp" data-action="share/whatsapp/share"><TwitterIcon/></a>
          <a target = "_blank" href={"whatsapp://send?text=check out " + name + "&url=https://ipfs.infura.io/ipfs/" + hash} className="imp" data-action="share/whatsapp/share"><WhatsAppIcon/></a>
          <button
        className="button"
        data-clipboard-action="copy"
        data-clipboard-target={`https://ipfs.infura.io/ipfs/${hash}`}
      >
        <InsertLinkIcon/>
      </button>
          <button className="btn btn-small btn-warning me-1" onClick={()=>handleReport()}>Report File</button>
         
          </div>
            </Modal>
        </div>
    )
}

export default PublicCard
