import axios from "axios";

// Get your API key on  https://newsapi.org/
const apiKey = "your api key";

export function fetchApi(page) {
  return axios
    .get(
      `https://newsapi.org/v2/everything?q=apple&pagesize=5&page=${page}&from=2020-01-15&to=2020-01-15&sortBy=popularity&apiKey=${apiKey}`
    )
    .then(response => {
      return response.data;
    });
}
