import React, { useState, useEffect } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const ViewBooks = () => {
    const [books, setBooks]= useState([])

    const fetchBooks= async()=>{
      try {
        const res= await fetch('http://localhost:3000/api/books')
      const data= await res.json()
      setBooks(data)
    } catch (error) {
      console.error('Error fetching books', error)
    }
  }

  const deleteBook= async(id)=>{
    try {
      await fetch(`http://localhost:3000/api/books/${id}`, {
        method: 'DELETE'
      })
      toast.success('Book deleted successfully');
      fetchBooks()
    } catch (error) {
      toast.error('Failed to delete book');
    }
  }

  useEffect(()=> {
    fetchBooks()
  }, [])

  return (
    <>
      <h2 className="text-3xl font-bold mb-4 text-center mt-4">Books List</h2>
      <div className="flex justify-center items-center min-h-64">
        {books.length===0?(
          <h2 className='text-2xl text-gray-500 text-center'>No books found</h2>
        ):(
          <ul className="border w-full max-w-5xl p-3">
            {books.map((book)=> (
              <li
                key={book.id}
                className="flex items-center m-2 border-b border-gray-300 last:border-b-0 py-3"
            >
              <Link to={`/books/${book.id}`} className='hover:underline text-xl hover:text-gray-500'>{book.title}</Link>
              <div className="ml-auto space-x-4 flex">
                <Link to={`/books/edit/${book.id}`} className="text-xl">
                  <FaEdit />
                </Link>
                <button
                  onClick={()=> deleteBook(book.id)}
                  className="text-xl cursor-pointer"
                >
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>)}
      </div>
    </>
  );
}



export default ViewBooks