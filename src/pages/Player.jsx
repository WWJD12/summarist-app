import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Player() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(
          `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
        );

        const data = await res.json();

        console.log("PLAYER DATA:", data); // 👈 debug

        setBook(data); // ✅ IMPORTANT (NOT data.data)
      } catch (err) {
        console.error("Error fetching book:", err);
      }
    };

    fetchBook();
  }, [id]);

  // 🧱 LOADING STATE
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
      
      <h1 className="text-2xl font-bold mb-4">
        {book.title}
      </h1>

      <img
        src={book.imageLink}
        alt={book.title}
        className="w-40 mb-6"
      />

      {/* 🎧 AUDIO PLAYER */}
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