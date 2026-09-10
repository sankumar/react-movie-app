import MovieCard from "../components/MovieCard";
import { useState, useEffect, use } from "react";
import { searchMovies, getPopularMovies } from "../services/api";
import '../css/Home.css';

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies);
            }
            catch (error) {
                setError("Error fetching popular movies:", error);
            }
            finally {
                setLoading(false);
            }
    }
    loadPopularMovies();
    }, [])

    const handleSearch = async (e) => {
        e.preventDefault();
        if(!searchQuery.trim()) return
        if(loading) return
        setLoading(true);
        try {
            const searchResults = await searchMovies(searchQuery);
            setMovies(searchResults);
            setError(null);
        } catch (error) {
            setError("Error searching for movies:", error);
        } finally {
            setLoading(false);
        }
    }
    return(
        <>
         <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input
                 type="Search for movies..."
                 className="search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                   />
                <button type="submit" className="search-btn">Search</button>
            </form>
            <div className="movies-grid">
                {movies.map((movie) => 
                   (
                    <MovieCard key={movie.id} movie={movie} />
                    )
                )}
            </div>
         </div>
        </>
    )
}

export default Home