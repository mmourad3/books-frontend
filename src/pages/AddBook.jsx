import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const AddBook = () => {
    const [title, setTitle]= useState("");
  const [author, setAuthor]= useState("");
  const [published, setPublished]= useState("");
  const [description, setDescription]= useState(null);
  const navigate= useNavigate();

  const handleSubmit= async (e) => {
      e.preventDefault();
      const data= {title, author, published: Number(published), ...(description?{description}:{})};
        try{
            const res= await fetch('http://localhost:3000/api/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            body: JSON.stringify(data)
        });
        if (!res.ok){
            const error= await res.text();
            toast.error(error);
            return
        } 
        toast.success('Book added successfully');
        navigate('/');
    }catch(err){
        toast.error('Failed to add book');
    }}

  return (
    <>
      <div className="flex flex-col items-center mt-10">
        <h1 className="text-4xl font-bold text-center mb-5">Add Book</h1>
        <form
          className="flex flex-col gap-4 max-w-xl w-full p-6 border rounded bg-white"
          onSubmit={handleSubmit}
        >
          <label className="flex flex-col font-semibold">
            Title
            <input
              type="text"
              placeholder="Title *"
              className="border p-2 rounded mt-1"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label className="flex flex-col font-semibold">
            Author
            <input
              type="text"
              placeholder="Author *"
              className="border p-2 rounded mt-1"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </label>
          <label className="flex flex-col font-semibold">
            Year Published
            <input
              type="text"
              placeholder="Year Published *"
              className="border p-2 rounded mt-1"
              value={published}
              onChange={(e) => setPublished(e.target.value)}
            />
          </label>
          <label className="flex flex-col font-semibold">
            Description
            <textarea
              placeholder="Description (Optional)"
              className="border p-2 rounded"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded cursor-pointer"
          >
            Add Book
          </button>
        </form>
      </div>
    </>
  );
};

  export default AddBook;
