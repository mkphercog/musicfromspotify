import { SET_ACCESS_TOKENS } from "../types";

export const setAccessTokens = (
  access_token: string,
  refresh_token: string
) => ({
  type: SET_ACCESS_TOKENS,
  access_token: access_token,
  refresh_token: refresh_token
});
