import { SET_ACCESS_TOKENS } from "../types";
import { getCodeFromUrl } from "../../authorization/config";
import { GlobalState, GlobalAction } from "../storeInterfaces";

const accessLocal = getCodeFromUrl()
  ? String(localStorage.getItem("access_token"))
  : "";
const refreshLocal = localStorage.getItem("refresh_token")
  ? String(localStorage.getItem("refresh_token"))
  : "";

const INITIAL_STATE: GlobalState = {
  access_token: accessLocal,
  refresh_token: refreshLocal,
};

export const authorizationReducers = (
  state = INITIAL_STATE,
  action: GlobalAction
) => {
  switch (action.type) {
    case SET_ACCESS_TOKENS:
      localStorage.setItem("access_token", action.access_token);
      localStorage.setItem("refresh_token", action.refresh_token);
      return {
        ...state,
        access_token: action.access_token,
        refresh_token: action.refresh_token,
      };

    default:
      return state;
  }
};
