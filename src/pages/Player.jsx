import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Player() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(
          `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
        );

        const data = await res.json();

        

        setBook(data); 
      } catch (err) {
        console.error("Error fetching book:", err);
      }
    };

    fetchBook();
  }, [id]);


  if (!book) {
    return (
      <div className="p-10 animate-pulse">
        <div className="h-6 bg-gray-300 w-1/3 mb-4 rounded"></div>
        <div className="h-40 bg-gray-300 mb-6 rounded"></div>
        <div className="h-3 bg-gray-300 rounded mb-2"></div>
        <div className="h-3 bg-gray-300 rounded w-5/6"></div>
      </div>
    );
  }

  return (

    <div className="p-10 max-w-2xl mx-auto page">
       <button
      onClick={() => {
        if (window.history.length > 1) {
          navigate(-1);
        } else {
          navigate("/for-you");
        }
      }}
      className="bg-blue-500 hover:bg-blue-600 transition text-white px-4 py-2 rounded"
    >
      ← Back
    </button>

      <h1 className="text-2xl font-bold mb-4">
        {book.title}
      </h1>

      <img
        src={book.imageLink}
        alt={book.title}
        className="w-40 mb-6"
      />


      <audio controls className="w-full mb-6">
        <source src={book.audioLink} type="audio/mpeg" />
      </audio>


      <p className="text-gray-700 whitespace-pre-line">
        {book.summary}
      </p>
      

    </div>
  );
}

export default Player;