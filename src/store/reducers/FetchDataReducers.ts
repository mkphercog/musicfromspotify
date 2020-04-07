import { DATA_FETCHING, DATA_FETCHED, DATA_ERROR } from "../types";

const INITIAL_STATE = {
  featching: false,
  featched: false,
  error: false,
  errorMessage: "",
};

interface Action {
  type: string;
  errorMessage: string;
}

export const dataFetchReducer = (state = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case DATA_FETCHING:
      return {
        ...state,
        featching: true,
        featched: false,
        error: false,
        errorMessage: "",
      };
    case DATA_FETCHED:
      return {
        ...state,
        featching: false,
        featched: true,
        error: false,
        errorMessage: "",
      };
    case DATA_ERROR:
      return {
        ...state,
        featching: false,
        featched: false,
        error: true,
        errorMessage: action.errorMessage,
      };
    default:
      return state;
  }
};
