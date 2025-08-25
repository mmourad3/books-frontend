import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useState } from 'react';

const EditBook = () => {
  const {id}=useParams();
    const navigate= useNavigate();
    const [title, setTitle]= useState("");
    const [author, setAuthor]= useState("");
    const [published, setPublished]= useState("");
    const [description, setDescription]= useState("");
    
    const fetchBook= async() => {
      try {
        const res= await fetch(`http://localhost:3000/api/books/${id}`);
        if (!res.ok){
          const errorMessage= await res.text();
          toast.error(errorMessage);
          return;
        }
        const data=await res.json();
        setTitle(data.title);
        setAuthor(data.author);
        setPublished(data.published);
        setDescription(data.description);
      } catch (err) {
        toast.error("Failed to fetch book");
      }
    };
    useEffect(()=>{
        fetchBook();
    }, [id]);


const handleSubmit= async (e) => {
    e.preventDefault();
    const data={title, author, published: Number(published), ...(description?{description}:{})};
    try {
        const res= await fetch(`http://localhost:3000/api/books/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (!res.ok){
            const errorMessage= await res.text();
            toast.error(errorMessage);
            return;
        }

        toast.success('Book updated successfully');
        navigate('/');
    } catch(err) {
        toast.error('Failed to update book');
    }
};

    return (
      <div className="flex flex-col items-center mt-10">
        <h1 className="text-4xl font-bold text-center mb-5">Edit Book</h1>
        <form className="flex flex-col gap-4 max-w-xl w-full p-6 border rounded bg-white" onSubmit={handleSubmit}>
          <label className="flex flex-col font-semibold">
            Title
            <input
              type="text"
              placeholder="Title *"
              className="border p-2 rounded mt-1"
              value={title}
              onChange={(e)=> setTitle(e.target.value)}
            />
          </label>
          <label className="flex flex-col font-semibold">
            Author
            <input
              type="text"
              placeholder="Author *"
              className="border p-2 rounded mt-1"
              value={author}
              onChange={(e)=> setAuthor(e.target.value)}
            />
          </label>
          <label className="flex flex-col font-semibold">
            Year Published
            <input
              type="text"
              placeholder="Year Published *"
              className="border p-2 rounded mt-1"
              value={published}
              onChange={(e)=> setPublished(e.target.value)}
            />
          </label>
          <label className="flex flex-col font-semibold">
            Description
            <textarea
              placeholder="Description (Optional)"
              className="border p-2 rounded mt-1"
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
            />
          </label>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded cursor-pointer">
            Update Book
          </button>
        </form>
      </div>
    );
}


export default EditBook