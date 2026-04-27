import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut, } from "firebase/auth";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, setDoc, collection, getDocs, deleteDoc, } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Search from "./Search";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { signInAnonymously } from "firebase/auth";

function Dashboard() {
    const [page, setPage] = useState("forYou");
    const [showLogin, setShowLogin] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [recommended, setRecommended] = useState([]);
    const [suggested, setSuggested] = useState([]);
    const [savedBooks, setSavedBooks] = useState([]);
    const [confirmId, setConfirmId] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        if (user === null) {
            setShowLogin(true);
        }
    }, [user]);

    const handleLogout = async () => {
        await signOut(auth);
    };


    useEffect(() => {
        const fetchSelected = async () => {
            const res = await fetch(
                "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected"
            );
            const data = await res.json();
            setSelectedBook(data[0]);
        };

        const fetchRecommended = async () => {
            const res = await fetch(
                "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended"
            );
            const data = await res.json();
            setRecommended(data);
        };

        const fetchSuggested = async () => {
            const res = await fetch(
                "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested"
            );
            const data = await res.json();
            setSuggested(data);
        };

        fetchSelected();
        fetchRecommended();
        fetchSuggested();

        setTimeout(() => setLoading(false), 1000);

    }, []);



    useEffect(() => {
        if (user) {
            loadSavedBooks();
        }
    }, [user]);


    const saveBook = async (book) => {
        await setDoc(doc(db, "users", user.uid, "books", book.id), {
            id: book.id,
            title: book.title,
            imageLink: book.imageLink,
            author: book.author,
            averageRating: book.averageRating,
            subscriptionRequired: book.subscriptionRequired,
        });
        loadSavedBooks();
    };

    const loadSavedBooks = async () => {
        const snap = await getDocs(
            collection(db, "users", user.uid, "books")
        );

        const list = snap.docs.map((d) => ({
            id: d.id,
            ...d.data(),
        }));

        setSavedBooks(list);
    };

    const removeBook = async (id) => {
        await deleteDoc(doc(db, "users", user.uid, "books", id));
        loadSavedBooks();
    };



    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">

            <div className="flex flex-col lg:flex-col w-full lg:w-64 bg-white px-4 py-3 lg:py-6 gap-2 lg:gap-4 sticky top-0 z-50 lg:h-screen">


                <div className="flex flex-row items-center justify-between lg:block">
                    <h1 className="text-sm sm:text-base md:text-xl font-bold lg:mb-10">
                        📚 Summarist
                    </h1>
                </div>


                <div className="flex flex-row lg:flex-col gap-2 sm:gap-3 lg:gap-2 justify-around lg:justify-start">

                    <button
                        onClick={() => setPage("forYou")}
                        className={`text-xs md:text-base px-2 py-1 rounded whitespace-nowrap ${page === "forYou"
                            ? "bg-green-100 text-green-600 font-semibold"
                            : "text-gray-600 hover:text-black"
                            }`}
                    >
                        For You
                    </button>

                    <button
                        onClick={() => setPage("library")}
                        className={`text-xs md:text-base px-2 py-1 rounded whitespace-nowrap ${page === "library"
                            ? "bg-green-100 text-green-600 font-semibold"
                            : "text-gray-600 hover:text-black"
                            }`}
                    >
                        My Library
                    </button>

                    <button
                        onClick={() => setPage("search")}
                        className={`text-xs md:text-base px-2 py-1 rounded whitespace-nowrap ${page === "search"
                            ? "bg-green-100 text-green-600 font-semibold"
                            : "text-gray-600 hover:text-black"
                            }`}
                    >
                        Search
                    </button>

                    <button
                        onClick={() => navigate("/settings")}
                        className={`text-xs md:text-base px-2 py-1 rounded whitespace-nowrap ${page === "/settings"
                            ? "bg-green-100 text-green-600 font-semibold"
                            : "text-gray-600 hover:text-black"
                            }`}
                    >
                        Settings
                    </button>

                </div>


                <button
                    onClick={handleLogout}
                    className="hidden lg:block text-white bg-red-600 px-4 py-2 rounded-lg shadow mt-auto"
                >
                    Logout
                </button>

            </div>
            <div
                className={`flex-1 px-6 py-8 ${!user ? "pointer-events-none blur-sm" : ""}`}
            >
                <div className="max-w-[1100px] mx-auto">
                    {loading && (
                        <div className="animate-pulse mb-6">
                            <div className="h-32 bg-gray-300 rounded mb-4"></div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="h-40 bg-gray-300 rounded"></div>
                                ))}
                            </div>
                        </div>
                    )}

                    {page === "search" && (
                        <Search />
                    )}
                    {page === "forYou" && (

                        <>{selectedBook && (

                            <div className="hidden lg:flex bg-yellow-100 p-4 sm:p-5 md:p-6 rounded-xl mb-6 md:mb-8 flex-col sm:flex-row gap-4 md:gap-6 items-center sm:items-start">
                                <img
                                    src={selectedBook.imageLink}
                                    onClick={() => navigate(`/book/${selectedBook.id}`)}
                                    className="w-20 sm:w-24 h-28 sm:h-32 object-cover"
                                />
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Selected just for you
                                    </p>
                                    <h2 className="text-xl font-bold">
                                        {selectedBook.title}
                                    </h2>
                                    <p className="text-gray-600 text-sm">
                                        {selectedBook.author}
                                    </p>
                                </div>
                            </div>

                        )}

                            <h2 className="text-xl font-semibold mb-4">
                                Recommended For You
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                                {recommended.map((b) => (
                                    <div
                                        key={b.id}
                                        onClick={() => navigate(`/book/${b.id}`)}
                                        className="relative bg-white p-4 rounded-xl shadow hover:shadow-lg transition cursor-pointer flex flex-col"
                                    >
                                        {b.subscriptionRequired && (
                                            <span className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-xs px-2 py-1 rounded-full font-semibold shadow">
                                                Premium
                                            </span>
                                        )}

                                        <img
                                            src={b.imageLink}
                                            className="h-48 mx-auto mb-3 object-contain"
                                        />

                                        <p className="font-semibold text-sm">{b.title}</p>
                                        <p className="text-xs text-gray-500">By: {b.author}</p>
                                        <p className="text-sm">🌟 {b.averageRating}</p>

                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                saveBook(b);
                                            }}
                                            className="bg-green-500 hover:bg-green-600 transition text-white px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm rounded-lg shadow"
                                        >
                                            Save
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <h2 className="text-xl font-semibold mb-4">
                                Suggested Books
                            </h2>
                            {loading && (
                                <div className="animate-pulse mb-6">
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {[1, 2, 3, 4].map(i => (
                                            <div key={i} className="h-40 bg-gray-300 rounded"></div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                                {suggested.map((b) => (
                                    <div
                                        key={b.id}
                                        onClick={() => navigate(`/book/${b.id}`)}
                                        className="relative bg-white p-4 rounded-xl shadow hover:shadow-lg transition cursor-pointer flex flex-col"
                                    >
                                        {b.subscriptionRequired && (
                                            <span className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-xs px-2 py-1 rounded-full font-semibold shadow">
                                                Premium
                                            </span>
                                        )}

                                        <img
                                            src={b.imageLink}
                                            className="h-48 mx-auto mb-3 object-contain"
                                        />

                                        <p className="font-semibold text-sm">{b.title}</p>
                                        <p className="text-xs text-gray-500">By: {b.author}</p>
                                        <p className="text-sm">🌟 {b.averageRating}</p>

                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                saveBook(b);
                                            }}
                                            className="bg-green-500 hover:bg-green-600 transition text-white px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm rounded-lg shadow"
                                        >
                                            Save
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}


                    {page === "library" && (
                        <>
                            <h2 className="text-xl font-semibold mb-4">
                                My Library
                            </h2>
                            {loading && (
                                <div className="animate-pulse mb-6">
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {[1, 2, 3, 4].map(i => (
                                            <div key={i} className="h-40 bg-gray-300 rounded"></div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 page">
                                {savedBooks.map((b) => (
                                    <div
                                        key={b.id}
                                        onClick={() => navigate(`/book/${b.id}`)}
                                        className="relative bg-white p-4 rounded-xl shadow hover:shadow-lg transition cursor-pointer flex flex-col"
                                    >
                                        {b.subscriptionRequired && (
                                            <span className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-xs px-2 py-1 rounded-full font-semibold shadow">
                                                Premium
                                            </span>
                                        )}

                                        <img
                                            src={b.imageLink}
                                            className="h-48 mx-auto mb-3 object-contain"
                                        />

                                        <p className="font-semibold text-sm">{b.title}</p>
                                        <p className="text-xs text-gray-500">By: {b.author}</p>
                                        <p className="text-sm">🌟 {b.averageRating}</p>

                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setConfirmId(b.id);
                                            }}
                                            className="bg-red-500 hover:bg-red-600 transition text-white px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm rounded-lg shadow"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                </div>
            </div>

            {showLogin && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

                    <div className="bg-white w-[90%] max-w-[400px] rounded-xl p-6 relative modal">

                        <button
                            onClick={() => setShowLogin(false)}
                            className="absolute top-3 right-3"
                        >
                            ✕
                        </button>

                        <h2 className="text-xl font-semibold text-center mb-4">
                            Log in to Summarist
                        </h2>

                        <button
                            onClick={async () => {
                                await signInAnonymously(auth);
                                setShowLogin(false);
                            }}
                            className="w-full bg-blue-600 text-white py-2 rounded mb-3"
                        >
                            Login as Guest
                        </button>

                        <button
                            onClick={async () => {
                                const provider = new GoogleAuthProvider();
                                await signInWithPopup(auth, provider);
                                setShowLogin(false);
                            }}
                            className="w-full bg-blue-500 text-white py-2 rounded mb-3"
                        >
                            Login with Google
                        </button>

                        <input
                            placeholder="Email Address"
                            className="w-full border p-2 rounded mb-2"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full border p-2 rounded mb-3"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button
                            onClick={async () => {
                                try {
                                    await signInWithEmailAndPassword(auth, email, password);
                                    setShowLogin(false);
                                } catch (error) {
                                    alert("Account not found. Please create one.");
                                }
                            }}
                            className="w-full bg-green-500 text-white py-2 rounded"
                        >
                            Login
                        </button>
                        <button
                         onClick={async () => {
                            try {
                                await createUserWithEmailAndPassword(auth, email, password);

                                alert("Account created successfully ✅");

                                setShowLogin(false);
                                navigate("/for-you");
                            } catch (error) {
                                console.log(error);
                                alert(error.message);
                            }
                            }}
                            className="w-full bg-purple-500 text-white py-2 rounded mt-2"
                        >
                            Create Account
                        </button>

                    </div>
                </div>
            )}
            {confirmId && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

                    <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-[300px] text-center">

                        <h2 className="text-lg font-semibold mb-4">
                            Remove this book?
                        </h2>

                        <div className="flex gap-4 justify-center">

                            <button
                                onClick={() => {
                                    removeBook(confirmId);
                                    setConfirmId(null);
                                }}
                                className="bg-red-500 text-white px-4 py-2 rounded"
                            >
                                Yes
                            </button>

                            <button
                                onClick={() => setConfirmId(null)}
                                className="bg-gray-300 px-4 py-2 rounded"
                            >
                                Cancel
                            </button>

                        </div>

                    </div>
                </div>
            )}
        </div>

    );
}

export default Dashboard;