// Modal functionality
const modal = document.getElementById("addPostModal");
const addPostBtn = document.querySelector(".Ad-pst");
const closeBtn = document.querySelector(".close");
const postForm = document.getElementById("postForm");

// Open modal
addPostBtn.addEventListener("click", () => {
  modal.style.display = "block";
});

// Close modal
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

// Handle form submission
postForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Get form data
  const postContent = document.getElementById("postContent").value;
  const postImage = document.getElementById("postImage").files[0];

  // Validate input
  if (!postContent || !postImage) {
    alert("Please fill out all fields!");
    return;
  }

  // Create a new post object
  const newPost = {
    id: Date.now(), // Unique ID for the post
    content: postContent,
    image: URL.createObjectURL(postImage), // Convert image to a URL
    clubLogo: "Image/FS2.png", // Constant club logo
    clubName: "Full-Stack", // Constant club name
    role: "Member", // Constant role
  };

  // Save the post to localStorage
  const posts = JSON.parse(localStorage.getItem("posts")) || []; // Retrieve existing posts
  posts.push(newPost); // Add the new post
  localStorage.setItem("posts", JSON.stringify(posts)); // Save back to localStorage

  // Create and display the new post in the UI
  createPostElement(newPost);

  // Clear the form and close the modal
  postForm.reset();
  modal.style.display = "none";
});

// Function to create a post element and add it to the UI
function createPostElement(post) {
  const newPost = document.createElement("div");
  newPost.classList.add("post-card");

  // Post Image Section
  const postImgDiv = document.createElement("div");
  postImgDiv.classList.add("Post-img");
  const img = document.createElement("img");
  img.src = post.image; // Use the uploaded image
  img.alt = "Post Image";
  postImgDiv.appendChild(img);

  // Post Header Section
  const postHeader = document.createElement("div");
  postHeader.classList.add("post-header");

  const topSec = document.createElement("div");
  topSec.classList.add("Top-sec");

  const profilePic = document.createElement("img");
  profilePic.src = post.clubLogo; // Constant profile picture
  profilePic.alt = "Profile Picture";

  const heading = document.createElement("h1");
  heading.innerHTML = `${post.clubName} <span>${post.role}</span>`;

  const editIcon = document.createElement("i");
  editIcon.classList.add("fa", "fa-pencil");
  editIcon.setAttribute("aria-hidden", "true");

  topSec.appendChild(profilePic);
  topSec.appendChild(heading);
  topSec.appendChild(editIcon);

  // Post Content Section
  const midSec = document.createElement("div");
  midSec.classList.add("mid-sec");

  const postText = document.createElement("p");
  postText.textContent = post.content;

  midSec.appendChild(postText);

  // Post Footer Section
  const endSec = document.createElement("div");
  endSec.classList.add("end-sec");

  const readMoreBtn = document.createElement("button");
  readMoreBtn.classList.add("read-more-btn");
  readMoreBtn.innerHTML = `<span class="Redmore">READ MORE</span>`;

  const socials = document.createElement("div");
  socials.classList.add("Socialss");

  const instagramBtn = document.createElement("button");
  instagramBtn.classList.add("Linnk");
  instagramBtn.innerHTML = `<a href="#"><i class="fab fa-instagram"></i></a>`;

  const whatsappBtn = document.createElement("button");
  whatsappBtn.classList.add("Linnk");
  whatsappBtn.innerHTML = `<a href="#"><i class="fab fa-whatsapp"></i></a>`;

  const shareBtn = document.createElement("button");
  shareBtn.classList.add("Linnk");
  shareBtn.innerHTML = `<a href="#"><i class="fas fa-share"></i></a>`;

  socials.appendChild(instagramBtn);
  socials.appendChild(whatsappBtn);
  socials.appendChild(shareBtn);

  endSec.appendChild(readMoreBtn);
  endSec.appendChild(socials);

  // Assemble the post
  postHeader.appendChild(topSec);
  postHeader.appendChild(midSec);
  postHeader.appendChild(endSec);

  newPost.appendChild(postImgDiv);
  newPost.appendChild(postHeader);

  // Add the new post to the post container
  const postContainer = document.getElementById("postContainer");
  postContainer.insertBefore(newPost, postContainer.firstChild);
}

// Load posts from localStorage when the admin page loads
window.addEventListener("load", () => {
  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  posts.forEach((post) => createPostElement(post));
});

// READ MORE BUTTON CODE OF POST
function toggleReadMore(button) {
  var parentCard = button.closest(".post-card");
  var dots = parentCard.querySelector(".dots");
  var moreText = parentCard.querySelector(".more-text");

  if (dots.style.display === "none" || dots.style.display === "") {
    dots.style.display = "inline";
    button.innerHTML = "READ MORE";
    moreText.style.display = "none";
    button.style.color = "whitesmoke";
    button.style.fontWeight = "600";
  } else {
    dots.style.display = "none";
    button.innerHTML = "READ LESS";
    moreText.style.display = "inline";
    button.style.color = "whitesmoke";
    button.style.fontWeight = "600";
  }
}

// HAMBURGER MENU CODE
document.querySelector(".hamburger").addEventListener("click", function () {
  const lowerNav = document.querySelector(".lower-nav");
  const screenWidth = window.innerWidth;

  if (screenWidth < 770) {
    lowerNav.style.display =
      lowerNav.style.display === "none" || lowerNav.style.display === ""
        ? "block"
        : "none";
  } else {
    // If screen size is greater than or equal to 770 pixels, make lower nav visible in the nav section
    lowerNav.style.display = "flex";
  }
});

// Handle resizing
window.addEventListener("resize", function () {
  const lowerNav = document.querySelector(".lower-nav");
  const screenWidth = window.innerWidth;

  if (screenWidth >= 770) {
    // If screen size is greater than or equal to 770 pixels, make lower nav visible in the nav section
    lowerNav.style.display = "flex";
  } else {
    // If screen size is less than 770 pixels, maintain the previous logic
    lowerNav.style.display = "none";
  }
});

// 5 POST VISIBLE AT A TIME CODE AND LOAD MORE POST BUTTON CODE
let visiblePosts = 5; // Number of initially visible posts
const posts = document.querySelectorAll(".post-card");

function showPosts(start, end) {
  for (let i = 0; i < posts.length; i++) {
    if (i >= start && i < end) {
      posts[i].style.display = "flex";
    } else {
      posts[i].style.display = "none";
    }
  }
}

function loadMorePosts() {
  visiblePosts += 5; // Increase the number of visible posts
  if (visiblePosts >= posts.length) {
    document.getElementById("loadMoreBtn").style.display = "none"; // Hide the button when all posts are visible
  }
  showPosts(0, visiblePosts);
}

// Initial display
showPosts(0, visiblePosts);

// Updated JavaScript for editing and deleting posts with improved UI

// Function to create a post element and add it to the UI
function createPostElement(post) {
  const newPost = document.createElement("div");
  newPost.classList.add("post-card");
  newPost.setAttribute("data-id", post.id);

  // Post Image Section
  const postImgDiv = document.createElement("div");
  postImgDiv.classList.add("Post-img");
  const img = document.createElement("img");
  img.src = post.image;
  img.alt = "Post Image";
  postImgDiv.appendChild(img);

  // Post Header Section
  const postHeader = document.createElement("div");
  postHeader.classList.add("post-header");

  const topSec = document.createElement("div");
  topSec.classList.add("Top-sec");

  const profilePic = document.createElement("img");
  profilePic.src = post.clubLogo;
  profilePic.alt = "Profile Picture";

  const heading = document.createElement("h1");
  heading.innerHTML = `${post.clubName} <span>${post.role}</span>`;

  // Edit & Delete Buttons
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.classList.add("edit-btn");
  editBtn.onclick = () => editPost(post.id);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.onclick = () => deletePost(post.id);

  buttonContainer.appendChild(editBtn);
  buttonContainer.appendChild(deleteBtn);

  topSec.appendChild(profilePic);
  topSec.appendChild(heading);
  topSec.appendChild(buttonContainer);

  // Post Content Section
  const midSec = document.createElement("div");
  midSec.classList.add("mid-sec");
  const postText = document.createElement("p");
  postText.textContent = post.content;
  midSec.appendChild(postText);

  postHeader.appendChild(topSec);
  postHeader.appendChild(midSec);

  newPost.appendChild(postImgDiv);
  newPost.appendChild(postHeader);

  document.getElementById("postContainer").prepend(newPost);
}

// Function to edit a post
function editPost(postId) {
  let posts = JSON.parse(localStorage.getItem("posts")) || [];
  let post = posts.find((p) => p.id === postId);
  
  if (!post) return;

  const newContent = prompt("Edit post content:", post.content);
  if (newContent !== null) {
    post.content = newContent;
  }

  localStorage.setItem("posts", JSON.stringify(posts));
  document.getElementById("postContainer").innerHTML = "";
  posts.forEach(createPostElement);
}

// Function to delete a post
function deletePost(postId) {
  let posts = JSON.parse(localStorage.getItem("posts")) || [];
  posts = posts.filter((p) => p.id !== postId);
  localStorage.setItem("posts", JSON.stringify(posts));
  document.querySelector(`[data-id='${postId}']`).remove();
}

// Load posts on page load
window.addEventListener("load", () => {
  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  posts.forEach(createPostElement);
});
