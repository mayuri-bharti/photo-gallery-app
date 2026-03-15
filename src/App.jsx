import { useCallback, useMemo, useReducer, useState } from "react";
import useFetchPhotos from "./hooks/useFetchPhotos";
import PhotoCard from "./components/PhotoCard";
import { favouritesReducer, initialState } from "./reducer/favouritesReducer";

function App() {
  const { photos, loading, error } = useFetchPhotos();

  const [searchTerm, setSearchTerm] = useState("");

  const [state, dispatch] = useReducer(favouritesReducer, initialState);

  const toggleFavourite = useCallback((photo) => {
    dispatch({
      type: "TOGGLE_FAVOURITE",
      payload: photo,
    });
  }, []);

  const filteredPhotos = useMemo(() => {
    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [photos, searchTerm]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-amber-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-amber-700"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500 font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50 py-8 px-4">

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <h1 className="text-4xl font-bold text-center text-amber-900 mb-2">
          Photo Gallery App
        </h1>

        <div className="w-24 h-1 bg-amber-700 mx-auto mb-8"></div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by author name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-600"
          />
        </div>

        {/* Stats */}
        <div className="mb-6 text-gray-700">
          Total Photos: {filteredPhotos.length} | Favourites: {state.favourites.length}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {filteredPhotos.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              toggleFav={toggleFavourite}
              isFav={state.favourites.some((item) => item.id === photo.id)}
            />
          ))}

        </div>

      </div>

    </div>
  );
}

export default App;