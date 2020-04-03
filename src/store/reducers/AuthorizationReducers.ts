import { SET_ACCESS_TOKENS } from "../types";
import { getCodeFromUrl } from "../../authorization/config";

const INITIAL_STATE = {
  access_token: getCodeFromUrl() ? localStorage.getItem("access_token") : "",
  refresh_token: localStorage.getItem("refresh_token")
    ? localStorage.getItem("refresh_token")
    : ""
};

export const authorizationReducers = (
  state = INITIAL_STATE,
  action: {
    type: typeof SET_ACCESS_TOKENS;
    access_token: string;
    refresh_token: string;
  }
) => {
  switch (action.type) {
    case SET_ACCESS_TOKENS:
      return {
        ...state,
        access_token: action.access_token,
        refresh_token: action.refresh_token
      };
    default:
      return state;
  }
};
