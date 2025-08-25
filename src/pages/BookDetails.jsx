import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParams, Link } from "react-router-dom";

export default function BookDetails() {
  const {id}= useParams();
  const [book, setBook]=useState(null);

  const fetchBook= async() => {
    try{
      const res=await fetch(`http://localhost:3000/api/books/${id}`);
      const data= await res.json();
      if(!res.ok){
        throw new Error(data.message);
      }
      else{
        setBook(data);
      }
    }catch(err){
      toast.error("Failed to fetch book details");
    }
  };

  useEffect(()=> {
    fetchBook();
  }, [id]);

  if (!book){
    return(
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-4xl font-bold">Book Not Found</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mt-10">
        <h1 className="text-4xl font-bold text-center mb-5">Book Details</h1>
      <form className="flex flex-col gap-4 max-w-xl w-full p-6 border rounded bg-white">
        <label className="flex flex-col font-semibold">
          Title
          <input
            type="text"
            value={book.title}
            readOnly
            className="border p-2 rounded bg-gray-100 mt-1"
          />
        </label>

        <label className="flex flex-col font-semibold">
          Author
          <input
            type="text"
            value={book.author}
            readOnly
            className="border p-2 rounded bg-gray-100 mt-1"
          />
        </label>

        <label className="flex flex-col font-semibold">
          Year Published
          <input
            type="number"
            value={book.published}
            readOnly
            className="border p-2 rounded bg-gray-100 mt-1"
          />
        </label>

        <label className="flex flex-col font-semibold">
          Description
          <textarea
            value={book.description}
            readOnly
            className="border p-2 rounded bg-gray-100 mt-1"
          />
        </label>

        <Link
          to="/"
          className="bg-blue-500 text-white p-2 rounded text-center mt-4"
        >
          Go Back
        </Link>
      </form>
    </div>
  );
}
