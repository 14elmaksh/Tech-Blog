const commentFormHandler = async event => {
  event.preventDefault();

  const commentText = document
    .querySelector('input[name="comment"]')
    .value.trim();

  const postId = document
  .querySelector('input[name="comment"]')
  .dataset.value;

  if (commentText) {
    const response = await fetch("/api/comment", {
      method: "POST",
      body: JSON.stringify({
        postId,
        commentText
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });


   if (response.ok) {
    document.location.reload();
   } else {
    alert(response.statusText);
   }
  }
};

document
  .querySelector("#comment-form")
  .addEventListener("submit", commentFormHandler);