
export const QUOTES_FETCH_REQUEST = "quotes/fetch_list_request";
export const QUOTES_FETCH_LOADING = "quotes/fetch_list_loading";
export const QUOTES_FETCH_SUCCESS = "quotes/fetch_list_success";
export const QUOTES_FETCH_FAILED = "quotes/fetch_list_failed";

export function fetchQuoteList(payload) {
  return {
    type: QUOTES_FETCH_REQUEST,
    payload
  };
}
