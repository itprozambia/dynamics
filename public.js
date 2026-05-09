
let posts = JSON.parse(localStorage.getItem("oxytipsPosts")) || [];

function renderPosts(){

  const container =
    document.getElementById("postsContainer");

  const postCount =
    document.getElementById("postCount");

  container.innerHTML = "";

  postCount.textContent = posts.length;

  if(posts.length === 0){

    container.innerHTML = `
      <div class="empty">
        No posts available yet.
      </div>
    `;

    return;
  }

  posts.forEach(post => {

    const card = document.createElement("div");
    card.className = "post-card";

    card.innerHTML = `
      ${
        post.image
        ? `<img src="${post.image}" class="post-image">`
     
        : `<div class="post-image"></div>`
      }

      <div class="post-content">

        <span class="post-category">
          ${post.category}
        </span>

        <h3 class="post-title">
          ${post.title}
        </h3>

        <p class="post-text">
          ${post.content}
        </p>

        ${
          post.video
          ? `
            <video controls class="post-video">
              <source src="${post.video}" type="video/mp4">
            </video>
          `
          : ""
        }

        <br><br>

        <small>
          Published: ${post.createdAt}
        </small>

        <br><br>

        <button class="delete-btn"
          onclick="deletePost(${post.id})">
          Delete
        </button>

      </div>
    `;

    container.appendChild(card);
  });
}

/* MEDIA LIBRARY */
function renderMedia(){

  const mediaGrid =
    document.getElementById("mediaGrid");

  const mediaCount =
    document.getElementById("mediaCount");

  mediaGrid.innerHTML = "";

  let count = 0;

  posts.forEach(post => {

    if(post.image){

      count++;

      mediaGrid.innerHTML += `
        <img src="${post.image}">
      `;
    }

    if(post.video){

      count++;

      mediaGrid.innerHTML += `
        <video controls>
          <source src="${post.video}" type="video/mp4">
        </video>
      `;
    }
  });

  mediaCount.textContent = count;

  if(count === 0){

    mediaGrid.innerHTML = `
      <div class="empty">
        No media uploaded yet.
      </div>
    `;
  }
}

/* DELETE POST */
function deletePost(id){

  if(confirm("Delete this post?")){

    posts = posts.filter(post => post.id !== id);

    localStorage.setItem(
      "oxytipsPosts",
      JSON.stringify(posts)
    );

    renderPosts();
    renderMedia();
  }
}
  renderPosts();
