import { SET_ACCESS_TOKEN } from "../types";
import { getCodeFromUrl } from "../../authorization/config";

const INITIAL_STATE = {
  access_token: getCodeFromUrl() ? localStorage.getItem("access") : ""
};

export const authorizationReducers = (
  state = INITIAL_STATE,
  action: { type: typeof SET_ACCESS_TOKEN; access_token: string }
) => {
  switch (action.type) {
    case SET_ACCESS_TOKEN:
      return {
        ...state,
        access_token: action.access_token
      };
    default:
      return state;
  }
};
