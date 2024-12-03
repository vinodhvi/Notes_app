import React, { useState } from 'react'
import TagInput from '../components/Input/TagInput'
import { MdClose } from 'react-icons/md';
import axiosInstance from '../utils/axiosInstance';

const AddEditNotes = ({onClose, noteData, type, getAllNotes, showToastMessage}) => {

    const [title, setTitle] = useState(noteData?.title || "");
    const [content, setContent] = useState(noteData?.content || "");
    const [tags, setTags] = useState(noteData?.tags || []);
    const [error, setError] = useState(null)
// add new note
    const addNewNote = async () => {
        try{
            const response = await axiosInstance.post("/add-note", {
                title,
                content,
                tags,

            })
            if(response.data && response.data.note) {
                showToastMessage("Note added Successfully")
                getAllNotes()
                onClose()
            }
        } catch(error) {
            if(error.response && error.response.data && error.response.data.mess    )
            {
                setError(error.response.data.message)
            }
        }
    }
    // edit new note
  const editNote = async () => {
    const noteId = noteData._id
    try{
        const response = await axiosInstance.put("/edit-note/" + noteId, {
            title,
            content,
            tags,

        })
        if(response.data && response.data.note) {
            showToastMessage("Note Updated Successfully")
            getAllNotes()
            onClose()
        }
    } catch(error) {
        if(error.response && error.response.data && error.response.data.mess    )
        {
            setError(error.response.data.message)
        }
    }
    }

const handleAddNotes = () => {
    if(!title) {
        setError("Please Enter Title")
        return;
    }
    if(!content) {
        setError("Please Enter Content")
        return;
    }
    setError("")
   
    if(type === "edit") {
        editNote()
    }
    else {
        addNewNote()
    }
}
  return (
    <div>
        <button onClick={onClose}>
            <MdClose className='text-xl text-slate-400 absolute right-0'/>
        </button>
        <div className='flex flex-col gap-2'>
            <label className='input-label'>Title</label>
            <input 
                type='text'
                className='text-2xl text-slate-950 outline-none'
                placeholder='Go To Gym at 5:00 AM'
                value={title}
                onChange={({target})=> setTitle(target.value)}
            />
        </div>
        <div className='flex flex-col gap-2 mt-4'>
            <label className='input-label'>Content</label>
            <textarea 
                type='text'
                className='text-sm text-slate-950 outline-none
                 bg-slate-50 rounded'
                placeholder='Content'
                rows={10}
                value={content}
                onChange={({target})=> setContent(target.value)}
            />
        </div>
        <div className='mt-3'>
            <label className='input-label'
        
            >Tags</label>
            <TagInput tags={tags} setTags={setTags}/>
        </div>
        {error && <p className='text-xs text-red-500'>{error}</p>}
        <button 
        onClick={handleAddNotes}
        className='btn-primary font-medium mt-5 p-3'>
            {type === 'edit' ? 'UPDATE' : 'ADD'}</button>
    </div>
  )
}

export default AddEditNotes