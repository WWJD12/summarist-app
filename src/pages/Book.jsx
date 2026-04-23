import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

function Book() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchBook = async () => {
      const res = await fetch(
        `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
      );
      const data = await res.json();
      setBook(data);
    };

    fetchBook();
  }, [id]);

  const handleRead = () => {
    if (!user) {
      alert("Login required");
      return;
    }

    if (book.subscriptionRequired) {
      navigate("/choose-plan");
    } else {
      navigate(`/player/${book.id}`);
    }
  };

  const handleListen = handleRead;


  if (!book) {
    return (
      <div className="p-6 sm:p-10 animate-pulse">
        <div className="h-6 bg-gray-300 w-1/3 mb-4 rounded"></div>
        <div className="h-40 bg-gray-300 mb-6 rounded"></div>
        <div className="space-y-2">
          <div className="h-3 bg-gray-300 rounded"></div>
          <div className="h-3 bg-gray-300 rounded w-5/6"></div>
          <div className="h-3 bg-gray-300 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 md:px-10 py-6 max-w-[1100px] mx-auto">


      <button
        onClick={() => navigate("/for-you")}
        className="mb-4 bg-green-500 hover:bg-green-600 transition text-white px-4 py-2 rounded-lg shadow"
      >
        Back
      </button>


      <div className="flex flex-col md:flex-row gap-6 md:gap-10">


        <img
          src={book.imageLink}
          className="w-40 h-56 sm:w-48 sm:h-64 object-cover rounded mx-auto md:mx-0"
        />


        <div className="flex-1">

          <h1 className="text-xl sm:text-2xl font-bold mb-1">
            {book.title}
          </h1>

          <p className="text-gray-600 mb-1">{book.author}</p>
          <p className="text-gray-600 mb-2">🌟 {book.averageRating}</p>

          <p className="text-sm text-gray-500 mb-4">
            {book.subTitle}
          </p>

          <p className="text-gray-700 text-sm sm:text-base leading-relaxed whitespace-pre-line">
            {book.summary}
          </p>


          <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">

            <button
              className="bg-green-500 hover:bg-green-600 transition text-white px-4 py-2 rounded"
              onClick={handleRead}
            >
              Read
            </button>

            <button
              className="bg-blue-500 hover:bg-blue-600 transition text-white px-4 py-2 rounded"
              onClick={handleListen}
            >
              Listen
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Book;