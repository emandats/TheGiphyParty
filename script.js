// Global Constants
const api_key = "RbDSJNgMf4pOuDpCr1t4IulLYNzCIFAF"
const limit = 9

// Variables
var pages = 0
var searchTerm = ''

// Page Elements
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const gifResults = document.querySelector("#gif-results");
const showMoreBtn = document.querySelector("#show-more-button");

/**
 * Update the DOM to display results from the Giphy API query.
 *
 * @param {Object} results - An array of results containing each item
 *                           returned by the response from the Giphy API.
 *
 */
function displayResults(results) {
  gifResults.innerHTML = "";

  for (const result of results) {
    const gifElement = document.createElement("img");
    gifElement.src = result.images.fixed_height.url;
    gifResults.appendChild(gifElement);
  }
}

/**
 * Make the actual `fetch` request to the Giphy API
 * and appropriately handle the response.
 *
 * @param {String} searchTerm - The user input text used as the search query
 *
 */
async function getGiphyApiResults(searchTerm) {
  const offset = pages * limit
  const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${searchTerm}&limit=${limit}&offset=${offset}&rating=g&lang=en`);
  const jsonResponse = await response.json()
  return jsonResponse.data
}

/**
 * The function responsible for handling all form submission events.
 *
 * @param {SubmitEvent} event - The SubmitEvent triggered when submitting the form
 *
 */
async function handleFormSubmit(event) {
  event.preventDefault();
  
  searchTerm = searchInput.value; 
  pages = 0;

  const results = await getGiphyApiResults(searchTerm);
  displayResults(results);
}

/**
 * Handle fetching the next set of results from the Giphy API
 * using the same search term from the previous query.
 *
 * @param {MouseEvent} event - The 'click' MouseEvent triggered by clicking the 'Show more' button
 *
 */
async function handleShowMore(event) {
  const results = await getGiphyApiResults(searchTerm) //fetches next set of gif results 
  displayResults(results) //displays the fetched results 
  pages += 1 // keeps track of current page
}

window.onload = function () {
  // Add any event handlers here
  searchForm.addEventListener("submit", handleFormSubmit);
  showMoreBtn.addEventListener("click", handleShowMore);
}