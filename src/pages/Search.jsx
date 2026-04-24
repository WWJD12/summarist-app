import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Search() {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const delay = setTimeout(() => {
            if (!query) {
                setResults([]);
                return;
            }

            fetchResults();
        }, 300);

        return () => clearTimeout(delay);
    }, [query]);

    const fetchResults = async () => {
        setLoading(true);

        const res = await fetch(
            `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${query}`
        );

        const data = await res.json();
        setResults(data || []);

        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-100 px-4 md:px-10 py-6">

            <div className="max-w-[1200px] mx-auto">

                <h1 className="text-xl font-bold mb-4">Search</h1>

                <input
                    type="text"
                    placeholder="Search for books..."
                    className="w-full p-3 border rounded-lg mb-6"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />

                {loading && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 animate-pulse">
                        {[1,2,3,4].map((i) => (
                            <div key={i} className="bg-white p-4 rounded-xl shadow">
                                <div className="h-48 bg-gray-300 mb-3 rounded"></div>
                                <div className="h-4 bg-gray-300 mb-2 rounded"></div>
                                <div className="h-3 bg-gray-300 mb-2 rounded"></div>
                                <div className="h-8 bg-gray-300 rounded"></div>
                            </div>
                        ))}
                    </div>
                )}

                {!loading && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                        {results.map((b) => (
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
                )}

            </div>
        </div>
    );
}

export default Search;