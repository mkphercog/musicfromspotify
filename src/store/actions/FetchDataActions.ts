import { DATA_FETCHING, DATA_FETCHED, DATA_ERROR } from "../types";

export const dataFetching = () => ({
  type: DATA_FETCHING,
});

export const dataFetched = () => ({
  type: DATA_FETCHED,
});

export const dataError = (errorMessage: string) => ({
  type: DATA_ERROR,
  errorMessage: errorMessage,
});
