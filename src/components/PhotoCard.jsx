export default function PhotoCard({ photo, toggleFav, isFav }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden">

      <div className="overflow-hidden">
        <img
          src={photo.download_url}
          alt={photo.author}
          className="w-full h-48 object-cover hover:scale-110 transition duration-300"
        />
      </div>

      <div className="p-4 flex justify-between items-center">

        <p className="text-sm font-medium text-gray-700">
          {photo.author}
        </p>

        <button
          onClick={() => toggleFav(photo)}
          className="text-xl hover:scale-110 transition"
        >
          {isFav ? "❤️" : "🤍"}
        </button>

      </div>

    </div>
  );
}