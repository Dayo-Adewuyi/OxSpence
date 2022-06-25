import React, { useState, useEffect , useContext} from 'react'

import { ConnectContext } from '../context/ConnectContext'



export default function Admin() {

    const { reportedList, makeMod, remMod, blacklistUser, pauseContract, unpauseContract} = useContext(ConnectContext)
    
    const [address, setAddress] = useState("")
    const [list, setList] = useState([])



    const getList = async() =>{
        const tx = await reportedList()
        console.log(tx)
        setList(tx)
    }
    const handleChange = (e) => {
        setAddress(e.target.value)
    }
    const handleAdd = async() => {
        await makeMod(address)
    }

    const handleRemove = async() =>{
        await remMod(address)
    }

    const blackList = async() =>{
        await blacklistUser(address)
    }

    useEffect(() => {getList()}, [list])

    return (
        <div className='Admin'>
         <div className='input-field'>
            
            <label>Address</label>
            <input type='text' placeholder='input address' onChange={handleChange}/>
            <button onClick={handleAdd}>Make Admin </button><button onClick={handleRemove}>Remove Admin </button><button onClick={blackList}>BlackList </button>

         </div>
         <div>
            <button onClick={pauseContract}>Pause</button>
            <button onClick={unpauseContract}>Unpause</button>
         </div>

         {
            list.map((element,index) => {
                return(
                <div >
                    <li key ={index}>{element}</li>
                </div>
                )
            })
         }
            
        </div>
    )

}