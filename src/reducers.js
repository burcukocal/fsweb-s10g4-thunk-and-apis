import {
  FAV_ADD,
  FAV_REMOVE,
  FETCH_SUCCESS,
  FETCH_LOADING,
  FETCH_ERROR,
  GET_FAVS_FROM_LS,
  RESET_LOCAL,
} from "./actions";
import { toast } from "react-toastify";

const initial = {
  favs: [],
  current: null,
  error: null,
  loading: false,
};

function writeFavsToLocalStorage(state) {
  localStorage.setItem("s10g4", JSON.stringify(state.favs));
}

function readFavsFromLocalStorage() {
  return JSON.parse(localStorage.getItem("s10g4"));
}

export function myReducer(state = initial, action) {
  switch (action.type) {
    case FAV_ADD:
      if(state.favs.find(fav => fav.id === action.payload.id)){
        //state.favs.includes(action.payload))
        return state;
      }
      else{
        let newFav = {
          ...state,
          favs: [...state.favs, action.payload]}
          writeFavsToLocalStorage(newFav);
          toast.success("Favorilere eklendi")
          return newFav;
      }      

    case FAV_REMOVE:
      let removedList = {
        ...state,
        favs: state.favs.filter(fav => fav.id !== action.payload)
      };
      writeFavsToLocalStorage(removedList);
      toast.warning("Favorilerden çıkarıldı")
      return removedList;

      case RESET_LOCAL:
        let resetFav = {
          ...state,
          favs: []
        };
        writeFavsToLocalStorage(resetFav);
        return resetFav;

    case FETCH_SUCCESS:
      return {...state, loading: false, current: action.payload};

    case FETCH_LOADING:
      return {...state, loading: true, current: null};

    case FETCH_ERROR:
      toast.error(action.payload)
      return {...state, loading: false, error: action.id, current: null};

    case GET_FAVS_FROM_LS:
      return {
        ...state, 
        favs: readFavsFromLocalStorage() || []
      };

    default:
      return state;
  }
}
