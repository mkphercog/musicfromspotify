import { SEARCH_ALBUMS } from "../types";

export const searchAlbums = (listOfAlbums: []) => ({
  type: SEARCH_ALBUMS,
  listOfAlbums: listOfAlbums
});
