import { SET_ACCESS_TOKEN } from "../types";

export const setAccessToken = (access_token: string) => ({
  type: SET_ACCESS_TOKEN,
  access_token: access_token
});
