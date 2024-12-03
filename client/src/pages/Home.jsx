import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar.jsx/Navbar'
import NoteCard from '../components/Cards/NoteCard'
import { MdAdd } from 'react-icons/md'
import AddEditNotes from './AddEditNotes'
import Model from 'react-modal'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import axiosInstance from '../utils/axiosInstance'
import moment from "moment"
import Toast from '../components/ToastMessage/Toast'

const Home = () => {
  const [openEditModel, setOpenEditModel] = useState({
    isShown:false,
    type:"add",
    data:null
  });
  const [showToastMsg, setShowToastMsg] = useState({
    isShown : false,
    message : "",
    type : "add"

  })
  const [userInfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([]);

  const navigate = useNavigate();
// get user Info
const handleEdit =(noteDetails) => {
  setOpenEditModel({isShown:true, 
    data:noteDetails,
    type:"edit"
  })
}

const showToastMessage = (message, type) => {
    setShowToastMsg({
      isShown: true,
      message,
      type
    })
}
const handleToastClose = () => {
  setShowToastMsg({
    isShown: false,
    message : '',
  })
}

const getUserInfo = async() => {
  try{
    const response = await axiosInstance.get('/get-user')
    if(response.data && response.data.user) {
      setUserInfo(response.data.user);
    }
  }catch(error) {
    if(error.response.status === 401) {
      localStorage.clear();
      navigate("/login")
    }
  }
} 

// get all notes
const getAllNotes = async () => {
  try{
    const response = await axiosInstance.get("/get-all-notes");

    if(response.data && response.data.notes) {
      setAllNotes(response.data.notes);
    }
  }catch (error) {
    console.log("An un expected error")
  }
}
// delete

const deleteNote = async(data) => {
  const noteId = data._id
  try{
    const response = await axiosInstance.delete("/delete-notes/" + noteId)
    if(response.data && !response.data.error) {
        showToastMessage("Note Deleted Successfully")
        getAllNotes()
       
    }
} catch(error) {
    if(error.response && error.response.data && error.response.data.mess    )
    {
        console.log("An error")
    }
}
}

useEffect(()=> {
  getUserInfo();
  getAllNotes()
  return()=> {};
}, [])

  return (
 
    <div>
         <Navbar userInfo={userInfo} />
      <div className='container mx-auto'>
    { allNotes.length > 0 ?   <div className='grid grid-cols-3 gap-4 mt-8 '>
          {allNotes.map((item , index) => (
 <NoteCard 
 key={item._id}
 title={item.title}
 date={item.createdOn} 
 content={item.content}
 tags={item.tags}
 isPinned={item.isPinned}
 onEdit={()=>handleEdit(item)}
 onDelete={()=>deleteNote(item)}
 onPinNote={()=>{}}
 />
          ))}
       
       
        </div> : <>
          <div>
            <p>Start Create your first note</p>
          </div>
        </>}
      </div>
      <button onClick={() => {
        setOpenEditModel({isShown:true, type:"add", data:null})
      }}
       className='w-16 h-16 flex items-center justify-center
      rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10'>
        <MdAdd className='text-[32px] text-white'/>
        </button>
        <Model isOpen = {openEditModel.isShown}
        onRequestClose = {()=> {}}
        style={{
          overlay:{
            backgroundColor:"#000",

          }
        }}
        contentLabel=""
        className="relative w-[50%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
        >
        <AddEditNotes
          type={openEditModel.type}
          noteData={openEditModel.data}
        onClose={()=> {
          setOpenEditModel({ isShown:false,
            type:"add",
            data:null})
        }}
        getAllNotes={getAllNotes}
        showToastMessage={showToastMessage}
        />
       
        </Model>
        <Toast
        isShown={showToastMsg.isShown}
        message ={showToastMsg.message}
        type ={showToastMsg.type}
        onClose={handleToastClose}
         />
      </div>
  )
}

export default Home