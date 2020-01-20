import axios from "axios";

// Get your API key on  https://newsapi.org/
const apiKey = "your api key";
const apiUrl = "https://newsapi.org/v2/everything";
export function fetchApi(page = 1, source = null) {
  const url =
    apiUrl +
    `?q=apple&language=en&pagesize=5&page=${page}&from=2020-01-15&to=2020-01-15&sortBy=popularity` +
    (source ? `&sources=${source}` : "") +
    `&apiKey=${apiKey}`;

  return axios.get(url).then(response => {
    return response.data;
  });
}
