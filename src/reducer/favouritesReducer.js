export const initialState = {
  favourites: JSON.parse(localStorage.getItem("favourites")) || [],
};

export function favouritesReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_FAVOURITE": {
      const exists = state.favourites.some(
        (item) => item.id === action.payload.id
      );

      const updatedFavourites = exists
        ? state.favourites.filter((item) => item.id !== action.payload.id)
        : [...state.favourites, action.payload];

      localStorage.setItem("favourites", JSON.stringify(updatedFavourites));

      return {
        ...state,
        favourites: updatedFavourites,
      };
    }

    default:
      return state;
  }
}