function getData(){
    axios
    .get("http://localhost:4000/blogs")
    .then((res) => {
      console.log(res.data);
      displayBlogsOnScreen(res.data);
    })
    .catch((err) => {
      console.log("error is", err);
    });
}

function fetchComments(blogId) {
    return fetch(`http://localhost:4000/blogs/${blogId}/comments`)
        .then((response) => response.json())
        .catch((err) => {
            console.error("Error fetching comments:", err);
            return [];
        });
}


function displayBlogsOnScreen(blogDetails) {
    blogDetails.map((e) => {
        const blogItem = document.createElement("li");
        blogItem.id = `blog-${e.id}`; 
        blogItem.style.border = "10px solid #dee2e6";
        const blogDetailsDiv = document.createElement("div");
        blogDetailsDiv.innerHTML = `
            <div><strong>Title:</strong> ${e.title}</div>
            <div><strong>Author:</strong>${e.author}</div>
            <div><strong>Content:</strong> <div> ${e.content}</div></div>
        `;

        const commentInput = document.createElement("input");
        commentInput.setAttribute("type", "text");
        commentInput.setAttribute("placeholder", "Add a comment");
        commentInput.setAttribute("data-blog-id", e.id); 
        commentInput.classList.add("form-control", "mt-2");

        const submitButton = document.createElement("button");
        submitButton.textContent = "Post";
        submitButton.classList.add("btn", "btn-primary", "mt-2");
        submitButton.addEventListener("click", function() {
            const blogId = e.id;
            const commentContent = commentInput.value;
            if (!commentContent.trim()) {
                alert("Please enter a comment");
                return;
            }
            postComment(blogId, commentContent)
                .then(() => fetchComments(blogId))
                .then((comments) => displayComments(comments, blogId))
                .catch((err) => console.error("Error fetching comments after posting:", err));
        });

        const commentsList = document.createElement("ul");
        commentsList.id = `comments-${e.id}`; 
        commentsList.classList.add("list-group", "mt-3");

        fetchComments(e.id)
            .then((comments) => displayComments(comments, e.id))
            .catch((err) => console.error("Error fetching comments:", err));

        const actionButtonsDiv = document.createElement("div");
        actionButtonsDiv.classList.add("btn-group");
        actionButtonsDiv.appendChild(submitButton);

        blogItem.appendChild(blogDetailsDiv);
        blogItem.appendChild(commentInput); 
        blogItem.appendChild(actionButtonsDiv);
        blogItem.appendChild(commentsList);

        document.getElementById("append").appendChild(blogItem);
    });
}

function displayComments(comments, blogId) {
    let commentsList = document.getElementById(`comments-${blogId}`);
    if (!commentsList) {
        commentsList = document.createElement("ul");
        commentsList.id = `comments-${blogId}`;
        commentsList.classList.add("list-group", "mt-3");
        document.getElementById(`blog-${blogId}`).appendChild(commentsList);
    }
    commentsList.innerHTML = "";
    comments.forEach((comment) => {
        const commentItem = document.createElement("li");
        commentItem.id = `comment-${comment.id}`;
        commentItem.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
        commentItem.textContent = comment.content;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("btn", "btn-danger");
        deleteButton.addEventListener("click", function() {
            deleteComment(blogId, comment.id);
        });

        commentItem.appendChild(deleteButton);
        commentsList.appendChild(commentItem);
    });
}


function deleteComment(blogId, commentId) {
    fetch(`http://localhost:4000/blogs/${blogId}/comments/${commentId}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (response.status === 200) {
            console.log('Comment deleted successfully');
            const commentElement = document.getElementById(`comment-${commentId}`);
            if (commentElement) {
                commentElement.remove();
            }
        } else {
            throw new Error('Failed to delete comment');
        }
    })
    .catch(error => {
        console.error('Error deleting comment:', error);
    });
}



function postComment(blogId, commentContent) {
    return axios.post(`http://localhost:4000/blogs/${blogId}/comments`, { content: commentContent })
        .then((res) => {
            return res.data; 
        })
        .catch((err) => {
            console.error("Error posting comment:", err);
            throw err; 
        });
}



function handleFormSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const expenseData = {
      title: document.getElementById('title').value,
      content: document.getElementById('content').value,
      author: document.getElementById('author').value
  };


  axios.post('http://localhost:4000/blogs', expenseData) 
      .then((res) => {
        document.getElementById('title').value = '';
        document.getElementById('content').value = '';
        document.getElementById('author').value = '';
        document.getElementById("append").innerHTML=null;
          getData();
          console.log('Data saved:', res.data);
      })
      .catch((err) => {
          console.error('Error saving data:', err);
      });
}



getData();
