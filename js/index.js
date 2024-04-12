// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
    // DOM elements
    const userList = document.getElementById("user-list");
    const searchForm = document.getElementById("github-form");
  
    // Function to display user information
    function displayUser(user) {
      const userItem = document.createElement("li");
  
      // Create anchor tag for user profile link
      const userLink = document.createElement("a");
      userLink.href = user.html_url; // Set the href attribute to user's URL
  
      // Display username and avatar 
      userLink.textContent = `${user.login}`;
      const userAvatar = document.createElement("img");
      userAvatar.src = user.avatar_url; // Set the src attribute to avatar URL
      userAvatar.alt = `${user.login}'s avatar`; 
      userItem.appendChild(userAvatar);
      userItem.appendChild(userLink);
  
      // Only append the user link 
      userItem.appendChild(userLink);
  
      userList.appendChild(userItem);
    }
  
    // Function to handle user search and display results
    function handleSearch(event) {
      event.preventDefault(); // Prevent default form submission behavior
  
      const searchQuery = document.getElementById("search").value.trim();
      if (!searchQuery) {
        alert("Please enter a username to search!");
        return;
      }
  
      const userSearchUrl = `https://api.github.com/search/users?q=${searchQuery}`;
  
      fetch(userSearchUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/vnd.github.v3+json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          userList.innerHTML = ""; // Clear previous user list
          if (!data.items || !data.items.length) {// IF no users are found, return a message in place of the users list
            userList.textContent = "No users found for this search.";
            return;
          }
  
          // Display user search results
          data.items.forEach((user) => displayUser(user));
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          alert("An error occurred while fetching user data. Consult your skilled developer");// tell the user that data was not able to be fetched
        });
    }
  
    // Event listener for form submission
    searchForm.addEventListener("submit", handleSearch);//call our handle search event within our submit event listener
  });
  